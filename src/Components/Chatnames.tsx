import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import apiClient from "../apiClient/apiClient";

const url = import.meta.env.VITE_APP_API_URL;

interface Ifriend {
  name: string;
}

interface Props {
  setRecipientID: Dispatch<SetStateAction<string>>;
  setSelectedFriend: Dispatch<SetStateAction<Ifriend | null>>;
  setIsChatVisible: Dispatch<SetStateAction<boolean>>;
}
type typeList = {
  name: string;
  id: string;
  url: string | undefined;
  // complete it later
};

const Chatnames: React.FC<Props> = ({
  setRecipientID,
  setSelectedFriend,
  setIsChatVisible,
}) => {
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
  }, [friendlist]);

  return (
    <div className="sm:w-96 w-full ">
      <h1 className=" p-4 font-bold text-lg">Chat</h1>
      <div className="flex p-2 items-center justify-between m-3 bg-slate-200 rounded-md h-8">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className="flex-1 pl-5 bg-slate-200 outline-none"
          type="text"
          placeholder="search"
        />
      </div>
      <div className="overflow-y-auto">
        {friendlist?.length > 0 ? (
          friendlist?.map((friend, index) => (
            <div
              key={index}
              onClick={() => {
                setRecipientID(friend.id);
                setSelectedFriend({ name: friend.name });
                setIsChatVisible(true);
              }}
              className="p-4 flex gap-2 items-center "
            >
              <img
                className="bg-black rounded-full w-10 h-10"
                src={
                  friend.url
                    ? `${url}/uploads/${friend.url}`
                    : "src/assets/profile.png"
                }
                alt=""
              />

              <div></div>
              <div>{friend.name}</div>
            </div>
          ))
        ) : (
          <div>no friends found</div>
        )}
      </div>
    </div>
  );
};

export default Chatnames;
