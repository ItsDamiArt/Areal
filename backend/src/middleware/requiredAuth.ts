import { NextFunction, Request, Response } from "express";

export const logSession = (req:Request, res:Response, next: NextFunction) => {
    console.log('CURRENT SESSION', req.session);
    next()
}

export const requireAuth = (req:Request, res:Response, next: NextFunction)=> {
    if(!req.session.user_id) return res.status(401).json({authenticated:false})
    
    next()
}