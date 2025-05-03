export default function Loading() {
  return (
    <div className="p-4 md:p-8">
      <div className="container mx-auto space-y-10">
        {new Array(6).fill("").map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="h-6 w-40 bg-gray-300 rounded-md animate-pulse" />
            <div className="flex space-x-4 overflow-x-auto">
              {new Array(6).fill("").map((__, i) => (
                <div
                  key={i}
                  className="w-[175px] h-[280px] bg-gray-200 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
