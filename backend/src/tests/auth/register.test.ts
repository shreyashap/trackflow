import request from "supertest";
import {createApp} from "../../app";
import { beforeEach, describe, expect, it } from "vitest";
import { prisma} from "../../lib/prisma"

const app = createApp();

describe.sequential("Auth- Register",()=>{
    
    beforeEach(async()=>{
        await prisma.user.deleteMany();
    })

    it("Should register a new user",async()=>{
        const res = await request(app)
        .post("/auth/register")
        .send({
            name : "Test user",
            email : "test@example.com",
            password : "test1234"
        });

        expect(res.status).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.email).toBe("test@example.com")        
    })

    it("Should fail if email already exists",async()=>{
        await request(app).
        post("/auth/register")
        .send({
            name: "User",
            email: "duplicate@example.com",
            password: "password123",
        });


        const res =   await request(app).
        post("/auth/register")
        .send({
             name: "User",
            email: "duplicate@example.com",
            password: "password123",
        });

        expect(res.status).toBe(400)
        expect(res.body.success).toBe(false)
    })
})