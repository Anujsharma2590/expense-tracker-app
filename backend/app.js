import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import { connection } from "./config/database.js";
import userRouter from './routes/user.js'


const app = express();
app.use(cors());
app.use(express.json());
// app.use(cookieParser());
app.use(userRouter);



// Define function to add a new book
const addBook = async (req, res) => {
  const q =
    "INSERT INTO books(`title`, `description`, `cover`) VALUES (?, ?, ?)";
  const values = [req.body.title, req.body.description, req.body.cover];

  try {
    await connection.execute(q, values);
    return res.json(values);
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Define function to delete a book

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";

  try {
    await connection.execute(query, [bookId]);
    return res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update a book
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const query =
    "UPDATE books SET `title`= ?, `description`= ?, `cover`= ? WHERE id = ?";
  const values = [req.body.title, req.body.description, req.body.cover, bookId];

  try {
    await connection.execute(query, values);
    return res.json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET request for fetching all books
// app.get("/books", getBooks);

// POST request for adding a new book
app.post("/books", addBook);

// PUT request to update a book
app.put("/books/:id", updateBook);

// DELETE request to delete a book
app.delete("/books/:id", deleteBook);

// app.post("/register", async (req, res) => {
//   try {
//     // Check if the email already exists in the database
//     const emailExistsQuery =
//       "SELECT COUNT(*) AS count FROM login WHERE email = ?";
//     const [emailExistsRows] = await connection.execute(emailExistsQuery, [
//       req.body.email,
//     ]);
//     if (emailExistsRows[0].count > 0) {
//       return res.status(400).json({ success : false, message: "Email already exists" });
//     }
//     // If email does not exist, proceed with registration
//     const hashedPassword = await bcrypt.hash(
//       req.body.password.toString(),
//       salt
//     );
//     const sql =
//       "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
//     const values = [req.body.name, req.body.email, hashedPassword];
//     await connection.execute(sql, values);
//     return res.json({ success : true, message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// app.post("/login", async (req, res) => {
//   try {
//     const sql = "SELECT * FROM login WHERE email = ?";
//     const values = [req.body.email];
//     const [rows] = await connection.execute(sql, values);
//     if (rows.length === 0) {
//       return res.json({ error: "Invalid email" });
//     }
//     const match = await bcrypt.compare(
//       req.body.password.toString(),
//       rows[0].password
//     );
//     if (match) {
//       return res.json({ message: "Login successful" });
//     } else {
//       return res.json({ error: "Invalid password" });
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(8800, () => {
  console.log("Connected to backend.");
});
