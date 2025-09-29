import z, { email } from "zod";


export const AuthFormSchema = z.object({
    email : z.email(),
    password: z.string()
})

export type AuthFormSchema = z.infer<typeof AuthFormSchema>;