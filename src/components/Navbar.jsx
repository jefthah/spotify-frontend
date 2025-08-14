import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("all"); // Default is "All"
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Set active tab based on user click
  };

  // Function to navigate to the "Add Your Favorite Song" page
  const handleAddFavoriteSong = () => {
    window.location.href = "https://spotifu-admin.vercel.app/";
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Install App
          </p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
            D
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 cursor-pointer">
        <p
          onClick={() => handleTabChange("all")}
          className={`px-4 py-1 rounded-2xl ${
            activeTab === "all" ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          All
        </p>
        <p
          onClick={() => handleTabChange("music")}
          className={`px-4 py-1 rounded-2xl ${
            activeTab === "music" ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          Music
        </p>
        <p
          onClick={() => handleTabChange("podcast")}
          className={`px-4 py-1 rounded-2xl ${
            activeTab === "podcast" ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          Podcast
        </p>
        {/* Button to add favorite song */}
        <p
          onClick={handleAddFavoriteSong}
          className="bg-green-500 text-white text-[15px] px-4 py-1 rounded-2xl cursor-pointer"
        >
          Add Your Favorite Song
        </p>
      </div>
    </>
  );
}
