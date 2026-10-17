import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  Layers,
  ChevronRight,
  Compass,
  Award
} from 'lucide-react';
import { LeafCourse, UserEnrollment } from '../../types/tree';
import { TWIG_SUB_STREAMS, BRANCH_CATEGORIES, TRUNK_DEPARTMENTS } from '../../data/mockTreeData';

export interface CareerGoalConfig {
  id: string;
  title: string;
  departmentId: string;
  avgSalary: string;
  demandGrowth: string;
  description: string;
  requiredTwigIds: string[];
}

export const CAREER_GOALS: CareerGoalConfig[] = [
  {
    id: 'goal-principal-ai',
    title: 'Principal AI & LLM Systems Architect',
    departmentId: 'tech-engineering',
    avgSalary: '₹35L - ₹55L CTC',
    demandGrowth: '+38% YoY',
    description: 'Lead enterprise deployment of generative AI, large language models, agentic workflows, and high-throughput vector systems.',
    requiredTwigIds: ['twig-gen-ai', 'twig-comp-vision', 'twig-nlp', 'twig-mlops']
  },
  {
    id: 'goal-smart-mfg',
    title: 'Smart Manufacturing & Digital Twin Director',
    departmentId: 'tech-engineering',
    avgSalary: '₹28L - ₹42L CTC',
    demandGrowth: '+26% YoY',
    description: 'Architect modern Industry 4.0 physical-digital twin systems, autonomous robotics pipelines, and discrete event factory simulations.',
    requiredTwigIds: ['twig-industrial-eng', 'twig-manufacturing-ops', 'twig-robotics', 'twig-supply-chain']
  },
  {
    id: 'goal-vp-tech',
    title: 'VP of Technology & Enterprise Systems',
    departmentId: 'business-operations',
    avgSalary: '₹45L - ₹65L CTC',
    demandGrowth: '+22% YoY',
    description: 'Direct organizational digital transformation, aligning cross-functional engineering teams with enterprise profit models and AI governance.',
    requiredTwigIds: ['twig-gen-ai', 'twig-enterprise-tech', 'twig-product-strategy', 'twig-operations-mgmt']
  },
  {
    id: 'goal-robotics-lead',
    title: 'Autonomous Robotics & Control Systems Lead',
    departmentId: 'tech-engineering',
    avgSalary: '₹30L - ₹48L CTC',
    demandGrowth: '+31% YoY',
    description: 'Design real-time sensor fusion, kinematic trajectory planning, and perception engines for industrial robots and mobile cobots.',
    requiredTwigIds: ['twig-robotics', 'twig-comp-vision', 'twig-industrial-eng', 'twig-embedded-systems']
  }
];

interface KnowledgeGapAnalyzerProps {
  allCourses: LeafCourse[];
  enrollments: Record<string, UserEnrollment>;
  onSelectCourse: (course: LeafCourse) => void;
  onOpenClassroom: (courseId: string) => void;
}

