import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useAuth } from "../hook/authHook"
import { useState } from "react"
import { downloadMenu } from "../api/menu.api"



export const Home = () => {
    const { t } = useTranslation()
    const { isAuthenticated } = useAuth()
    const [isDownloading, setIsDownloading] = useState(false)

    const renderStars = (count: number) => {
        return '⭐'.repeat(count) + '☆'.repeat(5 - count);
    }

    const handleDownloadMenu = async () => {
        setIsDownloading(true)
        try {
            const menuUrl = await downloadMenu()
            window.open(menuUrl, '_blank')
        } catch (err) {
            console.error(t('errors.networkError'))

        } finally {
            setIsDownloading(false)
        }
    }
    return (
        <div id='Home-Container'>
            <section>
                <h1>{t('home.hero.title')}</h1>
                <h3>{t('home.hero.subtitle')}</h3>
                <p>{t('home.hero.description')}</p>
                <div id='section-buttons'>

                    <button type='button' onClick={handleDownloadMenu} disabled={isDownloading}>{isDownloading? t('common.loading') : t('home.hero.download')}</button>

                    {isAuthenticated ? (
                        <Link to='/reservation'>
                            <button type='button'>{t('home.hero.reserve')}</button>
                        </Link>
                    ) : (
                        <Link to='/login'>
                            <button type='button'>{t('home.hero.reserve')}</button>
                        </Link>
                    )
                    }
                </div>

                <div id='Home-info'>
                    <div className='home-info-sec'>
                        <h3>{t('home.hero.service')}</h3>
                        <p>{t('home.hero.clockL')}</p>
                        <p>{t('home.hero.clockD')}</p>
                    </div>

                    <div className='home-info-sec'>
                        <h3>{t('home.hero.cuisine')}</h3>
                        <p>{t('home.hero.subtitle')}</p>
                    </div>

                    <div className='home-info-sec'>
                        <h3>{t('home.hero.location')}</h3>
                        <p>{t('home.hero.locationSite')}</p>
                    </div>
                </div>
            </section>

            <aside>
                <div id="Aside-container">
                    <h1>{t('home.aside.tasting')}</h1>
                    <p>{t('home.aside.text')}</p>

                    <div id="Aside-info">
                        <p>{t('home.aside.dishes')}</p>
                    </div>
                </div>
            </aside>

            <section id="reviews-section">
                <h2>{t('home.reviews.title')}</h2>
                <p className="reviews-subtitle">{t('home.reviews.subtitle')}</p>

                <div className="reviews-grid">
                    {/* Recensione 1 */}
                    <div className="review-card">
                        <div className="stars">{renderStars(5)}</div>
                        <p className="review-text">"{t('home.reviews.review1.text')}"</p>
                        <p className="review-author">— {t('home.reviews.review1.author')}</p>
                    </div>

                    {/* Recensione 2 */}
                    <div className="review-card">
                        <div className="stars">{renderStars(4)}</div>
                        <p className="review-text">"{t('home.reviews.review2.text')}"</p>
                        <p className="review-author">— {t('home.reviews.review2.author')}</p>
                    </div>

                    {/* Recensione 3 */}
                    <div className="review-card">
                        <div className="stars">{renderStars(5)}</div>
                        <p className="review-text">"{t('home.reviews.review3.text')}"</p>
                        <p className="review-author">— {t('home.reviews.review3.author')}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}