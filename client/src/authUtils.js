import {jwtDecode} from "jwt-decode";

export const getRoleFromToken = () => {
  const token = localStorage.getItem("authToken");
  
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; // Ensure 'role' exists in the token payload
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
