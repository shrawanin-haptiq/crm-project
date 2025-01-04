import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLead } from "../redux/actions/leadActions";
import './AddLead.css'; // Ensure you have styles if needed

const AddLead = () => {
  const dispatch = useDispatch();

  const [leadData, setLeadData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    leadSource: "",
    leadStatus: "New",
    priority: "Medium",
    serviceType: "",
    budget: "",
    notes: "",
    followUpDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLead(leadData));
    alert("Lead added successfully!");
    setLeadData({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      jobTitle: "",
      leadSource: "",
      leadStatus: "New",
      priority: "Medium",
      serviceType: "",
      budget: "",
      notes: "",
      followUpDate: "",
    });
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row mb-4">
        {/* <div className="col">
          <h1 className="text-center text-primary">Add Customer Lead</h1>
        </div> */}
      </div>
      <div className='container-fluid formContainer mt-5'>
      <form className='col-md-10' onSubmit={handleSubmit}>
        <div className="row contactUsFormInput">
          <div className="col-md-6">
            <input
              type="text"
              name="fullName"
              value={leadData.fullName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter full name"
            />
          </div>
          <div className="col-md-6">
            
            <input
              type="email"
              name="email"
              value={leadData.email}
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
              value={leadData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>
          <div className="col-md-6">
            
            <input
              type="text"
              name="companyName"
              value={leadData.companyName}
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
              name="jobTitle"
              value={leadData.jobTitle}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter job title"
            />
          </div>
          <div className="col-md-6">
          
            <select
              name="leadSource"
              value={leadData.leadSource}
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
           
            <select
              name="leadStatus"
              value={leadData.leadStatus}
              onChange={handleChange}
              className="form-select"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Unqualified">Unqualified</option>
            </select>
          </div>
          <div className="col-md-6">
            
            <select
              name="priority"
              value={leadData.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
             <select
              name="serviceType"
              value={leadData.serviceType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select service type</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Website Development">Website Development</option>
            </select>
          </div>
          <div className="col-md-6">
             
            <input
              type="number"
              name="budget"
              value={leadData.budget}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter budget"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
           
            <input
              type="date"
              name="followUpDate"
              value={leadData.followUpDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            
            <textarea
              name="notes"
              value={leadData.notes}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Enter additional notes"
            ></textarea>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Add Lead
          </button>
        </div>
      </form>
    </div>

    </div>
  );

};

export default AddLead;
