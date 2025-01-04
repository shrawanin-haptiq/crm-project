import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import{ getRoleFromToken} from '../authUtils';
// import "../pages/SiderBar.css"
import "../components/Register.css"
 const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
const navigate= useNavigate()
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Dispatch login action
        await dispatch(login(credentials));
  
        // Extract role from the token
        const role = getRoleFromToken();
  console.log(role)
        // Navigate based on the role
        if (role === 'admin') {
          navigate('/abc'); // Admin dashboard or sidebar page
        } else {
          navigate('/'); // User dashboard
        }
      } catch (error) {
        console.error('Login failed:', error.message);
        alert('Login failed. Please check your credentials.');
      }
    };
  
    return (
        <div className="wrapper">
        <div className="loginLeft">
          <h1>Login</h1>  
          
          <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
          {/* Username Input */}
          <div className="mb-3">
            {/* <label htmlFor="username" className="form-label">Username</label> */}
            <input name="username" placeholder="Username" onChange={handleChange} />
            </div>
            {/* Password Input */}
          <div className="mb-3">
            
            {/* <label htmlFor="password" className="form-label">Password</label> */}
            
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            </div>
  
            <button type="submit">Login</button>
        </form>
        <p>New here? <Link to="/Register">Create an Account</Link></p>
      </div>
      <div className="loginRightSide">
        {/* Add any other content if needed */}
      </div>
    </div>
    );
};

export default Login;
