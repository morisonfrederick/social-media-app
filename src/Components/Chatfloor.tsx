import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";

const socket = io("http://localhost:3000");

interface IrecipientID {
  recipientID: string;
}

const Chatfloor: React.FC<IrecipientID> = ({ recipientID }) => {
  console.log("Recipient ID is:", recipientID);

  const userState = useSelector((state: RootState) => state.auth.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Register user on socket connection
    socket.emit("register", userState?.id);

    // Listen for incoming private messages from the server
    socket.on(
      "private_message",
      (incomingMessage: { senderID: string; message: string }) => {
        if (incomingMessage.senderID !== userState?.id) {
          setMessages((prevMessages) => [
            ...prevMessages,
            `From ${incomingMessage.senderID}: ${incomingMessage.message}`,
          ]);
        }
      }
    );

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("private_message");
    };
  }, [userState?.id]);

  const sendMessage = () => {
    if (message.trim()) {
      // Emit the message to the server, including recipient and sender IDs
      socket.emit("private_message", {
        message,
        recipientID,
        senderID: userState?.id,
      });

      // Display message in chat as sent by the user
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage(""); // Clear the input field
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!userState) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-blue-500 p-4 flex-grow">
      <div>
        <h1>{userState?.name}</h1>
      </div>
      {recipientID ? (
        <div className="bg-white p-4 mb-4 h-[80%] overflow-y-auto rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              {msg}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-4 mb-4 h-[80%] overflow-y-auto rounded-lg">
          <h1>select any friend to send message.</h1>
        </div>
      )}

      <div>
        <h1>Recipient ID: {recipientID}</h1>
      </div>
      <div className="flex fixed bottom-2 w-full">
        <input
          className="rounded-l-lg w-[50%] p-2"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="bg-white p-2 rounded-r-lg" onClick={sendMessage}>
          SEND
        </button>
      </div>
    </div>
  );
};

export default Chatfloor;
