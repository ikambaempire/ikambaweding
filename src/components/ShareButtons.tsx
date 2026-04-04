import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

const ShareButtons = ({ url, title, className = "" }: ShareButtonsProps) => {
  const shareText = `Check out this from Ikamba Wedding: ${title}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`;
  const instagramCopy = () => {
    navigator.clipboard.writeText(url);
    // Instagram doesn't support direct URL sharing, so we copy the link
    alert("Link copied! Paste it in your Instagram story or DM.");
  };

  return (
    <div className={`flex items-center gap-2 ${className}`} onClick={(e) => e.stopPropagation()}>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/40 text-[#25D366]"
        asChild
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
          <MessageCircle size={18} />
        </a>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9 rounded-full bg-[#E1306C]/20 hover:bg-[#E1306C]/40 text-[#E1306C]"
        onClick={instagramCopy}
        aria-label="Share on Instagram"
      >
        <InstagramIcon size={18} />
      </Button>
    </div>
  );
};

export default ShareButtons;
