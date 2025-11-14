import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product.entity";
import { SaleItem } from "../entities/SaleItem.entity";
import { Sale } from "../entities/Sales.Entity";
import { calculateBilling } from "../utils/calculateBilling";
import { ProductService } from "./product.service";

interface SaleInput {
  products: { productId: string; quantity: number;discount:number; taxPercent:number}[];
}

const salesRepo = AppDataSource.getRepository(Sale);
const productRepo=AppDataSource.getRepository(Product)
export class SalesService {


  static async createSale(data: SaleInput) {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    const items: SaleItem[] = [];

    for (const p of data.products) {
      const product = await productRepo.findOne({ where: { id: p.productId } });
      if (!product) throw new Error(`Product ${p.productId} not found`);
      if (product.currentStock < p.quantity)
        throw new Error(`Not enough stock for ${product.name}`);

      const baseLinePrice = Number(product.price) * p.quantity;
      const discount = p.discount ?? 0;
      const taxPercent = product.taxPercentage

      const taxableValue = baseLinePrice - discount;
      const taxAmount = taxableValue * (taxPercent / 100);

      subtotal += baseLinePrice;
      totalDiscount += discount;
      totalTax += taxAmount;

      const item = new SaleItem();
      item.product = product;
      item.quantity = p.quantity;
      item.priceAtSale = Number(product.price);
      item.discount = discount;
  

      items.push(item);

      product.currentStock -= p.quantity;
      await productRepo.save(product);
    }

    const grandTotal = subtotal - totalDiscount + totalTax;

    const sale = new Sale();
    sale.subtotal = subtotal;
    sale.totalDiscount = totalDiscount;
    sale.totalTax = totalTax;
    sale.grandTotal = grandTotal;
    sale.items = items;

    return await salesRepo.save(sale);
  }

  
}