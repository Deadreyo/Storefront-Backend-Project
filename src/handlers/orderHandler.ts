import { Request, Response } from "express";
import orderStore from "../models/orderModel";
import { getOrdersForUser } from "../services/Orders and Users";

const store = new orderStore();

export async function getOrdersIndex(req: Request, res: Response) {
    try{
        const result = await store.index();
        res.json(result)
    } catch(e) {
        res.status(500).json("Error getting order index: "+e)
    }
} 

export async function getOrderByID(req: Request, res: Response) {
    try{
        const {id} = req.params;
        const result = await store.get(+id);
        if(result) {
            res.json(result);
        } else {
            res.status(404).json("Order not found.")
        }
    } catch(e) {
        res.status(500).json("Error getting order by ID: "+e)
    }
}

export async function createOrder(req: Request, res: Response) {
    try{
        const {user_id, status} = req.body;
        const result = await store.create({id: 0, user_id, status})
        res.json(result);
    } catch(e) {
        res.status(500).json("Error creating Order: "+e)
    }
}

export async function getActiveOrdersForUsersByID(req: Request, res: Response) {
    try{
        const {id} = req.params;
        const result = await getOrdersForUser(+id, 'active')
        res.json(result);
    } catch(e) {
        res.status(500).json("Error getting active orders: "+e)
    }
}

export async function getCompleteOrdersForUsersByID(req: Request, res: Response) {
    try{
        const {id} = req.params;
        const result = await getOrdersForUser(+id, 'complete')
        res.json(result);
    } catch(e) {
        res.status(500).json("Error getting complete orders: "+e)
    }
}