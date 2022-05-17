import db from "../config/db";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    purchase_count: number;
}

export default class productStore{

    async index(): Promise<Product[]> {
        try {
            let con = await db.connect();
            const query = "SELECT * FROM products";
            const result = await con.query(query);
            con.release();
            return result.rows;
        } catch (e) {
            throw new Error("Error while getting products: "+e);
        }
    }

    async get(id: number): Promise<Product> {
        try {
            let con = await db.connect();
            const query = "SELECT * FROM products WHERE id = $1";
            const result = await con.query(query, [id]);
            con.release();
            return result.rows[0];
        } catch (e) {
            throw new Error("Error while getting product: "+e);
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            let con = await db.connect();
            const query = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
            const result = await con.query(query, [product.name, product.price, product.category]);
            con.release();
            return result.rows[0];
        } catch (e) {
            throw new Error("Error while creating product: "+e);
        }
    }
}