import { Express, Router } from "express";
import { Login, Register, Logout, auth } from "../controllers/user.controllers";

export const authRoutes = (app:Express) => {
    const router = Router()

    router.post('/login', Login)
    router.post('/logout', Logout)
    router.post('/register', Register)
    router.get('/check', auth)

    app.use('/auth', router)
}