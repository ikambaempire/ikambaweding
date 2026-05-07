const YouTubeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        src="/videos/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />
    </div>
  );
};

export default YouTubeBackground;
