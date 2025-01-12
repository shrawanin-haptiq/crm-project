// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLeads, updateLeadStatus, deleteLead, updateLeadAssignedUser } from "../redux/actions/leadActions";
// import { Link } from "react-router-dom";
// import { jwtDecode } from 'jwt-decode'; // Correct import statement

// import "./AllLeads.css";

// const AllLeads = () => {
//   const dispatch = useDispatch();
//   const { users } = useSelector((state) => state.auth); // Get users from Redux store
//   const { leads, loading, error } = useSelector((state) => state.leads);
//   const [role, setRole] = useState(null); // State to hold the role

//   useEffect(() => {
//     const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token); // Decode JWT using jwtDecode
//         setRole(decodedToken.role); // Set role based on decoded token directly
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(fetchLeads());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this lead?")) {
//       dispatch(deleteLead(id));
//     }
//   };

//   const handleStatusChange = (id, newStatus) => {
//     const currentStatus = leads.find((lead) => lead.id === id)?.lead_status;
//     if (currentStatus !== newStatus) {
//       dispatch(updateLeadStatus(id, newStatus));
//     }
//   };

//   const handleUserAssign = (id, userId) => {
//     // dispatch(updateLeadAssignedUser(id, userId)); // Action to update the assigned user
//   };

//   if (loading) return <div className="text-center mt-5">Loading leads...</div>;
//   if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

//   return (
//     <div className="container-fluid mt-5">
//       <div className="table-container">
//         {leads.length > 0 ? (
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Full Name</th>
//                 <th>Details</th>
//                 <th>Notes</th>
//                 <th>Follow-up Date</th>
//                 <th>Service</th>
//                 <th>Assigned User</th>
//                 <th>Status</th>
//                 {role !== "Digital_Marketing_Team" && <th>Actions</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead) => (
//                 <tr key={lead.id}>
//                   <td>{lead.full_name}</td>
//                   <td>
//                     <div>Email: {lead.email}</div>
//                     <div>Phone: {lead.phone}</div>
//                     <div>Company: {lead.company_name}</div>
//                     <div>Job Title: {lead.job_title}</div>
//                     <div>Source: {lead.lead_source}</div>
//                   </td>
//                   <td>{lead.notes}</td>
//                   <td>{lead.follow_up_date}</td>
//                   <td>{lead.service_type}</td>
//                   <td>
//   <select
//     value={lead?.assigned_user || ""}
//     onChange={(e) => handleUserAssign(lead.id, e.target.value)}
//   >
//     <option value="">Select User</option>
//     {users && users.length > 0 ? (
//       users.map((user) => (
//         <option key={user.id} value={user.id}>
//           {user.username || "Unnamed User"} {/* Fallback if username is missing */}
//         </option>
//       ))
//     ) : (
//       <option disabled>No users available</option> // If `users` is empty
//     )}
//   </select>
// </td>

//                                     <td>{lead.username || "Unassigned"}</td>

//                   <td>
//                     <select
//                       value={lead?.lead_status || "New"} // Fallback to "New"
//                       onChange={(e) => handleStatusChange(lead.id, e.target.value)}
//                     >
//                       <option value="New">New</option>
//                       <option value="Contacted">Contacted</option>
//                       <option value="Qualified">Qualified</option>
//                       <option value="Unqualified">Unqualified</option>
//                     </select>
//                   </td>
//                   {role !== "Digital_Marketing_Team" && (
//                     <td>
//                       <Link to={`/edit/${lead.id}`}>
//                         <button className="wrapperLeadBtn">Edit</button>
//                       </Link>
//                       <button className="wrapperLeadBtn" onClick={() => handleDelete(lead.id)}>
//                         Delete
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No leads available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllLeads;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, updateLeadStatus, deleteLead, updateLeadAssignedUser  } from "../redux/actions/leadActions";
// import { updateLeadAssignedUser } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from '../redux/actions/authActions';

import { jwtDecode } from 'jwt-decode'; // Correct import statement

import "./AllLeads.css";

const AllLeads = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth); // Get users from Redux store
  const { leads, loading, error } = useSelector((state) => state.leads);
  const [role, setRole] = useState(null); // State to hold the role
  const nav = useNavigate()
console.log(users)
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode JWT using jwtDecode
        setRole(decodedToken.role); // Set role based on decoded token directly
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteLead(id));
    
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const currentStatus = leads.find((lead) => lead.id === id)?.lead_status;
    if (currentStatus !== newStatus) {
      if (window.confirm("Are you sure you want to change the status of the lead?")) {
     dispatch(updateLeadStatus(id, newStatus));
      
      }
    }
  };

   useEffect(() => {
           
          dispatch(getUsers());
        }, [dispatch]);
    

        const handleUserAssign = (leadId, userId) => {
          console.log("Assigning Lead:", leadId, "to User:", userId);
        
          if (!leadId || !userId) {
            console.error("Lead ID or User ID is missing");
            return;
          }
          if (window.confirm("Are you sure you want to change the assigned user?")) {

          dispatch(updateLeadAssignedUser(leadId, userId)); // Action to update assigned user
           
          nav("/")
          }
          
        };
        
  if (loading) return <div className="text-center mt-5">Loading leads...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container-fluid mt-5">
      <div className="table-container">
        {leads.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Details</th>
                <th>Notes</th>
                <th>Follow-up Date</th>
                <th>Service</th>
                {role === "Admin" && (
                <th>Assigned User</th>
                )}
                 
                

                {!role == "Admin" || <th>Assign</th>}
               
                <th>Status</th>
                {role === "Admin" && (
                <th>Other</th>
                )}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.full_name}</td>
                  <td>
                    <div>Email: {lead.email}</div>
                    <div>Phone: {lead.phone}</div>
                    <div>Company: {lead.company_name}</div>
                    <div>Job Title: {lead.job_title}</div>
                    <div>Source: {lead.lead_source}</div>
                  </td>
                  <td>{lead.notes}</td>
                  <td>{lead.follow_up_date}</td>
                  <td>{lead.service_type}</td>
                  <td>{lead.username || "Unassigned"}</td>
{role === "Admin" && (
                  <td>
                  <select
  value={lead?.assigned_user || ""}
  onChange={(e) => handleUserAssign(lead.id, e.target.value)}
>
  <option value="">Select User</option>
  {users && users.length > 0 ? (
    users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.username || "Unnamed User"}
      </option>
    ))
  ) : (
    <option disabled>No users available</option>
  )}
</select>

                  </td>
                 
)}       
           <td>
                    <select
                      value={lead?.lead_status || "New"} // Fallback to "New"
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Unqualified">Unqualified</option>
                    </select>
                  </td>
                  {role == "Admin" && (
                    <td>
                      <Link to={`/edit/${lead.id}`}>
                        <button className="wrapperLeadBtn">Edit</button>
                      </Link>
                      <button className="wrapperLeadBtn" onClick={() => handleDelete(lead.id)}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leads available.</p>
        )}
      </div>
    </div>
  );
};

export default AllLeads;
