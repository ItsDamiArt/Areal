import type { ReactNode } from "react";
import type { typeExtUser } from "./user.types";

export type TypeAuthContext = {
    user: typeExtUser | null
    isAuthenticated: boolean
    isLoading: boolean  // ✅ Aggiungi questa riga
    login: (email: string, password: string) => Promise<void>
    register: (name: string, surname: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    checkAuthentication: () => Promise<void>  // oppure checkAuth se hai rinominato
}

export type AuthProviderProp = {
    children: ReactNode
}