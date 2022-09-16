import express from "express";
import { singIn } from "../controllers/singinController.js";
import { singUp } from "../controllers/singupController.js";
import { singUpValidation } from "../middlewares/singupValidationMiddleware.js";

const singrouter = express.Router();

singrouter.post(`/singin`, singIn);
singrouter.post(`/singup`, singUpValidation, singUp);

export default singrouter;
