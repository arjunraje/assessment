import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product.entity";


const productRepo=AppDataSource.getRepository(Product)
export class ProductService{
    static async createProduct(name:string,price:number,stock:number,taxPercentage:number){
        const newProduct=productRepo.create({name,price,stock,taxPercentage})
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
}