import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { checkDbConnection } from "./config/db.js";
 import leadRoutes from "./routes/leadRoutes.js "
 
   import cors from "cors"
 

checkDbConnection();

 
const app = express();
 ;
//  app.use(authorize);
app.use(express.json());
app.use(cors());
dotenv.config()
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/leads/:id", leadRoutes);
app.use("/api/leads/:id/status", leadRoutes);

app.use("api/leads" , leadRoutes)
 
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
