import express from "express";
const router = express.Router();
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validation/userValidation.js";

import {checkToken } from '../auth/token-validation.js';

import { createUser, userLogin, getBooks } from "../controllers/user.js";

router.post("/register", validateRegistration, createUser);

router.post("/login", validateLogin, userLogin);

router.get("/books", checkToken, getBooks);

export default router;
