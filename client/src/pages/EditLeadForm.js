import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateLead } from "../redux/actions/leadActions"; // Action to update the lead

const EditLeadForm = ({ lead, closeForm }) => {
  const dispatch = useDispatch();

  // Set form data to be editable
  const [formData, setFormData] = useState({
    full_name: lead.full_name,
    email: lead.email,
    phone: lead.phone,
    company_name: lead.company_name,
    job_title: lead.job_title,
    lead_source: lead.lead_source,
    notes: lead.notes,
    follow_up_date: lead.follow_up_date,
    service_type: lead.service_type,
  });

  // Reset form data if lead changes
  useEffect(() => {
    setFormData({
      full_name: lead.full_name,
      email: lead.email,
      phone: lead.phone,
      company_name: lead.company_name,
      job_title: lead.job_title,
      lead_source: lead.lead_source,
      notes: lead.notes,
      follow_up_date: lead.follow_up_date ? new Date(lead.follow_up_date).toISOString().split('T')[0] : '',
      service_type: lead.service_type,
    });
  }, [lead]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update lead
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLead({ ...formData, id: lead.id }));
    closeForm(); // Close the form after submission
  };

  return (
    <div className="edit-lead-form">
      <h3>Edit Lead</h3>
      <form onSubmit={handleSubmit}>
        <label>Full Name:
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
        </label>
        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>Company Name:
          <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
        </label>
        <label>Job Title:
          <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} />
        </label>
        <label>Lead Source:
          <input type="text" name="lead_source" value={formData.lead_source} onChange={handleChange} />
        </label>
        <label>Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
        </label>
        <label>Follow-up Date:
          <input type="date" name="follow_up_date" value={formData.follow_up_date} onChange={handleChange} />
        </label>
        <label>Service Type:
          <input type="text" name="service_type" value={formData.service_type} onChange={handleChange} />
        </label>
        <div className="form-actions">
          <button type="submit">Update Lead</button>
          <button type="button" onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditLeadForm;
