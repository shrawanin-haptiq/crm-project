import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./pages/SiderBar";
import Dash from "./pages/Dash";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddLead from "./pages/AddLead";
import Register from "./components/Register";
import AllLeads from "./pages/AllLeads";
import Reports from "./pages/Reports";
 import EditLead from "./pages/EditLead";
import Setting from "./pages/Setting";
import ReportByDate from "./pages/ReportByDate";
import ReportByStatus from "./pages/ReportByStatus";
import ReportByServiceType from "./pages/ReportByServiceType";
const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Route with Sidebar */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole="admin">
            <SideBar />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dash />} /> {/* Default admin dashboard */}
        <Route
          path="addlead"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddLead />
            </ProtectedRoute>
          }
        />
        <Route path="allleads" element={<AllLeads />} /> {/* All Leads page */}
        <Route path="reports" element={<Reports />} /> {/* Reports page */}
        <Route path="reports/date" element={<ReportByDate />} /> {/* Report by Date page */}
        <Route path="reports/ByStatus" element={<ReportByStatus />} /> {/* Report by Date page */}
        <Route path="reports/ByServiceType/" element={<ReportByServiceType/>} /> {/* Report by Date page */}

         
        <Route path="/edit/:id" element={<EditLead />} />
        
        <Route
          path="setting"
          element={
            <ProtectedRoute requiredRole="admin">
              <Setting />
            </ProtectedRoute>
          }
        />
       </Route>
       <Route path="reports/date" element={<ReportByDate />} /> {/* Reports page */}


        
    </Routes>
  );
};

export default App;
