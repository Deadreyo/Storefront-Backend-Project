import db from "../config/db";
import { Product } from "../models/productModel";

export default async function TopProducts(limit: number): Promise<Product[]> {
    try {
        const con = await db.connect()
        const query = `SELECT * FROM products ORDER BY purchase_count DESC LIMIT $1;`
        const results = await con.query(query, [limit])
        con.release();
        return results.rows
    } catch (e) {
        throw new Error("TopProducts Error: "+e);
        
    }
}