import { useTranslation } from "react-i18next";
import type { typeCreateReservationExtend } from "../types/reservations.types";
import i18n from "../i18n";

type ResProps = {
    res: typeCreateReservationExtend;
    ondelete: (id: number) => Promise<void> | void;
}

const formatDateTime = (dateTime: string, locale:string) => {
    const [date, time] = dateTime.split('T')
    const [hours, min] = time.split(':')

    const formattedDate = date
    let formattedTime: string
    
    
    if (locale === 'en') {
        const hour = parseInt(hours);
        const am_pm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12; 
        formattedTime = `${hour12}:${min} ${am_pm}`;
    } else {
        
        formattedTime = `${hours}:${min}`;
    }
    
    return {
        date: formattedDate,
        time: formattedTime
    };
};

export default function ResCard({ res, ondelete }: ResProps) {
    const { t } = useTranslation()
    const { date, time } = formatDateTime(res.date, i18n.language)
    return (
        <div id="container-card">

            <div className="segment">
                <h1>{t('reservations.date')}</h1>
                <h3>{date}</h3>
            </div>
            <div className="segment">
                <h1>{t('reservations.time')}</h1>
                <h3>{time}</h3>
            </div>

            <div className="segment guests">
                <h1>{t('reservations.guests')}</h1>
                <h3>{res.guests}</h3>
            </div>

            <div className="segment notes">
                <h1>{t('reservations.notes')}</h1>
                <h3>{res.notes? res.notes : '-'}</h3>
            </div>

            <div className="buttons">
                <button onClick={() => ondelete(res.res_id)}>{t('common.delete')}</button>
            </div>

        </div>
    )
}