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
    email: z.email(),
});

export const UserSchemaType = UserSchema.extend({
    name:z.string()
})

export const AuthResponseSchema = z.object({
    authenticated: z.boolean(),
    user: UserSchemaType.optional()
});

export type typeLogin = z.infer<typeof LoginSchema>
export type typeRegister = z.infer<typeof RegisterSchema>
export type typeUser = z.infer<typeof UserSchema>;
export type typeExtUser = z.infer<typeof UserSchemaType>;
export type typeAuthResponse = z.infer<typeof AuthResponseSchema>;