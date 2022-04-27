import express from "express";
import { AddProducts, GetAllProducts } from "../controler/ProductConroller.js";

const productRouter = express.Router();

productRouter.get('/', GetAllProducts)


productRouter.post('/', AddProducts)

export default productRouter