import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Droplets, 
  Sparkles, 
  TreePine, 
  Flame, 
  Calendar, 
  CheckCircle2, 
  Zap, 
  Award,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  ArrowDownUp
} from 'lucide-react';
import { UserEnrollment } from '../../types/tree';

interface SunlightWaterGardenProps {
  enrollments?: Record<string, UserEnrollment>;
  onTriggerMastery?: () => void;
}

export const SunlightWaterGarden: React.FC<SunlightWaterGardenProps> = ({
  enrollments = {},
  onTriggerMastery
}) => {
  // Stored or initial gamification values
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('nomyskill_sunlight_streak');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [waterLevel, setWaterLevel] = useState<number>(() => {
    const saved = localStorage.getItem('nomyskill_water_level');
    return saved ? parseInt(saved, 10) : 75;
  });

  const [sunlightLevel, setSunlightLevel] = useState<number>(() => {
    const saved = localStorage.getItem('nomyskill_sunlight_level');
    return saved ? parseInt(saved, 10) : 82;
  });

  const [lastWateredTime, setLastWateredTime] = useState<string>('Just now');
  const [waterEffectActive, setWaterEffectActive] = useState<boolean>(false);
  const [sunlightEffectActive, setSunlightEffectActive] = useState<boolean>(false);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);
  const [isUpsideDown, setIsUpsideDown] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('nomyskill_sunlight_streak', streakDays.toString());
    localStorage.setItem('nomyskill_water_level', waterLevel.toString());
    localStorage.setItem('nomyskill_sunlight_level', sunlightLevel.toString());
  }, [streakDays, waterLevel, sunlightLevel]);

  // Handle Watering Action
  const handleWaterTree = () => {
    setWaterEffectActive(true);
    setWaterLevel(prev => Math.min(100, prev + 12));
    setLastWateredTime('Just now');
    setCelebrationMessage('💧 Fresh droplets absorbed! Your tree sprouted +2 vibrant leaves!');
    setTimeout(() => setWaterEffectActive(false), 1500);
    setTimeout(() => setCelebrationMessage(null), 4000);
  };

  // Handle Sunlight Check-in
  const handleSoakSunlight = () => {
    setSunlightEffectActive(true);
    setSunlightLevel(prev => Math.min(100, prev + 15));
    setStreakDays(prev => prev + 1);
    setCelebrationMessage(`☀️ Daily streak upgraded to ${streakDays + 1} Days! Sunlight boost unlocked!`);
    setTimeout(() => setSunlightEffectActive(false), 1500);
    setTimeout(() => setCelebrationMessage(null), 4000);
  };

  // Tree Vitality State
  const overallVitality = Math.round((sunlightLevel * 0.5) + (waterLevel * 0.5));
  
  // Calculate leaf visual count based on vitality (between 6 and 24 leaves)
  const leafCount = Math.max(6, Math.min(24, Math.round((overallVitality / 100) * 24)));
  
  // Vibrant leaf color depending on vitality
  const leafFillColor = overallVitality > 85 ? '#059669' : overallVitality > 60 ? '#10b981' : '#84cc16';
  const leafAccentColor = overallVitality > 80 ? '#f59e0b' : '#34d399';

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-200 shadow-sm overflow-hidden text-stone-900">
      
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-50/70 via-emerald-50/50 to-teal-50/40 border-b border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold shadow-xs">
              <Sun className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-stone-900">Sunlight & Water Tree Gamification</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                Level {Math.floor(overallVitality / 20) + 1} Botanical Health
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-600 max-w-xl">
            Keep your knowledge tree thriving! Daily login streaks supply <strong>Sunlight ☀️</strong>, while completed lessons and quizzes hydrate it with <strong>Water 💧</strong>. Watch your leaves bloom into vivid emeralds.
          </p>
        </div>

        {/* Vitality Gauge Card */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs flex-shrink-0">
          <div className="text-right">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Overall Vitality</p>
            <p className="text-2xl font-black text-emerald-700">{overallVitality}%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
            <TreePine className="w-7 h-7 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Controls & Metrics vs Dynamic Living SVG Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        
        {/* Left 6 cols: Gamification Metrics & Interactive Action Buttons */}
        <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
          
          {/* Sunlight Card */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-400 text-amber-950 shadow-xs">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-900">Daily Sunlight (Login Streak)</h4>
                  <p className="text-xs text-stone-600">{streakDays} Consecutive Days Logged</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-amber-200 text-amber-900 text-xs font-black">
                {sunlightLevel}% Photons
              </span>
            </div>

            {/* Sunlight Progress Bar */}
            <div className="w-full bg-white h-3 rounded-full overflow-hidden border border-amber-200">
              <motion.div 
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full"
                animate={{ width: `${sunlightLevel}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-stone-500 text-[11px]">Streak Bonus: 1.5x Knowledge Harvest</span>
              <button
                onClick={handleSoakSunlight}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Soak Sunlight (+1 Day)</span>
              </button>
            </div>
          </div>

          {/* Water Card */}
          <div className="p-4 rounded-2xl bg-cyan-50/60 border-2 border-cyan-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500 text-white shadow-xs">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-900">Water Hydration (Lesson Activity)</h4>
                  <p className="text-xs text-stone-600">Last watered: {lastWateredTime}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-cyan-200 text-cyan-900 text-xs font-black">
                {waterLevel}% Hydrated
              </span>
            </div>

            {/* Water Progress Bar */}
            <div className="w-full bg-white h-3 rounded-full overflow-hidden border border-cyan-200">
              <motion.div 
                className="bg-gradient-to-r from-cyan-400 to-teal-500 h-full rounded-full"
                animate={{ width: `${waterLevel}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-stone-500 text-[11px]">Next micro-lesson unlocks golden fruit</span>
              <button
                onClick={handleWaterTree}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>Water My Tree (+12%)</span>
              </button>
            </div>
          </div>

          {/* Toast / Notification Alert */}
          <AnimatePresence>
            {celebrationMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between gap-2 shadow-xs"
              >
                <span>{celebrationMessage}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gamification perks breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Tree Canopy Status</span>
              <p className="font-extrabold text-stone-800 mt-0.5">{leafCount} Active Leaves Bloomed</p>
              <p className="text-[10px] text-emerald-700 font-semibold">Vibrant Lush Foliage</p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Photosynthesis Rate</span>
              <p className="font-extrabold text-stone-800 mt-0.5">{overallVitality > 75 ? 'Optimal (Peak Growth)' : 'Moderate'}</p>
              <p className="text-[10px] text-amber-700 font-semibold">2x Branch Mastery Points</p>
            </div>
          </div>

        </div>

        {/* Right 6 cols: Dynamically Evolving Botanical SVG Tree Canvas */}
        <div className="lg:col-span-6 bg-gradient-to-b from-emerald-50/40 to-stone-50 rounded-2xl border-2 border-stone-200 p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[340px]">
          
          {/* Upside Down Tree Flip Button */}
          <button
            onClick={() => setIsUpsideDown(!isUpsideDown)}
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-white/90 hover:bg-white text-stone-800 px-3 py-1.5 rounded-full border border-stone-200 text-xs font-bold shadow-xs cursor-pointer transition-colors"
            title="Toggle tree orientation: upside-down (top-down root) vs upright"
          >
            <ArrowDownUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isUpsideDown ? '🔄 Upside Down' : '🌳 Upright'}</span>
          </button>

          {/* Animated Sun in upper right */}
          <motion.div 
            className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-100/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-amber-300 text-amber-900 text-xs font-bold z-20"
            animate={{ scale: sunlightEffectActive ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '12s' }} />
            <span>{streakDays}d Streak Active</span>
          </motion.div>

          {/* Falling Water Droplets Animation when Water button clicked */}
          <AnimatePresence>
            {waterEffectActive && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 120 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-x-0 top-6 flex justify-around pointer-events-none z-20"
              >
                {[...Array(6)].map((_, i) => (
                  <Droplets key={i} className="w-6 h-6 text-cyan-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Dynamic Botanical SVG Tree */}
          <div className="w-full flex justify-center transition-transform duration-500" style={{ transform: isUpsideDown ? 'scaleY(-1)' : 'none' }}>
          <svg viewBox="0 0 400 320" className="w-full max-w-sm h-64 overflow-visible">
            <defs>
              {/* Trunk Wood Gradient */}
              <linearGradient id="trunkWood" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="50%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              {/* Foliage Glow */}
              <filter id="foliageGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={leafFillColor} floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Tree Base Mound / Soil */}
            <ellipse cx="200" cy="290" rx="140" ry="20" fill="#e7e5e4" stroke="#d6d3d1" strokeWidth="2" />
            <ellipse cx="200" cy="288" rx="110" ry="14" fill="#a8a29e" />
            <path d="M150 288 Q200 280 250 288" stroke="#78716c" strokeWidth="3" fill="none" />

            {/* Main Tree Trunk */}
            <path 
              d="M185 288 C185 240 180 200 188 170 C192 145 198 130 200 110 C202 130 208 145 212 170 C220 200 215 240 215 288 Z" 
              fill="url(#trunkWood)" 
              stroke="#572808"
              strokeWidth="2"
            />

            {/* Main Primary Branches */}
            {/* Left Branch */}
            <path d="M192 170 Q150 150 110 130 Q80 120 60 110" stroke="#78350f" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M110 130 Q90 100 75 75" stroke="#92400e" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Right Branch */}
            <path d="M208 170 Q250 150 290 130 Q320 120 340 110" stroke="#78350f" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M290 130 Q310 100 325 75" stroke="#92400e" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Top Central Crown Branch */}
            <path d="M200 110 Q190 70 170 40" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M200 110 Q210 70 230 40" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />

            {/* Dynamic Leaves Blooming along the branches */}
            {/* Left Canopy Cluster */}
            <g filter="url(#foliageGlow)">
              <circle cx="60" cy="110" r={Math.min(24, 12 + leafCount * 0.5)} fill={leafFillColor} />
              <circle cx="75" cy="75" r={Math.min(22, 10 + leafCount * 0.4)} fill={leafFillColor} />
              <circle cx="95" cy="115" r={Math.min(20, 8 + leafCount * 0.3)} fill={leafAccentColor} opacity="0.9" />
              <circle cx="45" cy="95" r={Math.min(18, 6 + leafCount * 0.3)} fill={leafFillColor} />
            </g>

            {/* Central Top Crown Cluster */}
            <g filter="url(#foliageGlow)">
              <circle cx="200" cy="45" r={Math.min(32, 14 + leafCount * 0.7)} fill={leafFillColor} />
              <circle cx="170" cy="40" r={Math.min(26, 12 + leafCount * 0.5)} fill={leafAccentColor} opacity="0.95" />
              <circle cx="230" cy="40" r={Math.min(26, 12 + leafCount * 0.5)} fill={leafFillColor} />
              <circle cx="200" cy="80" r={Math.min(24, 10 + leafCount * 0.4)} fill={leafFillColor} />
            </g>

            {/* Right Canopy Cluster */}
            <g filter="url(#foliageGlow)">
              <circle cx="340" cy="110" r={Math.min(24, 12 + leafCount * 0.5)} fill={leafFillColor} />
              <circle cx="325" cy="75" r={Math.min(22, 10 + leafCount * 0.4)} fill={leafFillColor} />
              <circle cx="305" cy="115" r={Math.min(20, 8 + leafCount * 0.3)} fill={leafAccentColor} opacity="0.9" />
              <circle cx="355" cy="95" r={Math.min(18, 6 + leafCount * 0.3)} fill={leafFillColor} />
            </g>

            {/* Golden Achievement Apples / Blossoms if Vitality > 80% */}
            {overallVitality > 75 && (
              <g>
                <circle cx="150" cy="65" r="7" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="250" cy="65" r="7" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="100" cy="95" r="6" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="300" cy="95" r="6" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
              </g>
            )}

            {/* Vitality Indicator Tag on the Trunk */}
            <rect x="160" y="220" width="80" height="22" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="200" y="235" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">
              🌿 {overallVitality}% Vitality
            </text>
          </svg>
          </div>

          {/* Bottom Caption */}
          <div className="mt-2 text-center text-xs">
            <span className="font-extrabold text-stone-800">
              {overallVitality > 80 ? '🌳 Grand Blooming Canopy' : '🌱 Growing Young Tree'}
            </span>
            <span className="text-stone-500 ml-2">
              · {leafCount} foliage nodes sustained by your learning
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
