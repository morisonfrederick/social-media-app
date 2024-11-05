import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import apiClient from "../apiClient/apiClient";

interface Props {
  setRecipientID: Dispatch<SetStateAction<string>>;
}
type typeList = {
  name: string;
  id: string;
  // complete it later
};

const Chatnames: React.FC<Props> = ({ setRecipientID }) => {
  const [friendlist, setFriendlist] = useState<typeList[]>([]);

  useEffect(() => {
    const getFriendList = async () => {
      try {
        const response = await apiClient.get("/friendlist");
        const list = await response.data;
        setFriendlist(list.friends);
        console.log(
          "friends list from backend : ",
          friendlist,
          "direct: ",
          list.friends
        );
      } catch (error) {
        console.log(error);
      }
    };
    getFriendList();
  }, []);

  return (
    <div className="bg-white">
      <h1 className=" p-4 font-bold text-lg">Chat</h1>
      <div className="flex p-2 items-center justify-between m-3 bg-slate-200 rounded-md h-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          className="flex-1 pl-5 bg-slate-200 outline-none"
          type="text"
          placeholder="search"
        />
      </div>

      {friendlist?.length > 0 ? (
        friendlist?.map((friend, index) => (
          <div
            key={index}
            onClick={() => setRecipientID(friend.id)}
            className="p-4 flex gap-2 items-center"
          >
            <div className="bg-black rounded-full w-10 h-10"></div>
            <div></div>
            <div>{friend.name}</div>
          </div>
        ))
      ) : (
        <div>no friends found</div>
      )}
    </div>
  );
};

export default Chatnames;
