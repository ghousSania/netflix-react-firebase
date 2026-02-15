import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import Button from "./Button";

const TrailerModal = ({ isOpen, onClose, trailerKey, loading }) => {
  // Hide body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup in case component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/70 backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
      onClick={onClose}
    >
      {/* CLOSE BUTTON */}
      <Button
        onClick={onClose}
        variant="light"
        className="absolute top-5 right-5 rounded-full p-3"
      >
        <FaTimes />
      </Button>

      {/* TRAILER BOX */}
      <div
        className="
          relative
          w-full max-w-4xl
          bg-[#0e172a]
          rounded-xl
          shadow-2xl
          overflow-hidden
          aspect-video
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video */}
        {loading ? (
          <div className="flex items-center justify-center h-full text-(--text-muted)">
            Loading trailer...
          </div>
        ) : trailerKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full text-(--text-muted)">
            Trailer not available
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
