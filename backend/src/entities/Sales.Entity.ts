import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product.entity";
import { SaleItem } from "./SaleItem.entity";


@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  subtotal: number;

  @Column("decimal", { precision: 10, scale: 2 })
  totalDiscount: number;

  @Column("decimal", { precision: 10, scale: 2 })
  totalTax: number;

  @Column("decimal", { precision: 10, scale: 2 })
  grandTotal: number;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
  items: SaleItem[];
}