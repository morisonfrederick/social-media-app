import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const logoutHandler = () => {
    console.log("logout clicked");
    localStorage.clear();
    navigation("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-screen bg-indigo-100 p-4 sm:h-14 flex justify-between ">
      <div>
        <h1 className="font-extrabold text-indigo-500 cursor-pointer">LOGO</h1>
      </div>
      <div className="flex items-center gap-5">
        <h1 className="hidden sm:block">Welcome</h1>
        <button className="sm:hidden" onClick={toggleMenu}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row items-center gap-5 mr-52 absolute sm:static top-14 right-0 sm:top-auto sm:right-auto bg-indigo-100 sm:bg-transparent w-full sm:w-auto p-4 sm:p-0`}
      >
        <li
          onClick={() => navigation("/")}
          className="p-2 border hover:border-pink-400 hover:rounded-2xl cursor-pointer"
        >
          HOME
        </li>
        <li
          onClick={() => navigation("/find")}
          className="p-2 border hover:border-pink-400 hover:rounded-2xl cursor-pointer"
        >
          Find
        </li>
        <li 
          onClick={() => navigation('/requests')}
          className="p-2 border hover:border-pink-400 hover:rounded-2xl cursor-pointer"
        >
          Request
        </li>
        <li
          onClick={logoutHandler}
          className="p-2 border hover:border-pink-400 hover:rounded-2xl cursor-pointer"
        >
          Log out
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
