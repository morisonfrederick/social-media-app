import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import Find from "./Pages/Find";
import FriendRequest from "./Pages/FriendRequest";
import Admin from "./Pages/Admin";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/find" element={<Find />} />
          <Route path="/requests" element={<FriendRequest />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
