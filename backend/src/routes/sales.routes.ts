import { Router } from "express";

import { SalesController } from "../controllers/sales.controller";

const routes = Router()



routes.post('/createSale',SalesController.createSale)
// routes.get('/recetPurchase',PurchaseService.recent)

export default routes