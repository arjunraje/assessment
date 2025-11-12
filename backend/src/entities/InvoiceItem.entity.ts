import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./Invoice.entity";
import { Product } from "./Product.entity";


@Entity()
export class InvoiceItem{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column("int")
    quantity: number;

    @ManyToOne(()=>Invoice,invoice=>invoice.invoiceItem)
    invoice:Invoice;

    @ManyToOne(()=>Product,product=>product.invoiceItem)
    product:Product;
}