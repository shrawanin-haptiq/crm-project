import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLead, fetchLeads } from "../redux/actions/leadActions";
import { useParams, useNavigate } from "react-router-dom";
// import './EditLead.css'; // Ensure you have styles if needed

const EditLead = () => {
  const { id } = useParams(); // Get lead ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const leads = useSelector((state) => state.leads.leads); // Leads from Redux
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    job_title: "",
    lead_source: "",
    notes: "",
    follow_up_date: "",
    service_type: "",
    username: "",
  });
  const [error, setError] = useState(null);

  // Fetch leads and pre-populate the form
  useEffect(() => {
    if (!leads.length) {
      dispatch(fetchLeads());
    } else {
      const lead = leads.find((lead) => String(lead.id) === String(id));
      if (lead) {
        setFormData({
          full_name: lead.full_name || "",
          email: lead.email || "",
          phone: lead.phone || "",
          company_name: lead.company_name || "",
          job_title: lead.job_title || "",
          lead_source: lead.lead_source || "",
          notes: lead.notes || "",
          // lead_status: lead.lead_status,
          // Extract the date in "yyyy-MM-dd" format
          follow_up_date: lead.follow_up_date ? lead.follow_up_date.split('T')[0] : "",
          service_type: lead.service_type || "",
          username: lead.username || "",
        });
      } else {
        setError("Lead not found.");
      }
    }
  }, [id, leads, dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the date to "yyyy-MM-dd" before submitting
    const formattedDate = new Date(formData.follow_up_date).toISOString().split('T')[0];

    const updatedLead = { ...formData, follow_up_date: formattedDate };

    console.log("Submitting lead update with:", updatedLead);
    if (window.confirm("Are you sure you want to edit this lead?")) {

    dispatch(updateLead({ id, ...updatedLead }));
    navigate("/");
    }
  };

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row mb-4">
        <h1 className="text-center text-primary">Edit Lead</h1>
      </div>
      <div className="container-fluid formContainer mt-5">
        <form className="col-md-10" onSubmit={handleSubmit}>
          <div className="row contactUsFormInput">
            <div className="col-md-6">
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter full name"
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter phone number"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter job title"
              />
            </div>
            <div className="col-md-6">
              <select
                name="lead_source"
                value={formData.lead_source}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Call">Call</option>
                <option value="Email">Email</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter service type"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Assigned User"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="date"
                name="follow_up_date"
                value={formData.follow_up_date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Enter additional notes"
              ></textarea>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg">
              Update Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLead;
