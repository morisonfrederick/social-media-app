import { useState } from "react";
import apiClient from "../apiClient/apiClient";

function Admin() {
  const [message, setMessage] = useState("");

  async function deleteAllUsers() {
    console.log("delete users called");

    try {
      const response = await apiClient.post("/deleteusers");
      const data = await response.data;
      if (data?.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full hidden lg:block">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-4 py-3 hover:bg-gray-200">
              <a href="#" className="text-gray-700 text-lg font-medium">
                Dashboard
              </a>
            </li>
            <li className="px-4 py-3 hover:bg-gray-200">
              <a href="#" className="text-gray-700 text-lg font-medium">
                {message}
              </a>
            </li>
            <li
              onClick={deleteAllUsers}
              className="px-4 py-3 hover:bg-gray-200"
            >
              <a href="#" className="text-gray-700 text-lg font-medium">
                Settings
              </a>
            </li>
            {/* Add more sidebar links as needed */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Logout
            </button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card Example */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-800">Total Users</h3>
              <p className="text-2xl font-semibold text-blue-500">150</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-800">Revenue</h3>
              <p className="text-2xl font-semibold text-green-500">$12,000</p>
            </div>
            {/* Add more cards as needed */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
