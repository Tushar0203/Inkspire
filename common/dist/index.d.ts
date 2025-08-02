import { z } from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type SingupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type SinginInput = z.infer<typeof signinInput>;
export declare const createPostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export type CreatePostInput = z.infer<typeof createPostInput>;
