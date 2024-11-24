import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import {
  faHouse,
  faMagnifyingGlass,
  faBell,
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-10 sm:h-screen w-full sm:min-w-20 sm:max-w-20 sm:p-4 bg-gray-800 text-white shadow-lg sm:flex  sm:flex-col items-center justify-between overflow-hidden">
      <ul className="flex flex-row sm:flex-col items-center gap-4 justify-center h-full">
        <li>
          <FontAwesomeIcon icon={faReact} className="text-3xl" />
        </li>
        <li onClick={() => navigate("/")} className="p-2 cursor-pointer">
          <FontAwesomeIcon icon={faHouse} />
        </li>
        <li onClick={() => navigate("/find")} className="p-2 cursor-pointer">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </li>
        <li
          onClick={() => navigate("/requests")}
          className="p-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faBell} />
        </li>
        <li onClick={() => navigate("/profile")}>
          <FontAwesomeIcon icon={faGear} />
        </li>
        <li onClick={logoutHandler} className="p-2 cursor-pointer">
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
