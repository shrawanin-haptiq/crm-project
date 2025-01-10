 // server/models/UserModel.js
import pool from "../config/db.js";

export const createUser = async (username,email, password, role)=>{
  const query = `
    INSERT INTO users (username,email, password, role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, username,email, password, role
  `;
  const values = [username,email, password, role]
  console.log(values)
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = $1`;
  const values = [username];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
 
 

export const getAllUsers= async (req , res) => {
   
  const query = `
    SELECT  *
    FROM  users
     
  `;

 
  
  const { rows } = await pool.query(query);
 
  return rows; // Return the leads data
 
};
