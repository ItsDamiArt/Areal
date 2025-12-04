import { createUser, authUser, loginUser, registerUser } from "../model/user.model";
import { Request, Response } from "express";
import z from "zod";


export const Login = async(req:Request, res:Response) => {
    const Credentials = authUser.safeParse(req.body)

    if(!Credentials.success){
        const errors = z.treeifyError(Credentials.error)
        res.status(400).json(errors)
        return
    }

    try {
        const User_log = await loginUser(Credentials.data)
        if(User_log !== null){
            req.session.user_id = User_log.user_id
            req.session.email = User_log.email
            req.session.save()

            console.log('sessione creata')
            return res.status(200).send('utente loggato')
        }else{
             return res.status(401).send('credenziali non valide')
        }
    } catch (err) {
        return res.status(401).send('autenticazione fallita')
    }
}

export const Register = async(req:Request, res:Response) => {
    const User_info = createUser.safeParse(req.body)


    if(!User_info.success){
        const errors = z.treeifyError(User_info.error)
        res.status(400).json(errors)
        return
    }

    try {
        const User_log = await registerUser(User_info.data)
            return res.status(200).send('utente registrato con successo')
        
    } catch (err) {
        console.error(err)
        return res.status(401).send('registrazione fallita')
    }
}

export const Logout = async (req:Request, res:Response) => {
    
    req.session.destroy(() => {
        res.clearCookie('connect.sid', {
            secure: false
        }).send('logout effettuato')
    })
}


export const auth = (req:Request, res:Response)=> {
    console.log(' non Autenticato')
    if(!req.session.user_id) return res.status(401).json({authenticated: false})

    console.log('✅ Autenticato')
    res.json({
        authenticated:true,
        user:{
            id: req.session.user_id,
            email: req.session.email
        }
    })
}



