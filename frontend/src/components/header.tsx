import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useAuth } from "../hook/authHook"
import { useState } from "react"
import './header.css'

export const Header = () => {
    const { t, i18n } = useTranslation()
    const { isAuthenticated, user, logout } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleClick = async () => {
        setError(null)
        setIsLoading(true)
        try {
            await logout()
        } catch (err) {
            setError(err instanceof Error ? err.message : t('errors.logoutErr'))
        } finally {
            setIsLoading(false)
        }
    }

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('language', lang)  // Salva preferenza
    }

    const currentLanguage = i18n.language

    return (
        <div id='navbar'>
            <div id='logo' className='item'>
                <h1>Aréal</h1>
            </div>
            <nav className='item'>
                <Link to='/'>{t('nav.home')}</Link>
                <Link to='/about'>{t('nav.about')}</Link>
                <Link to='/menu'>{t('nav.menu')}</Link>
                <Link to='/profile'>{t('nav.profile')}</Link>
                <Link to='/reservation'>{t('nav.reservations')}</Link>
            </nav>

            <div id='user' className='item'>
                {isAuthenticated && user && (
                    <h4>{t('nav.welcome')} {user.name}</h4>
                )}
            </div>

            <div className="language-switcher item">
                <button 
                    onClick={() => changeLanguage('it')}
                    className={currentLanguage === 'it' ? 'active' : ''}
                    aria-label="Italiano"
                >
                    IT
                </button>
                <button 
                    onClick={() => changeLanguage('en')}
                    className={currentLanguage === 'en' ? 'active' : ''}
                    aria-label="English"
                >
                    EN
                </button>
            </div>
            
            <div className='item' id='nav-buttons'>
            {isAuthenticated ? (
                <button onClick={handleClick} disabled={isLoading}>{isLoading? t('common.loading'): t('nav.logout')}</button>
            ) : (
                <Link to='/login'>
                    <button>{t('nav.login')}</button>
                </Link>
            )
            }

            </div>

            {error && <p className="error">{error}</p>}
        </div>
    )
}