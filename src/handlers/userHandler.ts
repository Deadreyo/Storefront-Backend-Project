import { Request, Response } from "express";
import userStore from "../models/userModel";
import { signUserToken } from "../services/jwt";

const store = new userStore();

export async function getUserIndex(req: Request, res: Response) {
    try {
        const results = await store.index();
        res.json(results);
    } catch (e) {
        res
         .status(500)
         .json("Error getting users index: "+e)
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const result = await store.get(+id);
        if(result) {
            res.json(result)
        } else {
            res.status(404).json("User not found.")
        }
    } catch (e) {
        res
         .status(500)
         .json("Error getting user by ID: "+e)
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const {firstname, lastname, password} = req.body;
        const result = await store.create({id: 0, firstname, lastname, password});
        const token = signUserToken(result.firstname, result.lastname)
        res.json(token);
    } catch (e) {
        res
         .status(500)
         .json("Error getting user by ID: "+e)
    }
}

export async function authorizeUser(req: Request, res: Response) {
    try {
        const {firstname, lastname, password} = req.body;
        const result = await store.authenticate({id: 0, firstname, lastname, password})
        if(result) {
            const token = signUserToken(result.firstname, result.lastname);
            res.json(token)
        } else {
            res.status(400).json("Error authenticating user: Invalid credentials.")
        }
    } catch (e) {
        res
         .status(500)
         .json("Error uthenticating user: "+e)
    }
}
