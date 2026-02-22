import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HorizontalScroller = ({ children }) => {
  const rowRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = rowRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [children]);

  const scroll = (distance) => {
    rowRef.current?.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative">
      <div className="relative flex items-center">
        {/* LEFT */}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-400)}
            className="
              hidden md:block
              absolute left-0 z-10
              bg-[rgba(42,107,238,0.62)]
              border border-[rgba(42,106,238,0.4)]
              text-white
              p-3 rounded-r-lg
              opacity-0 group-hover:opacity-100
              transition
              hover:bg-[rgba(42,106,238,0.45)]
              backdrop-blur-sm
              shadow-lg
            "
          >
            <FaChevronLeft />
          </button>
        )}

        {/* SCROLL ROW */}
        <div
          ref={rowRef}
          className="
            flex gap-4 overflow-x-auto
            no-scrollbar scroll-smooth
            snap-x-mandatory
            px-2
          "
        >
          {children}
        </div>

        {/* RIGHT */}
        {canScrollRight && (
          <button
            onClick={() => scroll(400)}
            className="
              hidden md:block
              absolute right-0 z-10
              bg-[rgba(42,107,238,0.62)]
              border border-[rgba(42,106,238,0.4)]
              text-white
              p-3 rounded-l-lg
              opacity-0 group-hover:opacity-100
              transition
              hover:bg-[rgba(42,106,238,0.45)]
              backdrop-blur-sm
              shadow-lg
            "
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalScroller;
