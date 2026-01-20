import { useRef, useState } from "react";
import clsx from "clsx";
import { BiPlay } from "react-icons/bi";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

const VideoShowcase = ({ videos }: { videos: VideoItem[] }) => {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleSelectVideo = (video: VideoItem) => {
    videoRef.current?.pause();
    setActiveVideo(video);

    requestAnimationFrame(() => {
      videoRef.current?.load();
      // videoRef.current?.play();
    });
  };

  return (
    <section className="w-full bg-[#BFBFBF] rounded-2xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative md:flex-[65%] rounded-xl overflow-hidden bg-black max-w-[720px] w-full mx-auto">
          <video
            ref={videoRef}
            controls
            playsInline
            poster={activeVideo.thumbnail}
            className="w-full aspect-video rounded-xl bg-black"
          >
            <source src={activeVideo.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* PLAYLIST */}
        <div className="md:flex-[35%] space-y-3 grid">
          {videos.map((video) => {
            const isActive = video.id === activeVideo.id;

            return (
              <button
                key={video.id}
                onClick={() => handleSelectVideo(video)}
                className={clsx(
                  "w-full flex gap-3 p-3 rounded-xl border transition text-left",
                  "focus:outline-none focus:ring-2 focus:ring-primary",
                  isActive
                    ? "bg-white border-primary shadow-md"
                    : "bg-[#ECECEC] border-transparent hover:bg-white"
                )}
              >
                {/* Thumbnail */}
                <div className="relative shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-full rounded-lg object-cover"
                  />

                  {!isActive && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow">
                        <BiPlay className="text-black ml-[1px]" size={14} />
                      </span>
                    </span>
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col justify-between py-2">
                  <p className="text-sm font-semibold leading-tight">
                    {video.title}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
