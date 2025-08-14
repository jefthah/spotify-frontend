import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContextProvider.jsx";

export default function App() {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      {/* Perbaikan: Render audio element hanya jika track dan file ada */}
      {track?.file ? (
        <audio 
          ref={audioRef} 
          src={track.file} 
          preload="auto"
          onError={(e) => console.error("Audio error:", e)}
        />
      ) : (
        <audio ref={audioRef} preload="none" />
      )}
    </div>
  );
}
