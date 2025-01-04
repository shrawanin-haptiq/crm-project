 
import jwt from 'jsonwebtoken';

 


// export const authorize = (allowedRoles = []) => {
//   return (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header

//     if (!token) {
//       return res.status(401).json({ success: false, message: 'No token provided' });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//       req.user = decoded;
//       console.log(decoded)
//       // If specific roles are provided, check if the user's role is allowed
//       if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
//         return res.status(403).json({
//           success: false,
//           message: 'Access denied: You do not have permission to access this resource.',
//         });
//       }      console.log('Decoded token:', req.user); // Debug the decoded token

//         // Attach the decoded user data to req.user

//       next(); // Proceed to next middleware or route handler
//     } catch (error) {
//       return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }
//   };
// }; 
export const authorize = (allowedRoles = []) => (req, res, next) => {
  // console.log('Request headers:', req.headers);  // Log the entire headers object

  const authHeader = req.headers.authorization; // Get the Authorization header
  // console.log("Authorization header:", authHeader); // Log the Authorization header

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No Authorization header provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    console.log("Decoded token:", decoded); // Log the decoded token
    req.user = decoded; // Attach decoded token to request

    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: You do not have permission to access this resource.",
      });
    }

    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message); // Log token verification errors
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
