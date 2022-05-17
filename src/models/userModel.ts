import db from "../config/db";
import bcrypt from 'bcrypt'

export type User = {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
}

export default class userStore {

    async index(): Promise<User[]> {
        try {
            let con = await db.connect();
            const query = "SELECT * FROM users";
            const result = await con.query(query);
            con.release();
            return result.rows;
        } catch (e) {
            throw new Error("Error while getting users: "+e);
        }
    }

    async get(id: number): Promise<User> {
        try {
            let con = await db.connect();
            const query = "SELECT * FROM users WHERE id = $1";
            const result = await con.query(query, [id]);
            con.release();
            return result.rows[0];
        } catch (e) {
            throw new Error("Error while getting user: "+e);
        }
    }

    async create(user: User): Promise<User> {
        try {
            let con = await db.connect();
            const query = "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";
            const {BCRYPT_PEPPER, SALT_ROUNDS} = process.env
            if(!BCRYPT_PEPPER || !SALT_ROUNDS) throw new Error("PEPPER or SALT_ROUNDS are undefined");

            const newPass = bcrypt.hashSync(user.password + BCRYPT_PEPPER, parseInt(SALT_ROUNDS))
            const result = await con.query(query, [user.firstname, user.lastname, newPass]);
            con.release();
            return result.rows[0];
        } catch (e) {
            throw new Error("Error while creating user: "+e);
        }
    }

    async authenticate(user: User): Promise<User|null> {
        try {
            let con = await db.connect();
            const query = `SELECT * FROM users WHERE firstname = $1 AND lastname = $2`;
            const resultArray = await con.query(query, [user.firstname, user.lastname]);
            const result = resultArray.rows[0] as User;
            con.release();

            if(result) {
                const {BCRYPT_PEPPER} = process.env;
                if(bcrypt.compareSync(user.password + BCRYPT_PEPPER, result.password)) {
                    return result;
                }
            }

            return null;

        } catch(e) {
            throw new Error("Error while authenticating user: "+e);
        }
    }
}