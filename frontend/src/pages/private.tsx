import { useTranslation } from "react-i18next"

export const Private = () => {
    const { t } = useTranslation()

    return (
        <div id='Private-Container'>
            <h1>{t('privateArea.title')}</h1>
            <h3>{t('privateArea.welcome')}</h3>
            <div className="private">
                <div className='offer'>
                    <h3>{t('privateArea.offers.title')}</h3>
                    <p>{t('privateArea.offers.text')}</p>
                </div>

                <div className='offer'>
                    <h3>{t('privateArea.offers.title2')}</h3>
                    <p>{t('privateArea.offers.text2')}</p>
                </div>

                <div className='offer'>
                    <h3>{t('privateArea.offers.title3')}</h3>
                    <p>{t('privateArea.offers.text3')}</p>
                </div>
            </div>


        </div>
    )
}