import React, { ChangeEvent, FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import apiClient from "../apiClient/apiClient";

interface loginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<loginProps> = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.post("/login", {
        email,
        password,
      });
      console.log(response);
      const token = response?.data?.token;
      const user = response?.data?.user;
      console.log("loggin action ", typeof user, " ", user);

      if (token) {
        toast.success(response?.data?.message);
        console.log("user response data from backend : ", response.data.user);

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setLoggedIn(true);
        dispatch(setCredentials({ user, token }));
        navigate("/");
      }
    } catch (error: unknown) {
      console.log("error block :", error);
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          // Display the error message from the response if available
          toast.error(error.response.data || "Login failed. Please try again.");
          setError(error.response.data || "Login failed. Please try again.");
        }
      } else {
        console.log("unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center h-[100dvh] p-4 ">
      <div className="sm:w-96 w-full p-6  rounded-2xl shadow-md bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-500 text-center ">
          Welcome Back !
        </h2>
        <h1 className="text-center pb-4  text-slate-500">
          Sign in to continue to Tiki
        </h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-sky-500"
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-sky-500"
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={inputHandler}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <div className="flex justify-center">
            <button
              className="w-full p-2 bg-[#5fb47b] text-white rounded hover:bg-[#00d8a9] transition duration-200"
              type="submit"
              disabled={loading} // Disable button during loading
            >
              {loading ? "waiting ..." : "Log in"}
            </button>
          </div>
        </form>
        <div className="mt-4 justify-center">
          <h1 className="text-center text-slate-500">
            Don't have an account ?{" "}
            <span
              onClick={handleSignup}
              className="font-bold text-[#5fb47b] hover:text-[#00d8a9] cursor-pointer"
            >
              Register
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
