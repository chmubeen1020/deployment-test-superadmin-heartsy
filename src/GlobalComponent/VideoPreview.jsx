import React from "react";

export default function VideoPreview({
  video,
  height = "h-40",
  rounded = "rounded-xl",
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  // Reset play state if file changes
  React.useEffect(() => {
    setIsPlaying(false);
  }, [video?.file]);

  
  if (!video?.file) {
    return (
      <div
        className={`w-full ${height} bg-gray-900 flex items-center justify-center ${rounded}`}
      >
        <span className="text-xs text-gray-400">No video</span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full max-w-xs overflow-hidden bg-black ${rounded}`}
    >
      {!isPlaying ? (
        <>
          {/* Thumbnail or fallback */}
          {video.thumbnail ? (
            <img
              src={URL.createObjectURL(video.thumbnail)}
              alt="Video thumbnail"
              className={`w-full ${height} object-cover`}
            />
          ) : (
            <div
              className={`w-full ${height} bg-gray-900 flex items-center justify-center`}
            >
              <span className="text-xs text-gray-400">No thumbnail</span>
            </div>
          )}

          {/* Play button */}
          <button
            type="button"
            onClick={() => {
              setIsPlaying(true);
              setTimeout(() => videoRef.current?.play(), 0);
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="ml-1"
              >
                <path d="M5 3L19 12L5 21V3Z" fill="#6D28D9" />
              </svg>
            </div>
          </button>
        </>
      ) : (
        <video
          ref={videoRef}
          src={URL.createObjectURL(video.file)}
          controls
          autoPlay
          className={`w-full ${height} object-cover`}
        />
      )}
    </div>
  );
}
