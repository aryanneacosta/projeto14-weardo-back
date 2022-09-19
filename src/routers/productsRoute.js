import express from "express";
import { products, addToCart } from "../controllers/productsController.js";

const productsrouter = express.Router();

productsrouter.get('/products', products);
productsrouter.post('/products', addToCart);

export default productsrouter;