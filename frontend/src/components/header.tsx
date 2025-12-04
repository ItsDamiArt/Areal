import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useAuth } from "../hook/authHook"
import { useState } from "react"

export const Header = () => {
    const { t } = useTranslation()
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


    return (
        <div id='navbar'>
            <div id='logo'>
                <h1>Aréal</h1>
                <h4>{t('nav.logo')}</h4>
            </div>
            <nav>
                <Link to='/'>{t('nav.home')}</Link>
                <Link to='/about'>{t('nav.about')}</Link>
                <Link to='/menu'>{t('nav.menu')}</Link>
                <Link to='/profile'>{t('nav.profile')}</Link>
                <Link to='/reservation'>{t('nav.reservations')}</Link>
            </nav>

            <div id='user'>
                {isAuthenticated && user && (
                    <h4>{t('welcome')} {user.name}</h4>
                )}
            </div>

            {isAuthenticated ? (
                <button onClick={handleClick} disabled={isLoading}>{isLoading? t('common.loading'): t('nav.logout')}</button>
            ) : (
                <Link to='/login'>
                    <button>{t('nav.login')}</button>
                </Link>
            )
            }

            {error && <p className="error">{error}</p>}
        </div>
    )
}