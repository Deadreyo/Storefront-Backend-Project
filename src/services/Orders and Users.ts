import db from "../config/db";
import { Order } from "../models/orderModel";

export async function getOrdersForUser(userId: number, status: 'active' | 'complete') : Promise<Order[]> {
    try {
        const con = await db.connect()
        const query = `SELECT * FROM orders WHERE user_id = $1 AND status = $2;`
        const results = await con.query(query, [userId, status])
        con.release()
        return results.rows;
    } catch (e) {
        throw new Error("GetUserOrders Error: "+e);
    }
}

