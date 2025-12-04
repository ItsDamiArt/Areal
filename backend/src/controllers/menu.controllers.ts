import { Request, Response } from "express"
const MENU_PDF_ID = '1qv8EgXI7Sj2Lv4HkWZ4nOjIw0Lnu_A3u'

export const getMenuPDF = (req:Request, res:Response) => {
    try {
        const download = 'https://drive.google.com/uc?export=download&id=1qv8EgXI7Sj2Lv4HkWZ4nOjIw0Lnu_A3u'

        res.json({
            success:true,
            url:download,
            filename: 'prova.pdf'
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message: 'errore nel recupero del file'
        })
    }
}