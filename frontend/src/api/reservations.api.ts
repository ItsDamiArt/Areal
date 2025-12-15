import { createReservation, ReservationSchema } from "../types/reservations.types"
import type { typeCreateReservation, typeReservationSchema } from "../types/reservations.types"
import z from "zod"

const apiUrlRes = import.meta.env.VITE_API_URL_RES



export const getRes = async (): Promise<typeReservationSchema[]> => {
    const url = `${apiUrlRes}/getreservation`
    const response = await fetch(url, {
        credentials: 'include'
    })

    if (response.status === 401) {
        throw new Error('Non autenticato')
        
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()

    const validReservations = z.array(ReservationSchema).safeParse(data)

    if (!validReservations.success) {
        throw new Error('Formato risposta non valido')
    }

    return validReservations.data
}

export const postRes = async (payload: typeCreateReservation): Promise<typeReservationSchema> => {
    const url = `${apiUrlRes}/createreservation`
    const validPost = createReservation.safeParse(payload)

    if (!validPost.success) {
        console.error("invalid data", validPost.error)
        throw new Error("Dati creazione non validi")
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(validPost.data)
    })

    if (response.status === 401) {
        throw new Error('Non autenticato')
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()

    const validResponse = ReservationSchema.safeParse(data.reservation)

    if (!validResponse.success) {
        throw new Error('Formato risposta non valido')
    }

    return validResponse.data
}


export const deleteRes = async (id: number): Promise<void> => {
    const url = `${apiUrlRes}/deletereservation/${id}`

    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (response.status === 401) {
        throw new Error('Non autenticato')
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
}