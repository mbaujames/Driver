import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import API from '../utils/api';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await API.post('/api/login/', formData);
      // Store user data in localStorage or context
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label>Email</label>
          <input
            type="email"
            name="email" 
            value={formData.email}
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded">
            Login
          </button>
          <div className="text-center">
            <Link to="/forgot-password" className="text-purple-700 text-sm">Forgot Password?</Link>
          </div>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/register" className="text-purple-700">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
