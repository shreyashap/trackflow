import request from "supertest";

import {createApp} from "../../app";
import {beforeEach, describe, expect, it } from "vitest";
import { prisma} from "../../lib/prisma"

const app = createApp();

describe.sequential("Auth - Login",()=>{

     beforeEach(async()=>{
        await prisma.user.deleteMany();
    })

    it("It should give error missing fields if none is given",async()=>{ 
        const res = await request(app).
        post('/auth/login')
        .send({ 
            email : "",
            password: ""
        })

        expect(res.status).toBe(400)
    })

    
    it("Should login the registered user",async()=>{
        await request(app)
        .post('/auth/register')
        .send({ 
            name : "user",
            email : "user@example.com",
            password : "123456"
        })

      const res = await request(app)
        .post('/auth/login')
        .send({ 
            email : "user@example.com",
            password : "123456"
        })

        expect(res.status).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.headers['set-cookie'][0]).toContain('refreshToken')
        expect(res.body.data.accessToken).toBeDefined();
    })

    it("Should not login the unregister user",async()=>{ 
         const res = await request(app)
        .post('/auth/login')
        .send({ 
            email : "user1@example.com",
            password : "123456"
        })
        expect(res.status).toBe(404)
        expect(res.body.success).toBe(false)
    })
})
