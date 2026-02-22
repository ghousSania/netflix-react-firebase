import Container from "./container";
import HorizontalScroller from "./HorizontalScroller";

const MovieDetailsSkeleton = () => {
  return (
    <Container className="py-6 sm:py-8 px-4 sm:px-6 animate-pulse">
      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-12 md:col-span-5 space-y-6">
          {/* Poster Skeleton */}
          <div className="w-full h-60 md:h-72 bg-gray-800 rounded-lg" />

          {/* Info Box Skeleton */}
          <div className="bg-[#16213e] border border-[#24304f] rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 md:col-span-7 space-y-6">
          {/* Rating Line */}
          <div className="h-4 bg-gray-700 rounded w-1/3" />

          {/* Title */}
          <div className="h-8 bg-gray-700 rounded w-3/4" />

          {/* Tagline */}
          <div className="h-4 bg-gray-700 rounded w-1/2" />

          {/* Genres */}
          <div className="flex gap-3">
            <div className="h-6 w-16 bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-700 rounded-full" />
            <div className="h-6 w-14 bg-gray-700 rounded-full" />
          </div>

          {/* Trailer Button */}
          <div className="h-10 w-40 bg-gray-700 rounded-md" />

          {/* Overview Title */}
          <div className="h-5 bg-gray-700 rounded w-1/4" />

          {/* Overview Paragraph */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-700 rounded w-5/6" />
          </div>

          {/* Cast Section */}
          <div className="h-6 bg-gray-700 rounded w-1/3 mt-4" />

          <HorizontalScroller>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-24 h-36 bg-gray-800 rounded-lg shrink-0"
              />
            ))}
          </HorizontalScroller>
        </div>
      </div>
    </Container>
  );
};

export default MovieDetailsSkeleton;
