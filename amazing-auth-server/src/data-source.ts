import { DataSource } from "typeorm";
import { User } from "./entity/User";
import dotenv from 'dotenv';
dotenv.config()
console.log('Connecting to database with ', process.env.DB_ADDRESS, process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME)
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_ADDRESS,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
})