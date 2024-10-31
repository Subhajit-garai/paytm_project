import zod from "zod";

export const ZodsignUpSchema = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6).max(30),
    fname: zod.string().min(2).max(30),
    lname: zod.string().min(2).max(30),
    email: zod.string().email(),
})

export const ZodSignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(30),

});

   

