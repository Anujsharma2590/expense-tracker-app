import { body } from "express-validator";

// Common validation rules and custom error messages
const commonRules = {
  email: body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  password: body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),
};

// Validation middleware for user registration
export const validateRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .escape()
    .matches(/^[A-Za-z]+$/)
    .withMessage("Name must contain only alphabetic characters"),
  commonRules.email,
  commonRules.password
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value) => {
      if (/\s/.test(value)) {
        throw new Error("Password cannot contain whitespace characters");
      }
      return true;
    }),
];

// Validation middleware for login route
export const validateLogin = [commonRules.email, commonRules.password];
