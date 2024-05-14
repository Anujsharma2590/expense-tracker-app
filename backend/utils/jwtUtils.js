import jwt from "jsonwebtoken";

const JSON_SECRET_KEY = "shhhhh";

const generateToken = (userId) => {
  return jwt.sign({ userId }, JSON_SECRET_KEY, { expiresIn: "2m" });
};

export default generateToken;
