import { createReservation, deleteReservationSchema, chargeReservation, displayReservation, deleteReservation } from "../model/reservation.model";
import { Request, Response } from "express";
import z from "zod";


export const getRes = async (req: Request, res: Response) => {
    try {
        const id = req.session.user_id
        if (!id) {
            return res.status(400).send('id incorretto o inesistente')
        }
        const reservation = await displayReservation(id)
        res.status(200).json(reservation)
    } catch (err) {
        res.status(500).send('errore nel recupero delle prenotazioni')
    }
}

export const postRes = async (req: Request, res: Response) => {
    const resInfo = createReservation.safeParse(req.body)
    if (!resInfo.success) {
        return res.status(400).json(resInfo.error)
    }
    try {
        const id = req.session.user_id
        if (!id) {
            return res.status(400).send('id incorretto o inesistente')
        }
        const reservationData = {...resInfo.data, user_id:id}
        const newReservation = await chargeReservation(reservationData)
         res.status(201).json({
            message: 'Prenotazione creata con successo',
            reservation: {
                res_id: newReservation.insertId,  // ✅ ID generato dal database
                ...reservationData        // ✅ Dati della prenotazione
            }
        })
    } catch (err) {
        res.status(500).send('errore nella creazione delle prenotazioni')
    }
}

export const deleteRes = async(req:Request, res:Response)=> {
    const ResId = deleteReservationSchema.safeParse({res_id:Number(req.params.id)})
    if(!ResId.success){
        return res.status(400).json(ResId.error)
    }

    try {
        await deleteReservation(ResId.data.res_id)
        res.status(200).json({message:'prenotazione cancellata con successo'})
    } catch (err) {
        res.status(500).send('errore nella cancellazione della prenotazione')
    }
}