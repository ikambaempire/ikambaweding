const YouTubeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <iframe
          src="https://www.youtube.com/embed/278IRQ6HSi4?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=278IRQ6HSi4&start=0&end=22&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=0"
          className="absolute border-0"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '180vw',
            height: '180vh',
            minWidth: '180vw',
            minHeight: '180vh',
          }}
          allow="autoplay; encrypted-media"
          title="Background Video"
        />
      </div>
      <div className="absolute inset-0 bg-black/65" />
    </div>
  );
};

export default YouTubeBackground;
