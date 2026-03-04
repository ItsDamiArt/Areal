import connection from "../config/db.config";
import z from "zod";

const isValidReservationTime = (date: Date): boolean => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const total = hours * 60 + minutes
    const lunchStart = 11 * 60 + 30  // 11:30
    const lunchEnd = 14 * 60 + 30    // 14:30
    const dinnerStart = 19 * 60      // 19:00
    const dinnerEnd = 23 * 60 + 30   // 23:30
    return (total >= lunchStart && total <= lunchEnd) || (total >= dinnerStart && total <= dinnerEnd)
}

export const createReservation = z.object({
    date: z.coerce.date().refine(isValidReservationTime, {
        message: "Reservation time must be within opening hours: 11:30–14:30 or 19:00–23:30"
    }),
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

