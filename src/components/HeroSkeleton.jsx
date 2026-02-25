const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] bg-gray-900 flex items-center mb-6 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#2a6aee]/20 via-black/60 to-black/30"></div>

      {/* Content Container  */}
      <div className="relative z-10 max-w-2xl  mx-auto px-4 sm:px-6 w-full animate-pulse text-white">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 bg-gray-700 rounded-full" />
          <div className="h-5 w-16 bg-gray-700 rounded-md" />
        </div>

        {/* Title */}
        <div className="h-10 sm:h-12 md:h-16 w-3/4 bg-gray-700 rounded-md mb-4" />

        {/* Overview */}
        <div className="max-w-2xl space-y-2 mb-6">
          <div className="h-4 w-full bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-700 rounded" />
          <div className="h-4 w-4/6 bg-gray-700 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-700 rounded-lg" />
          <div className="h-10 w-32 bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
