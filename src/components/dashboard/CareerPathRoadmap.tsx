import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TreePine, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  BookOpen, 
  GraduationCap,
  ShieldCheck,
  Target,
  Compass,
  Cpu,
  Factory,
  Briefcase
} from 'lucide-react';
import { LeafCourse, UserEnrollment, DepartmentId } from '../../types/tree';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';

interface CareerPathRoadmapProps {
  allCourses: LeafCourse[];
  enrollments: Record<string, UserEnrollment>;
  onSelectCourse: (course: LeafCourse) => void;
  onOpenClassroom: (courseId: string) => void;
}

export const CareerPathRoadmap: React.FC<CareerPathRoadmapProps> = ({
  allCourses,
  enrollments,
  onSelectCourse,
  onOpenClassroom
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<DepartmentId>('tech-engineering');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch-ai');

  const branches = BRANCH_CATEGORIES.filter(b => b.departmentId === selectedDeptId);

  // Calculate branch mastery stats
  const branchMasteryStats = BRANCH_CATEGORIES.map(branch => {
    const branchCourses = allCourses.filter(c => c.branchId === branch.id);
    const completedCourses = branchCourses.filter(c => {
      const e = enrollments[c.id];
      return e && (e.certificateEarned || e.progressPercent === 100);
    });
    const inProgressCourses = branchCourses.filter(c => {
      const e = enrollments[c.id];
      return e && !e.certificateEarned && e.progressPercent > 0;
    });

    const isMastered = branchCourses.length > 0 && completedCourses.length >= 1;
    const masteryPercent = branchCourses.length > 0 
      ? Math.round((completedCourses.length / branchCourses.length) * 100) 
      : 0;

    return {
      branch,
      totalCourses: branchCourses.length,
      completedCourses: completedCourses.length,
      inProgressCourses: inProgressCourses.length,
      isMastered,
      masteryPercent,
      courses: branchCourses
    };
  });

  const totalBranchesMastered = branchMasteryStats.filter(s => s.isMastered).length;
  const activeBranchStat = branchMasteryStats.find(s => s.branch.id === selectedBranchId) 
    || branchMasteryStats.find(s => s.branch.departmentId === selectedDeptId) 
    || branchMasteryStats[0];

  return (
    <div className="bg-white rounded-3xl border-2 border-stone-200 p-5 sm:p-8 shadow-sm space-y-8 text-stone-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Hierarchical Progression Roadmap</span>
            </span>
            <span className="text-stone-500 text-xs">Root to Leaf Path</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Career Path Visualization & Branch Mastery
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Track your upward climb from broad root foundations to master branches and harvested course leaves.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex items-center gap-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
            {totalBranchesMastered}/{BRANCH_CATEGORIES.length}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500">Mastered Branches</span>
            <p className="text-sm font-extrabold text-stone-900">
              {Math.round((totalBranchesMastered / BRANCH_CATEGORIES.length) * 100)}% Global Forest Growth
            </p>
          </div>
        </div>
      </div>

      {/* 5-STAGE ROOT-TO-LEAF VISUAL ROADMAP STEPPER */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>The 5 Growth Horizons: Root to Leaf</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          
          {/* Step 1: Soil Root */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">Stage 1</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs font-black text-stone-900">🌱 Soil & Roots</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">Foundational interest & skill baseline assessment</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800">100% Rooted</span>
          </div>

          {/* Step 2: Trunk Domains */}
          <div className="p-3.5 rounded-2xl bg-amber-100/60 border border-amber-300 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded">Stage 2</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs font-black text-stone-900">🪵 Trunk Selection</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">{selectedDeptId === 'tech-engineering' ? 'Tech & Engineering' : 'Selected Domain'}</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800">Active Stem</span>
          </div>

          {/* Step 3: Branches Mastery */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex flex-col justify-between space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded">Stage 3</span>
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs font-black text-stone-900">🌿 Branch Mastery</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">{totalBranchesMastered} categories mastered</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700">In Progression</span>
          </div>

          {/* Step 4: Twig Specializations */}
          <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-900 bg-teal-100 px-2 py-0.5 rounded">Stage 4</span>
              <Target className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h4 className="text-xs font-black text-stone-900">🌱 Twig Skill Nodes</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">Specialized sub-streams & lab tools</p>
            </div>
            <span className="text-[10px] font-bold text-teal-700">Deep Diving</span>
          </div>

          {/* Step 5: Leaf Harvest */}
          <div className="p-3.5 rounded-2xl bg-lime-50 border border-lime-200 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-lime-900 bg-lime-200 px-2 py-0.5 rounded">Stage 5</span>
              <Award className="w-4 h-4 text-lime-700" />
            </div>
            <div>
              <h4 className="text-xs font-black text-stone-900">🍃 Harvest & Credential</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">Verified certificates & career placement</p>
            </div>
            <span className="text-[10px] font-bold text-lime-800">Harvest Ready</span>
          </div>

        </div>
      </div>

      {/* DEPARTMENT SELECTOR TABS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
            Select Trunk Department to View Branch Mastery Roadmap:
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRUNK_DEPARTMENTS.map((dept) => {
            const isSelected = selectedDeptId === dept.id;
            const deptBranches = branchMasteryStats.filter(s => s.branch.departmentId === dept.id);
            const masteredCount = deptBranches.filter(s => s.isMastered).length;

            return (
              <button
                key={dept.id}
                onClick={() => {
                  setSelectedDeptId(dept.id);
                  const firstBranch = BRANCH_CATEGORIES.find(b => b.departmentId === dept.id);
                  if (firstBranch) setSelectedBranchId(firstBranch.id);
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500/30'
                    : 'border-stone-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-amber-800 uppercase">🪵 Trunk</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-700">
                      {masteredCount}/{deptBranches.length} Mastered
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-stone-900 leading-snug">{dept.name}</h4>
                </div>

                <div className="mt-3 w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${deptBranches.length ? (masteredCount / deptBranches.length) * 100 : 0}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* BRANCHES MASTERY GRID FOR SELECTED DEPARTMENT */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Branches in {TRUNK_DEPARTMENTS.find(d => d.id === selectedDeptId)?.name}:
            </span>
          </div>
          <span className="text-xs text-stone-500 font-medium">Click a branch to inspect its twigs & course leaves</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((branch) => {
            const stat = branchMasteryStats.find(s => s.branch.id === branch.id);
            const isSelected = selectedBranchId === branch.id;
            const isMastered = stat?.isMastered || false;

            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-1 ring-emerald-500/30'
                    : 'border-stone-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                      <span>🌿 Branch</span>
                    </span>

                    {isMastered ? (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>Mastered</span>
                      </span>
                    ) : stat?.inProgressCourses ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">
                        🌱 In Growth
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-medium">
                        Unexplored
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-extrabold text-stone-900">{branch.name}</h4>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2">{branch.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Mastery Progress:</span>
                    <span className="font-bold text-emerald-800">{stat?.completedCourses || 0} of {stat?.totalCourses || 0} Leaves Completed</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${isMastered ? 'bg-emerald-600' : 'bg-amber-500'}`}
                      style={{ width: `${stat?.masteryPercent || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED BRANCH DRILLDOWN & RECOMMENDED LEAVES */}
      {activeBranchStat && (
        <div className="p-5 rounded-2xl bg-stone-50 border-2 border-emerald-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Current Branch Focus:
                </span>
                <span className="text-sm font-extrabold text-stone-900">
                  🌿 {activeBranchStat.branch.name}
                </span>
                {activeBranchStat.isMastered && (
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                    ✓ Verified Mastered
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Complete all course leaves on this branch to achieve certified domain mastery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeBranchStat.courses.map((course) => {
              const enrollment = enrollments[course.id];
              const isCompleted = enrollment?.certificateEarned || (enrollment?.progressPercent === 100);
              const progress = enrollment?.progressPercent || 0;

              return (
                <div
                  key={course.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-3 bg-white ${
                    isCompleted
                      ? 'border-emerald-500 shadow-xs ring-1 ring-emerald-500/30'
                      : enrollment
                      ? 'border-amber-400'
                      : 'border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-lime-100 text-lime-900 text-[10px] font-bold">
                        🍃 Leaf
                      </span>
                      {isCompleted ? (
                        <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Mastered</span>
                        </span>
                      ) : enrollment ? (
                        <span className="text-[10px] font-bold text-amber-700">
                          {progress}% Done
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-stone-500">
                          Not Enrolled
                        </span>
                      )}
                    </div>

                    <h5 className="font-extrabold text-xs text-stone-900 line-clamp-1">{course.title}</h5>
                    <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">{course.summary}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <span className="font-bold text-stone-900">${course.price}</span>
                    {enrollment ? (
                      <button
                        onClick={() => onOpenClassroom(course.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        {isCompleted ? 'Review Leaf' : 'Resume Leaf'}
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        View Leaf
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
