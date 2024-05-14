import { validationResult } from "express-validator";
import { connection } from "../config/database.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwtUtils.js";
const salt = 5;
export const createUser = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Check if the email already exists in the database
    const emailExistsQuery =
      "SELECT COUNT(*) AS count FROM login WHERE email = ?";
    const [emailExistsRows] = await connection.execute(emailExistsQuery, [
      req.body.email,
    ]);

    if (emailExistsRows[0].count > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    // If email does not exist, proceed with registration
    const hashedPassword = await bcrypt.hash(
      req.body.password.toString(),
      salt
    );
    const sql =
      "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, hashedPassword];
    await connection.execute(sql, values);
    return res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userLogin = async (req, res) => {
  console.log(req.body);
  try {
    const sql = "SELECT * FROM login WHERE email = ?";
    const values = [req.body.email];
    const [rows] = await connection.execute(sql, values);
    if (rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }
    const match = await bcrypt.compare(
      req.body.password.toString(),
      rows[0].password
    );
    if (match) {
      const token = generateToken(rows[0].id);
      return res.json({
        success: true,
        profileData: rows[0],
        message: "Login successful",
        token,
      });
    } else {
      return res.json({ success: false, error: "Invalid password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Define function to fetch all books
export const getBooks = async (req, res) => {
  try {
    const q = "SELECT * FROM books";
    const [results] = await connection.execute(q);
    return res.json(results);
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};