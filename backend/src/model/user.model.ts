import connection from "../config/db.config";
import z from "zod";
import bcrypt from 'bcrypt'

export const createUser = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.email(),
    password: z.string().min(8).max(16)
})

export const authUser = z.object({
    email: z.email(),
    password: z.string().min(8).max(16)
})

export type typeCreateUser = z.infer<typeof createUser>
export type typeAuthUser = z.infer<typeof authUser>

export const registerUser = async(user: typeCreateUser): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const passwordHash = await bcrypt.hash(user.password, 12)
        const query = `INSERT INTO user (name, surname, email, passwordHash) VALUES (?, ?, ?, ?)`;
        const values = [user.name, user.surname, user.email, passwordHash]
        
        connection.query(query, values, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

export const loginUser = async(user: typeAuthUser): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM user WHERE email = ?`

        connection.query(query, [user.email], async (err:any, result:any) => {
            if(err) return reject(err)
            
            if(!result[0]){
                return reject(new Error('utente non trovato'))
            }

            const passwordCorrect = await bcrypt.compare(user.password, result[0].passwordHash)

            if(!passwordCorrect) return reject(new Error('password errata'))

            const {passwordHash, ...userWithoutPassword} = result[0]
            resolve(userWithoutPassword)
        })
    })
}
