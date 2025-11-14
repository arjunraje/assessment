import { Router } from "express";

import { validateBody } from "../middlewares/body.validator.middleware";
import { userRegisterSchema } from "../validations/auth.validation";
import { ProductController } from "../controllers/product.controller";
import { PurchaseService } from "../services/purchase.service";
import { PurchaseController } from "../controllers/purchase.controller";

const routes = Router()



routes.post('/createPurchase',PurchaseController.createPurchase)
routes.get('/recetPurchase',PurchaseService.recent)

export default routes