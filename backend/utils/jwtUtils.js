import jwt from 'jsonwebtoken';
const JSON_SECRET_KEY = 'shhhhh';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JSON_SECRET_KEY, { expiresIn: '1h' });
};

export default generateToken;
