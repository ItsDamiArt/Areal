import { useEffect, useState, } from "react";
import { getRes, postRes, deleteRes } from "../api/reservations.api";
import type { typeCreateReservationExtend, typeCreateReservation } from "../types/reservations.types";
import { useTranslation } from "react-i18next";
import ResCard from "../components/reservation";
import DeleteRes from "../components/deleteModal";


export const Reservations = () => {

    const { t } = useTranslation()
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [guests, setGuests] = useState(0)
    const [notes, setNotes] = useState('')
    const [reservations, setReservations] = useState<typeCreateReservationExtend[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedRes, setSelectedRes] = useState<typeCreateReservationExtend | null>(null)


    const closeDeleteModal = () => {
        setIsDeleteOpen(false)
        setSelectedRes(null)
    }

    const fetchReservations = async () => {
        setIsLoading(true)
        try {
            const data = await getRes()
            setReservations(data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : t('errors.loadErr'))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchReservations()
    }, [])

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)


        if (!date || !time) {
            setError(t('errors.requiredField'))
            return
        }

        if (guests < 1 || !guests) {
            setError(t('errors.invalidGuests'))
            return
        }

        setIsLoading(true)
        try {

            const payload: typeCreateReservation = {
                date: `${date}T${time}:00`,
                guests: guests,
                notes: notes.trim()
            }
            const created = await postRes(payload)
            const newRes = Array.isArray(created) ? created[0] : created
            setReservations(prev => [newRes, ...prev])

            setDate('')
            setTime('')
            setGuests(0)
            setNotes('')
        } catch (err) {
            setError(err instanceof Error ? err.message : t('errors.createErr'))
        }
        finally {
            setIsLoading(false)
        }
    }



    const handleDelete = async (id: number) => {
        setError(null)
        setIsLoading(true)
        try {
            await deleteRes(id)
            setReservations(prev => prev.filter(p => p.res_id !== id))
            setSelectedRes(null)
            setIsDeleteOpen(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : t('errors.deleteErr'))
        } finally {
            setIsLoading(false)
        }


    }

    const openDeleteModal = (reservation: typeCreateReservationExtend) => {
        setSelectedRes(reservation)
        setIsDeleteOpen(true)
    }

    return (
        <div id='Res-Container'>
            <div id='Res-head'>
                <h1>{t('reservations.title')}</h1>
                <h3>{t('reservations.subtitle')}</h3>
            </div>

            <div id='Res-form'>
                <form onSubmit={handleCreate}>
                    <div className='form-group'>
                        <label>{t('reservations.date')}</label>
                        <input type='date' value={date} onChange={(e) => setDate(e.target.value)} disabled={isLoading} required />
                    </div>

                    <div className='form-group'>
                        <label>{t('reservations.time')}</label>
                        <input type='time' value={time} onChange={(e) => setTime(e.target.value)} disabled={isLoading} required />
                    </div>

                    <div className='form-group'>
                        <label>{t('reservations.guests')}</label>
                        <input type='number' min='1' value={guests} onChange={(e) => setGuests(Number(e.target.value))} disabled={isLoading} required />
                    </div>

                    <div className='form-group'>
                        <label>{t('reservations.notes')}</label>
                        <textarea value={notes} placeholder={t('placeholder.notesPh')} onChange={(e) => setNotes(e.target.value)} disabled={isLoading} />
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? t('common.loading') : t('common.save')}
                    </button>

                    {error && <p className="error">{error}</p>}
                </form>
            </div>

            <div id='Res-list'>
                <h1>{t('reservations.title')}</h1>

                {isLoading ? (
                    <p>{t('common.loading')}</p>
                ) : reservations.length === 0 ? (
                    <p id='noRes'>{t('reservations.noReservations')}</p>
                ) : (
                    <div className='Res-grid'>
                        {reservations.map((res) => (
                            <ResCard key={res.res_id} res={res} ondelete={() => openDeleteModal(res)} />
                        ))}
                    </div>


                )}

            </div>

            {isDeleteOpen && selectedRes && (
                <DeleteRes
                    res={selectedRes}
                    onDelete={handleDelete}
                    onClose={closeDeleteModal}
                />
            )}


            

        </div>
    )
}



