import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Trash2, Lock, Image, Video, LogOut, FolderPlus, Folder, Calendar, Plus, Eye, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { verifyAdmin, getMedia, addMedia, removeMedia, getFolders, createFolder, deleteFolder, updateFolderCover, getBookings, updateBookingStatus, MediaItem, WeddingFolder, BookingRequest, CATEGORIES } from "@/lib/storage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdmin(password)) {
      setIsAuth(true);
    } else {
      toast({ title: "Invalid password", variant: "destructive" });
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-1">Enter password to manage content</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-card border-border text-foreground" />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Sign In</Button>
          </form>
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to site</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuth(false)} />;
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<"folders" | "media" | "bookings">("folders");
  const [folders, setFolders] = useState<WeddingFolder[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const { toast } = useToast();

  const loadData = async () => {
    const [f, m, b] = await Promise.all([getFolders(), getMedia(), getBookings()]);
    setFolders(f);
    setMedia(m);
    setBookings(b);
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild><Link to="/"><ArrowLeft size={20} /></Link></Button>
            <h1 className="text-xl font-display font-bold text-foreground">Admin <span className="text-primary">Panel</span></h1>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground"><LogOut size={16} className="mr-1" /> Logout</Button>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["folders", "media", "bookings"] as const).map((tab) => (
            <Button key={tab} variant={activeTab === tab ? "default" : "outline"} size="sm" onClick={() => setActiveTab(tab)} className={`capitalize ${activeTab === tab ? "bg-primary" : "border-border text-muted-foreground"}`}>
              {tab === "folders" && <Folder size={16} className="mr-2" />}
              {tab === "media" && <Image size={16} className="mr-2" />}
              {tab === "bookings" && <Calendar size={16} className="mr-2" />}
              {tab} ({tab === "folders" ? folders.length : tab === "media" ? media.length : bookings.length})
            </Button>
          ))}
        </div>

        {activeTab === "folders" && <FoldersTab folders={folders} onRefresh={loadData} />}
        {activeTab === "media" && <MediaTab folders={folders} media={media} onRefresh={loadData} />}
        {activeTab === "bookings" && <BookingsTab bookings={bookings} onRefresh={loadData} />}
      </div>
    </div>
  );
};

