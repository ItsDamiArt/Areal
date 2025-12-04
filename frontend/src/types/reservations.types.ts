import z from "zod";

export const createReservation = z.object({
    date: z.string(),
    guests: z.number(),
    notes: z.string().nullable()
})

export const CreateReservationExtend = createReservation.extend({
    res_id:z.number()
})



export const ReservationSchema = z.object({
    res_id: z.number(),
    user_id: z.number(),
    date: z.string(),
    guests: z.number(),
    notes: z.string().nullable()
});


export type typeCreateReservation = z.infer<typeof createReservation>
export type typeCreateReservationExtend = z.infer<typeof CreateReservationExtend>
export type typeReservationSchema = z.infer<typeof ReservationSchema>