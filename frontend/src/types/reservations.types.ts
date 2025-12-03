import z from "zod";

export const createReservation = z.object({
    date: z.string(),
    guests: z.number(),
    notes: z.string().nullable()
})



export const ReservationSchema = z.object({
    res_id: z.number(),
    user_id: z.number(),
    date: z.string(),
    guests: z.number(),
    notes: z.string().nullable()
});


export type typeCreateReservation = z.infer<typeof createReservation>

export type typeReservationSchema = z.infer<typeof ReservationSchema>