import pool from "../config/db.js";

 


// Fetch a user based on their role
export const findUserByRole = async (role) => {
  const query = `
    SELECT id, username FROM users WHERE role = $1 LIMIT 1
  `;
  const values = [role];
  const { rows } = await pool.query(query, values);
  return rows[0]; // Return the first user that matches the role
  
};

// Create a lead and assign to a user based on role
// export const createLead = async (leadData, assignedUserId) => {
//   const query = `
//     INSERT INTO leads (full_name, email, phone, company_name, job_title, lead_source, lead_status, priority, service_type, budget, notes, follow_up_date, assigned_user_id)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
//     RETURNING id, full_name, service_type, assigned_user_id
//   `;
//   const values = [
//     leadData.fullName,
//     leadData.email,
//     leadData.phone,
//     leadData.companyName,
//     leadData.jobTitle,
//     leadData.leadSo <t > 
//     leadData.leadStatus,
//     leadData.priority,
//     leadData.serviceType,
//     leadData.budget,
//     leadData.notes,
//     leadData.followUpDate,
//     assignedUserId,
//   ]; 
//   const { rows } = await pool.query(query, values);
//   return rows[0];
// };

export const createLead = async (leadData, assignedUserId) => {
  const query = `
    INSERT INTO leads (
      full_name,
      email,
      phone,
      company_name,
      job_title,
      lead_source,
      lead_status,
      priority,
      service_type,
      budget,
      notes,
      follow_up_date,
      partnerreferralemail,
      assigned_user_id
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 , $14
    ) RETURNING *;
  `;

  const values = [
    leadData.fullName,
    leadData.email,
    leadData.phone,
    leadData.companyName || null,
    leadData.jobTitle || null,
    leadData.leadSource,
    leadData.leadStatus,
    leadData.priority,
    leadData.serviceType,
    leadData.budget || null,
    leadData.notes || null,
    leadData.followUpDate || null,
    leadData.partnerReferralEmail || null,
    assignedUserId,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

  // export const getLeads = async () => {
  //   const query = `SELECT * FROM leads`;
  //   const { rows } = await pool.query(query);
  //   return rows;
  // };
  export const getLeads = async (req , res) => {
   
    // const query = `
    //   SELECT  *
    //   FROM leads 
    //   LEFT JOIN users ON leads.assigned_user_id = users.id
    // `;
 
    const query = `
    SELECT leads.id, leads.full_name, leads.email, leads.phone, leads.company_name, 
           leads.job_title, leads.lead_source,leads.lead_status, leads.notes, leads.follow_up_date, 
           leads.service_type, leads.assigned_user_id, leads  .created_at ,users.username
    FROM leads
    LEFT JOIN users ON leads.assigned_user_id = users.id
  `;
    
    const { rows } = await pool.query(query);
   
    return rows; // Return the leads data
  };

  export const getLeadsByUserId = async (userId) => {
    try {
      console.log("UserId passed ot query:",userId);
      
      const query = `
         SELECT leads.id, leads.full_name, leads.email, leads.phone, leads.company_name, 
       leads.job_title, leads.lead_source, leads.lead_status, leads.notes, leads.follow_up_date, 
       leads.service_type, leads.assigned_user_id, leads.created_at , users.username
FROM leads
LEFT JOIN users ON leads.assigned_user_id = users.id
WHERE leads.assigned_user_id = $1;
      `;
      const { rows } = await pool.query(query, [userId]);
      console.log("==",rows)  
      return rows; // Return the leads data
    } catch (error) {
      console.error("Error fetching leads:", error);
      throw new Error("Failed to fetch leads");
    }
  };


 // database.js or model.js
 
// Function to fetch all leads from the database
// export const getLeads = async (userId) => {
//   try {
//     const query = `SELECT * FROM leads WHERE assigned_user_id = $1`; // Ensure the query syntax is correct
//     const { rows } = await pool.query(query, [userId]);
//     return rows;
//   } catch (error) {
//     console.error('Error executing database query:', error);
//     throw new Error('Failed to execute query');
//   }
// };

 
 export const deleteLead = async (id) => {
  const query = "DELETE FROM leads WHERE id = $1 RETURNING *";
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};





export const getStats = async () => {
  const totalLeads = await pool.query("SELECT COUNT(*) AS count FROM leads");
  const newLeads = await pool.query("SELECT COUNT(*) AS count FROM leads WHERE lead_status = 'New'");
  const contactedLeads = await pool.query("SELECT COUNT(*) AS count FROM leads WHERE lead_status = 'Contacted'");
  const unqualifiedLeads = await pool.query("SELECT COUNT(*) AS count FROM leads WHERE lead_status = 'Unqualified'");

  return {
    totalLeads: parseInt(totalLeads.rows[0].count, 10),
    newLeads: parseInt(newLeads.rows[0].count, 10),
    contactedLeads: parseInt(contactedLeads.rows[0].count, 10),
    unqualifiedLeads: parseInt(unqualifiedLeads.rows[0].count, 10),
  };
};