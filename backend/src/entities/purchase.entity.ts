import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";


@Entity()
export class Purchase{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Product, product => product.invoiceItem)
    product: Product;

    @Column("int")
    quantity: number;

    @Column("numeric", { precision: 12, scale: 2 })
    purchasePrice: number;

    @Column({ type: "timestamp" })
    date: Date;

    @CreateDateColumn()
    createdAt: Date;
}