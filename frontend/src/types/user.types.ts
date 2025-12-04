import z from "zod"


export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(16)
})

export const RegisterSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.email(),
    password: z.string().min(8).max(16)
})

export const UserSchema = z.object({
    id: z.number(),
    email: z.string().email(),
});

export const AuthResponseSchema = z.object({
    authenticated: z.boolean(),
    user: UserSchema.optional()
});

export type typeLogin = z.infer<typeof LoginSchema>
export type typeRegister = z.infer<typeof RegisterSchema>
export type typeUser = z.infer<typeof UserSchema>;
export type typeAuthResponse = z.infer<typeof AuthResponseSchema>;