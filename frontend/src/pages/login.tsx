import { useState } from "react"
import { useTranslation } from "react-i18next";
import { useAuth } from "../hook/authHook";
import { Link, useNavigate } from "react-router-dom";



export default function LoginForm() {
    const { t } = useTranslation()
    const {login} = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (!email.trim()) return setError(t('errors.requiredField'))
        if (!password.trim()) return setError(t('errors.requiredField'))
        setIsLoading(true)
        try {
            await login(email.trim(), password.trim()) 
            navigate('/profile')

        } catch (err) {
            setError(err instanceof Error ? err.message : t('errors.loginErr'))
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="Section">
            <div className="Form">
                <h1>{t('nav.welcome')}</h1>
                <h3>{t('auth.loginTitle')}</h3>

                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>{t('auth.email')}</label>
                        <input type="email" placeholder={t('placeholder.emailPh')} value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" disabled={isLoading} />
                    </div>
                    <div className="campo">
                        <label>{t('auth.password')}</label>
                        <div className="pass">
                            <input type={showPassword ? "text" : "password"} placeholder={t('placeholder.passPh')} value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" disabled={isLoading} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>{showPassword ? "😉" : "😊"}</button>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading}>{isLoading ? t('common.loading') : t('auth.loginButton')}</button>

                    <div className="Login">
                        <Link to="/register">
                             <button type="button" disabled={isLoading}>{t('auth.dontHaveAccount')}</button>
                        </Link>
                       
                    </div>
                </form>

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    )
}