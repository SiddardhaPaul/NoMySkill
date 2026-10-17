import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Award, 
  TrendingUp, 
  RotateCw,
  Layers,
  CircleDot
} from 'lucide-react';

export interface LeafProgressIndicatorProps {
  progressPercent: number;
  completedLessonsCount?: number;
  totalLessonsCount?: number;
  variant?: 'ring' | 'bar' | 'both' | 'badge-ring';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  showStatusLabel?: boolean;
  showLessonCount?: boolean;
  allowToggle?: boolean;
  className?: string;
  onOpenClassroom?: () => void;
}

export function getLearnerGrowthStatus(percent: number) {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  if (p >= 100) {
    return {
      stage: 'bloomed' as const,
      title: 'Fully Bloomed & Mastered',
      badge: '🌳 Bloomed 100%',
      shortLabel: '100% Bloomed',
      textColor: 'text-lime-500 dark:text-lime-400',
      strokeColor: '#84cc16', // lime-500
      gradientId: 'grad-bloomed',
      badgeBg: 'bg-lime-50 text-lime-800 border-lime-300 dark:bg-lime-950/80 dark:text-lime-300 dark:border-lime-700/60',
      tagline: 'All lessons completed! Verified credential unlocked.',
      icon: Award
    };
  }
  if (p >= 60) {
    return {
      stage: 'maturing' as const,
      title: 'In Active Bloom',
      badge: `🌿 In Bloom (${p}%)`,
      shortLabel: `${p}% Bloom`,
      textColor: 'text-emerald-600 dark:text-emerald-400',
      strokeColor: '#10b981', // emerald-500
      gradientId: 'grad-maturing',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-700/60',
      tagline: 'Deep in the curriculum stem. Strong momentum!',
      icon: TrendingUp
    };
  }
  if (p >= 25) {
    return {
      stage: 'sprouting' as const,
      title: 'Sprouting Twig',
      badge: `🌱 Sprouting (${p}%)`,
      shortLabel: `${p}% Sprout`,
      textColor: 'text-teal-600 dark:text-teal-400',
      strokeColor: '#14b8a6', // teal-500
      gradientId: 'grad-sprouting',
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-300 dark:bg-teal-950/80 dark:text-teal-300 dark:border-teal-700/60',
      tagline: 'Early lessons rooted. Branching into core skills.',
      icon: Sparkles
    };
  }
  return {
    stage: 'seed' as const,
    title: p > 0 ? 'Seedling Taking Root' : 'Seed Planted',
    badge: p > 0 ? `🌱 Seedling (${p}%)` : '🌱 Seed Planted',
    shortLabel: `${p}% Seed`,
    textColor: 'text-amber-600 dark:text-amber-400',
    strokeColor: '#f59e0b', // amber-500
    gradientId: 'grad-seed',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-700/60',
    tagline: p > 0 ? 'First roots sprouting in fertile soil.' : 'Ready for Lesson 1 to begin growth.',
    icon: BookOpen
  };
}

