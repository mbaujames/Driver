import React, { useState } from "react";
import { useEffect } from 'react';

import API from '../utils/api';


function Profile() {
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    company: ''
  });

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  


  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await API.get('/api/profile/');
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Implement save functionality
    console.log("Profile saved");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await API.put('/api/profile/', profile);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed');
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">Profile</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
          <div className="space-y-4">
          <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.full_name}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={profile.phone_number || ''}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />

            <label>Company</label>
            <input
              type="text"
              name="company"
              value={profile.company || ''}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <button className="w-full bg-purple-700 text-white p-2 rounded" onClick={handleSave}>
              Save
            </button>
            </div>
            </form>
          
        ) : (
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone_number}</p>
            <p><strong>Company:</strong> {user.company}</p>
            <button className="w-full bg-purple-700 text-white p-2 rounded" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
