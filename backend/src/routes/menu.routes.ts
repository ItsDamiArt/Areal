import { Express, Router } from "express";
import { requireAuth } from "../middleware/requiredAuth";
import { getMenuPDF } from "../controllers/menu.controllers";

export const menuRoutes = (app:Express) => {
    const router = Router();

    router.get('/download', getMenuPDF)


    app.use('/menu', router)
}