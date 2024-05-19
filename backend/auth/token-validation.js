import jwt from 'jsonwebtoken';
const JSON_SECRET_KEY = 'shhhhh';

export const checkToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, JSON_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Forbidden: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
