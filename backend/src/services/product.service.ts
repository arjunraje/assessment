import { object } from "joi";
import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product.entity";
import { assert } from "console";


const productRepo=AppDataSource.getRepository(Product)
export class ProductService{
    static async createProduct(name:string,sku:string,price:number,currentStock:number,taxPercentage:number){
        const newProduct=productRepo.create({name,sku,price,currentStock,taxPercentage})
        return await productRepo.save(newProduct);
    }

    static async getAllProduct(filters:any){
        const {page=1,limit=10}=filters;
        const query = productRepo.createQueryBuilder('product')

        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;

        query.skip(skip).take(take);

        const [data, total] = await query.getManyAndCount();

        return {
            data,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / take),
        };
    }

    static async getSingleProduct(id:string){
        const product=productRepo.findOne({where:{id}})
        return product
    }

    static async updateProduct(id:string,data:Partial<Product>){
        const product=await productRepo.findOne({where:{id}})

        Object.assign(product,data)

        return await productRepo.save(product)
    }

    static async deleteProduct(id:string){
        const product=await productRepo.findOne({where:{id}});

        await productRepo.remove(product);
    }


    static async adjustStock(id: string, amount: number) {
        const product = await productRepo.findOneBy({ id });
        if (!product) throw new Error("Product not found");

        const newStock = product.currentStock + amount;
        if (newStock < 0) throw new Error("Insufficient stock");

        product.currentStock = newStock;
        return productRepo.save(product);
  }
}