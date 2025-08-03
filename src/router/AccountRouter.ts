import { loginController, registerController } from "../controller/AccountController";
import express from "express";

const router = express.Router();

router.post("/login", loginController)
router.post("/register", registerController)


export default router