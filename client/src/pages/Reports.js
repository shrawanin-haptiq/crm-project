import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Reports.css"
import { Link } from 'react-router-dom';
const Reports = () => {
  return (
    <div className="container-fluid">
      <h1 className="mb-4">Reports</h1>
      <div className="reportWrraperBtn">
        <Link to="/reports/date">
        <button 
          className="mb-3" 
          onClick={() => handleReport('date')}
        >
          See Report by Date
        </button>
        </Link>
        <Link to="/reports/ByStatus">
        <button 
          className="mb-3" 
          onClick={() => handleReport('status')}
        >
          See Report by Status
        </button>
        </Link>
        <Link to="/reports/ByServiceType">
        <button 
          className="mb-3" 
          onClick={() => handleReport('serviceType')}
        >
          See Report by Service Type
        </button>
        </Link>
<Link to="/reports/TodaysLeads/"> 
        <button 
          className="mb-3" 
          onClick={() => handleReport('todaysLeads')}
        >
          See Today's Leads
        </button>
        </Link>
        {/* <Link to="/reports/date">
        <button 
          className="mb-3" 
          onClick={() => handleReport('date')}
        >
          See Report by Date
        </button>
        </Link> */}
      </div>
       
    </div>
  );
};

// Function to handle the report click event (you can add your custom logic here)
const handleReport = (reportType) => {
  console.log(`Generating ${reportType} report...`);
};

export default Reports;
