import React, { useState } from "react";
import Chatfloor from "../Components/Chatfloor";
import Chatnames from "../Components/Chatnames";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  loggedIn: boolean;
}
interface Ifriend {
  name: string;
}

const Home: React.FC<HomeProps> = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [recipientID, setRecipientID] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Ifriend | null>(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return loggedIn ? (
    //home page have three componets navBar, chatNames and ChatFloor

    //main div containg all components
    <div className="flex sm:h-screen h-[100dvh] w-screen flex-col-reverse sm:flex-row ">
      {/* section one navbar  */}
      <Navbar />

      {/*  section two Chatname */}
      <div
        className={`flex ${
          isChatVisible ? "sm:block hidden" : "block"
        } h-[calc(100vh-40px)] sm:h-screen`}
      >
        <Chatnames
          setRecipientID={setRecipientID}
          setSelectedFriend={setSelectedFriend}
          setIsChatVisible={setIsChatVisible}
        />
      </div>

      {/* section three chat floor */}
      <div className={`flex-1 ${isChatVisible ? "flex" : "sm:flex hidden"}`}>
        <Chatfloor
          recipientID={recipientID}
          selectedFriend={selectedFriend}
          setIsChatVisible={setIsChatVisible}
        />
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
