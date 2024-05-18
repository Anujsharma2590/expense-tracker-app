import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);

app.listen(8800, () => {
  console.log("Connected to backend.");
});
