import express from "express";
import { buy } from "../controllers/buyController.js";

const buyRouter = express.Router();

buyRouter.post("/buy", buy);

export default buyRouter;


