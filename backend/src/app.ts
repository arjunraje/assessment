import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }))

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

app.use(errorHandler);



export default app;
