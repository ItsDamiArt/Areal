import { Express, Router } from "express";
import { requireAuth } from "../middleware/requiredAuth";
import { getRes, postRes, deleteRes } from "../controllers/reservation.controllers";

export const ReservationRoutes = (app:Express) => {
    const router = Router();
    router.use(requireAuth)

    router.get('/getreservation', getRes)
    router.post('/createreservation', postRes)
    router.delete('/deletereservation/:id', deleteRes)


    app.use('/reservations', router)
}