import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { PurchaseEntry } from "./Purchase.entity";

import { SaleItem } from "./SaleItem.entity";


@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column({ type: "int", default: 0 })
  currentStock: number;

  @OneToMany(() => SaleItem, (item) => item.product)
  saleItems: SaleItem[];

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PurchaseEntry, (purchase) => purchase.product)
  purchases: PurchaseEntry[];

}
