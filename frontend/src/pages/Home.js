import React, { useState } from "react";
import { FaHome, FaClipboardList, FaMoon, FaSun, FaUser, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import useNavigate



const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    currentLocation: "",
    from: "",
    to: "",
    totalMilesDrivingToday: "",
    totalMileageToday: "",
    vehicleNumbers: "",
    carrierName: "",
    mainOfficeAddress: "",
    homeTerminalAddress: "",
    remarks: "",
    shippingDocuments: "",
    dviOrManifestNo: "",
    currentCycleUsed: "",

     // New fields
    driverName: "",
    coDriverName: "",
    startTime: "",
    endTime: "",
    logStatus: "", 
  });

  const toggleTheme = () => setDarkMode(!darkMode);
  const addLog = () => {
    setLogs([...logs, { ...formData, id: logs.length + 1 }]);
    setShowForm(false);
    setFormData({
      date: "",
      currentLocation: "",
      from: "",
      to: "",
      totalMilesDrivingToday: "",
      totalMileageToday: "",
      vehicleNumbers: "",
      carrierName: "",
      mainOfficeAddress: "",
      homeTerminalAddress: "",
      remarks: "",
      shippingDocuments: "",
      dviOrManifestNo: "",
      currentCycleUsed: "",

       //Reset New fields
      driverName: "",
      coDriverName: "",
      startTime: "",
      endTime: "",
      logStatus: "", 
    });
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
          <div className="bg-white p-6 rounded shadow-lg w-[80%] text-gray-900">
            <h2 className="text-xl mb-4">Add Log</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(formData).map((key) => (
                <input key={key} type="text" placeholder={key.replace(/([A-Z])/g, ' $1').trim()} className="border p-2" onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} />
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
              <button onClick={addLog} className="bg-purple-700 text-white px-4 py-2 rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