export const LeafProgressIndicator: React.FC<LeafProgressIndicatorProps> = ({
  progressPercent,
  completedLessonsCount,
  totalLessonsCount,
  variant = 'both',
  size = 'md',
  theme = 'light',
  showStatusLabel = true,
  showLessonCount = true,
  allowToggle = false,
  className = '',
  onOpenClassroom
}) => {
  const [currentView, setCurrentView] = useState<'both' | 'ring' | 'bar'>(variant === 'badge-ring' ? 'ring' : variant);
  const normalizedPercent = Math.max(0, Math.min(100, Math.round(progressPercent)));
  const status = getLearnerGrowthStatus(normalizedPercent);
  const StatusIcon = status.icon;

  // Ring dimension configs based on size
  const ringConfigs = {
    sm: { dimension: 32, strokeWidth: 3.5, radius: 12, textSize: 'text-[9px]' },
    md: { dimension: 44, strokeWidth: 4, radius: 17, textSize: 'text-[11px]' },
    lg: { dimension: 64, strokeWidth: 5.5, radius: 25, textSize: 'text-sm' }
  };
  const config = ringConfigs[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (normalizedPercent / 100) * circumference;

  const isDark = theme === 'dark';
  const trackStroke = isDark ? '#292524' : '#e7e5e4'; // stone-800 : stone-200

  // 1. BADGE-RING (floating badge overlay for thumbnails or compact headers)
  if (variant === 'badge-ring') {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-md shadow-md border ${
          isDark 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
            : 'bg-white/95 border-stone-200 text-stone-900'
        } ${className}`}
        title={`${status.title}: ${normalizedPercent}% enrolled progress`}
      >
        <div className="relative flex items-center justify-center" style={{ width: config.dimension, height: config.dimension }}>
          <svg className="transform -rotate-90" width={config.dimension} height={config.dimension}>
            <circle
              cx={config.dimension / 2}
              cy={config.dimension / 2}
              r={config.radius}
              stroke={trackStroke}
              strokeWidth={config.strokeWidth}
              fill="transparent"
            />
            <motion.circle
              cx={config.dimension / 2}
              cy={config.dimension / 2}
              r={config.radius}
              stroke={status.strokeColor}
              strokeWidth={config.strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className={`absolute font-black ${config.textSize} font-mono`}>
            {normalizedPercent === 100 ? '✓' : `${normalizedPercent}%`}
          </span>
        </div>

        {showStatusLabel && (
          <div className="flex flex-col text-left pr-1">
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 leading-tight">
              {status.shortLabel}
            </span>
            <span className="text-[9px] text-stone-600 dark:text-stone-300 font-medium">
              Enrolled Learner
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2.5 ${className}`}>
      
      {/* Header with Status Badge and Optional Mode Toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-bold ${status.badgeBg}`}>
            <StatusIcon className="w-3 h-3" />
            <span>{status.badge}</span>
          </span>

          {showLessonCount && typeof completedLessonsCount === 'number' && typeof totalLessonsCount === 'number' && (
            <span className={`text-[11px] font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              {completedLessonsCount} / {totalLessonsCount} lessons
            </span>
          )}
        </div>

        {/* Optional View Switcher (Ring vs Bar) */}
        {allowToggle && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentView(v => v === 'ring' ? 'bar' : v === 'bar' ? 'both' : 'ring')}
              className={`p-1 rounded text-[10px] transition-colors ${
                isDark 
                  ? 'text-stone-400 hover:text-white hover:bg-stone-800' 
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title="Toggle between progress ring and growth bar views"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Main Visual Presentation: Ring, Bar, or Both */}
      <div className="flex items-center gap-3">
        
        {/* VISUAL PROGRESS RING */}
        {(currentView === 'ring' || currentView === 'both') && (
          <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: config.dimension, height: config.dimension }}>
            <svg className="transform -rotate-90" width={config.dimension} height={config.dimension}>
              <defs>
                <linearGradient id={`${status.gradientId}-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
              {/* Background Track Circle */}
              <circle
                cx={config.dimension / 2}
                cy={config.dimension / 2}
                r={config.radius}
                stroke={trackStroke}
                strokeWidth={config.strokeWidth}
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <motion.circle
                cx={config.dimension / 2}
                cy={config.dimension / 2}
                r={config.radius}
                stroke={`url(#${status.gradientId}-${isDark ? 'dark' : 'light'})`}
                strokeWidth={config.strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {normalizedPercent === 100 ? (
                <CheckCircle2 className={`w-4 h-4 ${status.textColor}`} />
              ) : (
                <span className={`font-black ${config.textSize} font-mono ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  {normalizedPercent}%
                </span>
              )}
            </div>
          </div>
        )}

        {/* VISUAL GROWTH BAR */}
        {(currentView === 'bar' || currentView === 'both') && (
          <div className="flex-1 space-y-1.5 min-w-0">
            <div className="flex items-center justify-between text-[11px]">
              <span className={`font-semibold flex items-center gap-1 ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                <span>Botanical Growth Track</span>
              </span>
              <span className={`font-black font-mono ${isDark ? 'text-white' : 'text-emerald-700'}`}>
                {normalizedPercent}%
              </span>
            </div>

            {/* Growth Bar Track with Milestones */}
            <div className={`w-full ${isDark ? 'bg-stone-800' : 'bg-stone-100'} h-2.5 rounded-full overflow-hidden relative border ${isDark ? 'border-stone-700' : 'border-stone-200/80'}`}>
              <motion.div
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-lime-500 h-full rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${normalizedPercent}%` }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subtle light shimmer along progress line */}
                <motion.div
                  className="absolute top-0 right-0 bottom-0 w-3 bg-white/60 rounded-full"
                  animate={{ opacity: [0.2, 0.9, 0.2] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </motion.div>

              {/* Botanical Milestone Indicators at 25%, 50%, 75% */}
              <div className="absolute inset-0 pointer-events-none flex justify-between px-1 items-center opacity-30">
                <span className="w-0.5 h-1.5 bg-stone-500 rounded-full" style={{ left: '25%' }} />
                <span className="w-0.5 h-1.5 bg-stone-500 rounded-full" style={{ left: '50%' }} />
                <span className="w-0.5 h-1.5 bg-stone-500 rounded-full" style={{ left: '75%' }} />
              </div>
            </div>

            {/* Learner Growth Status Subtitle */}
            <p className={`text-[10px] leading-tight truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              {status.tagline}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
