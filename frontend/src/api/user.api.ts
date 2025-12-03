import type { typeLogin, typeRegister, typeAuthResponse, typeUser } from "../types/user.types";
import { LoginSchema, RegisterSchema, UserSchema, AuthResponseSchema } from "../types/user.types";


const apiUrlAuth = import.meta.env.VITE_API_URL_AUTH

export const Login = async (payload: typeLogin): Promise<typeUser> => {
    const url = `${apiUrlAuth}/login`
    const validCredentials = LoginSchema.safeParse(payload)

    if (!validCredentials.success) {
        console.error("invalid data", validCredentials.error)
        throw new Error("Dati di login non validi")
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(validCredentials.data)
    })

    if (!response.ok) throw new Error(`email o password errati`)

    const data = await response.json()
    const validUser = UserSchema.safeParse(data.user)
    
    if (!validUser.success) throw new Error('Formato risposta non valido')
    
    return validUser.data
}


export const Register = async (payload: typeRegister): Promise<string> => {

    const url = `${apiUrlAuth}/register`
    const validCredentials = RegisterSchema.safeParse(payload)
    if (!validCredentials.success) {
        throw new Error("Dati di registrazione non validi")
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(validCredentials.data)
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`HTTP ${response.status}: ${errorText}`)
        }

        const result = await response.text()
        return result
    } catch (error) {
        console.error("ERRORE CATCH:", error)
        throw error
    }
}

export const Logout = async (): Promise<void> => {
    const url = `${apiUrlAuth}/logout`

    const response = await fetch(url, {
        method: 'POST',
        credentials: "include"

    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
}

export const checkAuth = async(): Promise<typeAuthResponse> => {
    const url =`${apiUrlAuth}/check`

    const response = await fetch(url,{
        method:'GET',
        credentials:'include'
    })

    if(response.status === 401){
        return {authenticated:false}
    }

    if(!response.ok){
        throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    const validResponse = AuthResponseSchema.safeParse(data)

    if(!validResponse.success) throw new Error('formato risposta non valido')

        return validResponse.data
}