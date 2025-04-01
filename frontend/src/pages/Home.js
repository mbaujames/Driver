import React, { useState } from "react";
import { FaHome, FaClipboardList, FaMoon, FaSun, FaUser, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import API from '../utils/api';
import { useTheme } from '../context/ThemeContext';




function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { toggleTheme } = useTheme();


  const [formData, setFormData] = useState({
    date: "",
    current_location: "",
    from_location: "",
    to_location: "",
    total_miles_driving_today: "",
    total_mileage_today: "",
    vehicle_numbers: "",
    carrier_name: "",
    main_office_address: "",
    home_terminal_address: "",
    remarks: "",
    shipping_documents: "",
    dvi_or_manifestNo: "",
    current_cycle_used: "",

  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'number' ? parseInt(value) : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/api/logs/', formData);
      setSuccess('Log added successfully');
      setFormData({
        date: '',
        current_location: '',
        from_location: '',
        to_location: '',
        total_miles_driven_today: '',
        total_mileage_today: '',
        vehicle_numbers: '',
        carrier_name: '',
        main_office_address: '',
        home_terminal_address: '',
        remarks: '',
        shipping_documents: '',
        dvi_or_manifest_no: '',
        current_cycle_used: ''
      });
      // Optionally navigate to logs list
      // navigate('/logs');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add log');
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen font-sans`}> 
      <div className="flex justify-between items-center p-4 bg-purple-800 text-white">
        <h1 className="text-xl font-bold">Drivers Daily Logs</h1>

        <div className="flex gap-6">
          <FaHome className="text-2xl cursor-pointer" />
          <FaClipboardList className="text-2xl cursor-pointer" />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="text-2xl">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          {/* Profile Button */}
      <button onClick={() => navigate("/profile")} className="text-2xl">
        <FaUser />
      </button>

      {/* Logout Button */}
      <button onClick={() => navigate("/login")} className="text-2xl cursor-pointer">
        <FaSignOutAlt />
      </button>
        </div>
      </div>

      <div className="p-6">
        <button onClick={() => setShowForm(true)} className="bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> Add Log
        </button>
      </div>

      <div className="p-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Driver</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Miles</th>
              <th className="border p-2">Current Cycle Used</th>
              <th className="border p-2">Truck Number</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{log.id}</td>
                <td className="border p-2">{log.carrierName}</td>
                <td className="border p-2">{log.from}</td>
                <td className="border p-2">{log.to}</td>
                <td className="border p-2">{log.date}</td>
                <td className="border p-2">{log.totalMilesDrivingToday}</td>
                <td className="border p-2">{log.currentCycleUsed}</td>
                <td className="border p-2">{log.vehicleNumbers}</td>
                <td className="border p-2 flex gap-2">
                  <FaEye className="text-blue-500 cursor-pointer" />
                  <FaEdit className="text-green-500 cursor-pointer" />
                  <FaTrash className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg w-[80%] max-h-[80vh] overflow-y-auto text-gray-900">
      <h2 className="text-xl mb-4">Add Log</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Current Location</label>
          <input
            type="text"
            name="current_location"
            value={formData.current_location}
            onChange={handleChange}
            required
            placeholder="Enter current location"
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>From Location</label>
          <input
            type="text"
            name="from_location"
            value={formData.from_location}
            onChange={handleChange}
            required
            placeholder="Enter from location"
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>To Location</label>
          <input
            type="text"
            name="to_location"
            value={formData.to_location}
            onChange={handleChange}
            required
            placeholder="Enter to location"
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Total Miles Driven Today</label>
          <input
            type="number"
            name="total_miles_driven_today"
            value={formData.total_miles_driven_today}
            onChange={handleChange}
            required
            placeholder="Enter Total Miles Driven Today"
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Total Mileage Today</label>
          <input
            type="number"
            name="total_mileage_today"
            value={formData.total_mileage_today}
            onChange={handleChange}
            required
            placeholder="Enter Total Mileage Today"
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Vehicle Numbers</label>
          <input
            type="text"
            name="vehicle_numbers"
            value={formData.vehicle_numbers}
            onChange={handleChange}
            required
            placeholder="Enter vehicle numbers"
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Carrier Name</label>
          <input
            type="text"
            name="carrier_name"
            value={formData.carrier_name}
            onChange={handleChange}
            required
            placeholder="Enter carrier name"
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Main Office Address</label>
          <input
            name="main_office_address"
            value={formData.main_office_address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Home Terminal Address</label>
          <input
            name="home_terminal_address"
            value={formData.home_terminal_address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Shipping Documents</label>
          <input
            type="text"
            name="shipping_documents"
            value={formData.shipping_documents}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>DVI or Manifest No.</label>
          <input
            type="text"
            name="dvi_or_manifest_no"
            value={formData.dvi_or_manifest_no}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        <div className="form-group">
          <label>Current Cycle Used</label>
          <input
            type="number"
            name="current_cycle_used"
            value={formData.current_cycle_used}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-orange-400"
          />
        </div>

        

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button type="button" onClick={() => setShowForm(false)}  // Close the form
            className="bg-gray-700 text-white px-4 py-2 rounded w-full mt-4">
            Cancel
          </button>

        <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded w-full mt-4">
          Add Log
        </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Home;
