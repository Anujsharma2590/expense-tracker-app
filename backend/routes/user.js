import express from "express";
const router = express.Router();
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validation/userValidation.js";

import {checkToken } from '../auth/token-validation.js';

import {
  createUser,
  userLogin,
  addExpense,
  addIncome,
  getTransactions,
} from "../controllers/user.js";

router.post("/register", validateRegistration, createUser);

router.post("/login", validateLogin, userLogin);


router.post("/expense", checkToken, addExpense);

router.post("/income", checkToken, addIncome);

router.get("/transactions", checkToken, getTransactions);

export default router;
