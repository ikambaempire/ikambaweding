import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createBooking } from "@/lib/storage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BookingPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    clientName: "", clientEmail: "", clientPhone: "",
    weddingDate: "", package: "", venue: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.clientEmail || !form.clientPhone || !form.weddingDate || !form.package) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await createBooking(form);
      setSubmitted(true);
    } catch {
      toast({ title: "Booking failed. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
            <CheckCircle size={64} className="text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold text-foreground mb-3">Booking Received!</h1>
            <p className="text-muted-foreground mb-6">Thank you for choosing iKAMBA Wedding. We'll get back to you within 24 hours to confirm your booking details.</p>
            <Button onClick={() => { setSubmitted(false); setForm({ clientName: "", clientEmail: "", clientPhone: "", weddingDate: "", package: "", venue: "", message: "" }); }} variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full">Submit Another Booking</Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
              Book <span className="text-primary">Your Date</span>
            </h1>
            <p className="text-muted-foreground">Fill out the form below and we'll get back to you to confirm your booking.</p>
          </motion.div>

          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Full Name *</label>
                <Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} placeholder="Your full name" className="bg-background border-border" />
              </div>
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Email *</label>
                <Input type="email" value={form.clientEmail} onChange={(e) => setForm({ ...form, clientEmail: e.target.value })} placeholder="you@email.com" className="bg-background border-border" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Phone *</label>
                <Input value={form.clientPhone} onChange={(e) => setForm({ ...form, clientPhone: e.target.value })} placeholder="+250 7XX XXX XXX" className="bg-background border-border" />
              </div>
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Wedding Date *</label>
                <Input type="date" value={form.weddingDate} onChange={(e) => setForm({ ...form, weddingDate: e.target.value })} className="bg-background border-border" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Package *</label>
                <Select value={form.package} onValueChange={(v) => setForm({ ...form, package: v })}>
                  <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Select package" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essential">Essential</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="custom">Custom Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Venue</label>
                <Input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Wedding venue" className="bg-background border-border" />
              </div>
            </div>
            <div>
              <label className="text-sm text-foreground font-medium mb-1 block">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your wedding vision..." className="bg-background border-border min-h-[100px]" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 text-base font-semibold">
              <Send size={18} className="mr-2" />
              {loading ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
