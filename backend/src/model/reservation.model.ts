import connection from "../config/db.config";
import z from "zod";

export const createReservation = z.object({
    date: z.coerce.date(),
    guests: z.number(),
    notes: z.string().nullable().optional()
})

export const createReservationExtend = createReservation.extend({
    user_id: z.number()
})

export const deleteReservationSchema = z.object({
    res_id: z.number()
})


export type typeCreateReservation = z.infer<typeof createReservation>
export type typeCreateReservationExtend = z.infer<typeof createReservationExtend>
export type typeDeleteReservation = z.infer<typeof deleteReservationSchema>

export const displayReservation = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM reservations WHERE user_id = ?`;
        connection.query(query, [id], (err:any, result:any) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

export const chargeReservation = async (reservation: typeCreateReservationExtend): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO reservations (user_id, date, guests, notes) VALUES (?, ?, ?, ?)`;
        const values = [reservation.user_id, reservation.date, reservation.guests, reservation.notes]
        connection.query(query, values, (err:any, result:any) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

export const deleteReservation = async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM reservations WHERE res_id = ?`;
        connection.query(query, [id], (err:any, result:any) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

