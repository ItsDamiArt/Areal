import React, {useState, useEffect} from "react"
import type { AuthProviderProp } from "../types/auth.type"
import type { typeExtUser } from "../types/user.types"
import { AuthContext } from "../context/authContext"
import { checkAuth, Login, Logout, Register } from "../api/user.api"


export const AuthProvider: React.FC<AuthProviderProp> = ({ children }) => {
    const [user, setUser]= useState<typeExtUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const isAuthenticated = Boolean(user)

    const checkAuthentication = async () => {
       
        try {
            const data = await checkAuth()

            if(data.authenticated && data.user) {
                setUser(data.user)
            }else(
                setUser(null)
            )
        } catch (err) {
            console.error('Errore checkAuthentication', err)
            setUser(null)
        }finally{
            setIsLoading(false)
        }

    }

    useEffect(()=> {
        checkAuthentication()
    }, [])

    const login = async (email:string, password:string)=>{
        setIsLoading(true)
        try {
            const userData = await Login({email,password})
            setUser(userData)
        } catch (err) {
            throw err
        }finally{
            setIsLoading(false)
        }
    }

    const register = async (name:string, surname: string, email:string, password:string)=>{
        setIsLoading(true)
        try {
            await Register({name, surname, email,password})
            
        } catch (err) {
            throw err
        }finally{
            setIsLoading(false)
        }
    }

    const logout = async()=> {
        setIsLoading(true)
        try {
            await Logout()
            setUser(null)
        } catch (err) {
            console.error('errore logout:', err)
        }finally{
            setIsLoading(false)
        }
    }

    return (
            <AuthContext.Provider value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                register,
                logout,
                checkAuthentication
            }}>
                {children}
            </AuthContext.Provider>
        )
}