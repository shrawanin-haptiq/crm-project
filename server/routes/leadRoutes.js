import express from "express";
import { addLead, getAllLeads, removeLead, updateLead , getLeadStats, updateLeadStatus } from "../controllers/leadController.js";
import {authorize }from '../middlewares/authMiddleware.js'
const router = express.Router();

// Add Lead Route
router.post("/", addLead);  // Only admin and team_lead can add leads

// Get Leads Route
// router.get("/", authorize,  getAllLeads);
router.get("/", authorize(['Admin', 'Digital_Marketing_Team' , 'Manager']), getAllLeads);


// Remove Lead Route
router.delete("/:id", removeLead);

// Update Lead Route
router.put('/:id', updateLead);
router.put('/:id', updateLeadStatus);
 

router.get("/stats", getLeadStats);

 export default router;
