import { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubeBackground = () => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
        return;
      }
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    };

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "278IRQ6HSi4",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
          loop: 0,
          start: 0,
          end: 22,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: any) => {
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            // When video ends (at 22s), seek back to 0 and play again
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(0);
              e.target.playVideo();
            }
          },
        },
      });
    };

    loadAPI();

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 scale-[1.3] flex items-center justify-center">
        <div id="yt-player" className="w-full h-full absolute inset-0" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '180vw',
          height: '180vh',
          minWidth: '180vw',
          minHeight: '180vh',
        }} />
      </div>
      {/* Dark overlay to reduce brightness */}
      <div className="absolute inset-0 bg-black/65" />
    </div>
  );
};

export default YouTubeBackground;
