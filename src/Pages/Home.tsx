import React, { useState } from "react";
import Chatfloor from "../Components/Chatfloor";
import Chatnames from "../Components/Chatnames";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  loggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [recipientID, setRecipientID] = useState("");

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return loggedIn ? (
    <div className="flex w-screen h-screen flex-col bg-gray-50">
      <Navbar />
      <div className=" flex flex-1">
        <Chatnames setRecipientID={setRecipientID} />
        <Chatfloor recipientID={recipientID} />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h1>
      <p className="text-gray-600 mb-6">
        You need to be logged in to use this service.
      </p>
      <button
        onClick={handleLoginRedirect}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Home;
