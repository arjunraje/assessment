import { PurchaseService } from "../services/purchase.service";
import { ApiResponse } from "../utils/apiResponse";
import { NextFunction, Request, Response } from "express";


export class PurchaseController {
    static async createPurchase(req: Request, res: Response, next: NextFunction) {
        try {
            
            
            const data=req.body;

            const product = await PurchaseService.create(data)

            res.status(201).json(
                new ApiResponse(true, "Purchase created successfully", product)
            );
        } catch (error) {
            next(error);
        }
    }

}