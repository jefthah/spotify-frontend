import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { PlayerContext } from "../context/PlayerContextProvider.jsx";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";

export default function DisplayHome() {
  const { songsData, albumsData, setTrack, loading, error, refreshData } =
    useContext(PlayerContext);

  useEffect(() => {
    if (songsData && songsData.length > 0) {
      setTrack(songsData[0]);
    }
  }, [songsData, setTrack]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Loading music data...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-500 text-xl mb-4">Error: {error}</div>
          <button
            onClick={refreshData}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData && albumsData.length > 0 ? (
            albumsData.map((item, index) => (
              <AlbumItem
                key={item._id || index}
                name={item.name}
                desc={item.desc}
                id={index}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-400">No albums available</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {songsData && songsData.length > 0 ? (
            songsData.map((item, index) => (
              <SongItem
                key={item._id || index}
                name={item.name}
                desc={item.desc}
                image={item.image}
                index={index}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-full">No songs available</p>
          )}
        </div>
      </div>
    </>
  );
}