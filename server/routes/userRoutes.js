// server/routes/userRoutes.js
import express from 'express';
 import { getAllUsers } from '../models/UserModel';
const router = express.Router();

// GET endpoint to fetch all users
router.get('/users', getAllUsers);

export default router;
