import { Request, Response } from "express";
import productStore from "../models/productModel";
import addProductToOrder from "../services/add Product To Order";
import TopProducts from "../services/Top Products";

const store = new productStore();

export async function getProductsIndex(req: Request, res: Response) {
    try{
        const result = await store.index();
        res.json(result)
    } catch(e) {
        res.status(500).json("Error getting product index: "+e)
    }
} 

export async function getProductByID(req: Request, res: Response) {
    try{
        const {id} = req.params;
        const result = await store.get(+id);
        if(result) {
            res.json(result);
        } else {
            res.status(404).json("Product not found.")
        }

    } catch(e) {
        res.status(500).json("Error getting product by ID: "+e)
    }
}

export async function postProduct(req: Request, res: Response) {
    try{
        const {name, price, category} = req.body;
        const result = await store.create({id: 0, name, price, category, purchase_count: 0})
        res.json(result);
    } catch(e) {
        res.status(500).json("Error creating Product: "+e)
    }
}

export async function postProductToOrderByID(req: Request, res: Response) {
    try{
        const {id} = req.params;
        const {order_id, quantity} = req.body;
        const result = await addProductToOrder({id: 0, order_id, product_id: +id, quantity})
        res.json(result);
    } catch(e) {
        res.status(500).json("Error adding Product to Order: "+e)
    }
}

export async function getTopProducts(req: Request, res: Response) {
    try{
        const result = await TopProducts(5);
        res.json(result);
    } catch(e) {
        res.status(500).json("Error getting Top Products: "+e)
    }
}