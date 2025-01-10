 import * as XLSX from 'xlsx';
 import React, { useEffect } from 'react';
import "./Setting.css"
import { useSelector , useDispatch} from 'react-redux';
import { jsPDF } from "jspdf";
import { fetchLeads } from '../redux/actions/leadActions';  // Assuming fetchLeads action is correctly set up

import "jspdf-autotable"; // Import autoTable plugin for PDF export
import { Link } from 'react-router-dom';
 
 const Setting = () => {
    // Fetch leads from Redux state
    const dispatch = useDispatch();
    const { leads, loading, error } = useSelector((state) => state.leads); // Assuming your leads data is stored in 'leads'
  
    useEffect(() => {
      dispatch(fetchLeads()); // Fetch leads when the component mounts
    }, [dispatch]);
  
  // Handle Excel Export
  const handleExcelExport = () => {
    if (Array.isArray(leads)) {
      const ws = XLSX.utils.json_to_sheet(leads); // Convert to sheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Leads");
      XLSX.writeFile(wb, "leads.xlsx"); // Save as Excel file
    } else {
      console.error("Leads data is not in the correct format.");
    }
  };
 
  const handlePdfExport = () => {
    // Ensure that leads data is loaded and in the correct format
    if (leads && Array.isArray(leads) && leads.length > 0) {
      const doc = new jsPDF();
      doc.text('Leads Data', 20, 20);

      // Generate table rows for PDF
      const tableData = leads.map(lead => [
        lead.full_name,
        lead.email,
        lead.phone,
        lead.company_name,
        lead.lead_source,
        lead.lead_status,
      ]);

      // Generate table in PDF
      doc.autoTable({
        head: [['Full Name', 'Email', 'Phone', 'Company', 'Lead Source', 'Status']],
        body: tableData,
        startY: 30,  // Ensure the table starts below the title
      });

      // Save the generated PDF file
      doc.save('leads.pdf');
    } else {
      console.error('Leads data is either empty or not in the correct format');
    }
  };

  if (loading) return <div>Loading leads...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFeatureClick = (feature) => {
    console.log(`Clicked on: ${feature}`);
  };

  return (
    <div className="container mt-5">
       <div className="">   </div>
      <h1>Settings</h1>
   

      {/* User Management Section */}
      <div className="mt-4">
        <h3>User Management</h3>
        
        <Link to="/setting/users"> 
        <button className="set">
          View All Users
        </button>
        </Link>
         
        <button className="set" onClick={() => handleFeatureClick('assignRoles')}>
          Assign Roles
        </button>
      </div>

      {/* Account Settings Section */}
      <div className="mt-4">
        <h3>Account Settings</h3>
        <button className="set" onClick={() => handleFeatureClick('updateProfile')}>
          Update Profile
        </button>
        <button className="set" onClick={() => handleFeatureClick('changePassword')}>
          Change Password
        </button>
      </div>

     
     

      {/* Application Settings Section */}
      <div className="mt-4">
        <h3>Application Settings</h3>
        
        <button className='set' onClick={handleExcelExport}>Export Data to Excel</button>
        <button className="set"onClick={handlePdfExport}>Export Data to PDF</button>
      </div>

       

      {/* Help and Support Section */}
      
    </div>
  );
};

export default Setting;
