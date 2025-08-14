// context/PlayerContextProvider.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { PlayerContext } from "./PlayerContext.js";
import ApiService from "../services/api.js";

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongsData = async () => {
    setError(null);
    const data = await ApiService.getSongs();
    
    if (data.success && data.songs) {
      setSongsData(data.songs);
      if (data.songs.length > 0 && !track) {
        setTrack(data.songs[0]);
      }
    } else {
      throw new Error('Failed to fetch songs data or no songs available');
    }
  };

  const fetchAlbumsData = async () => {
    setError(null);
    const data = await ApiService.getAlbums();
    
    if (data.success && data.albums) {
      setAlbumsData(data.albums);
    } else {
      throw new Error('Failed to fetch albums data or no albums available');
    }
  };

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        fetchSongsData(),
        fetchAlbumsData()
      ]);
      
    } catch (err) {
      setError(`Failed to load data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (index) => {
    if (index < 0 || index >= songsData.length) {
      return;
    }

    const selectedSong = songsData[index];
    
    if (!selectedSong || !selectedSong.file) {
      return;
    }

    setTrack(selectedSong);
    
    setTimeout(async () => {
      if (audioRef.current) {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
        }
        
        audioRef.current.load();
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }, 100);
  };

  const previous = () => {
    if (!track || songsData.length === 0) return;
    
    const currentIndex = songsData.findIndex(song => song._id === track._id);
    if (currentIndex > 0) {
      playWithId(currentIndex - 1);
    }
  };

  const next = () => {
    if (!track || songsData.length === 0) return;
    
    const currentIndex = songsData.findIndex(song => song._id === track._id);
    if (currentIndex < songsData.length - 1) {
      playWithId(currentIndex + 1);
    }
  };

  const seekSong = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          if (seekBar.current && audioRef.current.duration) {
            seekBar.current.style.width =
              Math.floor(
                (audioRef.current.currentTime / audioRef.current.duration) * 100
              ) + "%";
            setTime({
              currentTime: {
                second: Math.floor(audioRef.current.currentTime % 60),
                minute: Math.floor(audioRef.current.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioRef.current.duration % 60),
                minute: Math.floor(audioRef.current.duration / 60),
              },
            });
          }
        };
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [track]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    songsData,
    setSongsData,
    albumsData,
    setAlbumsData,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    loading,
    error,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    refreshData: loadAllData,
    apiService: ApiService,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
