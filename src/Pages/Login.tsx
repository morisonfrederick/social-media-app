import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

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
      const response = await axios.post("http://localhost:3000/login", {
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
    } catch (error: any) {
      console.log("error block :", error);

      if (error.response && error.response.data) {
        // Display the error message from the response if available
        toast.error(error.response.data || "Login failed. Please try again.");
        setError(error.response.data || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-slate-800">
      <div className="sm:w-96 w-full p-6 border border-gray-800 rounded-lg shadow-md bg-slate-500">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Login
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-sky-500"
              type="email" // Changed to 'email' input type for better validation
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={inputHandler}
              required // Adding required for form validation
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-sky-500"
              type="password" // Changed to 'password' input type for masking password
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
              className="w-full p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-200"
              type="submit"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <button
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
