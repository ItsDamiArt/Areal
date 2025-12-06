import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './provider/authProvider'
import { PrivateRoutes } from './routes/privateRoutes'
import './App.css'
import { Header } from './components/header'
import { Home } from './pages/home'
import { About } from './pages/about'
import { Menu } from './pages/menu'
import { Private } from './pages/private'
import { Reservations } from './pages/reservationsPage'
import LoginForm from './pages/login'
import RegisterForm from './pages/register'
import { NotFound } from './pages/notFound'
import './pages/pages.css'
function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <div id='AppPage'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            


            <Route path='/profile' element={<PrivateRoutes><Private/></PrivateRoutes>} />
            <Route path='/reservation' element={<PrivateRoutes><Reservations/></PrivateRoutes>} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
