"use client";

import { Play, MoreVertical, Heart } from "lucide-react";
import Image from "next/image";

const mockSongs = [
  {
    id: 1,
    title: "Đường Lên Phía Trước",
    artist: "Hương Ly, Phùng Tiến Minh",
    thumbnail: "/sample1.jpg",
  },
  {
    id: 2,
    title: "Đây Là Việt Nam",
    artist: "Phan Duy Anh, NBoro",
    thumbnail: "/sample2.jpg",
  },
  {
    id: 3,
    title: "Khát Vọng Tuổi Trẻ (Japandee...)",
    artist: "Tùng Dương, KIND Music",
    thumbnail: "/sample3.jpg",
  },
  {
    id: 4,
    title: "Kỵ Sĩ Và Ánh Sao",
    artist: "Đông Nhi",
    thumbnail: "/sample4.jpg",
  },
  {
    id: 5,
    title: "Cay",
    artist: "Khắc Hưng, Jimmi Nguyễn",
    thumbnail: "/sample5.jpg",
  },
  // Add more mock data if needed
];

export default function RightSidebar() {
  return (
    <div className="w-full max-w-[300px] bg-[hsla(0,0%,100%,0.05)] text-white p-4 space-y-4">
      <div>
        <button className="bg-white/10 px-3 py-1 rounded-md text-sm mr-2">
          Related
        </button>
        <button className="bg-white/10 px-3 py-1 rounded-md text-sm">
          Recent watch
        </button>
        <MoreVertical className="float-right cursor-pointer" size={20} />
      </div>

      {/* Current playing */}
      <div className="flex items-center gap-3 p-2 rounded-md bg-[#a93df0]">
        <div className="w-12 h-12 bg-gray-500 rounded overflow-hidden">
          <Image src="/sample-nowplaying.jpg" alt="" width={48} height={48} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold truncate">
            Cho con là Người Việt Nam
          </p>
          <p className="text-xs text-gray-200">Tùng Dương, MANBO</p>
        </div>
      </div>

      {/* Queue list */}
      <div className="text-sm text-gray-300">Tiếp theo</div>
      <ul className="space-y-2">
        {mockSongs.map((song) => (
          <li
            key={song.id}
            className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-gray-600 rounded overflow-hidden">
                <Image src={song.thumbnail} alt="" width={40} height={40} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm truncate">{song.title}</p>
                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
              <MoreVertical className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
