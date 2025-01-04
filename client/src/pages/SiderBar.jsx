import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './SideBar.css';
import { FaHome, FaUsers, FaChartBar, FaCogs, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode'; // Correct import statement

const SideBar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // State to hold the role

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode JWT using jwtDecode
        setRole(decodedToken.role); // Set role based on decoded token directly
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    console.log("Navigating to login...");
    navigate("/login"); // Ensure this redirects
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="sidebar bg-white">
        <h1 className="d-md-block d-none">optiLead</h1>
        <ul className="nav flex-column px-3">
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="/">
              <FaHome className="me-2" />
              <span className="d-none d-md-inline">Dashboard</span>
            </Link>
          </li>

          {/* Always visible: Customers (accessible to admin and others) */}
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="/customers">
              <FaUsers className="me-2" />
              <span className="d-none d-md-inline">Customers</span>
            </Link>
          </li>

          {/* Only show these routes if the role is admin */}
          {/* {role === "Digital_Marketing_Team" || (
            <>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="addlead">
                  <FaChartBar className="me-2" />
                  <span className="d-none d-md-inline">Add Lead</span>
                </Link>
              </li>
              
            </>
          )} */}
           {role === "Admin" && (
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="addlead">
                <FaChartBar className="me-2" />
                <span className="d-none d-md-inline">Add Lead</span>
              </Link>
            </li>
          )}

 <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="allleads">
                  <FaCogs className="me-2" />
                  <span className="d-none d-md-inline">Leads</span>
                </Link>
              </li>
          {/* Reports (visible to all) */}
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="reports">
              <FaChartBar className="me-2" />
              <span className="d-none d-md-inline">Reports</span>
            </Link>
          </li>
          <li className="nav-item" >
            <Link className="nav-link d-flex align-items-center" to="setting">
              <FaSignOutAlt className="me-2" />
              <span className="d-none d-md-inline">Setting</span>
            </Link>
          </li>

          {/* Logout Link */}
          <li className="nav-item" onClick={handleLogout}>
            <Link className="nav-link d-flex align-items-center" to="/logout">
              <FaSignOutAlt className="me-2" />
              <span className="d-none d-md-inline">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid navBar">
            <Link className="navbar-brand" to="/">CRM Dashboard</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reports">Reports</Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-3">
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="userMenu" role="button" data-bs-toggle="dropdown">
                    <FaUserCircle /> User
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                    <li><Link className="dropdown-item" to="#">Profile</Link></li>
                    <li><Link className="dropdown-item" to="#">Settings</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="#">Logout</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="content pt-4">
          {/* Outlet to render the child routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
