import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Share2, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface ShareAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareAppModal: React.FC<ShareAppModalProps> = ({ isOpen, onClose }) => {
  const [copiedDev, setCopiedDev] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen) return null;

  const devUrl = 'https://ais-dev-f45xfe2aiqc4zljelx3abe-691773766522.asia-northeast1.run.app';
  const sharedUrl = 'https://ais-pre-f45xfe2aiqc4zljelx3abe-691773766522.asia-northeast1.run.app';

  const copyToClipboard = (text: string, isDev: boolean) => {
    navigator.clipboard.writeText(text);
    if (isDev) {
      setCopiedDev(true);
      setTimeout(() => setCopiedDev(false), 3000);
    } else {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-stone-200 shadow-2xl overflow-hidden text-stone-900"
        >
          {/* Top Header */}
          <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">Open in Another Browser or Device</h3>
                <p className="text-xs text-stone-600">Access NoMySkill Upskilling Tree directly without iframe constraints</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Primary Live Development URL for Author */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-400 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Active Development URL (Works for you right now)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  Live & Active
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-300 font-mono text-xs text-stone-900 break-all">
                <span className="flex-1 select-all">{devUrl}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={devUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Dev App in New Tab</span>
                </a>

                <button
                  onClick={() => copyToClipboard(devUrl, true)}
                  className="py-2 px-3.5 rounded-xl bg-white hover:bg-emerald-100/60 text-emerald-900 text-xs font-bold border border-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedDev ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDev ? 'Copied!' : 'Copy URL'}</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Log in with your Google account (<strong className="text-stone-700">paulcdrd@gmail.com</strong>) if prompted.
              </p>
            </div>

            {/* Public Shared URL Explanation */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Public Shared URL (For Anyone Without Login)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Requires AI Studio Share
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-amber-200 font-mono text-[11px] text-stone-700 break-all">
                <span className="flex-1 select-all">{sharedUrl}</span>
              </div>

              <div className="p-2.5 bg-amber-100/60 rounded-xl text-xs text-amber-950 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <span>ℹ️ Why does this URL show 404?</span>
                </p>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  In Google AI Studio, the public shared URL returns 404 until you click the <strong>"Share"</strong> button located at the <strong>top-right corner of the AI Studio window</strong>. Clicking "Share" provisions this public endpoint so anyone can view it.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={sharedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test Shared URL</span>
                </a>

                <button
                  onClick={() => copyToClipboard(sharedUrl, false)}
                  className="py-1.5 px-3 rounded-xl bg-white hover:bg-amber-100 text-stone-800 text-xs font-medium border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedShare ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Browser & Device Compatibility Tips */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                <Laptop className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-900">Desktop Browsers</p>
                  <p className="text-[11px] text-stone-500">Full widescreen support for Chrome, Safari, Edge, and Firefox.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                <Smartphone className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-900">Mobile Responsive</p>
                  <p className="text-[11px] text-stone-500">Touch optimized tree navigation and classroom player.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
