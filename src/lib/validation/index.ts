import * as z from "zod";

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters."}),
});

export const SignUpValidation = z.object({
    email: z.string().email(),
    username: z.string(),
    fullName: z.string(),
    password: z.string().min(8, {message: "Password must be at least 8 characters."}),
});