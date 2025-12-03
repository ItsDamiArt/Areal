
import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const {t} = useTranslation()

  return (
    <>
      <h1>{t('auth.loginTitle')}</h1>
    </>
  )
}

export default App
