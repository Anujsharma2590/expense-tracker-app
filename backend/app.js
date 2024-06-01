import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./docs/openapi.json" assert { type: "json" };

const app = express();
app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(userRouter);

app.listen(8800, () => {
  console.log("Connected to backend.");
});
