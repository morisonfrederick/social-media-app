import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
      });
      console.log(response.data);
      toast.success(response.data.message);
      setLoading(true);
    } catch (error: any) {
      console.log("signup failed", error);
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again two."
      );
    }
  };

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-slate-800">
      <div className="sm:w-96 w-full p-6 border border-gray-800 rounded-lg shadow-md bg-slate-500">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Signup
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
            <button className="w-full p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-200">
              {loading ? "submitting" : "submit"}
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <button
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            onClick={handleSignup}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