const FoldersTab = ({ folders, onRefresh }: { folders: WeddingFolder[]; onRefresh: () => void }) => {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [uploadingCover, setUploadingCover] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!name.trim()) { toast({ title: "Enter a folder name", variant: "destructive" }); return; }
    try {
      await createFolder(name, isPublic, accessCode || undefined);
      setName(""); setAccessCode("");
      await onRefresh();
      toast({ title: "Folder created!" });
    } catch (err: any) {
      toast({ title: err.message || "Failed to create folder", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteFolder(id);
    await onRefresh();
    toast({ title: "Folder deleted" });
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>, folderId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(folderId);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const filePath = `covers/${folderId}.${ext}`;
      await supabase.storage.from('media').upload(filePath, file, { cacheControl: '3600', upsert: true });
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
      await updateFolderCover(folderId, urlData.publicUrl);
      await onRefresh();
      toast({ title: "Cover photo updated!" });
    } catch (err: any) {
      toast({ title: "Failed to upload cover", variant: "destructive" });
    } finally {
      setUploadingCover(null);
    }
  };

  return (
    <div>
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Create Wedding Folder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input placeholder="e.g. FISTON & ALICE WEDDING" value={name} onChange={(e) => setName(e.target.value)} className="bg-background border-border" />
          <Input placeholder="Access code (for private)" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="bg-background border-border" disabled={isPublic} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            <span className="text-sm text-muted-foreground">{isPublic ? "Public (visible in portfolio)" : "Private (needs access code)"}</span>
          </div>
          <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90"><FolderPlus size={18} className="mr-2" /> Create</Button>
        </div>
      </div>

      {folders.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No folders yet. Create one above to start organizing.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((f) => (
            <div key={f.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Cover preview */}
              <div className="relative aspect-video bg-muted">
                {f.coverImage ? (
                  <img src={f.coverImage} alt={f.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={32} className="text-muted-foreground/30" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id={`cover-${f.id}`}
                  onChange={(e) => handleCoverUpload(e, f.id)}
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-2 right-2 text-xs"
                  onClick={() => document.getElementById(`cover-${f.id}`)?.click()}
                  disabled={uploadingCover === f.id}
                >
                  {uploadingCover === f.id ? "Uploading..." : f.coverImage ? "Change Cover" : "Add Cover Photo"}
                </Button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{f.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{f.isPublic ? "Public" : `Private • Code: ${f.accessCode}`}</p>
                    <p className="text-xs text-muted-foreground">/{f.slug}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                      <Link to={`/portfolio/${f.slug}`}><Eye size={16} /></Link>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(f.id)}><Trash2 size={16} /></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MediaTab = ({ folders, media, onRefresh }: { folders: WeddingFolder[]; media: MediaItem[]; onRefresh: () => void }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("uncategorized");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (!selectedFolder) { toast({ title: "Please select a folder first", variant: "destructive" }); return; }

    setUploading(true);
    let uploaded = 0;
    const total = files.length;

    try {
      for (const file of Array.from(files)) {
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        if (!isVideo && !isImage) { continue; }

        setProgress(`Uploading ${++uploaded}/${total}: ${file.name}`);
        const title = file.name.replace(/\.[^.]+$/, "");
        await addMedia(file, isVideo ? "video" : "image", title, selectedFolder, selectedCategory);
      }
      await onRefresh();
      toast({ title: `${uploaded} file(s) uploaded!` });
    } catch (err) {
      console.error(err);
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
      setProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    await removeMedia(id);
    await onRefresh();
    toast({ title: "Deleted" });
  };

  const filtered = media.filter((m) => filterType === "all" || m.type === filterType);

  return (
    <div>
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Upload Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Select folder *" /></SelectTrigger>
            <SelectContent>
              {folders.map((f) => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="uncategorized">Uncategorized</SelectItem>
              {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple onChange={handleUpload} className="hidden" />
        <Button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="bg-primary hover:bg-primary/90">
          <Upload size={18} className="mr-2" /> {uploading ? "Uploading..." : "Choose Files"}
        </Button>
        {progress && <p className="text-sm text-primary mt-2">{progress}</p>}
        <p className="text-xs text-muted-foreground mt-2">Up to 4GB per file. Select a folder before uploading.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "image", "video"] as const).map((t) => (
          <Button key={t} variant={filterType === t ? "default" : "outline"} size="sm" onClick={() => setFilterType(t)} className={`capitalize ${filterType === t ? "bg-primary" : "border-border text-muted-foreground"}`}>
            {t === "all" ? "All" : t === "image" ? "Images" : "Videos"} ({t === "all" ? media.length : media.filter((m) => m.type === t).length})
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No media uploaded yet</p>
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
                <Button variant="destructive" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="p-2">
                <p className="text-xs text-muted-foreground truncate">{item.title}</p>
                <p className="text-[10px] text-primary">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BookingsTab = ({ bookings, onRefresh }: { bookings: BookingRequest[]; onRefresh: () => void }) => {
  const { toast } = useToast();

  const handleStatus = async (id: string, status: string) => {
    await updateBookingStatus(id, status);
    await onRefresh();
    toast({ title: `Booking ${status}` });
  };

  return (
    <div>
      {bookings.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No bookings yet</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{b.clientName}</h3>
                  <p className="text-sm text-muted-foreground">{b.clientEmail} • {b.clientPhone}</p>
                  <p className="text-sm text-muted-foreground">Date: <span className="text-foreground">{b.weddingDate}</span> • Package: <span className="text-primary capitalize">{b.package}</span></p>
                  {b.venue && <p className="text-sm text-muted-foreground">Venue: {b.venue}</p>}
                  {b.message && <p className="text-sm text-muted-foreground mt-2 italic">"{b.message}"</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    b.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                    b.status === "declined" ? "bg-destructive/20 text-destructive" :
                    "bg-primary/20 text-primary"
                  }`}>{b.status}</span>
                  {b.status === "pending" && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatus(b.id, "confirmed")}>Confirm</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleStatus(b.id, "declined")}>Decline</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
