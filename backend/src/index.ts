import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import { authRoutes } from './routes/user.routes';
import dotenv from 'dotenv'
import { ReservationRoutes } from './routes/reservation.routes';
import { menuRoutes } from './routes/menu.routes';


dotenv.config()

const app = express()
const port = 8080;
app.use(express.json())

app.use((req, res, next) => {
    console.log('METHOD:', req.method, '\nURL:', req.url, '\nBODY', req.body)
    next()
})



app.use(expressSession({
    secret: process.env.MIA_CHIAVE_SEGRETA || 'fjtogoohsssj3w09r55u',
    saveUninitialized: false,
    resave:false,
    cookie: {
        secure: false
    }
}))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

authRoutes(app)
ReservationRoutes(app)
menuRoutes(app)

app.listen(port, () => console.log(`server in ascolto sulla porta ${port}`))