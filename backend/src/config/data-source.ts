import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();


import { Product } from "../entities/Product.entity";
import { PurchaseEntry } from "../entities/Purchase.entity";
import { Sale } from "../entities/Sales.Entity";
import { SaleItem } from "../entities/SaleItem.entity";



export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,

    entities: [PurchaseEntry,Sale,SaleItem,Product],
});
