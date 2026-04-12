import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Sparkles, Download, RefreshCw, Image as ImageIcon, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const EVENT_TYPES = [
  { id: "save-the-date", label: "Save the Date", icon: "💌" },
  { id: "invitation", label: "Invitation", icon: "💍" },
];

const STYLES = [
  { id: "luxury-wedding", label: "Luxury Wedding", preview: "🏛️" },
  { id: "romantic", label: "Romantic", preview: "🌹" },
  { id: "modern-minimal", label: "Modern Minimal", preview: "◻️" },
  { id: "elegant-floral", label: "Elegant Floral", preview: "🌸" },
  { id: "birthday-party", label: "Birthday / Party", preview: "🎉" },
  { id: "custom", label: "Custom Style", preview: "✨" },
];

const getUserId = () => {
  let id = localStorage.getItem("invitation_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("invitation_user_id", id);
  }
  return id;
};

const InvitationGeneratorPage = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState("");
  const [style, setStyle] = useState("");
  const [customStyle, setCustomStyle] = useState("");
  const [names, setNames] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [credits, setCredits] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const userId = getUserId();

  useEffect(() => {
    loadCredits();
  }, []);

  const loadCredits = async () => {
    const { data } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_identifier", userId)
      .single();

    if (data) {
      setCredits(data.credits);
    } else {
      // Create initial credits
      await supabase.from("user_credits").insert({ user_identifier: userId, credits: 3 });
      setCredits(3);
    }
  };

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 3 - uploadedFiles.length);
    if (newFiles.length === 0) {
      toast({ title: "Maximum 3 images allowed", variant: "destructive" });
      return;
    }

    const validFiles = newFiles.filter((f) => f.type.startsWith("image/"));
    if (validFiles.length !== newFiles.length) {
      toast({ title: "Only image files are allowed", variant: "destructive" });
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => setPreviews((prev) => [...prev, e.target?.result as string]);
      reader.readAsDataURL(file);
    });
  }, [uploadedFiles, toast]);

  const removeImage = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleGenerate = async () => {
    if (!eventType || !style || uploadedFiles.length === 0) {
      toast({ title: "Please complete all required fields", variant: "destructive" });
      return;
    }
    if (credits !== null && credits < 1) {
      toast({ title: "No credits remaining", description: "Please add credits to continue.", variant: "destructive" });
      return;
    }

    setGenerating(true);
    setResults([]);

    try {
      // Upload images to storage first
      const uploadedUrls: string[] = [];
      for (const file of uploadedFiles) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `uploads/${userId}/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("invitations").upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });
        if (!error) {
          const { data: urlData } = supabase.storage.from("invitations").getPublicUrl(path);
          uploadedUrls.push(urlData.publicUrl);
        }
      }

      if (uploadedUrls.length === 0) throw new Error("Failed to upload images");

      const { data, error } = await supabase.functions.invoke("generate-invitation", {
        body: {
          eventType,
          style: style === "custom" ? customStyle || "elegant" : style,
          names,
          eventDate,
          location,
          customMessage,
          uploadedImageUrls: uploadedUrls,
          userIdentifier: userId,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResults(data.images || []);
      setCredits(data.remainingCredits);
      setStep(4);
      toast({ title: "Designs generated successfully! ✨" });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Generation failed", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const downloadImage = async (url: string, index: number) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invitation-design-${index + 1}.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
              AI Invitation <span className="text-primary">Generator</span>
            </h1>
            <p className="text-muted-foreground font-serif text-lg max-w-xl mx-auto">
              Create stunning, professional invitation designs powered by AI
            </p>
            {credits !== null && (
              <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <CreditCard size={16} />
                {credits} credit{credits !== 1 ? "s" : ""} remaining
              </div>
            )}
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-primary w-12" : "bg-muted w-8"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Event Type */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-display font-semibold text-foreground mb-6 text-center">What are you creating?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => { setEventType(type.id); setStep(2); }}
                      className={`p-6 rounded-xl border-2 transition-all text-center hover:shadow-lg ${
                        eventType === type.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-4xl block mb-3">{type.icon}</span>
                      <span className="font-display font-semibold text-foreground">{type.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Upload & Details */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-display font-semibold text-foreground mb-6 text-center">Upload your photos & add details</h2>

                {/* Upload Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-all cursor-pointer ${
                    dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <Upload size={40} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground font-serif">Drag & drop or click to upload (1–3 images)</p>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                  <div className="flex gap-3 mb-6 flex-wrap">
                    {previews.map((src, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden group">
                        <img src={src} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="text-foreground">Names</Label>
                    <Input placeholder="e.g. John & Jane" value={names} onChange={(e) => setNames(e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-foreground">Event Date</Label>
                    <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-foreground">Location</Label>
                    <Input placeholder="e.g. Grand Ballroom, Nairobi" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-foreground">Custom Message</Label>
                    <Input placeholder="e.g. Together with their families..." value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} />
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => { if (uploadedFiles.length === 0) { toast({ title: "Please upload at least 1 image", variant: "destructive" }); return; } setStep(3); }} className="bg-primary text-primary-foreground">
                    Next: Choose Style
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Style & Generate */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-display font-semibold text-foreground mb-6 text-center">Choose your style</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
                  {STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`p-5 rounded-xl border-2 transition-all text-center hover:shadow-lg ${
                        style === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-3xl block mb-2">{s.preview}</span>
                      <span className="text-sm font-medium text-foreground">{s.label}</span>
                    </button>
                  ))}
                </div>

                {style === "custom" && (
                  <div className="max-w-md mx-auto mb-6">
                    <Label className="text-foreground">Describe your style</Label>
                    <Textarea
                      placeholder="e.g. Afro-centric with gold accents and earthy tones..."
                      value={customStyle}
                      onChange={(e) => setCustomStyle(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={!style || generating}
                    className="bg-primary text-primary-foreground px-8"
                  >
                    {generating ? (
                      <>
                        <RefreshCw size={18} className="mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="mr-2" />
                        Generate Design (1 credit)
                      </>
                    )}
                  </Button>
                </div>

                {generating && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground font-serif">Creating your masterpiece... This may take a moment.</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 4: Results */}
            {step === 4 && results.length > 0 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-display font-semibold text-foreground mb-6 text-center">Your Designs ✨</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {results.map((url, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className="rounded-xl overflow-hidden border border-border shadow-lg group"
                    >
                      <img src={url} alt={`Design ${i + 1}`} className="w-full aspect-[3/4] object-cover" />
                      <div className="p-3 flex gap-2">
                        <Button size="sm" className="flex-1 bg-primary text-primary-foreground" onClick={() => downloadImage(url, i)}>
                          <Download size={16} className="mr-1" /> Download
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => { setStep(3); setResults([]); }}>
                    <RefreshCw size={16} className="mr-2" /> Regenerate
                  </Button>
                  <Button variant="outline" onClick={() => { setStep(1); setResults([]); setUploadedFiles([]); setPreviews([]); setEventType(""); setStyle(""); }}>
                    Create Another
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvitationGeneratorPage;
