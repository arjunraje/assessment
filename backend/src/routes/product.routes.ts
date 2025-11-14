import { Router } from "express";

import { validateBody } from "../middlewares/body.validator.middleware";
import { userRegisterSchema } from "../validations/auth.validation";
import { ProductController } from "../controllers/product.controller";

const routes = Router()

// routes.post("/register", validateBody(userRegisterSchema), registerUser);
// routes.post("/login", loginUser);

routes.post('/createProduct',ProductController.createProduct)
routes.get('/getAllProduct',ProductController.getAllProduct)
routes.get('/getSingleProduct/:id',ProductController.getProductById)
routes.patch('/updateProduct/:id',ProductController.updateProduct)
routes.delete('/deleteProduct/:id',ProductController.deleteProduct)


export default routes;