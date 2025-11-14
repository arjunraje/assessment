import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";

import productRoutes from "./routes/product.routes";
import purchaseRoutes from "./routes/purchase.routes";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }))

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});

app.use("/product", productRoutes);
app.use("/purchase",purchaseRoutes)

app.use(errorHandler);



export default app;
