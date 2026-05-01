import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFolders, getMedia, WeddingFolder, MediaItem } from "@/lib/storage";

interface FolderWithPreview extends WeddingFolder {
  previewImages: string[];
  mediaCount: number;
}

const FeaturedWork = () => {
  const [folders, setFolders] = useState<FolderWithPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const allFolders = await getFolders();
      const publicFolders = allFolders.filter((f) => f.isPublic).slice(0, 4);

      const withPreviews = await Promise.all(
        publicFolders.map(async (folder) => {
          const media = await getMedia("image", folder.id);
          return {
            ...folder,
            previewImages: media.slice(0, 3).map((m) => m.url),
            mediaCount: media.length,
          };
        })
      );

      setFolders(withPreviews);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || folders.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.4em] text-primary uppercase mb-4">Our Style in Frame</h2>
          <p className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Featured <span className="text-primary">Weddings</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {folders.map((folder, i) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={`/portfolio/${folder.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  {folder.coverImage || folder.previewImages[0] ? (
                    <img
                      src={folder.coverImage || folder.previewImages[0]}
                      alt={folder.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <ImageIcon size={48} className="text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-primary-foreground mb-1">
                      {folder.name}
                    </h3>
                    <p className="text-primary-foreground/60 text-sm">
                      {folder.mediaCount} photos
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 rounded-none px-10 py-6 tracking-widest text-xs uppercase"
          >
            <Link to="/portfolio">See All Galleries <ArrowRight size={14} className="ml-2" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
