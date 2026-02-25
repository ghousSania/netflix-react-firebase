const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden bg-[#0e172a]">
      {/* Poster */}
      <div className="aspect-2/3 bg-gray-700/40" />

      {/* Title */}
      <div className="p-2 space-y-2">
        <div className="h-3 bg-gray-700/40 rounded w-full mx-auto" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
