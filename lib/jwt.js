import jwt from 'jsonwebtoken';

export function signJwtToken(payload, option = {}) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, option);
  return token;
}
