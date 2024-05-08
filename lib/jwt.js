import jwt from 'jsonwebtoken';

export function signJwtToken(payload, option = {}) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, option);
  return token;
}

export function verifyJWTtoken(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
