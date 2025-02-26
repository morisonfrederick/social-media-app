import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import useProfilePicUpload from "../hooks/useProfilePicUpload";
import Side from "../Components/Side";

const url = import.meta.env.VITE_APP_API_URL;

function Profile() {
  const userState = useSelector((state: RootState) => state.auth.user);
  const { fileInputRef, handleFileChange, imageURL } = useProfilePicUpload(); // custom hook for handling image uploads and image url

  return (
    <div className="flex flex-col-reverse sm:flex-row h-[100dvh] w-screen">
      <Navbar />
      <div className="flex-1 sm:max-w-96 w-screen">
        <div className="w-full  relative">
          <div className="bg-slate-600 h-[160px]"></div>

          <form>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="bg-black w-20 h-20 rounded-full absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2"
            >
              <img
                className="w-20 h-20 rounded-full"
                src={`${url}/uploads/${imageURL}`}
                alt=""
              />
            </div>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </form>

          <div className="mt-10 mb-3 text-center text-lg text-slate-500 font-bold">
            {userState?.name}
          </div>
          <div className="border border-t-slate-300 flex items-center justify-between p-2 text-slate-500">
            <div className="flex gap-3 items-center">
              <FontAwesomeIcon icon={faUser} />
              <div className="text-sm"> some text</div>
            </div>

            <div>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
        </div>
      </div>
      <Side />
    </div>
  );
}

export default Profile;
