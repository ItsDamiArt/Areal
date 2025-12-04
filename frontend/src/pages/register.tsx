import { useState } from "react"
    ;
import { useAuth } from "../hook/authHook";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";




export default function RegisterForm() {
    const { t } = useTranslation()
    const { register } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        if (!name.trim()) return setError(t('errors.requiredField'))
        if (!surname.trim()) return setError(t('errors.requiredField'))
        if (!email.trim()) return setError(t('errors.requiredField'))
        if (!password.trim()) return setError(t('errors.requiredField'))
        setIsLoading(true)
        try {


            await register(name.trim(), surname.trim(), email.trim(), password.trim())
            navigate('/login')

        } catch (err) {
            setError(err instanceof Error ? err.message : t('errors.regErr'))
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="Section">
            <div className="Form">
                <h1>{t('auth.welcomeReg')}</h1>
                <h3>{t('auth.registerTitle')}</h3>

                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>{t('auth.name')}</label>
                        <input disabled={isLoading} type="text" placeholder={t('placeholder.namePh')} value={name} onChange={e => setName(e.target.value)} autoComplete="off" />
                    </div>

                    <div className="campo">
                        <label>{t('auth.surname')}</label>
                        <input disabled={isLoading} type="text" placeholder={t('placeholder.surnamePh')} value={surname} onChange={e => setSurname(e.target.value)} autoComplete="off" />
                    </div>

                    <div className="campo">
                        <label>{t('auth.email')}</label>
                        <input disabled={isLoading} type="email" placeholder={t('placeholder.emailPh')} value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" />
                    </div>
                    <div className="campo">
                        <label>{t('auth.password')}</label>
                        <div className="pass">
                            <input disabled={isLoading} type={showPassword ? "text" : "password"} placeholder={t('placeholder.passPh')} value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
                            <button disabled={isLoading} type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "😉" : "😊"}</button>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading}>{isLoading ? t('common.loading') : t('auth.registerButton')}</button>

                    <div className="Login">
                        <Link to='/login'>
                            <button type="button" disabled={isLoading}>{t('auth.alreadyHaveAccount')}</button>
                        </Link>
                    </div>
                </form>

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    )
}