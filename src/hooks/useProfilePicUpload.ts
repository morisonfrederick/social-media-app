import { useEffect, useRef, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { toast } from "react-toastify";

const useProfilePicUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const response = await apiClient.get("/profile");
        if (response) {
          console.log("response from image url : ", response);

          const url = response.data?.profileURL;
          setImageURL(url);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfilePic();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handel file change");

    setLoading(true);
    e.preventDefault();

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.error("No file selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("profilePIC", file);

    try {
      const response = await apiClient.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.data;
      localStorage.setItem("imageURL", data.url);
      setImageURL(data.url);
      setTimeout(() => {
        console.log("image url : ");
      }, 5000);
      console.log();

      console.log(imageURL);
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return { loading, imageURL, fileInputRef, handleFileChange };
};

export default useProfilePicUpload;
