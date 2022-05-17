import db from "../config/db";

type Order_Products = {
    id: number,
    order_id: number,
    product_id: number,
    quantity: number,
}

export default async function addProductToOrder(data: Order_Products): Promise<Order_Products> {
    try{
        const con = await db.connect()
        
        // inserting the new relation into orders_products
        const query = `INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`
        const results = await con.query(query, [data.order_id, data.product_id, data.quantity])

        // increasing the purchase_count in the product
        const query2 = `UPDATE products SET purchase_count = purchase_count + 1 WHERE id = $1`
        await con.query(query2, [data.product_id])

        con.release()
        return results.rows[0]
    } catch (e) {
        throw new Error("addProduct Error: "+e);
    }
}