import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Intro from "./Intro";
import apiClient from "../apiClient/apiClient";
import { Ifriend } from "../interfaces/interfaces";
const url = import.meta.env.VITE_APP_API_URL;

const socket = io(url);

interface IrecipientID {
  recipientID: string;
  selectedFriend: Ifriend | null;
  setIsChatVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Imessages {
  senderID: string;
  message: string;
}

const Chatfloor: React.FC<IrecipientID> = ({
  recipientID,
  selectedFriend,
  setIsChatVisible,
}) => {
  const userState = useSelector((state: RootState) => state.auth.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Imessages[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("user_online", (userId) => {
      setOnlineUsers((prev) => [...new Set([...prev, userId])]);
    });
    socket.on("user_offline", (userId) => {
      setOnlineUsers((prev) => prev.filter((id) => id != userId));
    });

    return () => {
      socket.off("user_online");
      socket.off("user_offline");
    };
  }, []);

  useEffect(() => {
    console.log("fetching msg");
    const senderID = userState?.id;
    try {
      async function fetchMsg() {
        const response = await apiClient.post("/messages", {
          data: {
            senderID,
            recipientID,
          },
        });
        const data = await response.data;
        const msg = await data?.message;
        setMessages([...msg]);
        console.log([...msg]);
      }

      fetchMsg();
    } catch (error) {
      console.log(error);
    }
  }, [recipientID]);
  useEffect(() => {
    console.log("user state is", userState);
    console.log(
      "chatfloor-> recipientID conditional rendering status is : ",
      recipientID ? true : false
    );

    socket.emit("register", userState?.id);

    socket.on("private_message", (incomingMessage: Imessages) => {
      if (incomingMessage.senderID !== userState?.id) {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      }
    });

    return () => {
      socket.off("private_message");
    };
  }, [userState, recipientID]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { message, senderID: userState?.id || "" };
      socket.emit("private_message", {
        senderID: userState?.id,
        recipientID,
        message,
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
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
    <div className=" w-full">
      {recipientID !== "" ? (
        <div className="sm:h-screen h-[calc(100vh-40px)] flex flex-col   ">
          <div className=" bg-slate-800 max-h-24 min-h-10 sm:hidden flex items-center p-1">
            <div
              className="cursor-pointer  "
              onClick={() => setIsChatVisible(false)}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-green-500">
            <div className="h-10 w-10 rounded-full m-1 bg-gray-300">
              <img
                className="h-10 w-10 rounded-full"
                src={`${url}/uploads/${selectedFriend?.imageURL}`}
                alt="profile pic"
              />
            </div>
            <div>
              <p className="font-medium">{selectedFriend?.name}</p>
              <p className="text-sm">
                {onlineUsers.includes(recipientID) ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <div className="relative flex-1  ">
            <div className="absolute inset-0 bg-[url('assets/bg.jpg')] opacity-10 z-0"></div>
            <div className="z-40 opacity-100">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.senderID == userState?.id
                      ? "flex justify-end"
                      : "flex justify-start"
                  }`}
                >
                  <div
                    className={`mb-2 ${
                      msg.senderID == userState?.id
                        ? "bg-[#CCE2D3]"
                        : "bg-white"
                    }  rounded-sm p-2 m-1 inline-block max-w-[75%] break-words`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full rounded-lg bg-slate-50">
            <input
              className="flex-grow  p-2 bg-transparent outline-none "
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-slate-100 p-2 rounded-r-lg "
              onClick={sendMessage}
            >
              SEND
            </button>
          </div>
        </div>
      ) : (
        <div className="h-screen text-center">
          <Intro />
        </div>
      )}
    </div>
  );
};

export default Chatfloor;
