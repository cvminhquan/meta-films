import Image from "next/image";

export function NowPlayingCard() {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md bg-[#a93df0]">
      <div className="w-[100px] bg-gray-500 rounded overflow-hidden">
        <Image
          src="https://image.tmdb.org/t/p/w500/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg"
          alt="Arcane"
          title="Arcane"
          width={100}
          height={64}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold truncate">Arcane</p>
        <p className="text-xs text-gray-200">Season 2 - Ep 1</p>
      </div>
    </div>
  );
}
