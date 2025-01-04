import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authActions";
import "./Register.css"; // Include CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    dispatch(register(formData));
    navigate("/login"); // Redirect to login after successful registration
  };

  return (
    <div className="wrapper">
      <div className="loginLeft">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
          {/* Username Input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="TeamMember">TeamMember</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Digital_Marketing_Team">Digital_Marketing_Team</option>
              <option value="Website_Development_Team">Website_Development_Team</option>

            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>

      <div className="loginRightSide">
        {/* Add any other content if needed */}
      </div>
    </div>
  );
};

export default Register;
