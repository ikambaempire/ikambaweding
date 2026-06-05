import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, X, ImageIcon, FolderOpen, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFolders, getMedia, WeddingFolder, MediaItem, CATEGORIES } from "@/lib/storage";
import ShareButtons from "@/components/ShareButtons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FolderDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "videos" ? "videos" : "photos";
  const [folder, setFolder] = useState<WeddingFolder | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessError, setAccessError] = useState(false);

  const folderUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    getFolders().then((folders) => {
      const found = folders.find((f) => f.slug === slug);
      setFolder(found || null);
      if (found && found.isPublic) setAccessGranted(true);
      setLoading(false);
    });
  }, [slug]);

  useEffect(() => {
    if (folder && accessGranted) {
      getMedia(undefined, folder.id).then(setMedia);
    }
  }, [folder, accessGranted]);

  const handleAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (folder && accessCode === folder.accessCode) {
      setAccessGranted(true);
      setAccessError(false);
    } else {
      setAccessError(true);
    }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground"><Navbar />Loading...</div>;
  if (!folder) return <div className="min-h-screen bg-background"><Navbar /><div className="pt-24 text-center"><p className="text-muted-foreground">Folder not found</p><Link to="/portfolio" className="text-primary mt-4 inline-block">← Back to portfolio</Link></div></div>;

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm text-center">
            <FolderOpen size={48} className="text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">{folder.name}</h1>
            <p className="text-muted-foreground text-sm mb-6">This is a private gallery. Enter the access code to view.</p>
            <form onSubmit={handleAccessCode} className="space-y-4">
              <Input type="text" placeholder="Enter access code" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="bg-card border-border text-foreground" />
              {accessError && <p className="text-destructive text-sm">Invalid access code</p>}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">View Gallery</Button>
            </form>
            <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground mt-4 inline-block">← Back to portfolio</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const categories = ["all", ...new Set(media.map((m) => m.category).filter((c) => c !== "uncategorized"))];
  const filtered = activeCategory === "all" ? media : media.filter((m) => m.category === activeCategory);
  const images = filtered.filter((m) => m.type === "image");
  const videos = filtered.filter((m) => m.type === "video");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/portfolio"><ArrowLeft size={20} /></Link>
              </Button>
              <div>
                <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground">{folder.name}</h1>
                <p className="text-muted-foreground text-sm">{media.length} files</p>
              </div>
            </div>
            {/* Share entire folder */}
            <ShareButtons url={folderUrl} title={folder.name} />
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full capitalize ${activeCategory === cat ? "bg-primary" : "border-border text-muted-foreground"}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}

          {/* Tabs for Photos / Videos */}
          <Tabs defaultValue={initialTab} className="w-full">
            <TabsList className="mb-6 bg-card border border-border">
              <TabsTrigger value="photos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ImageIcon size={16} className="mr-2" /> Photos ({images.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Video size={16} className="mr-2" /> Videos ({videos.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos">
              {images.length > 0 ? (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {images.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="break-inside-avoid group">
                      <div className="relative rounded-lg overflow-hidden">
                        <img src={item.url} alt={item.title} className="w-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500" loading="lazy" onClick={() => setSelectedItem(item)} />
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ShareButtons url={item.url} title={item.title} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
                  <ImageIcon size={48} className="text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">No photos in this category yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos">
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, i) => (
                    <motion.div key={video.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group">
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-card border border-border cursor-pointer" onClick={() => setSelectedItem(video)}>
                        <video src={video.url} className="w-full h-full object-cover" muted preload="metadata" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play size={24} className="text-primary-foreground ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-foreground font-medium">{video.title}</p>
                        <ShareButtons url={video.url} title={video.title} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
                  <Video size={48} className="text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">No videos in this category yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem && (() => {
        const list = selectedItem.type === "image" ? images : videos;
        const idx = list.findIndex((m) => m.id === selectedItem.id);
        const goPrev = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          if (list.length === 0) return;
          setSelectedItem(list[(idx - 1 + list.length) % list.length]);
        };
        const goNext = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          if (list.length === 0) return;
          setSelectedItem(list[(idx + 1) % list.length]);
        };
        return (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}
            onKeyDown={(e) => { if (e.key === "ArrowLeft") goPrev(); if (e.key === "ArrowRight") goNext(); }}
            tabIndex={0}
          >
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-foreground z-10" onClick={() => setSelectedItem(null)}>
              <X size={24} />
            </Button>
            {list.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-foreground z-10 bg-black/40 hover:bg-black/60 rounded-full h-12 w-12" onClick={goPrev}>
                  <ChevronLeft size={28} />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-foreground z-10 bg-black/40 hover:bg-black/60 rounded-full h-12 w-12" onClick={goNext}>
                  <ChevronRight size={28} />
                </Button>
              </>
            )}
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              {selectedItem.type === "image" ? (
                <img src={selectedItem.url} alt={selectedItem.title} className="max-w-full max-h-[85vh] object-contain rounded-lg mx-auto" />
              ) : (
                <video src={selectedItem.url} controls autoPlay className="w-full rounded-lg" />
              )}
              <div className="flex items-center justify-between mt-3">
                <p className="text-foreground text-sm font-medium">{selectedItem.title} {list.length > 1 && <span className="text-muted-foreground ml-2">({idx + 1}/{list.length})</span>}</p>
                <ShareButtons url={selectedItem.url} title={selectedItem.title} />
              </div>
            </div>
          </div>
        );
      })()}
      <Footer />
    </div>
  );
};

export default FolderDetailPage;
