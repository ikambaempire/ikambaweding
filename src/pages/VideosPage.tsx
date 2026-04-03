import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMedia, MediaItem } from "@/lib/storage";
import { useState, useEffect } from "react";

const VideosPage = () => {
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  useEffect(() => {
    setVideos(getMedia("video"));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center gap-4 py-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Wedding <span className="text-primary">Videos</span>
          </h1>
        </div>
      </div>

      <div className="container py-8">
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <Play size={48} className="text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No videos yet</p>
            <p className="text-muted-foreground/60 text-sm mt-1">
              Admin can upload videos from the admin panel
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-card border border-border">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={24} className="text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-foreground font-medium">{video.title}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedVideo.url}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-foreground font-medium">{selectedVideo.title}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => setSelectedVideo(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideosPage;
