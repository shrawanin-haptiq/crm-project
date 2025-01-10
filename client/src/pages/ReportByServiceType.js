import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../redux/actions/leadActions"; // Ensure fetchLeads is available

const ReportByServiceType = () => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.leads);

  const [serviceType, setServiceType] = useState(""); // State for selected service type
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered leads based on service type

  useEffect(() => {
    dispatch(fetchLeads()); // Fetch all leads
  }, [dispatch]);

  useEffect(() => {
    setFilteredLeads(leads); // Set leads when data is fetched
  }, [leads]);

  // Handle service type filter
  const handleServiceTypeFilter = () => {
    if (!serviceType) {
      alert('Please select a service type.');
      return;
    }

    const filtered = leads.filter((lead) => lead.service_type === serviceType);
    setFilteredLeads(filtered);
  };

  if (loading) return <div className="text-center mt-5">Loading leads...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      {/* Service Type Dropdown */}
      <h1>Report by Service Type</h1>
      <div className="service-type-filter">
        <div className="form-group">
          <label htmlFor="serviceType">Select Service Type</label>
          <select
            id="serviceType"
            className="form-control"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="">Select a service type</option>
            <option value="Website Development">Web Development</option>
            <option value="SEO">SEO</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Consulting">Consulting</option>
            {/* Add other service types here */}
          </select>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleServiceTypeFilter}>
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
        <p>No leads found for the selected service type.</p>
      )}
    </div>
  );
};

export default ReportByServiceType;
