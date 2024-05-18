import express from "express";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validation/userValidation.js";
import { checkToken } from "../auth/token-validation.js";
import {
  createUser,
  userLogin,
  addExpense,
  addIncome,
  getTransactions,
  deleteTransaction,
  editTransaction,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", validateRegistration, createUser);

router.post("/login", validateLogin, userLogin);

router.post("/expense", checkToken, addExpense);

router.post("/income", checkToken, addIncome);

router.get("/transactions", checkToken, getTransactions);

router.delete("/transaction/:id", checkToken, deleteTransaction);

router.put("/transaction/:id", checkToken, editTransaction);

export default router;
