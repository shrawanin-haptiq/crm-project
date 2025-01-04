 import { createLead, getLeads, deleteLead ,getStats, getLeadsByUserId} from "../models/leadModel.js";

 // leadController.js
import { findUserByRole } from "../models/leadModel.js";
 import pool from "../config/db.js";
export const addLead = async (req, res) => {
  try {
    const leadData = req.body;

    // Determine the role based on the service type
    let role;
    if (leadData.serviceType === "Digital Marketing") {
      role = "Digital_Marketing_Team";
    } else if (leadData.serviceType === "Website Development") {
      role = "Website_Development_Team";
    } else {
      console.log("Invalid Service Type:", leadData.serviceType);
      return res.status(400).json({ message: "Invalid service type." });
    }
    console.log("Determined Role:", role);
    

    // Fetch a user with the specified role
    const assignedUser = await findUserByRole(role);
    if (!assignedUser) {
      return res.status(404).json({ message: `No users found for the role: ${role}` });
    }
    console.log("Role:", role); // Verify role is passed correctly
    // const assignedUser = await findUserByRole(role);
    console.log("Assigned User:", assignedUser); // Check the returned user object
    
    // Create the lead and assign it to the fetched user
    const newLead = await createLead(leadData, assignedUser.id);

    res.status(201).json({
      message: "Lead added successfully!",
      lead: newLead,
      assignedTo: assignedUser.username,
    });
  } catch (error) {
    console.error("Error adding lead:", error);
    res.status(500).json({ message: "Error adding lead" });
  }
};

 

export const removeLead = async (req, res) => {
  try {
    console.log(req.params.id)// Calls the database helper function

    const lead = await deleteLead(req.params.id); 
    console.log(req.params.id)// Calls the database helper function
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead deleted successfully", lead });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the lead.", error: error.message });
  }
};
// export const getAllLeads = async (req, res) => {
//   try {
//     const leads = await getLeads();
//     res.status(200).json(leads);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };  

// leadController.js
 
