import express from "express";
import { buy, getBuys, removeCart } from "../controllers/buyController.js";

const buyRouter = express.Router();

buyRouter.post("/buy", buy);
buyRouter.get("/buy", getBuys);
buyRouter.delete("/buy", removeCart);

export default buyRouter;


