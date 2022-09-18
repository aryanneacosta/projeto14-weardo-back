import express from "express";
import { products } from "../controllers/productsController.js";

const productsrouter = express.Router();

productsrouter.get('/products', products);

export default productsrouter;