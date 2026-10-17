import React, { useState } from 'react';
import { 
  TreePine, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Play, 
  ArrowRight,
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { DepartmentId, LeafCourse, UserEnrollment } from '../../types/tree';

interface HierarchicalBranchingFlowProps {
  allCourses: LeafCourse[];
  enrollments?: Record<string, UserEnrollment>;
  onSelectCourse: (course: LeafCourse) => void;
  onOpenClassroom?: (courseId: string) => void;
  onFilterByNode?: (deptId?: DepartmentId, branchId?: string, twigId?: string) => void;
}

export const HierarchicalBranchingFlow: React.FC<HierarchicalBranchingFlowProps> = ({
  allCourses,
  enrollments = {},
  onSelectCourse,
  onOpenClassroom,
  onFilterByNode
}) => {
  // Expansion states
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({
    'tech-engineering': true,
    'business-operations': true,
    'creative-service': false,
    'education-human': false
  });

  const [expandedBranches, setExpandedBranches] = useState<Record<string, boolean>>({
    'branch-ai': true,
    'branch-cloud': true,
    'branch-product': true,
    'branch-marketing': true
  });

  const [expandedTwigs, setExpandedTwigs] = useState<Record<string, boolean>>({
    'twig-gen-ai': true,
    'twig-mlops': true,
    'twig-product-strategy': true
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleDept = (deptId: string) => {
    setExpandedDepts(prev => ({ ...prev, [deptId]: !prev[deptId] }));
  };

  const toggleBranch = (branchId: string) => {
    setExpandedBranches(prev => ({ ...prev, [branchId]: !prev[branchId] }));
  };

  const toggleTwig = (twigId: string) => {
    setExpandedTwigs(prev => ({ ...prev, [twigId]: !prev[twigId] }));
  };

  const expandAll = () => {
    const allDepts: Record<string, boolean> = {};
    TRUNK_DEPARTMENTS.forEach(d => { allDepts[d.id] = true; });
    const allB: Record<string, boolean> = {};
    BRANCH_CATEGORIES.forEach(b => { allB[b.id] = true; });
    const allT: Record<string, boolean> = {};
    TWIG_SUB_STREAMS.forEach(t => { allT[t.id] = true; });
    setExpandedDepts(allDepts);
    setExpandedBranches(allB);
    setExpandedTwigs(allT);
  };

  const collapseAll = () => {
    setExpandedDepts({});
    setExpandedBranches({});
    setExpandedTwigs({});
  };

  const deptIcons: Record<DepartmentId, React.ReactNode> = {
    'tech-engineering': <Cpu className="w-4 h-4 text-emerald-700" />,
    'business-operations': <TrendingUp className="w-4 h-4 text-amber-700" />,
    'creative-service': <Sparkles className="w-4 h-4 text-purple-700" />,
    'education-human': <GraduationCap className="w-4 h-4 text-sky-700" />
  };

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl overflow-hidden shadow-sm space-y-4">
      
      {/* 1. Header Toolbar */}
      <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs">
              <TreePine className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">
                Hierarchical Branching Flow Diagram
              </h3>
              <p className="text-xs text-stone-500">
                Interactive Mindmap Tree: Branches (Departments) → Categories → Twigs → Leaves (Courses)
              </p>
            </div>
          </div>
        </div>

        {/* Global Search and Expand / Collapse Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter branches or courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-500 shadow-xs"
            />
          </div>

          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Expand All</span>
          </button>

          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Minimize2 className="w-3 h-3" />
            <span>Collapse</span>
          </button>
        </div>
      </div>

      {/* 2. The Interactive Tree Flow Chart Canvas */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[800px] space-y-6">
          
          {/* ROOT NODE: NomySkill Upskilling Engine */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-stone-900 text-sm">🌳 ROOT: The Upskilling Knowledge Tree</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 border border-emerald-300">
                  4 Main Department Branches
                </span>
              </div>
              <p className="text-[11px] text-stone-600">
                Foundational career trunk branching into industry specializations and certified course leaves.
              </p>
            </div>
          </div>

          {/* LEVEL 1: THE 4 DEPARTMENT BRANCHES */}
          <div className="ml-6 pl-6 border-l-2 border-dashed border-emerald-300 space-y-6">
            
            {TRUNK_DEPARTMENTS.map((dept) => {
              const isDeptExpanded = !!expandedDepts[dept.id];
              const branches = BRANCH_CATEGORIES.filter(b => b.departmentId === dept.id);
              const deptCourses = allCourses.filter(c => c.departmentId === dept.id);

              return (
                <div key={dept.id} className="relative space-y-3">
                  
                  {/* Branch Horizontal Connector Line */}
                  <div className="absolute -left-6 top-5 w-6 h-0.5 bg-emerald-300" />

                  {/* DEPARTMENT BRANCH BUTTON */}
                  <div className="inline-flex items-center gap-3">
                    <button
                      onClick={() => toggleDept(dept.id)}
                      className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-3 text-left cursor-pointer shadow-xs ${
                        isDeptExpanded
                          ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/20'
                          : 'bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50/20'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-xs">
                        {deptIcons[dept.id]}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                            🪵 Branch (Department)
                          </span>
                          <span className="text-xs font-bold text-stone-900">
                            {dept.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {branches.length} Categories · {deptCourses.length} Course Leaves
                        </p>
                      </div>

                      <div className="p-1 rounded-lg bg-stone-100 text-stone-600 ml-2">
                        {isDeptExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  </div>

                  {/* LEVEL 2: CATEGORY BOUGHS UNDER DEPARTMENT */}
                  {isDeptExpanded && (
                    <div className="ml-8 pl-6 border-l-2 border-dashed border-amber-300 space-y-4">
                      
                      {branches.map((branch) => {
                        const isBranchExpanded = !!expandedBranches[branch.id];
                        const twigs = TWIG_SUB_STREAMS.filter(t => t.branchId === branch.id);
                        const branchCourses = allCourses.filter(c => c.branchId === branch.id);

                        return (
                          <div key={branch.id} className="relative space-y-3">
                            
                            {/* Horizontal connector line */}
                            <div className="absolute -left-6 top-4 w-6 h-0.5 bg-amber-300" />

                            {/* CATEGORY BUTTON */}
                            <button
                              onClick={() => toggleBranch(branch.id)}
                              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2.5 text-left cursor-pointer shadow-xs ${
                                isBranchExpanded
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-400/20'
                                  : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-stone-900'
                              }`}
                            >
                              <span className="text-sm">🌿</span>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold">{branch.name}</span>
                                  <span className="text-[10px] text-stone-500">
                                    ({twigs.length} Twigs · {branchCourses.length} Courses)
                                  </span>
                                </div>
                              </div>
                              <div className="ml-2 text-stone-400">
                                {isBranchExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                              </div>
                            </button>

                            {/* LEVEL 3: TWIGS UNDER CATEGORY */}
                            {isBranchExpanded && (
                              <div className="ml-8 pl-6 border-l-2 border-dashed border-teal-300 space-y-3">
                                
                                {twigs.map((twig) => {
                                  const isTwigExpanded = !!expandedTwigs[twig.id];
                                  const twigCourses = allCourses.filter(c => c.twigId === twig.id);

                                  return (
                                    <div key={twig.id} className="relative space-y-2">
                                      
                                      {/* Horizontal connector */}
                                      <div className="absolute -left-6 top-3.5 w-6 h-0.5 bg-teal-300" />

                                      {/* TWIG BUTTON */}
                                      <button
                                        onClick={() => toggleTwig(twig.id)}
                                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                                          isTwigExpanded
                                            ? 'bg-teal-50 border-teal-400 text-teal-900'
                                            : 'bg-white border-stone-200 hover:border-teal-300 text-stone-700'
                                        }`}
                                      >
                                        <span>🌱</span>
                                        <span className="font-bold">{twig.name}</span>
                                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-lime-100 text-lime-900 font-bold border border-lime-300">
                                          🍃 {twigCourses.length} Leaves
                                        </span>
                                        <span className="text-stone-400 text-[10px]">
                                          {isTwigExpanded ? '▼' : '▶'}
                                        </span>
                                      </button>

                                      {/* LEVEL 4: COURSE LEAVES UNDER TWIG */}
                                      {isTwigExpanded && (
                                        <div className="ml-6 pl-4 border-l-2 border-dashed border-lime-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                                          {twigCourses.map((course) => {
                                            const enrollment = enrollments[course.id];
                                            const isEnrolled = !!enrollment;
                                            const isCompleted = enrollment?.certificateEarned;

                                            return (
                                              <div
                                                key={course.id}
                                                className={`p-3 rounded-xl border bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-2 ${
                                                  isCompleted
                                                    ? 'border-amber-400 bg-amber-50/20'
                                                    : isEnrolled
                                                    ? 'border-emerald-400 bg-emerald-50/20'
                                                    : 'border-stone-200 hover:border-emerald-300'
                                                }`}
                                              >
                                                <div>
                                                  <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-lime-100 text-lime-900 border border-lime-300 flex items-center gap-1">
                                                      <span>🍃 Leaf Course</span>
                                                    </span>
                                                    <span className="text-[10px] font-bold text-stone-500">
                                                      {course.level}
                                                    </span>
                                                  </div>

                                                  <h5 
                                                    onClick={() => onSelectCourse(course)}
                                                    className="font-bold text-xs text-stone-900 hover:text-emerald-700 cursor-pointer line-clamp-2"
                                                  >
                                                    {course.title}
                                                  </h5>

                                                  <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">
                                                    {course.instructor.name} · {course.durationHours}h
                                                  </p>
                                                </div>

                                                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                                                  <span className="text-xs font-black text-stone-900">₹{course.price}</span>

                                                  <div className="flex items-center gap-1">
                                                    {isEnrolled && onOpenClassroom && (
                                                      <button
                                                        onClick={() => onOpenClassroom(course.id)}
                                                        className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                                                      >
                                                        <Play className="w-2.5 h-2.5 fill-white" />
                                                        <span>Classroom</span>
                                                      </button>
                                                    )}

                                                    <button
                                                      onClick={() => onSelectCourse(course)}
                                                      className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                                                    >
                                                      <span>Inspect</span>
                                                      <ArrowRight className="w-2.5 h-2.5" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}

                                    </div>
                                  );
                                })}

                              </div>
                            )}

                          </div>
                        );
                      })}

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </div>

    </div>
  );
};
