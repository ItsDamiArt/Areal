import React from "react";
import { useAuth } from "../hook/authHook";
import { Navigate } from "react-router-dom";
import type { AuthProviderProp } from "../types/auth.type";


export const PrivateRoutes: React.FC<AuthProviderProp> = ({children}) => {
    const {isAuthenticated} = useAuth()

    if(!isAuthenticated){
        return <Navigate to='/login' replace/>
    }
    return children
}