import React from 'react'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContextProvider.jsx'

export default function SongItem({name, image, desc, index}) {
  const {playWithId} = useContext(PlayerContext)
  
  const handleClick = () => {
    playWithId(index);
  }

  return (
    <div onClick={handleClick} className='p-2 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors duration-200'>
        <div className="w-full aspect-square mb-2 overflow-hidden rounded">
          <img 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
            src={image} 
            alt={name}
          />
        </div>
        <p className="font-bold mt-2 mb-1 text-sm overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>{name}</p>
        <p className="text-slate-200 text-xs overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical'
        }}>{desc}</p>
    </div>
  )
}