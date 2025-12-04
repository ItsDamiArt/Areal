import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"


export const NotFound = () => {
    const { t } = useTranslation()


    return (
        <div id='notfound-container'>
            
            <h1>404</h1>
            <h1>{t('errors.notFound')}</h1>

            <Link to="/">
                <button type="button">{t('nav.home')}</button>
            </Link>



        </div>
    )
}