export const KnowledgeGapAnalyzer: React.FC<KnowledgeGapAnalyzerProps> = ({
  allCourses,
  enrollments,
  onSelectCourse,
  onOpenClassroom
}) => {
  const [selectedGoalId, setSelectedGoalId] = useState<string>(CAREER_GOALS[0].id);

  const activeGoal = CAREER_GOALS.find(g => g.id === selectedGoalId) || CAREER_GOALS[0];

  // Evaluate knowledge gaps for active goal
  const twigGapAnalysis = activeGoal.requiredTwigIds.map(twigId => {
    // Find twig definition or fallback
    const twig = TWIG_SUB_STREAMS.find(t => t.id === twigId) || {
      id: twigId,
      name: twigId.replace(/^twig-/, '').replace(/-/g, ' ').toUpperCase(),
      branchId: 'branch-ai',
      description: 'Key technical prerequisite specialization in the Upskilling Tree.',
      skillsFocus: ['Core Competencies', 'Industry Verification']
    };

    const branch = BRANCH_CATEGORIES.find(b => b.id === twig.branchId);

    // Find all courses corresponding to this twig
    const coursesInTwig = allCourses.filter(c => c.twigId === twigId);

    // Check completion status from enrollments
    const completedCourses = coursesInTwig.filter(c => {
      const e = enrollments[c.id];
      return e && (e.certificateEarned || e.progressPercent === 100);
    });

    const inProgressCourses = coursesInTwig.filter(c => {
      const e = enrollments[c.id];
      return e && !e.certificateEarned && e.progressPercent > 0;
    });

    const isMastered = completedCourses.length > 0;
    const isInProgress = !isMastered && inProgressCourses.length > 0;
    const isMissingGap = !isMastered && !isInProgress;

    // Pick top recommended course leaf to bridge the gap
    const recommendedLeafCourse = coursesInTwig[0] || allCourses[0];

    return {
      twig,
      branch,
      coursesInTwig,
      completedCourses,
      inProgressCourses,
      isMastered,
      isInProgress,
      isMissingGap,
      recommendedLeafCourse
    };
  });

  const masteredCount = twigGapAnalysis.filter(t => t.isMastered).length;
  const inProgressCount = twigGapAnalysis.filter(t => t.isInProgress).length;
  const missingCount = twigGapAnalysis.filter(t => t.isMissingGap).length;
  const totalCount = twigGapAnalysis.length;

  const readinessScore = Math.round(((masteredCount + (inProgressCount * 0.5)) / totalCount) * 100);

  return (
    <div className="bg-white rounded-3xl border-2 border-stone-200 p-5 sm:p-8 shadow-sm space-y-8 text-stone-900">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-700" />
              <span>Career Readiness Diagnostic</span>
            </span>
            <span className="text-stone-500 text-xs">Upskilling Taxonomy Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Knowledge Gap Analyzer
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Identifies missing prerequisite twigs between your current mastered leaf courses and high-paying industry target positions.
          </p>
        </div>

        {/* Readiness Gauge Card */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center gap-4 flex-shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex flex-col items-center justify-center font-black shadow-sm">
            <span className="text-lg leading-none">{readinessScore}%</span>
            <span className="text-[9px] uppercase tracking-tighter opacity-80">Ready</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500">Prerequisite Status</span>
            <p className="text-sm font-extrabold text-stone-900">
              {masteredCount} Mastered · {missingCount} Missing Twigs
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold">
              {missingCount === 0 ? '✓ 100% Qualified for Role' : `Bridge ${missingCount} gaps to qualify`}
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: CAREER GOAL SELECTOR */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
          1. Select Your Target Career Goal:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAREER_GOALS.map((goal) => {
            const isSelected = selectedGoalId === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoalId(goal.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500/30'
                    : 'border-stone-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {goal.demandGrowth}
                    </span>
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="font-extrabold text-xs text-stone-900 leading-snug">{goal.title}</h4>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-stone-700">{goal.avgSalary}</span>
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`}>
                    {isSelected ? 'Selected' : 'Select'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE GOAL SUMMARY CARD */}
      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-sm text-stone-900">
              Role Target: {activeGoal.title}
            </h3>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Avg {activeGoal.avgSalary}
            </span>
          </div>
          <p className="text-xs text-stone-600">
            {activeGoal.description}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-bold text-stone-700">
            Requires {activeGoal.requiredTwigIds.length} Foundation Twigs
          </span>
        </div>
      </div>

      {/* STEP 2: PREREQUISITE TWIG AUDIT (MASTERED VS MISSING GAPS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>2. Prerequisite Twig Gap Breakdown:</span>
          </h3>
          <span className="text-xs text-stone-500 font-medium">
            {masteredCount} Mastered · {missingCount} Missing Prerequisite Twigs
          </span>
        </div>

        <div className="space-y-3">
          {twigGapAnalysis.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  item.isMastered
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : item.isInProgress
                    ? 'bg-amber-50/40 border-amber-300'
                    : 'bg-white border-stone-200 shadow-xs'
                }`}
              >
                {/* Left: Twig Details & Status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Status Badge */}
                    {item.isMastered ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>Mastered Twig</span>
                      </span>
                    ) : item.isInProgress ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-950" />
                        <span>In Progress (Enrolled)</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300 font-bold text-[10px] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        <span>Missing Prerequisite Gap</span>
                      </span>
                    )}

                    <span className="text-xs font-bold text-stone-900 flex items-center gap-1">
                      <span>🌱 Twig:</span>
                      <span>{item.twig.name}</span>
                    </span>

                    {item.branch && (
                      <span className="text-[11px] text-stone-500">
                        (Branch: {item.branch.name})
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600">
                    {item.twig.description}
                  </p>

                  <div className="flex flex-wrap gap-1 text-[10px] pt-1 text-stone-600">
                    <span className="font-semibold text-stone-700">Competency Focus:</span>
                    {item.twig.skillsFocus?.map((skill, sIdx) => (
                      <span key={sIdx} className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Action or Proof */}
                <div className="flex items-center gap-3 flex-shrink-0 border-t md:border-t-0 md:border-l border-stone-200 pt-3 md:pt-0 md:pl-4">
                  {item.isMastered ? (
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 justify-end">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>Credential Earned</span>
                      </span>
                      <p className="text-[10px] text-stone-500">Prerequisite fulfilled</p>
                    </div>
                  ) : item.isInProgress ? (
                    <button
                      onClick={() => onOpenClassroom(item.inProgressCourses[0]?.id || '')}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Resume Twig Course</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] text-red-700 font-bold uppercase">Bridge This Gap:</p>
                        <p className="text-xs font-extrabold text-stone-900 truncate max-w-[180px]">
                          {item.recommendedLeafCourse.title}
                        </p>
                      </div>
                      <button
                        onClick={() => onSelectCourse(item.recommendedLeafCourse)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Bridge Gap: View Leaf</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
