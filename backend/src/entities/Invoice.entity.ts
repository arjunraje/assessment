import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { InvoiceItem } from "./InvoiceItem.entity";


@Entity()
export class Invoice{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column("decimal", { precision: 10, scale: 2 })
    TotalAmount: number;

    @CreateDateColumn()
    generatedAt:Date;

    @ManyToOne(()=>User,user=>user.invoices)
    user:User;

    @OneToMany(()=>InvoiceItem,invoiceItem=>invoiceItem.invoice)
    invoiceItem:InvoiceItem[];

}