 // server/utils/jwt.js
 
const secretKey = process.env.JWT_SECRET;

 
// export const generateToken = (payload) => {
//   const secretKey = process.env.JWT_SECRET; // Retrieve secret key from environment variables

//   if (!secretKey) {
//     throw new Error('JWT secret key is missing in environment variables');
//   }

//   return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set token expiration (optional)
// };
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  console.log("generateToken:",user.id);
  
  return jwt.sign(
    { userId: user.id, username: user.username, role: user.role },  // Ensure `userId` is included
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};


export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // Use correct secret to verify token
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new Error('Invalid token');
  }
};
export const getTokenFromHeader = (req) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract the token
  if (!token) {
    throw new Error('No token provided');
  }
  return token;
};
