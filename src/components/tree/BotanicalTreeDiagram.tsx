import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TreePine, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  RefreshCw, 
  Search,
  Briefcase,
  Star,
  Clock,
  Layers,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Cpu,
  TrendingUp,
  GraduationCap,
  Award,
  Factory,
  ShieldCheck,
  Wrench,
  Users,
  Target,
  Coins,
  Hotel,
  Play,
  Compass,
  Check,
  Maximize2,
  ArrowDownUp
} from 'lucide-react';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { DepartmentId, LeafCourse, UserEnrollment } from '../../types/tree';
import { LeafProgressIndicator } from '../course/LeafProgressIndicator';
import { BotanicalSvgCanvas } from './BotanicalSvgCanvas';
import { HierarchicalBranchingFlow } from './HierarchicalBranchingFlow';

interface BotanicalTreeDiagramProps {
  allCourses: LeafCourse[];
  enrollments?: Record<string, UserEnrollment>;
  onSelectCourse: (course: LeafCourse) => void;
  onFilterByNode?: (deptId?: DepartmentId, branchId?: string, twigId?: string) => void;
  onOpenClassroom?: (courseId: string) => void;
}

export const BotanicalTreeDiagram: React.FC<BotanicalTreeDiagramProps> = ({
  allCourses,
  enrollments = {},
  onSelectCourse,
  onFilterByNode,
  onOpenClassroom
}) => {
  // Visual presentation mode for the tree diagram
  const [diagramStyle, setDiagramStyle] = useState<'svg-tree' | 'mindmap-flow' | 'step-explorer'>('svg-tree');

  // Selected / expanded levels
  const [activeDeptId, setActiveDeptId] = useState<DepartmentId>('tech-engineering');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch-ai');
  const [selectedTwigId, setSelectedTwigId] = useState<string>('twig-gen-ai');
  
  // Bloom all toggle
  const [isFullBloom, setIsFullBloom] = useState<boolean>(false);
  const [isUpsideDown, setIsUpsideDown] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Department colors & styles
  const deptConfigs: Record<DepartmentId, {
    label: string;
    icon: React.ReactNode;
    colorBg: string;
    border: string;
    accent: string;
    lightPill: string;
    branchColor: string;
    badgeEmoji: string;
  }> = {
    'tech-engineering': {
      label: 'Technical & Engineering',
      icon: <Cpu className="w-5 h-5 text-emerald-700" />,
      colorBg: 'bg-emerald-50/70',
      border: 'border-emerald-300',
      accent: 'text-emerald-800',
      lightPill: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      branchColor: '#059669', // emerald-600
      badgeEmoji: '⚙️'
    },
    'business-operations': {
      label: 'Business & Operations',
      icon: <TrendingUp className="w-5 h-5 text-amber-700" />,
      colorBg: 'bg-amber-50/70',
      border: 'border-amber-300',
      accent: 'text-amber-800',
      lightPill: 'bg-amber-100 text-amber-900 border-amber-300',
      branchColor: '#d97706', // amber-600
      badgeEmoji: '📈'
    },
    'creative-service': {
      label: 'Creative & Service',
      icon: <Sparkles className="w-5 h-5 text-purple-700" />,
      colorBg: 'bg-purple-50/70',
      border: 'border-purple-300',
      accent: 'text-purple-800',
      lightPill: 'bg-purple-100 text-purple-900 border-purple-300',
      branchColor: '#9333ea', // purple-600
      badgeEmoji: '✨'
    },
    'education-human': {
      label: 'Education & Human Sciences',
      icon: <GraduationCap className="w-5 h-5 text-sky-700" />,
      colorBg: 'bg-sky-50/70',
      border: 'border-sky-300',
      accent: 'text-sky-800',
      lightPill: 'bg-sky-100 text-sky-900 border-sky-300',
      branchColor: '#0284c7', // sky-600
      badgeEmoji: '🎓'
    }
  };

  const activeDept = TRUNK_DEPARTMENTS.find(d => d.id === activeDeptId) || TRUNK_DEPARTMENTS[0];
  const activeBranches = BRANCH_CATEGORIES.filter(b => b.departmentId === activeDeptId);
  const activeBranch = BRANCH_CATEGORIES.find(b => b.id === selectedBranchId) || activeBranches[0];
  const activeTwigs = TWIG_SUB_STREAMS.filter(t => t.branchId === activeBranch?.id);
  const activeTwig = TWIG_SUB_STREAMS.find(t => t.id === selectedTwigId) || activeTwigs[0];

  // Courses filtered by twig or branch
  const activeCourses = allCourses.filter(c => {
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q);
    }
    return c.twigId === activeTwig?.id;
  });

  const handleSelectDept = (deptId: DepartmentId) => {
    setActiveDeptId(deptId);
    const firstBranch = BRANCH_CATEGORIES.find(b => b.departmentId === deptId);
    if (firstBranch) {
      setSelectedBranchId(firstBranch.id);
      const firstTwig = TWIG_SUB_STREAMS.find(t => t.branchId === firstBranch.id);
      if (firstTwig) setSelectedTwigId(firstTwig.id);
    }
    onFilterByNode?.(deptId);
  };

  const handleSelectBranch = (branchId: string) => {
    setSelectedBranchId(branchId);
    const firstTwig = TWIG_SUB_STREAMS.find(t => t.branchId === branchId);
    if (firstTwig) setSelectedTwigId(firstTwig.id);
    onFilterByNode?.(activeDeptId, branchId);
  };

  const handleSelectTwig = (twigId: string) => {
    setSelectedTwigId(twigId);
    onFilterByNode?.(activeDeptId, selectedBranchId, twigId);
  };

  const handleBloomEntireTree = () => {
    setIsFullBloom(!isFullBloom);
  };

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl shadow-sm overflow-hidden text-stone-900 relative">
      
      {/* Soft pastel ambient background aura - pleasant light botanical theme */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-emerald-50/60 via-amber-50/40 to-transparent pointer-events-none" />

      {/* 1. TOP CONTROL BAR */}
      <div className="p-4 sm:p-6 border-b border-stone-200 bg-white/95 backdrop-blur-md relative z-10 flex flex-wrap items-center justify-between gap-4">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs">
              <TreePine className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight text-stone-900">
                  The Living Upskilling Tree Diagram
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  Interactive Diagram
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Click any button on the tree: <strong className="text-amber-800">Trunk (Departments)</strong> → <strong className="text-emerald-800">Branches (Categories)</strong> → <strong className="text-teal-800">Twigs (Specializations)</strong> → <strong className="text-lime-700">Leaves (Courses)</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Tree Presentation Style Switcher */}
        <div className="flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-bold gap-1">
          <button
            onClick={() => setDiagramStyle('svg-tree')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              diagramStyle === 'svg-tree'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <TreePine className="w-3.5 h-3.5" />
            <span>🌳 Botanical Arbor (SVG)</span>
          </button>

          <button
            onClick={() => setDiagramStyle('mindmap-flow')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              diagramStyle === 'mindmap-flow'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>🗺️ Mindmap Branching</span>
          </button>

          <button
            onClick={() => setDiagramStyle('step-explorer')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              diagramStyle === 'step-explorer'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>🌱 Stem Explorer (4 Tiers)</span>
          </button>
        </div>

        {/* Tree Interactive Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={handleBloomEntireTree}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
              isFullBloom
                ? 'bg-amber-500 hover:bg-amber-600 text-stone-950'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFullBloom ? '🌲 Condensed Mode' : '🌸 Bloom All Departments'}</span>
          </button>

          <button
            onClick={() => handleSelectDept('tech-engineering')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border ${
              activeDeptId === 'tech-engineering'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-emerald-50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tech & AI</span>
          </button>

          <button
            onClick={() => handleSelectDept('business-operations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border ${
              activeDeptId === 'business-operations'
                ? 'bg-amber-100 text-amber-900 border-amber-400'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>Business</span>
          </button>

          <button
            onClick={() => setIsUpsideDown(!isUpsideDown)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
              isUpsideDown
                ? 'bg-amber-400 hover:bg-amber-500 text-stone-950 font-black ring-1 ring-amber-500'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
            }`}
            title="Toggle tree orientation: upside-down (top-down root) vs upright"
          >
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>{isUpsideDown ? '🔄 Tree: Upside Down' : '🌳 Tree: Upright'}</span>
          </button>

          <button
            onClick={() => {
              handleSelectDept('tech-engineering');
              setSelectedBranchId('branch-ai');
              setSelectedTwigId('twig-gen-ai');
              setSearchFilter('');
            }}
            className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-stone-500" />
            <span>Reset</span>
          </button>
        </div>

      </div>

      {/* RENDER VIEW 1: ORGANIC BOTANICAL SVG CANVAS */}
      {diagramStyle === 'svg-tree' && (
        <div className="p-4 sm:p-6 bg-stone-50/50">
          <BotanicalSvgCanvas
            allCourses={allCourses}
            onSelectCourse={onSelectCourse}
            onOpenClassroom={onOpenClassroom}
            isUpsideDown={isUpsideDown}
            onToggleUpsideDown={() => setIsUpsideDown(!isUpsideDown)}
          />
        </div>
      )}

      {/* RENDER VIEW 2: HIERARCHICAL MINDMAP FLOW */}
      {diagramStyle === 'mindmap-flow' && (
        <div className="p-4 sm:p-6 bg-stone-50/50">
          <HierarchicalBranchingFlow
            allCourses={allCourses}
            onSelectCourse={onSelectCourse}
            onOpenClassroom={onOpenClassroom}
          />
        </div>
      )}

      {/* RENDER VIEW 3: INTERACTIVE 4-TIER STEM EXPLORER */}
      {diagramStyle === 'step-explorer' && (
      <div className="p-4 sm:p-8 bg-stone-50/40 relative">

        {/* BREADCRUMB TRAIL OF THE ACTIVE STEM */}
        <div className="max-w-6xl mx-auto mb-6 p-3 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Active Growth Stem:</span>
            
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 flex items-center gap-1">
              <TreePine className="w-3.5 h-3.5 text-emerald-700" />
              <span>Root: Upskilling Tree</span>
            </span>

            <span className="text-stone-300">→</span>

            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold border border-amber-300 flex items-center gap-1">
              <span>🪵 Trunk: {activeDept.name}</span>
            </span>

            <span className="text-stone-300">→</span>

            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 flex items-center gap-1">
              <span>🌿 Branch: {activeBranch?.name}</span>
            </span>

            <span className="text-stone-300">→</span>

            <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-900 font-bold border border-teal-300 flex items-center gap-1">
              <span>🌱 Twig: {activeTwig?.name}</span>
            </span>

            <span className="text-stone-300">→</span>

            <span className="px-2.5 py-1 rounded-lg bg-lime-100 text-lime-900 font-bold border border-lime-300 flex items-center gap-1">
              <span>🍃 {activeCourses.length} Course Leaves</span>
            </span>
          </div>

          {/* Quick search input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tree courses..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* VISUAL HIERARCHICAL TREE CANVAS (LEVEL 1 -> LEVEL 2 -> LEVEL 3 -> LEVEL 4) */}
        {/* ============================================================ */}
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* LEVEL 1: TRUNK DEPARTMENTS (4 MAJOR BRANCHES) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-xs"></span>
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Level 1: Trunk Departments (Select a Department Branch)
                </span>
              </div>
              <span className="text-[11px] text-stone-500">4 Core Knowledge Trunks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {TRUNK_DEPARTMENTS.map((dept) => {
                const isSelected = activeDeptId === dept.id;
                const config = deptConfigs[dept.id];
                const branches = BRANCH_CATEGORIES.filter(b => b.departmentId === dept.id);
                const courses = allCourses.filter(c => c.departmentId === dept.id);

                return (
                  <motion.button
                    key={dept.id}
                    whileHover={{ scale: 1.025, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleSelectDept(dept.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/20 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${config.lightPill}`}>
                          🪵 Trunk Button
                        </span>
                        <span className="text-xs font-bold text-amber-800">
                          {branches.length} Branches
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-xs mt-0.5">
                          {config.icon}
                        </div>
                        <div>
                          <h3 className="font-black text-stone-900 text-sm leading-snug">
                            {dept.name}
                          </h3>
                          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                            {dept.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-emerald-800">
                        🍃 {courses.length} Leaves
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        isSelected ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {isSelected ? 'Active Branch ✓' : 'Click to Open'}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* CONNECTING STEM SVG CURVE */}
          <div className="flex justify-center -my-3 pointer-events-none">
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
              <path d="M12 0 V 28" stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />
              <circle cx="12" cy="14" r="3" fill="#10b981" />
            </svg>
          </div>

          {/* LEVEL 2: BRANCH CATEGORIES (Under Selected Department) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                  Level 2: Category Branches of {activeDept.name} ({activeBranches.length} Categories)
                </span>
              </div>
              <span className="text-[11px] text-stone-500">Click a Category Branch to inspect Twigs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {activeBranches.map((branch) => {
                const isSelected = selectedBranchId === branch.id;
                const twigs = TWIG_SUB_STREAMS.filter(t => t.branchId === branch.id);
                const courses = allCourses.filter(c => c.branchId === branch.id);

                return (
                  <motion.button
                    key={branch.id}
                    whileHover={{ scale: 1.025, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleSelectBranch(branch.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                        : 'bg-stone-50/60 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                          🌿 Category
                        </span>
                        <span className="text-[10px] text-stone-500 font-semibold">
                          {twigs.length} Twigs
                        </span>
                      </div>

                      <h4 className="font-bold text-stone-900 text-xs line-clamp-1">
                        {branch.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">
                        {branch.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-800 font-bold text-[10px]">
                        🍃 {courses.length} Courses
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-600 text-white' : 'text-stone-500'
                      }`}>
                        {isSelected ? 'Selected →' : 'Select'}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* CONNECTING STEM SVG CURVE */}
          <div className="flex justify-center -my-3 pointer-events-none">
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
              <path d="M12 0 V 28" stroke="#0d9488" strokeWidth="3" strokeDasharray="4 2" />
              <circle cx="12" cy="14" r="3" fill="#0d9488" />
            </svg>
          </div>

          {/* LEVEL 3: TWIG SPECIALIZATION BUTTONS */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-teal-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-500 inline-block"></span>
                <span className="text-xs font-black uppercase tracking-wider text-teal-900">
                  Level 3: Twig Focus Streams for "{activeBranch?.name}" ({activeTwigs.length} Twigs)
                </span>
              </div>
              <span className="text-[11px] text-stone-500">Click a Twig Button to Blossom Course Leaves</span>
            </div>

            {activeTwigs.length === 0 ? (
              <p className="text-xs text-stone-500 italic p-4 text-center">
                Specialized twigs are currently in cultivation for this branch category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {activeTwigs.map((twig) => {
                  const isSelected = selectedTwigId === twig.id;
                  const twigCourses = allCourses.filter(c => c.twigId === twig.id);

                  return (
                    <motion.button
                      key={twig.id}
                      whileHover={{ scale: 1.025, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleSelectTwig(twig.id)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-teal-50 border-teal-500 shadow-md ring-2 ring-teal-400/30'
                          : 'bg-stone-50/60 border-stone-200 hover:border-teal-300 hover:bg-teal-50/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-900 border border-teal-300">
                            🌱 Twig Button
                          </span>
                          <span className="text-[10px] text-emerald-800 font-bold">
                            🍃 {twigCourses.length}
                          </span>
                        </div>

                        <h5 className="font-bold text-stone-900 text-xs">
                          {twig.name}
                        </h5>
                        <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">
                          {twig.description}
                        </p>

                        {/* Skills preview */}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {twig.skillsFocus.slice(0, 2).map((s, idx) => (
                            <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-stone-200 text-teal-800 font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px]">
                        <span className="text-[10px] text-teal-800 font-semibold">
                          Specialization
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-teal-600 text-white' : 'text-stone-500'
                        }`}>
                          {isSelected ? 'Blooming ▼' : 'Click to Bloom'}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CONNECTING STEM SVG CURVE */}
          <div className="flex justify-center -my-3 pointer-events-none">
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
              <path d="M12 0 V 28" stroke="#84cc16" strokeWidth="3" strokeDasharray="4 2" />
              <circle cx="12" cy="14" r="3" fill="#84cc16" />
            </svg>
          </div>

          {/* LEVEL 4: COURSE LEAVES (The Purchasable / Learnable Modules on the Tree) */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white border-2 border-lime-300 shadow-md space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
                  🍃
                </div>
                <div>
                  <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                    <span>Level 4: Course Leaves for "{activeTwig?.name || 'Selected Twig'}"</span>
                    <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-900 border border-lime-300 text-[10px] font-bold">
                      {activeCourses.length} Leaves Bloomed
                    </span>
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Industry verified courses with salary vacancies, curriculum lessons, and certificates of completion.
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-emerald-800">
                Click any course leaf below to inspect or enroll
              </span>
            </div>

            {activeCourses.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 space-y-2">
                <TreePine className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="text-xs font-bold text-stone-700">No courses matching current query</p>
                <p className="text-[11px] text-stone-500">Select another twig button above to reveal its leaves.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeCourses.map((course) => {
                  const enrollment = enrollments[course.id];
                  const isEnrolled = !!enrollment;
                  const progressPercent = enrollment?.progressPercent ?? 0;
                  const isCompleted = enrollment?.certificateEarned || progressPercent === 100;

                  return (
                    <motion.div
                      key={course.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      initial={{ opacity: 0, scale: 0.95, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-2xl border-2 transition-all bg-white flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md ${
                        isCompleted
                          ? 'border-amber-400 ring-2 ring-amber-400/20'
                          : isEnrolled
                          ? 'border-emerald-400 ring-2 ring-emerald-400/20'
                          : 'border-stone-200 hover:border-emerald-400'
                      }`}
                    >
                      <div className="space-y-2.5">
                        
                        {/* Leaf Tag and Duration */}
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-900 border border-lime-300 text-[10px] font-black flex items-center gap-1">
                            <span>🍃 Course Leaf</span>
                          </span>

                          <div className="flex items-center gap-1.5">
                            {isCompleted ? (
                              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] flex items-center gap-1">
                                <Award className="w-3 h-3 text-amber-600" />
                                <span>Certificate Earned</span>
                              </span>
                            ) : isEnrolled ? (
                              <LeafProgressIndicator
                                progressPercent={progressPercent}
                                variant="ring"
                                size="sm"
                                theme="light"
                              />
                            ) : (
                              <span className="text-[10px] text-stone-500 font-medium">
                                {course.level} · {course.durationHours}h
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h4
                          onClick={() => onSelectCourse(course)}
                          className="font-black text-stone-900 text-sm leading-snug hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2"
                        >
                          {course.title}
                        </h4>

                        <p className="text-[11px] text-stone-600 line-clamp-2">
                          {course.summary}
                        </p>

                        {/* Target Job Profile / Vacancy */}
                        {course.targetJobVacancies && course.targetJobVacancies.length > 0 && (
                          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] space-y-0.5">
                            <div className="flex items-center justify-between text-emerald-900 font-bold">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3 text-emerald-700" />
                                <span>Target Career Vacancy:</span>
                              </span>
                              <span className="font-mono text-emerald-800">
                                {course.targetJobVacancies[0].avgSalary}
                              </span>
                            </div>
                            <p className="font-semibold text-stone-800 truncate">
                              {course.targetJobVacancies[0].title}
                            </p>
                          </div>
                        )}

                        {/* Growth Bar if enrolled */}
                        {isEnrolled && (
                          <div className="pt-2">
                            <LeafProgressIndicator
                              progressPercent={progressPercent}
                              variant="bar"
                              size="sm"
                              theme="light"
                              showStatusLabel={true}
                            />
                          </div>
                        )}

                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-black text-stone-900">₹{course.price}</span>
                          <span className="text-[10px] text-stone-400 line-through">₹{course.originalPrice}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isEnrolled && onOpenClassroom && (
                            <button
                              onClick={() => onOpenClassroom(course.id)}
                              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>Classroom</span>
                            </button>
                          )}

                          <button
                            onClick={() => onSelectCourse(course)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Inspect Leaf</span>
                            <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
      )}

    </div>
  );
};
