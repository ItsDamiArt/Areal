import { useTranslation } from "react-i18next"

export const About = () => {
    const { t } = useTranslation()

    return (
        <div id='About-Container'>
            <section>
                <h1>{t('about.title')}</h1>
                <h3>{t('about.intro')}</h3>
                <span></span>
                <h1>{t('about.space.title')}</h1>
                <h3>{t('about.space.text')}</h3>
                <span></span>
                <h1>{t('about.approach.title')}</h1>
                <h3>{t('about.approach.text')}</h3>
                <h4>{t('about.approach.pillars')}</h4>
                
            </section>
        </div>
    )
}