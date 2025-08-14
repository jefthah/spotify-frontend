import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContextProvider.jsx";

export default function DisplayAlbum() {
  const { id } = useParams();
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);
  
  // Ambil album berdasarkan index (id dari URL)
  const albumData = albumsData[id];
  
  // Filter songs yang belong to album ini (jika ada relasi)
  // Atau gunakan semua songs jika tidak ada relasi spesifik
  const albumSongs = songsData.filter(song => 
    song.album === albumData?._id || song.album === albumData?.name
  );
  
  // Jika tidak ada songs yang match dengan album, gunakan semua songs
  const displaySongs = albumSongs.length > 0 ? albumSongs : songsData;

  // Loading state
  if (!albumData) {
    return (
      <>
        <Navbar />
        <div className="mt-10">
          <p>Loading album data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt=""
            />
            <b>Spotify</b> • 1,323,333 likes • <b>{displaySongs.length} Songs</b>
            about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {displaySongs.map((item, index) => {
        // Cari index asli dari song di songsData untuk playWithId
        const originalIndex = songsData.findIndex(song => song._id === item._id);
        
        return (
          <div 
            onClick={() => playWithId(originalIndex)} 
            key={item._id || index} 
            className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt={item.name} />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration || "3:30"}</p>
          </div>
        );
      })}
    </>
  );
}
