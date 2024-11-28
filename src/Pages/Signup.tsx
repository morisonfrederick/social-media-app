import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../apiClient/apiClient";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name == "username") {
      setUsername(value);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await apiClient.post("/signup", {
        username,
        email,
        password,
      });
      console.log(response.data);
      toast.success(response.data.message);
      setLoading(true);
    } catch (error: unknown) {
      console.log("signup failed", error);
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.message ||
            "Login failed. Please try again two."
        );
      } else {
        console.log("unknown error", error);
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 ">
      <div className="sm:w-96 w-full p-6  rounded-lg shadow-md bg-slate-50">
        <h2 className="text-2xl font-bold text-center text-slate-500">
          Register Account
        </h2>
        <h2 className="text-slate-500 text-center p-4">
          Get your free Tiki account now.
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-sky-500"
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={inputHandler}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-sky-500"
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={inputHandler}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-sky-500"
              type="text"
              name="password"
              placeholder="Enter password"
              onChange={inputHandler}
            />
          </div>
          <div className="flex justify-center">
            <button className="w-full p-2 bg-[#5fb47b] text-white rounded hover:bg-[#00d8a9] transition duration-200">
              {loading ? "submitting" : "submit"}
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <h1 className="text-slate-500">
            Already have an account?{" "}
            <span
              onClick={handleLogin}
              className="font-bold text-[#5fb47b] hover:text-[#00d8a9] cursor-pointer"
            >
              Login
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
