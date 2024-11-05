import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import apiClient from "../apiClient/apiClient";

type userType = {
  name: string;
  id: string;
} | null;
const userString = localStorage.getItem("user") || "";
let user: userType;
try {
  user = JSON.parse(userString);
} catch (error) {
  user = null;
}

type FriendRequest = {
  username: string;
  _id: string;
};

function FriendRequest() {
  const [friendrequests, setFriendRequest] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      const fetchFriendRequests = async () => {
        try {
          setLoading(true);
          const response = await apiClient.get(`/requests?id=${user.id}`);
          const requestData = await response.data;
          console.log("response.data setFriendsArray:", requestData.data);

          if (requestData?.data) {
            setFriendRequest(requestData.data);
          }
          setLoading(false);
        } catch (error) {
          console.log("failed to fetch data", error);
        }
      };
      fetchFriendRequests();
    }
  }, []);

  const friendRequsetHandler = async (
    friendId: string,
    option: string
  ): Promise<void> => {
    if (user && user.id) {
      try {
        const response = await apiClient.post(`/managefriends`, {
          userId: user.id,
          friendId,
          option,
        });
        const responseData = await response.data;
        console.log(response);
        setFriendRequest(responseData?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <Navbar />
      <div className="flex-grow bg-white rounded-2xl w-96 m-4 shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Friend Requests
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : friendrequests?.length > 0 ? (
          friendrequests.map((friend, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full border border-gray-300 h-12 p-3 rounded-lg mb-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <h1 className="text-gray-700 font-medium">{friend.username}</h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => friendRequsetHandler(friend._id, "accept")}
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200"
                >
                  Accept
                </button>
                <button
                  onClick={() => friendRequsetHandler(friend._id, "reject")}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No requests found</p>
        )}
      </div>
    </div>
  );
}

export default FriendRequest;
