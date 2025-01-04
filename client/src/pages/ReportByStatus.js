import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../redux/actions/leadActions"; // Ensure fetchLeads is available

const ReportByStatus = () => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.leads);

  const [status, setStatus] = useState(""); // State for selected status
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered leads based on status

  useEffect(() => {
    dispatch(fetchLeads()); // Fetch all leads
  }, [dispatch]);

  useEffect(() => {
    setFilteredLeads(leads); // Set leads when data is fetched
  }, [leads]);

  // Handle status filter
  const handleStatusFilter = () => {
    if (!status) {
      alert('Please select a status.');
      return;
    }

    const filtered = leads.filter((lead) => lead.lead_status === status);
    setFilteredLeads(filtered);
  };

  if (loading) return <div className="text-center mt-5">Loading leads...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      {/* Status Dropdown */}
      <h1>Report by Status</h1>
      <div className="status-filter">
        <div className="form-group">
          <label htmlFor="status">Select Status</label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select a status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Unqualified">Unqualified</option>
          </select>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleStatusFilter}>
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.full_name}</td>
                <td>{lead.email}</td>
                <td>{lead.follow_up_date}</td>
                <td>{lead.service_type}</td>
                <td>{lead.lead_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leads found for the selected status.</p>
      )}
    </div>
  );
};

export default ReportByStatus;
