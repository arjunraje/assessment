import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { ApiResponse } from "../utils/apiResponse";



export class ProductController {
    static async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id;
            
            const {name,price,stock,taxPercentage}=req.body;

            const product = await ProductService.createProduct(name,price,stock,taxPercentage)

            res.status(201).json(
                new ApiResponse(true, "Product created successfully", product)
            );
        } catch (error) {
            next(error);
        }
    }


    static async getAllProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = req.query;
            const products = await ProductService.getAllProduct(filters);
            console.log(products)

            res.status(200).json(new ApiResponse(true, "Product Fetched successfully ",products ));
        } catch (error) {
            next(error);
        }
    }

    static async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const dress = await ProductService.getSingleProduct(id);
            res.status(200).json(new ApiResponse(true, "Dress Fetch successfully", dress));
        } catch (error) {
            next(error);
        }
    }

    static async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            
            const productId = req.params.id;
            const data = req.body;
            
            const dress = await ProductService.updateProduct(productId,data)
            res.status(200).json(new ApiResponse(true, "Dress Updated successfully", dress))
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id;
            
            const product = await ProductService.deleteProduct(productId);
            res.status(200).json(new ApiResponse(true, "Dress Deleted successfully", product))
        } catch (error) {
            next(error);

        }
    }

}