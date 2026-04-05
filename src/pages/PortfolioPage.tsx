import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderOpen, Lock, ArrowLeft, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFolders, WeddingFolder } from "@/lib/storage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PortfolioPage = () => {
  const [folders, setFolders] = useState<WeddingFolder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFolders().then((f) => {
      setFolders(f);
      setLoading(false);
    });
  }, []);

  const publicFolders = folders.filter((f) => f.isPublic);
  const privateFolders = folders.filter((f) => !f.isPublic);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse through our beautiful wedding stories, organized by couple.
            </p>
          </motion.div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {publicFolders.map((folder, i) => (
                    <motion.div
                      key={folder.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link to={`/portfolio/${folder.slug}`} className="block group">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-card border border-border">
                          {folder.coverImage ? (
                            <img src={folder.coverImage} alt={folder.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <ImageIcon size={48} className="text-muted-foreground/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-display font-bold text-foreground text-lg">{folder.name}</h3>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {privateFolders.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lock size={18} className="text-primary" /> Private Galleries
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">Have an access code? Enter the folder link shared with you to view your private gallery.</p>
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
