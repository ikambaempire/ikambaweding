import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Image as ImageLucide, Video, Play, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMedia, MediaItem, CATEGORIES } from "@/lib/storage";
import portfolioHero from "@/assets/wedding-3.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PortfolioPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = (searchParams.get("type") as "image" | "video") || "image";
  const activeCategory = searchParams.get("cat") || "all";

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    setLoading(true);
    getMedia(typeFilter).then((m) => {
      setMedia(m);
      setLoading(false);
    });
  }, [typeFilter]);

  const setType = (val: "image" | "video") => {
    const params: Record<string, string> = { type: val };
    if (activeCategory !== "all") params.cat = activeCategory;
    setSearchParams(params);
  };

  const setCategory = (cat: string) => {
    const params: Record<string, string> = { type: typeFilter };
    if (cat !== "all") params.cat = cat;
    setSearchParams(params);
  };

  const filtered = useMemo(
    () => (activeCategory === "all" ? media : media.filter((m) => m.category === activeCategory)),
    [media, activeCategory]
  );

  const availableCategories = useMemo(() => {
    const set = new Set(media.map((m) => m.category));
    return CATEGORIES.filter((c) => set.has(c));
  }, [media]);

  const idx = selectedItem ? filtered.findIndex((m) => m.id === selectedItem.id) : -1;
  const goPrev = () => idx >= 0 && setSelectedItem(filtered[(idx - 1 + filtered.length) % filtered.length]);
  const goNext = () => idx >= 0 && setSelectedItem(filtered[(idx + 1) % filtered.length]);

  useEffect(() => {
    if (!selectedItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedItem, filtered]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={portfolioHero} alt="Portfolio" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-3">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-primary-foreground/60 tracking-[0.3em] text-xs uppercase">
              {typeFilter === "image" ? "Browse our beautiful wedding photos" : "Watch our cinematic wedding films"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Photos / Videos toggle */}
      <div className="container pt-12 flex gap-6 md:gap-10 justify-center">
        <Button
          size="lg"
          variant={typeFilter === "image" ? "default" : "outline"}
          onClick={() => setType("image")}
          className={`text-lg md:text-xl px-10 py-8 md:px-14 md:py-9 rounded-full animate-heartbeat ${
            typeFilter === "image" ? "bg-primary" : ""
          }`}
        >
          <ImageLucide size={22} className="mr-2" /> Photos
        </Button>
        <Button
          size="lg"
          variant={typeFilter === "video" ? "default" : "outline"}
          onClick={() => setType("video")}
          className={`text-lg md:text-xl px-10 py-8 md:px-14 md:py-9 rounded-full animate-heartbeat ${
            typeFilter === "video" ? "bg-primary" : ""
          }`}
        >
          <Video size={22} className="mr-2" /> Videos
        </Button>
      </div>

      {/* Category filters */}
      {availableCategories.length > 0 && (
        <div className="container pt-6 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setCategory("all")}
            className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Media grid */}
      <div className="py-12 md:py-16">
        <div className="container">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
              <ImageIcon size={48} className="text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">
                No {typeFilter === "image" ? "photos" : "videos"} yet
              </p>
              <p className="text-muted-foreground/60 text-sm mt-1">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.4) }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <video src={item.url} className="w-full h-full object-cover" preload="metadata" muted />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition">
                        <Play size={36} className="text-primary-foreground" />
                      </div>
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
            className="absolute top-4 right-4 text-primary-foreground p-2"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          {filtered.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground p-2 bg-black/40 rounded-full hover:bg-black/60"
                aria-label="Previous"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground p-2 bg-black/40 rounded-full hover:bg-black/60"
                aria-label="Next"
              >
                <ChevronRight size={32} />
              </button>
              <div className="absolute top-4 left-4 text-primary-foreground/70 text-sm">
                {idx + 1} / {filtered.length}
              </div>
            </>
          )}
          <div className="max-w-6xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedItem.type === "image" ? (
              <img src={selectedItem.url} alt={selectedItem.title} className="max-w-full max-h-[90vh] object-contain" />
            ) : (
              <video src={selectedItem.url} controls autoPlay className="max-w-full max-h-[90vh]" />
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PortfolioPage;
