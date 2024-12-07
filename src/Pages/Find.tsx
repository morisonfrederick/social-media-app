import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../apiClient/apiClient";
import { AxiosError } from "axios";
import Side from "../Components/Side";

function Find() {
  interface User {
    username: string;
    _id: string;
  }

  const [serachUser, setSearchUser] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const userString = localStorage.getItem("user");

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");

    try {
      const response = await apiClient.post(`/find`, { search: serachUser });
      setUsers(response?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const friendRequestHandler = async (friendId: string) => {
    console.log("friend request send");
    try {
      const response = await apiClient.post(`/friendrequest`, {
        friendId,
        userString,
      });
      const data = await response.data;
      toast.success(data?.message);
      console.log("the response is", data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("some error : ", error);
        toast.error(error?.response?.data?.error);
      } else {
        console.log("some error : ", error);
        toast.error("some unknown error");
      }
    }
  };

  return (
    <div className="flex sm:flex-row sm:min-w-10  flex-col-reverse bg-white min-h-screen  items-center">
      <Navbar />
      <div className="sm:h-screen h-[calc(100vh-40px)] sm:w-96 w-screen  overflow-y-auto ">
        <h2 className=" text-xl font-semibold mb-6 text-center p-4">
          Find New friends
        </h2>
        <form onSubmit={submitHandler}>
          <div className="flex border border-slate-300 rounded-2xl m-1">
            <input
              className="flex-grow rounded-l-2xl p-3 text-gray-800 focus:outline-none"
              type="text"
              placeholder="Search here..."
              value={serachUser}
              onChange={inputHandler}
            />
            <button className="bg-white text-slate-500 rounded-r-2xl p-3 hover:bg-slate-300 hover:text-slate-700 transition-colors duration-200">
              Enter
            </button>
          </div>
        </form>
        <div className="flex-1 overflow-y-auto">
          {users.length > 0 ? (
            <ul className="p-4 ">
              {users.map((user: User, index: number) => (
                <li
                  key={index}
                  className="mb-5 flex justify-between items-center"
                >
                  {user.username}
                  <button
                    onClick={() => friendRequestHandler(user._id)}
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Send Request
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white p-4 text-center flex justify-center items-center">
              Search again
            </p>
          )}
        </div>
      </div>
      <div className=" flex-1 sm:block hidden">
        <Side />
      </div>
    </div>
  );
}

export default Find;
