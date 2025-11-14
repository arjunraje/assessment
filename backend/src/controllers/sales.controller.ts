import { SalesService } from "../services/sales.service";
import { ApiResponse } from "../utils/apiResponse";
import { NextFunction, Request, Response } from "express";


export class SalesController {
    static async createSale(req: Request, res: Response, next: NextFunction) {
        try {
            
            
            const data=req.body;

            const product = await SalesService.createSale(data)

            res.status(201).json(
                new ApiResponse(true, "Purchase created successfully", product)
            );
        } catch (error) {
            next(error);
        }
    }

}