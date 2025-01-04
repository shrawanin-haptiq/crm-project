// middleware/authorization.js
export const verifyAdminOrTeamLead = (req, res, next) => {
    const userRole = req.user.role;  // Assume user role is added by JWT auth middleware
  
    if (userRole === "admin" || userRole === "team_lead") {
      return next();
    }
    return res.status(403).json({ message: "Permission denied" });
  };
  