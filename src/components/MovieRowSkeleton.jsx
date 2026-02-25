import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieRowSkeleton = () => {
  return (
    <div className="mb-8">
      {/* Title Skeleton */}
      <div className="h-6 w-40 bg-gray-700 rounded-md mb-4 animate-pulse" />

      <div className="flex gap-4 overflow-hidden px-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="min-w-40">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRowSkeleton;
