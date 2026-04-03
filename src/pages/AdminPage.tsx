import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Trash2, Lock, Image, Video, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyAdmin, getMedia, addMedia, removeMedia, MediaItem } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const AdminPage = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [activeTab, setActiveTab] = useState<"image" | "video">("image");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const loadMedia = async () => {
    const items = await getMedia();
    setMedia(items);
  };

  useEffect(() => {
    if (isAuth) loadMedia();
  }, [isAuth]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdmin(password)) {
      setIsAuth(true);
    } else {
      toast({ title: "Invalid password", variant: "destructive" });
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let uploaded = 0;
    const total = files.length;

    try {
      for (const file of Array.from(files)) {
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isVideo && !isImage) {
          toast({ title: `Skipped ${file.name} — unsupported format`, variant: "destructive" });
          continue;
        }

        setUploadProgress(`Uploading ${++uploaded}/${total}: ${file.name}`);
        const title = file.name.replace(/\.[^.]+$/, "");
        await addMedia(file, isVideo ? "video" : "image", title);
      }

      await loadMedia();
      toast({ title: `${uploaded} file(s) uploaded successfully!` });
    } catch (err) {
      console.error("Upload error:", err);
      toast({ title: "Upload failed — check browser storage limits", variant: "destructive" });
    } finally {
      setUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    await removeMedia(id);
    await loadMedia();
    toast({ title: "Deleted" });
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-1">Enter password to manage content</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-card border-border text-foreground"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </form>
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const filtered = media.filter((m) => m.type === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <h1 className="text-xl font-display font-bold text-foreground">
              Admin <span className="text-primary">Panel</span>
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsAuth(false)} className="text-muted-foreground">
            <LogOut size={16} className="mr-1" /> Logout
          </Button>
        </div>
      </div>

      <div className="container py-8">
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Upload Content</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-primary hover:bg-primary/90"
          >
            <Upload size={18} className="mr-2" />
            {uploading ? "Uploading..." : "Choose Files"}
          </Button>
          {uploadProgress && (
            <p className="text-sm text-primary mt-2">{uploadProgress}</p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Supports images and videos up to 4GB per file. Stored in browser storage.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "image" ? "default" : "outline"}
            onClick={() => setActiveTab("image")}
            className={activeTab === "image" ? "bg-primary" : "border-border text-muted-foreground"}
          >
            <Image size={16} className="mr-2" />
            Images ({media.filter((m) => m.type === "image").length})
          </Button>
          <Button
            variant={activeTab === "video" ? "default" : "outline"}
            onClick={() => setActiveTab("video")}
            className={activeTab === "video" ? "bg-primary" : "border-border text-muted-foreground"}
          >
            <Video size={16} className="mr-2" />
            Videos ({media.filter((m) => m.type === "video").length})
          </Button>
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No {activeTab}s uploaded yet
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="relative group rounded-lg overflow-hidden bg-card border border-border">
                {item.type === "image" ? (
                  <img src={item.url} alt={item.title} className="w-full aspect-square object-cover" />
                ) : (
                  <video src={item.url} className="w-full aspect-square object-cover" muted preload="metadata" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <div className="p-2">
                  <p className="text-xs text-muted-foreground truncate">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
