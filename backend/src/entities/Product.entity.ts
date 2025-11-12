import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InvoiceItem } from "./InvoiceItem.entity";


@Entity()
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column("int")
    stock: number;

    @Column("decimal",{precision:10,scale:2})
    taxPercentage:number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @OneToMany(()=>InvoiceItem,invoiceItem=>invoiceItem.product)
    invoiceItem:InvoiceItem;
}