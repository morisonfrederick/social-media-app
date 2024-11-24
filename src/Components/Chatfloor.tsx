import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Intro from "./Intro";

const socket = io("http://localhost:3000");

interface IrecipientID {
  recipientID: string;
  selectedFriend: {
    name: string;
  } | null;
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
  }, [userState?.id]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { message, senderID: userState?.id || "" };
      socket.emit("private_message", {
        message,
        recipientID,
        senderID: userState?.id,
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
          <div className=" bg-slate-800">
            <div
              className="cursor-pointer sm:hidden "
              onClick={() => setIsChatVisible(false)}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </div>
            <div>{selectedFriend?.name}</div>
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
