import {describe,expect,it} from "vitest";
import { validatePassword,hashPassword } from "../../modules/utils";



describe("Test password utils",()=>{
    it('It should has password',async()=>{
        const hash = await hashPassword('password');

        expect(hash).not.toBe('password');
    })

    it("It should generate different hash for same passwords",async()=>{
        const hash1 = await hashPassword('password')
        const hash2 = await hashPassword('password')

        expect(hash1).not.toBe(hash2);
    })

    it('It should verify the password',async()=>{ 
        const hash = await hashPassword('password')

        const isValid = await validatePassword('password',hash)

        expect(isValid).toBe(true);
    })

})