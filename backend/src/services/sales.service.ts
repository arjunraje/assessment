import { AppDataSource } from "../config/data-source";
import { SalesEntry } from "../entities/Sales.Entity";
import { calculateBilling } from "../utils/calculateBilling";
import { ProductService } from "./product.service";

const salesRepo=AppDataSource.getRepository(SalesEntry);
export class SalesService {
  

  static async create(data: any) {
    const product = await ProductService.getSingleProduct(data.productId)
    if (!product) throw new Error("Product not found");

    const billing = calculateBilling(
      data.quantity,
      data.salePrice,
      product.taxPercentage
    );

    const entry =salesRepo.create({
      ...data,
      discount: billing.discount,
    });

    await salesRepo.save(entry);
    await ProductService.adjustStock(data.productId, -data.quantity);

    return { entry, billing };
  }

  static recent() {
    return salesRepo.find({ take: 10, order: { date: "DESC" } });
  }
}