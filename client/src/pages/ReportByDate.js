import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../redux/actions/leadActions"; // Ensure fetchLeads is available

const ReportByDate = () => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.leads);
  
  const [startDate, setStartDate] = useState(""); // Start date for filtering
  const [endDate, setEndDate] = useState(""); // End date for filtering
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered leads based on dates

  useEffect(() => {
    dispatch(fetchLeads()); // Fetch all leads
  }, [dispatch]);

  useEffect(() => {
    setFilteredLeads(leads); // Set leads when data is fetched
  }, [leads]);

  // Handle date filtering
  const handleDateFilter = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const filtered = leads.filter((lead) => {
      const followUpDate = new Date(lead.follow_up_date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return followUpDate >= start && followUpDate <= end;
    });

    setFilteredLeads(filtered);
  };

  if (loading) return <div className="text-center mt-5">Loading leads...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      {/* Date Range Inputs */}
      <h1>Report by Date</h1>
      <div className="date-filter">
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleDateFilter}>
          Submit
        </button>
      </div>

      {/* Display the filtered leads */}
      {filteredLeads.length > 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Details</th>
              <th>Follow-up Date</th>
              <th>Service</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.full_name}</td>
                <td>{lead.email}</td>
                <td>{lead.follow_up_date}</td>
                <td>{lead.service_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leads found for the selected date range.</p>
      )}
    </div>
  );
};

export default ReportByDate;
