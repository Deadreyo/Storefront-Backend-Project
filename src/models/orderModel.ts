import db from "../config/db";

export type Order = {
    id: number;
    user_id: number;
    status: "active" | "complete";
}

export default class orderStore {

    async index(): Promise<Order[]> {
        try {
            const con = await db.connect()
            const query = `SELECT * FROM orders`;
            const results = await con.query(query);
            con.release();
            return results.rows
        } catch (e) {
            throw new Error("Error while getting orders: "+e);
            
        }
    }

    async get(id: number): Promise<Order> {
        try {
            const con = await db.connect();
            const query = `SELECT * FROM orders WHERE id = $1`;
            const results = await con.query(query, [id]);
            con.release()
            return results.rows[0];
        } catch (e) {
            throw new Error("Error while getting order: "+e);
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const con = await db.connect();
            const query = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;`
            const results = await con.query(query, [order.user_id, order.status]);
            con.release();
            return results.rows[0]
        } catch (e) {
            throw new Error("Error while creating order: "+e);
        }
    }
}