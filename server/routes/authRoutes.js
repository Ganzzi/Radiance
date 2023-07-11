import express from "express";
import {
  logIn,
  signUp,
  checkPhone,
  verifyCode,
} from "../controllers/authController.js";

const router = express.Router();

/* CREATE */
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/checkphone", checkPhone);
router.post("/verifycode", verifyCode);

export default router;
