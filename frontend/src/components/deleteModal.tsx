import { useState } from "react";
import type { typeCreateReservationExtend } from "../types/reservations.types";
import { useTranslation } from "react-i18next";


type DeleteProps = {
    res: typeCreateReservationExtend
    onDelete: (id: number) => Promise<void> | void;
    onClose: () => void;
}

export default function DeleteRes({ res, onDelete, onClose }: DeleteProps) {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    async function handleClick(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await onDelete(res.res_id)
            onClose();
        }
        catch (err: unknown) {
            setError(err instanceof Error ? err.message : t('errors.deleteErr'))
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div id="container-modal">
            <h1>{t('common.deleteRes')}</h1>
            <form onSubmit={handleClick}>
                <div className="confirm">
                    <h4>{t('reservations.confirmDelete')}</h4>
                </div>
                <div className="buttons">
                    <button type="button" onClick={onClose} disabled={isLoading}>{t('common.cancel')}</button>
                    <button type="submit" disabled={isLoading}>{isLoading? t('common.loading') : t('common.delete')}</button>
                </div>
                {error && <p className="error">{error}</p>}
            </form>


        </div>
    )
}