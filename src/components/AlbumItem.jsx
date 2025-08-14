import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlbumItem({ image, name, desc, id }) {

  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/album/${id}`)} className="min-w-[180px] p-2 px-3 cursor-pointer hover:bg-[#ffffff26]">
      <img className="w-70 h- object-cover rounded" src={image} alt={name} />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
}