export const getAllLeads = async (req, res) => {

  try {
    // console.log("role",req.user.role)


    let leads  
    // const leads = await   getLeads(); // Get all leads from the database
    if(req.user.role === "Admin" || "Manager"){ 
    leads  = await   getLeads(); 
      
       


    }else if(req.user.role === "Digital_Marketing_Team"){
      // console.log("UserIdControle:",req);
      console.log("getAllLeads Controller: ",req.user.userId);
      
      leads = await   getLeadsByUserId(req.user.userId)
     
    }

    res.status(200).json(leads);   // Send the leads as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};


export const updateLead = async (req, res) => {
  const { id } = req.params;

  const {
    full_name,
    email,
    phone,
    company_name,
    job_title,
    lead_source,
    notes,
    follow_up_date,
    service_type,
    lead_status,
  } = req.body;

  // If only lead_status is provided, update just the status
  if (lead_status && !full_name && !email && !phone) {
    try {
      const statusQuery = `
        UPDATE leads
        SET lead_status = $1
        WHERE id = $2
        RETURNING *;
      `;
      const statusValues = [lead_status, id];
      const { rows } = await pool.query(statusQuery, statusValues);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Lead not found" });
      }

      return res.status(200).json({ message: "Lead status updated successfully", lead: rows[0] });
    } catch (error) {
      console.error("Error updating lead status:", error);
      return res.status(500).json({ message: "Error updating lead status", error: error.message });
    }
  }

  // For full updates, validate required fields
  if (!full_name || !email || !phone) {
    return res.status(400).json({ message: "Required fields missing." });
  }

  try {
    const query = `
      UPDATE leads
      SET 
        full_name = $1,
        email = $2,
        phone = $3,
        company_name = $4,
        job_title = $5,
        lead_source = $6,
        notes = $7,
        follow_up_date = $8,
        service_type = $9
      WHERE id = $10
      RETURNING *;
    `;

    const values = [
      full_name,
      email,
      phone,
      company_name,
      job_title,
      lead_source,
      notes,
      follow_up_date,
      service_type,
      id,
    ];

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead updated successfully", lead: rows[0] });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ message: "Error updating lead", error: error.message });
  }
};



export const updateLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { lead_status } = req.body;

  // Check for required fields
  if (!lead_status) {
    return res.status(400).json({ message: "Required field 'lead_status' is missing." });
  }

  try {
    const query = `
      UPDATE leads
      SET lead_status = $1
      WHERE id = $2
      RETURNING *;
    `;

    const values = [lead_status, id];

    // Execute the query to update the status
    const { rows } = await pool.query(query, values);

    // If no rows are updated, it means the lead was not found
    if (rows.length === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Return the updated lead
    res.status(200).json({ message: "Lead status updated successfully", lead: rows[0] });
  } catch (error) {
    console.error("Error updating lead status:", error);
    res.status(500).json({ message: "Error updating lead status", error: error.message });
  }
};

// export const updateLead = async (req, res) => {
//   const { id } = req.params;
//   const {
//     full_name,
//     email,
//     phone,
//     company_name,
//     job_title,
//     lead_source,
//     notes,
//     follow_up_date,
//     service_type,
//   } = req.body;

//   // Check for required fields
//   if (!full_name || !email || !phone) {
//     return res.status(400).json({ message: "Required fields missing." });
//   }

//   try {
//     const query = `
//       UPDATE leads
//       SET 
//         full_name = $1,
//         email = $2,
//         phone = $3,
//         company_name = $4,
//         job_title = $5,
//         lead_source = $6,
//         notes = $7,
//         follow_up_date = $8,
//         service_type = $9
//       WHERE id = $10
//       RETURNING *;
//     `;

//     const values = [
//       full_name,
//       email,
//       phone,
//       company_name,
//       job_title,
//       lead_source,
//       notes,
//       follow_up_date,
//       service_type,
//       id,
//     ];

//     // Execute the query to update the lead
//     const { rows } = await pool.query(query, values);

//     // If no rows are updated, it means the lead was not found
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Lead not found' });
//     }

//     // Return the updated lead
//     res.status(200).json({ message: 'Lead updated successfully', lead: rows[0] });
//   } catch (error) {
//     console.error('Error updating lead:', error);
//     res.status(500).json({ message: 'Error updating lead', error: error.message });
//   }
// };
 
// Update a lead based on ID
// export const updateLead = async (req, res) => {
//   const { id } = req.params;
//   const {
//     full_name,
//     email,
//     phone,
//     company_name,
//     job_title,
//     lead_source,
//     notes,
//     follow_up_date,
//     service_type,
//   } = req.body;

//   // Check if required fields are missing
//   if (!full_name || !email || !phone) {
//     return res.status(400).json({ message: "Required fields missing." });
//   }

//   try {
//     const query = `
//       UPDATE leads
//       SET 
//         full_name = $1,
//         email = $2,
//         phone = $3,
//         company_name = $4,
//         job_title = $5,
//         lead_source = $6,
//         notes = $7,
//         follow_up_date = $8,
//         service_type = $9
//       WHERE id = $10
//       RETURNING *;
//     `;
    
//     const values = [
//       full_name,
//       email,
//       phone,
//       company_name,
//       job_title,
//       lead_source,
//       notes,
//       follow_up_date,
//       service_type,
//       idiat: 1735810875, exp: 1735814475 }
// Error fetching leads: Cannot read properties of undefined (reading
//     ];

//     // Execute the query to update the lead
//     const { rows } = await pool.query(query, values);

//     // If no rows are returned, the lead with the provided ID was not found
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Lead not found' });
//     }

//     // Respond with the updated lead
//     res.status(200).json({ message: 'Lead updated successfully', lead: rows[0] });
//   } catch (error) {
//     console.error('Error updating lead:', error);
//     res.status(500).json({ message: 'Error updating lead', error: error.message });
//   }
// };
// export const updateLead = async (req, res) => {
//   const { id } = req.params;
//   const { lead_status } = req.body;

//   try {
//     const query = `
//       UPDATE leads
//       SET lead_status = $1
//       WHERE id = $2
//       RETURNING *;
//     `;
//     const values = [lead_status, id];
//     const { rows } = await pool.query(query, values);

//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Lead not found" });
//     }

//     res.status(200).json({ message: "Lead updated successfully", lead: rows[0] });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating lead", error: error.message });
//   }
// };
//  export const updateLead = async (req, res) => {
//   const { id } = req.params;
//   const {
//     full_name,
//     email,
//     phone,
//     company_name,
//     job_title,
//     lead_source,
//     notes,
//     follow_up_date,
//     service_type,
//   } = req.body;

//   // Check if required fields are missing
//   if (!full_name || !email || !phone) {
//     return res.status(400).json({ message: "Required fields missing." });
//   }

//   try {
//     const query = `
//       UPDATE leads
//       SET 
//         full_name = $1,
//         email = $2,
//         phone = $3,
//         company_name = $4,
//         job_title = $5,
//         lead_source = $6,
//         notes = $7,
//         follow_up_date = $8,
//         service_type = $9
//       WHERE id = $10
//       RETURNING *;
//     `;
    
//     const values = [
//       full_name,
//       email,
//       phone,
//       company_name,
//       job_title,
//       lead_source,
//       notes,
//       follow_up_date,
//       service_type,
//       id
//     ];

//     // Execute the query to update the lead
//     const { rows } = await pool.query(query, values);

//     // If no rows are returned, the lead with the provided ID was not found
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Lead not found' });
//     }

//     // Respond with the updated lead
//     res.status(200).json({ message: 'Lead updated successfully', lead: rows[0] });
//   } catch (error) {
//     console.error('Error updating lead:', error);
//     res.status(500).json({ message: 'Error updating lead', error: error.message });
//   }
// };



// const Lead = require("../models/Lead");

export const getLeadStats = async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
};