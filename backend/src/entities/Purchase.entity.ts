import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Product } from "./Product.entity";


@Entity("purchase_entries")
export class PurchaseEntry {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product, (product) => product.purchases, { eager: true })
  product: Product;

  @Column("int")
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 })
  purchasePrice: number;

  @CreateDateColumn()
  date: Date;
}