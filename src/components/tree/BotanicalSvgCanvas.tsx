import React, { useState, useId } from 'react';
import { 
  TreePine, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Play, 
  ArrowRight,
  Briefcase,
  Star,
  Info,
  ArrowDownUp
} from 'lucide-react';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { DepartmentId, LeafCourse, UserEnrollment } from '../../types/tree';

interface BotanicalSvgCanvasProps {
  allCourses: LeafCourse[];
  enrollments?: Record<string, UserEnrollment>;
  onSelectCourse: (course: LeafCourse) => void;
  onOpenClassroom?: (courseId: string) => void;
  isUpsideDown?: boolean;
  onToggleUpsideDown?: () => void;
}

export const BotanicalSvgCanvas: React.FC<BotanicalSvgCanvasProps> = ({
  allCourses,
  enrollments = {},
  onSelectCourse,
  onOpenClassroom,
  isUpsideDown: propUpsideDown,
  onToggleUpsideDown
}) => {
  const [internalUpsideDown, setInternalUpsideDown] = useState<boolean>(true);
  const isUpsideDown = propUpsideDown !== undefined ? propUpsideDown : internalUpsideDown;
  const toggleUpsideDown = () => {
    if (onToggleUpsideDown) {
      onToggleUpsideDown();
    } else {
      setInternalUpsideDown(prev => !prev);
    }
  };
  const getY = (y: number) => isUpsideDown ? (760 - y) : y;
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedDeptId, setSelectedDeptId] = useState<DepartmentId | 'all'>('all');
  const [hoveredCourse, setHoveredCourse] = useState<LeafCourse | null>(null);
  const [activeCourse, setActiveCourse] = useState<LeafCourse | null>(allCourses[0] || null);
  const [hoveredStem, setHoveredStem] = useState<string | null>(null);

  // Department metadata for colors and visual accents
  const deptStyling: Record<DepartmentId, {
    stroke: string;
    fill: string;
    lightFill: string;
    border: string;
    text: string;
    leafColor: string;
  }> = {
    'tech-engineering': {
      stroke: '#059669', // emerald-600
      fill: '#10b981',
      lightFill: '#ecfdf5',
      border: 'border-emerald-300',
      text: 'text-emerald-800',
      leafColor: '#10b981'
    },
    'business-operations': {
      stroke: '#d97706', // amber-600
      fill: '#f59e0b',
      lightFill: '#fffbeb',
      border: 'border-amber-300',
      text: 'text-amber-800',
      leafColor: '#f59e0b'
    },
    'creative-service': {
      stroke: '#9333ea', // purple-600
      fill: '#a855f7',
      lightFill: '#faf5ff',
      border: 'border-purple-300',
      text: 'text-purple-800',
      leafColor: '#a855f7'
    },
    'education-human': {
      stroke: '#0284c7', // sky-600
      fill: '#0ea5e9',
      lightFill: '#f0f9ff',
      border: 'border-sky-300',
      text: 'text-sky-800',
      leafColor: '#0ea5e9'
    }
  };

  // Pre-calculate branch nodes for the SVG canvas
  // Coordinates are designed inside a 1200 x 780 canvas
  // Trunk base: (600, 720) -> (600, 560)
  const branches = [
    {
      deptId: 'tech-engineering' as DepartmentId,
      label: 'Technical & Engineering',
      iconEmoji: '⚙️',
      trunkStart: { x: 600, y: 560 },
      deptNode: { x: 260, y: 440 },
      curveControl: { x: 380, y: 560 },
      categories: [
        {
          id: 'branch-ai',
          name: 'AI & Intelligence',
          node: { x: 130, y: 310 },
          control: { x: 180, y: 380 },
          twigs: [
            { id: 'twig-gen-ai', name: 'GenAI & Agents', node: { x: 70, y: 190 } },
            { id: 'twig-mlops', name: 'MLOps Scale', node: { x: 170, y: 180 } }
          ]
        },
        {
          id: 'branch-cloud',
          name: 'Cloud & DevOps',
          node: { x: 270, y: 290 },
          control: { x: 260, y: 370 },
          twigs: [
            { id: 'twig-cloud-arch', name: 'Cloud Arch', node: { x: 250, y: 170 } },
            { id: 'twig-kubernetes', name: 'K8s Containers', node: { x: 330, y: 190 } }
          ]
        },
        {
          id: 'branch-programming',
          name: 'Full-Stack Software',
          node: { x: 380, y: 330 },
          control: { x: 340, y: 390 },
          twigs: [
            { id: 'twig-react', name: 'Modern React', node: { x: 390, y: 220 } },
            { id: 'twig-rust', name: 'Rust Systems', node: { x: 450, y: 240 } }
          ]
        }
      ]
    },
    {
      deptId: 'business-operations' as DepartmentId,
      label: 'Business & Operations',
      iconEmoji: '📈',
      trunkStart: { x: 600, y: 560 },
      deptNode: { x: 490, y: 430 },
      curveControl: { x: 530, y: 530 },
      categories: [
        {
          id: 'branch-product',
          name: 'Product Leadership',
          node: { x: 490, y: 290 },
          control: { x: 490, y: 370 },
          twigs: [
            { id: 'twig-product-strategy', name: 'Product Strategy', node: { x: 470, y: 170 } },
            { id: 'twig-product-analytics', name: 'Growth Analytics', node: { x: 540, y: 180 } }
          ]
        },
        {
          id: 'branch-marketing',
          name: 'Growth Marketing',
          node: { x: 590, y: 300 },
          control: { x: 560, y: 380 },
          twigs: [
            { id: 'twig-growth-mktg', name: 'Growth Engines', node: { x: 600, y: 190 } }
          ]
        }
      ]
    },
    {
      deptId: 'creative-service' as DepartmentId,
      label: 'Creative & Service',
      iconEmoji: '✨',
      trunkStart: { x: 600, y: 560 },
      deptNode: { x: 750, y: 430 },
      curveControl: { x: 680, y: 530 },
      categories: [
        {
          id: 'branch-hospitality',
          name: 'Hospitality Management',
          node: { x: 740, y: 300 },
          control: { x: 740, y: 370 },
          twigs: [
            { id: 'twig-hotel-ops', name: 'Luxury Hotel Ops', node: { x: 700, y: 190 } },
            { id: 'twig-guest-exp', name: 'Guest Experience', node: { x: 770, y: 190 } }
          ]
        },
        {
          id: 'branch-design',
          name: 'Design & Branding',
          node: { x: 840, y: 310 },
          control: { x: 800, y: 380 },
          twigs: [
            { id: 'twig-ui-ux', name: 'UX Architecture', node: { x: 830, y: 200 } }
          ]
        }
      ]
    },
    {
      deptId: 'education-human' as DepartmentId,
      label: 'Education & Human Sciences',
      iconEmoji: '🎓',
      trunkStart: { x: 600, y: 560 },
      deptNode: { x: 960, y: 440 },
      curveControl: { x: 840, y: 560 },
      categories: [
        {
          id: 'branch-instructional-design',
          name: 'Instructional Design',
          node: { x: 980, y: 310 },
          control: { x: 970, y: 380 },
          twigs: [
            { id: 'twig-curriculum-arch', name: 'Curriculum Systems', node: { x: 940, y: 190 } },
            { id: 'twig-corp-learning', name: 'Corporate L&D', node: { x: 1040, y: 200 } }
          ]
        },
        {
          id: 'branch-educational-tech',
          name: 'EdTech & AI Tutors',
          node: { x: 1090, y: 330 },
          control: { x: 1040, y: 390 },
          twigs: [
            { id: 'twig-ai-pedagogy', name: 'AI Pedagogy', node: { x: 1120, y: 210 } }
          ]
        }
      ]
    }
  ];

  // Helper to get matching courses for a twig or department
  const getCoursesForTwig = (twigId: string): LeafCourse[] => {
    return allCourses.filter(c => c.twigId === twigId);
  };

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
      
      {/* 1. Canvas Control Header */}
      <div className="p-4 sm:p-5 border-b border-stone-200 bg-white/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        
        {/* Metaphor Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs">
            <TreePine className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-stone-900">Living Botanical Upskilling Tree Canvas</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold uppercase">
                Interactive SVG Arbor
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Roots & Trunk → 4 Department Boughs → Category Limbs → Twigs → Course Leaves
            </p>
          </div>
        </div>

        {/* Filter by Department Bough */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedDeptId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              selectedDeptId === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            🌸 Full Bloom (All 4 Branches)
          </button>

          {TRUNK_DEPARTMENTS.map((dept) => {
            const isSelected = selectedDeptId === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-xs'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{dept.id === 'tech-engineering' ? '⚙️ Tech' : dept.id === 'business-operations' ? '📈 Business' : dept.id === 'creative-service' ? '✨ Creative' : '🎓 Education'}</span>
              </button>
            );
          })}
        </div>

        {/* Upside Down / Invert Tree Orientation Toggle */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={toggleUpsideDown}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isUpsideDown
                ? 'bg-amber-500 text-stone-950 shadow-xs ring-1 ring-amber-400 font-black'
                : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
            }`}
            title={isUpsideDown ? "Currently Upside Down (Top-Down Rooted). Click to make upright." : "Click to flip tree upside down (Top-Down Rooted Tree)"}
          >
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>{isUpsideDown ? "🔄 Upside Down (Top-Down)" : "🌳 Upright Arbor"}</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
            className="p-1.5 rounded-lg hover:bg-white text-stone-600 hover:text-stone-900 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1.5 text-stone-600">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.75))}
            className="p-1.5 rounded-lg hover:bg-white text-stone-600 hover:text-stone-900 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 rounded-lg hover:bg-white text-stone-600 hover:text-stone-900 transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 2. Interactive SVG Canvas Container */}
      <div className="relative bg-gradient-to-b from-emerald-50/20 via-stone-50/30 to-amber-50/20 overflow-hidden min-h-[580px] flex items-center justify-center p-2 sm:p-6 select-none">
        
        {/* Soft botanical subtle grid background */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#10b981 0.75px, transparent 0.75px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* SVG Drawing Canvas with Zoom Scaling */}
        <div 
          className="w-full transition-transform duration-300 origin-center flex justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 1200 760"
            className="w-full max-w-[1200px] h-auto drop-shadow-xs overflow-visible"
          >
            <defs>
              {/* Radial gradient for trunk */}
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="50%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              {/* Roots gradient */}
              <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>

              {/* Glow filter for active stems */}
              <filter id="branchGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#059669" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* A. GROUND SOIL & MOUND */}
            {isUpsideDown ? (
              <path
                d="M 300 10 Q 600 80 900 10 L 1200 0 L 0 0 Z"
                fill="url(#soilGrad)"
                opacity="0.8"
              />
            ) : (
              <path
                d="M 300 750 Q 600 680 900 750 L 1200 760 L 0 760 Z"
                fill="url(#soilGrad)"
                opacity="0.8"
              />
            )}

            {/* B. SPREADING ROOTS (Core Foundational Skills) */}
            {isUpsideDown ? (
              <g stroke="#92400e" strokeWidth="4" strokeLinecap="round" opacity="0.6">
                <path d="M 580 40 Q 520 20 420 10" />
                <path d="M 600 40 Q 600 15 610 5" />
                <path d="M 620 40 Q 690 22 780 10" />
                <path d="M 590 30 Q 550 15 500 5" strokeWidth="2.5" />
                <path d="M 610 30 Q 650 15 700 5" strokeWidth="2.5" />
              </g>
            ) : (
              <g stroke="#92400e" strokeWidth="4" strokeLinecap="round" opacity="0.6">
                <path d="M 580 720 Q 520 740 420 750" />
                <path d="M 600 720 Q 600 745 610 755" />
                <path d="M 620 720 Q 690 738 780 750" />
                <path d="M 590 730 Q 550 745 500 755" strokeWidth="2.5" />
                <path d="M 610 730 Q 650 745 700 755" strokeWidth="2.5" />
              </g>
            )}

            {/* Roots Label */}
            <text x="600" y={isUpsideDown ? 24 : 745} textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="700">
              {isUpsideDown ? "🌱 NoMySkill Foundation & Roots (Top-Down Rooted Tree)" : "🌱 NoMySkill Foundation & Lifelong Learning Roots"}
            </text>

            {/* C. MAIN TRUNK */}
            {isUpsideDown ? (
              <>
                <path
                  d="M 570 40 C 575 120 585 160 590 200 L 610 200 C 615 160 625 120 630 40 Z"
                  fill="url(#trunkGrad)"
                  stroke="#451a03"
                  strokeWidth="2"
                />
                {/* Trunk Wood Grain Details */}
                <path d="M 595 60 Q 598 120 600 180" stroke="#78350f" strokeWidth="2" strokeDasharray="6 3" className="animate-sap-flow" fill="none" />
                <path d="M 605 50 Q 602 110 600 170" stroke="#5d260a" strokeWidth="1.5" strokeDasharray="8 4" fill="none" />

                {/* Trunk Central Badge */}
                <g transform="translate(600, 130)">
                  <rect x="-85" y="-16" width="170" height="32" rx="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  <text x="0" y="4" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="800">
                    🪵 CAREER TRUNK
                  </text>
                </g>
              </>
            ) : (
              <>
                <path
                  d="M 570 720 C 575 640 585 600 590 560 L 610 560 C 615 600 625 640 630 720 Z"
                  fill="url(#trunkGrad)"
                  stroke="#451a03"
                  strokeWidth="2"
                />
                {/* Trunk Wood Grain Details */}
                <path d="M 595 700 Q 598 640 600 580" stroke="#78350f" strokeWidth="2" strokeDasharray="6 3" className="animate-sap-flow" fill="none" />
                <path d="M 605 710 Q 602 650 600 590" stroke="#5d260a" strokeWidth="1.5" strokeDasharray="8 4" fill="none" />

                {/* Trunk Central Badge */}
                <g transform="translate(600, 630)">
                  <rect x="-85" y="-16" width="170" height="32" rx="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  <text x="0" y="4" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="800">
                    🪵 CAREER TRUNK
                  </text>
                </g>
              </>
            )}

            {/* D. THE 4 MAIN DEPARTMENT BRANCHES & SUB-BRANCHES */}
            {branches.map((b) => {
              const isFilteredOut = selectedDeptId !== 'all' && selectedDeptId !== b.deptId;
              const isSelected = selectedDeptId === b.deptId;
              const styling = deptStyling[b.deptId];
              const opacity = isFilteredOut ? 0.2 : 1;

              return (
                <g 
                  key={b.deptId} 
                  opacity={opacity} 
                  className="transition-opacity duration-300"
                >
                  {/* Primary Branch Limb (from Trunk to Department Node) */}
                  <path
                    d={`M ${b.trunkStart.x} ${getY(b.trunkStart.y)} Q ${b.curveControl.x} ${getY(b.curveControl.y)} ${b.deptNode.x} ${getY(b.deptNode.y)}`}
                    fill="none"
                    stroke={styling.stroke}
                    strokeWidth={isSelected ? "12" : "9"}
                    strokeLinecap="round"
                  />

                  {/* Department Node Button */}
                  <g 
                    transform={`translate(${b.deptNode.x}, ${getY(b.deptNode.y)})`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedDeptId(isSelected ? 'all' : b.deptId)}
                  >
                    <circle
                      r="26"
                      fill="#ffffff"
                      stroke={styling.stroke}
                      strokeWidth="3.5"
                      className="filter drop-shadow-md transition-transform group-hover:scale-110"
                    />
                    <text x="0" y="-4" textAnchor="middle" fontSize="16">
                      {b.iconEmoji}
                    </text>
                    <text x="0" y="10" textAnchor="middle" fill={styling.stroke} fontSize="9" fontWeight="800">
                      BRANCH
                    </text>

                    {/* Department Title Pill */}
                    <g transform={`translate(0, ${isUpsideDown ? -38 : 38})`}>
                      <rect
                        x="-75"
                        y="-12"
                        width="150"
                        height="24"
                        rx="12"
                        fill="#ffffff"
                        stroke={styling.stroke}
                        strokeWidth="1.5"
                        className="filter drop-shadow-sm"
                      />
                      <text x="0" y="4" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="700">
                        {b.label}
                      </text>
                    </g>
                  </g>

                  {/* Secondary Category Limbs & Twigs */}
                  {b.categories.map((cat) => (
                    <g key={cat.id}>
                      {/* Curve from Department to Category Node */}
                      <path
                        d={`M ${b.deptNode.x} ${getY(b.deptNode.y)} Q ${cat.control.x} ${getY(cat.control.y)} ${cat.node.x} ${getY(cat.node.y)}`}
                        fill="none"
                        stroke={styling.stroke}
                        strokeWidth="5"
                        strokeLinecap="round"
                        opacity="0.85"
                      />

                      {/* Category Node */}
                      <g 
                        transform={`translate(${cat.node.x}, ${getY(cat.node.y)})`}
                        className="cursor-pointer"
                        onClick={() => setSelectedDeptId(b.deptId)}
                      >
                        <circle
                          r="16"
                          fill="#ffffff"
                          stroke={styling.stroke}
                          strokeWidth="2.5"
                          className="filter drop-shadow-xs hover:scale-110 transition-transform"
                        />
                        <text x="0" y="3" textAnchor="middle" fill={styling.stroke} fontSize="8" fontWeight="800">
                          🌿
                        </text>

                        {/* Category Label */}
                        <g transform={`translate(0, ${isUpsideDown ? 24 : -22})`}>
                          <rect
                            x="-50"
                            y="-9"
                            width="100"
                            height="18"
                            rx="9"
                            fill="#ffffff"
                            stroke="#d6d3d1"
                            strokeWidth="1"
                          />
                          <text x="0" y="3" textAnchor="middle" fill="#292524" fontSize="9" fontWeight="600">
                            {cat.name}
                          </text>
                        </g>
                      </g>

                      {/* Twigs branching off Category Node */}
                      {cat.twigs.map((twig) => {
                        const twigCourses = getCoursesForTwig(twig.id);

                        return (
                          <g key={twig.id}>
                            {/* Twig Line */}
                            <path
                              d={`M ${cat.node.x} ${getY(cat.node.y)} Q ${(cat.node.x + twig.node.x) / 2} ${(getY(cat.node.y) + getY(twig.node.y)) / 2 + (isUpsideDown ? -10 : 10)} ${twig.node.x} ${getY(twig.node.y)}`}
                              fill="none"
                              stroke="#059669"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeDasharray="4 2"
                              className="animate-sap-flow"
                            />

                            {/* Twig Blossom Node */}
                            <g transform={`translate(${twig.node.x}, ${getY(twig.node.y)})`}>
                              <circle
                                r="10"
                                fill="#d1fae5"
                                stroke="#10b981"
                                strokeWidth="2"
                              />
                              <text x="0" y="3" textAnchor="middle" fontSize="9">
                                🌱
                              </text>

                              {/* Twig Name Tag */}
                              <g transform={`translate(0, ${isUpsideDown ? 18 : -15})`}>
                                <rect
                                  x="-40"
                                  y="-8"
                                  width="80"
                                  height="16"
                                  rx="8"
                                  fill="#f0fdf4"
                                  stroke="#86efac"
                                  strokeWidth="1"
                                />
                                <text x="0" y="3" textAnchor="middle" fill="#065f46" fontSize="8" fontWeight="700">
                                  {twig.name}
                                </text>
                              </g>

                              {/* E. COURSE LEAF CLUSTERS (Attached to the Twig) */}
                              {twigCourses.map((course, idx) => {
                                const angle = isUpsideDown ? (((idx + 1) * 36) + 40) : (((idx + 1) * 36) - 50);
                                const distance = 42;
                                const leafX = Math.cos((angle * Math.PI) / 180) * distance;
                                const leafY = Math.sin((angle * Math.PI) / 180) * distance;
                                const enrollment = enrollments[course.id];
                                const isEnrolled = !!enrollment;
                                const isCompleted = enrollment?.certificateEarned;

                                return (
                                  <g 
                                    key={course.id}
                                    transform={`translate(${leafX}, ${leafY})`}
                                    className="cursor-pointer group animate-leaf-sway"
                                    onClick={() => {
                                      setActiveCourse(course);
                                      onSelectCourse(course);
                                    }}
                                    onMouseEnter={() => setHoveredCourse(course)}
                                    onMouseLeave={() => setHoveredCourse(null)}
                                  >
                                    {/* Stem connecting twig to leaf */}
                                    <line
                                      x1={-leafX}
                                      y1={-leafY}
                                      x2="0"
                                      y2="0"
                                      stroke="#84cc16"
                                      strokeWidth="1.5"
                                    />

                                    {/* The Botanical Course Leaf */}
                                    <path
                                      d="M 0 -14 C 10 -10 12 6 0 14 C -12 6 -10 -10 0 -14 Z"
                                      fill={isCompleted ? "#fbbf24" : isEnrolled ? "#34d399" : "#a3e635"}
                                      stroke={isCompleted ? "#d97706" : isEnrolled ? "#059669" : "#65a30d"}
                                      strokeWidth="2"
                                      className="transition-transform group-hover:scale-125 filter drop-shadow-sm"
                                    />

                                    {/* Leaf Rib */}
                                    <line x1="0" y1="-10" x2="0" y2="10" stroke="#ffffff" strokeWidth="1" opacity="0.8" />

                                    {/* Leaf Icon or Indicator */}
                                    <circle cx="0" cy="0" r="4" fill="#ffffff" />
                                    <text x="0" y="2.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#3f6212">
                                      {idx + 1}
                                    </text>

                                    {/* Hovering Course Leaf Label */}
                                    <g transform={`translate(0, ${isUpsideDown ? -26 : 24})`} className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                                      <rect
                                        x="-65"
                                        y="-10"
                                        width="130"
                                        height="20"
                                        rx="10"
                                        fill="#ffffff"
                                        stroke="#10b981"
                                        strokeWidth="1.5"
                                        className="filter drop-shadow-md"
                                      />
                                      <text x="0" y="3" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
                                        🍃 ₹{course.price} · {course.title.slice(0, 18)}...
                                      </text>
                                    </g>
                                  </g>
                                );
                              })}
                            </g>
                          </g>
                        );
                      })}
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Quick Legend */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 shadow-sm text-xs space-y-1.5 hidden sm:block">
          <p className="font-bold text-stone-900 flex items-center gap-1.5">
            <TreePine className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Tree Diagram Legend</span>
          </p>
          <div className="flex items-center gap-3 text-[11px] text-stone-600">
            <span className="flex items-center gap-1">🪵 <strong>Trunk</strong>: Core</span>
            <span className="flex items-center gap-1">🌲 <strong>Branches</strong>: Departments</span>
            <span className="flex items-center gap-1">🌿 <strong>Boughs</strong>: Categories</span>
            <span className="flex items-center gap-1">🌱 <strong>Twigs</strong>: Streams</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">🍃 <strong>Leaves</strong>: Courses</span>
          </div>
        </div>

      </div>

      {/* 3. Bottom Inspector Card for the Active / Clicked Course Leaf */}
      {activeCourse && (
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <img 
              src={activeCourse.thumbnail} 
              alt={activeCourse.title}
              className="w-14 h-14 rounded-xl object-cover border border-stone-200 shadow-xs flex-shrink-0" 
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-900 border border-lime-300 text-[10px] font-bold flex items-center gap-1">
                  🍃 Bloomed Course Leaf
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  {activeCourse.level} · {activeCourse.durationHours} Hours
                </span>
                {enrollments[activeCourse.id] && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">
                    ✓ Enrolled ({enrollments[activeCourse.id]?.progressPercent}% progress)
                  </span>
                )}
              </div>
              <h4 className="text-sm font-black text-stone-900 hover:text-emerald-700 transition-colors cursor-pointer" onClick={() => onSelectCourse(activeCourse)}>
                {activeCourse.title}
              </h4>
              <p className="text-xs text-stone-600 line-clamp-1 max-w-xl">
                {activeCourse.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <div className="text-right">
              <span className="text-lg font-black text-stone-900">₹{activeCourse.price}</span>
              <span className="text-xs text-stone-400 line-through block">₹{activeCourse.originalPrice}</span>
            </div>

            {enrollments[activeCourse.id] && onOpenClassroom ? (
              <button
                onClick={() => onOpenClassroom(activeCourse.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Launch Classroom</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectCourse(activeCourse)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span>Inspect Leaf & Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
