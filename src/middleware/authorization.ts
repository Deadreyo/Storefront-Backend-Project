import { NextFunction, Request, Response } from "express";
import { validateUserToken } from "../services/jwt";

export default function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
    try{
        let token = req.headers.authorization!.split(' ')[1]
        validateUserToken(token)
        next();
    } catch(e) {
        res.status(401).json(`Missing or invalid Authorization.`)
    }
}