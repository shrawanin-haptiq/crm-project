import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { generateToken } from "../utils/jwt.js";

 import { findUserByUsername, createUser  , getAllUsers  } from "../models/UserModel.js";
 
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(username, email, hashedPassword, role || "TeamMember");
  res.status(201).json({ message: "User registered successfully!", user });
};
// export const registerUser = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;

//     // Check if the username or email already exists
//     const existingUser = await findUserByUsername(username);
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists!" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate a unique ID for the user
//     const userId = uuidv4();

//     // Create a new user
//     const user = await createUser(userId, username, email, hashedPassword, role || "TeamMember");

//     // Return a success response
//     res.status(201).json({ message: "User registered successfully!", user });
//   } catch (error) {
//     console.error("Error during user registration:", error.message);
//     res.status(500).json({ message: "Registration failed", error: error.message });
//   }
// };
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });  // Respond once here
  }
  console.log("Authcontroller:",user);

 // Generate a token that includes the user's role
 const token = generateToken(
  user // Ensure role is included
);
  console.log(token)
  return res.status(200).json({ token });  // Send success response
};

 
 

export const getUser = async (req, res) => {
  try {
    const stats = await getAllUsers();
    res.json(stats);
    console.log(stats)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

 