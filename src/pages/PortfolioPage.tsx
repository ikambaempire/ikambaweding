import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderOpen, Lock, ImageIcon, ArrowRight, Image as ImageLucide, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFolders, getMedia, WeddingFolder } from "@/lib/storage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FolderWithCount extends WeddingFolder {
  mediaCount: number;
  imageCount: number;
  videoCount: number;
}

const PortfolioPage = () => {
  const [folders, setFolders] = useState<FolderWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = (searchParams.get("type") as "image" | "video" | null) || null;

  useEffect(() => {
    const load = async () => {
      const allFolders = await getFolders();
      const withCounts = await Promise.all(
        allFolders.map(async (f) => {
          if (!f.isPublic) return { ...f, mediaCount: 0, imageCount: 0, videoCount: 0 };
          const media = await getMedia(undefined, f.id);
          const imageCount = media.filter((m) => m.type === "image").length;
          const videoCount = media.filter((m) => m.type === "video").length;
          return { ...f, mediaCount: media.length, imageCount, videoCount };
        })
      );
      setFolders(withCounts);
      setLoading(false);
    };
    load();
  }, []);

  const setFilter = (val: "image" | "video" | null) => {
    if (val) setSearchParams({ type: val });
    else setSearchParams({});
  };

  const publicFolders = folders.filter((f) => {
    if (!f.isPublic) return false;
    if (typeFilter === "image") return f.imageCount > 0;
    if (typeFilter === "video") return f.videoCount > 0;
    return true;
  });
  const privateFolders = folders.filter((f) => !f.isPublic);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
          alt="Portfolio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-3">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-primary-foreground/60 tracking-[0.3em] text-xs uppercase">
              {typeFilter === "image" ? "Browse our beautiful wedding photos" : typeFilter === "video" ? "Watch our cinematic wedding films" : "Browse through our beautiful wedding stories"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container pt-8 flex flex-wrap gap-2 justify-center">
        <Button variant={typeFilter === null ? "default" : "outline"} size="sm" onClick={() => setFilter(null)} className={typeFilter === null ? "bg-primary" : ""}>
          All
        </Button>
        <Button variant={typeFilter === "image" ? "default" : "outline"} size="sm" onClick={() => setFilter("image")} className={typeFilter === "image" ? "bg-primary" : ""}>
          <ImageLucide size={16} className="mr-2" /> Images
        </Button>
        <Button variant={typeFilter === "video" ? "default" : "outline"} size="sm" onClick={() => setFilter("video")} className={typeFilter === "video" ? "bg-primary" : ""}>
          <Video size={16} className="mr-2" /> Videos
        </Button>
      </div>

      <div className="py-16 md:py-24">
        <div className="container">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading...</div>
          ) : publicFolders.length === 0 && privateFolders.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
              <FolderOpen size={48} className="text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">No wedding folders yet</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Check back soon for beautiful wedding stories!</p>
            </div>
          ) : (
            <>
              {publicFolders.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
                  {publicFolders.map((folder, i) => (
                    <motion.div
                      key={folder.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link to={`/portfolio/${folder.slug}${typeFilter ? `?tab=${typeFilter === "image" ? "photos" : "videos"}` : ""}`} className="block group">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                          {folder.coverImage ? (
                            <img
                              src={folder.coverImage}
                              alt={folder.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <ImageIcon size={48} className="text-muted-foreground/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                            <h3 className="font-display font-bold text-primary-foreground text-xl md:text-2xl mb-1">
                              {folder.name}
                            </h3>
                            <p className="text-primary-foreground/60 text-sm">
                              {typeFilter === "image" ? `${folder.imageCount} photos` : typeFilter === "video" ? `${folder.videoCount} videos` : `${folder.mediaCount} photos & videos`}
                            </p>
                          </div>
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={18} className="text-primary-foreground" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {privateFolders.length > 0 && (
                <div className="border-t border-border pt-12">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lock size={18} className="text-primary" /> Private Galleries
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Have an access code? Enter the folder link shared with you to view your private gallery.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
