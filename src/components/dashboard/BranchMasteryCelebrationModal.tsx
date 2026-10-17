import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Sparkles, 
  TreePine, 
  CheckCircle2, 
  X, 
  Download, 
  Share2, 
  Check, 
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { LeafCourse } from '../../types/tree';

interface BranchMasteryCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  branchName?: string;
  departmentName?: string;
  completedLeavesCount?: number;
  badgeId?: string;
}

export const BranchMasteryCelebrationModal: React.FC<BranchMasteryCelebrationModalProps> = ({
  isOpen,
  onClose,
  branchName = 'Artificial Intelligence & Machine Learning',
  departmentName = 'Technical & Engineering',
  completedLeavesCount = 5,
  badgeId = 'BRANCH-MASTER-AI-2026'
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://NoMySkill.academy/verify-badge/${badgeId}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownloadCredential = () => {
    alert(`📜 Verified Digital Credential for "${branchName} Branch Mastery" has been generated and ready for print/download! Badge ID: ${badgeId}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm">
        
        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-amber-300 shadow-2xl overflow-hidden text-stone-900"
        >
          {/* Top Confetti & Festive Gradient Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-b from-amber-100 via-amber-50 to-white text-center border-b border-amber-200 overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-stone-500 hover:text-stone-900 border border-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Floating Confetti Sparks */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <span className="absolute top-3 left-8 text-xl animate-bounce">✨</span>
              <span className="absolute top-8 right-12 text-2xl animate-pulse">🌿</span>
              <span className="absolute top-12 left-1/4 text-lg animate-ping">⭐</span>
              <span className="absolute top-5 right-1/4 text-xl animate-bounce">🎉</span>
            </div>

            {/* Golden Laurels Badge Icon */}
            <motion.div 
              className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 p-1 shadow-lg ring-4 ring-amber-400/30 flex items-center justify-center relative mb-4"
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <div className="w-full h-full rounded-2xl bg-amber-500 flex flex-col items-center justify-center text-stone-950 font-black shadow-inner">
                <Award className="w-10 h-10 text-white drop-shadow-md" />
                <span className="text-[9px] uppercase tracking-wider text-amber-950 font-black mt-0.5">Mastery</span>
              </div>
            </motion.div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 border border-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Milestone Achieved</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Branch Mastery Unlocked!
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-sm mx-auto">
              You have completed all leaf curriculums under the <strong>{branchName}</strong> branch in {departmentName}.
            </p>
          </div>

          {/* Credential Details Body */}
          <div className="p-6 space-y-5">
            
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Credential Type</span>
                <span className="font-extrabold text-emerald-800">Verified Botanical Branch Mastery</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Mastered Leaves</span>
                <span className="font-bold text-stone-900">{completedLeavesCount} Courses (100% Curriculum)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Unique Badge ID</span>
                <span className="font-mono text-[11px] font-bold text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200">
                  {badgeId}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Verification Protocol</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cryptographically Signed</span>
                </span>
              </div>
            </div>

            {/* Skills Harvested */}
            <div>
              <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                Specialized Competencies Harvested:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Deep Learning', 'Transformer Attention', 'RAG Pipelines', 'Agentic Workflows', 'Vector Databases', 'Model Alignment'].map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleDownloadCredential}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Verified Digital Credential (PDF)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyLink}
                  className="py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Credential'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Continue Learning</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
