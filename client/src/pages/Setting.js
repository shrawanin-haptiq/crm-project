import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Setting = () => {
  const handleFeatureClick = (feature) => {
    console.log(`Clicked on: ${feature}`);
    // Add navigation or logic for each feature here
  };

  return (
    <div className="container mt-5">
      <h1>Settings</h1>

      {/* User Management Section */}
      <div className="mt-4">
        <h3>User Management</h3>
        <button className="" onClick={() => handleFeatureClick('viewUsers')}>
          View All Users
        </button>
        <button className=" " onClick={() => handleFeatureClick('activateDeactivateUsers')}>
          Activate/Deactivate Users
        </button>
        <button className=" " onClick={() => handleFeatureClick('assignRoles')}>
          Assign Roles
        </button>
      </div>

      {/* Account Settings Section */}
      <div className="mt-4">
        <h3>Account Settings</h3>
        <button className=" " onClick={() => handleFeatureClick('updateProfile')}>
          Update Profile
        </button>
        <button className=" " onClick={() => handleFeatureClick('changePassword')}>
          Change Password
        </button>
      </div>

      {/* Security Settings Section */}
      <div className="mt-4">
        <h3>Security Settings</h3>
        <button className=" " onClick={() => handleFeatureClick('enable2FA')}>
          Enable Two-Factor Authentication
        </button>
        <button className=" " onClick={() => handleFeatureClick('viewActivityLogs')}>
          View Activity Logs
        </button>
        <button className="" onClick={() => handleFeatureClick('manageSessions')}>
          Manage Active Sessions
        </button>
      </div>

      {/* Application Settings Section */}
      <div className="mt-4">
        <h3>Application Settings</h3>
        <button className=" " onClick={() => handleFeatureClick('themeCustomization')}>
          Change Theme
        </button>
        <button className=" " onClick={() => handleFeatureClick('notificationPreferences')}>
          Notification Preferences
        </button>
        <button className=" " onClick={() => handleFeatureClick('dataExport')}>
          Export Data
        </button>
      </div>

       

      {/* Help and Support Section */}
      
    </div>
  );
};

export default Setting;
