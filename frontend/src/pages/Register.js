import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import API from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/api/register/', formData);
      if (response.data.success) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />

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

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirm_password}
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded">
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/" className="text-purple-700">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
