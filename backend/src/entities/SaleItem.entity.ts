import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";
import { Sale } from "./Sales.Entity";

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, (sale) => sale.items)
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.saleItems)
  product: Product;

  @Column()
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 })
  priceAtSale: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  discount: number; // item-level discount (flat amount)

  // tax percentage for the item e.g. 18%
}