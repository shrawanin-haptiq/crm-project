import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../redux/actions/leadActions";

const TodaysLeads = () => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.leads);

  const [todaysLeads, setTodaysLeads] = useState([]);

  useEffect(() => {
    dispatch(fetchLeads()); // Fetch all leads
  }, [dispatch]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date (midnight)
    const todayStr = today.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    console.log("Today:", todayStr);

    const filtered = leads.filter((lead) => {
      // Check if created_at exists and log it
      if (!lead.created_at) {
        console.warn("Missing created_at for lead:", lead);
        return false; // Skip leads without created_at
      }

      // Sanitize the created_at string to remove fractional seconds
      const sanitizedDate = lead.created_at.split(".")[0]; // Remove fractional seconds
      console.log("Sanitized created_at:", sanitizedDate);

      // Try to parse the date
      const leadDate = new Date(sanitizedDate);
      if (isNaN(leadDate.getTime())) {
        console.warn("Invalid created_at date format for lead:", lead);
        return false; // Skip leads with invalid created_at format
      }

      leadDate.setHours(0, 0, 0, 0); // Normalize the lead date to midnight
      const leadDateStr = leadDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
      console.log("Lead Date String:", leadDateStr);

      return leadDateStr === todayStr; // Compare the dates
    });

    setTodaysLeads(filtered);
  }, [leads]);

  const formatDate = (dateString) => {
    const sanitizedDate = dateString.split(".")[0]; // Remove fractional seconds
    const date = new Date(sanitizedDate);
    return date.toISOString().split("T")[0]; // Converts to YYYY-MM-DD format
  };

  if (loading) return <div className="text-center mt-5">Loading leads...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Today's Created Leads</h1>
      {todaysLeads.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Details</th>
              <th>Created At</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todaysLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.full_name}</td>
                <td>
                  <div>Email: {lead.email}</div>
                  <div>Phone: {lead.phone}</div>
                </td>
                <td>{formatDate(lead.created_at)}</td>
                <td>{lead.service_type}</td>
                <td>{lead.lead_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leads created today.</p>
      )}
    </div>
  );
};

export default TodaysLeads;
