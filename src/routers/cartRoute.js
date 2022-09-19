import express from 'express';
import {cart, removeProducts} from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.get("/cart", cart);
cartRouter.delete("/cart", removeProducts);

export default cartRouter;