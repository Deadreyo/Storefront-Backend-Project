import { NextFunction, Request, Response } from "express";

export function idValidation(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if(!isNaN(+id)) {
        next();
    } else {
        res.status(400).json("Error getting order by ID: ID param is not a number.")
    }
}

export function postUserValidation(req: Request, res: Response, next: NextFunction) {
    const {firstname, lastname, password} = req.body;
    if(firstname && lastname && password) {
        next();
    } else {
        res.status(400).json("Error creating User: Insufficient data.")
    }
}

export function postProductValidation(req: Request, res: Response, next: NextFunction) {
    const {name, price, category} = req.body;
    if(name && price && category) {
        next();
    } else {
        res.status(400).json("Error creating Product: Insufficient data.")
    }
}

export function postOrderValidation(req: Request, res: Response, next: NextFunction) {
    const {user_id, status} = req.body;
    if(user_id && status) {
        next();
    } else {
        res.status(400).json("Error creating Order: Insufficient data.")
    }
}

export function postProductToOrderValidation(req: Request, res: Response, next: NextFunction) {
    const {order_id, quantity} = req.body;
    if(order_id && quantity) {
        next();
    } else {
        res.status(400).json("Error adding Product to Order: Insufficient data.")
    }
}