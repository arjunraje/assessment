import { AppDataSource } from "../config/data-source";
import { PurchaseEntry } from "../entities/Purchase.entity";
import { ProductService } from "./product.service";


const purchaseRepo= AppDataSource.getRepository(PurchaseEntry);

export class PurchaseService {

  static async create(data: any) {

    const entry = purchaseRepo.create(data);
    await purchaseRepo.save(entry);

    await ProductService.adjustStock(data.productId, data.quantity);
    return entry;
  }

  static recent() {
    return purchaseRepo.find({ take: 10, order: { date: "DESC" } });
  }
}