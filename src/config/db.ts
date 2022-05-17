import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config()

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_TEST_NAME,
    ENV
} = process.env

const db = new Pool({
    host: DB_HOST,
    database: ENV=="dev"? DB_NAME: DB_TEST_NAME,
    user: DB_USER,
    password: DB_PASS,
})

export default db;