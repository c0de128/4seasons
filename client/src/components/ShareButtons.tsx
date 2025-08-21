import { useState } from "react";
import { Share, Facebook, Twitter, Linkedin, Mail, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  excerpt: string;
  className?: string;
}

export function ShareButtons({ url, title, excerpt, className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShare = (platform: string) => {
    window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center text-slate-600 mr-2">
        <Share className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">Share:</span>
      </div>
      
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        title="Share on Facebook"
        data-testid="share-facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
        title="Share on Twitter"
        data-testid="share-twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
        title="Share on LinkedIn"
        data-testid="share-linkedin"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => handleShare('email')}
        className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
        title="Share via Email"
        data-testid="share-email"
      >
        <Mail className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleCopyLink}
        className={`p-2 rounded-full transition-colors ${
          copied 
            ? 'bg-green-600 text-white' 
            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`}
        title="Copy Link"
        data-testid="share-copy-link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}

// Floating Share Button Component
export function FloatingShareButton({ url, title, excerpt }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full shadow-lg text-white transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: '#0d0d33' }}
          title="Share this article"
          data-testid="floating-share-button"
        >
          <Share className="w-5 h-5" />
        </button>
        
        {isOpen && (
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 border min-w-[280px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">Share Article</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600"
                data-testid="close-share-menu"
              >
                ×
              </button>
            </div>
            <ShareButtons 
              url={url} 
              title={title} 
              excerpt={excerpt}
              className="flex-wrap"
            />
          </div>
        )}
      </div>
    </div>
  );
}