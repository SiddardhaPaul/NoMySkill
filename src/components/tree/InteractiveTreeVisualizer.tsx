import React, { useState } from 'react';
import { 
  TreePine, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  RefreshCw, 
  Search,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { DepartmentId, LeafCourse, UserEnrollment } from '../../types/tree';
import { BotanicalTreeDiagram } from './BotanicalTreeDiagram';

interface InteractiveTreeVisualizerProps {
  allCourses: LeafCourse[];
  enrollments?: Record<string, UserEnrollment>;
  onSelectCourse: (course: LeafCourse) => void;
  onFilterByNode: (deptId?: DepartmentId, branchId?: string, twigId?: string) => void;
  onOpenClassroom?: (courseId: string) => void;
}

export const InteractiveTreeVisualizer: React.FC<InteractiveTreeVisualizerProps> = ({
  allCourses,
  enrollments = {},
  onSelectCourse,
  onFilterByNode,
  onOpenClassroom
}) => {
  const [viewMode, setViewMode] = useState<'botanical-tree' | 'visual-graph' | 'tree-outline'>('botanical-tree');
  
  // Selection State
  const [activeDeptId, setActiveDeptId] = useState<DepartmentId>('tech-engineering');
  const [activeBranchId, setActiveBranchId] = useState<string>('branch-ai');
  const [activeTwigId, setActiveTwigId] = useState<string>('twig-gen-ai');
  const [treeSearchQuery, setTreeSearchQuery] = useState<string>('');

  // Filtering subsets
  const selectedDept = TRUNK_DEPARTMENTS.find(d => d.id === activeDeptId) || TRUNK_DEPARTMENTS[0];
  const branchesForDept = BRANCH_CATEGORIES.filter(b => b.departmentId === activeDeptId);
  const selectedBranch = BRANCH_CATEGORIES.find(b => b.id === activeBranchId) || branchesForDept[0];
  const twigsForBranch = TWIG_SUB_STREAMS.filter(t => t.branchId === selectedBranch?.id);
  const selectedTwig = TWIG_SUB_STREAMS.find(t => t.id === activeTwigId) || twigsForBranch[0];
  
  const coursesForBranch = allCourses.filter(c => c.branchId === selectedBranch?.id);
  const coursesForTwig = allCourses.filter(c => c.twigId === selectedTwig?.id);



  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl shadow-sm overflow-hidden text-stone-900">
      
      {/* Visualizer Top Bar with Metaphor Controls */}
      <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs">
              <TreePine className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-black text-stone-900 flex items-center gap-2">
                <span>The Living Upskilling Tree Explorer</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {viewMode === 'visual-graph' ? 'Column Navigator' : 'Taxonomy Outline'}
                </span>
              </h2>
              <p className="text-xs text-stone-600">
                Trunk opens Branches → Branches open Twigs → Twigs bloom into Course Leaves with Job Vacancies.
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="p-1 bg-stone-100 border border-stone-200 rounded-xl flex items-center gap-1 text-xs font-semibold">
          <button
            onClick={() => setViewMode('botanical-tree')}
            className="px-2.5 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            🌳 Botanical Tree
          </button>
          <button
            onClick={() => setViewMode('visual-graph')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'visual-graph'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🌿 Column Navigator
          </button>
          <button
            onClick={() => setViewMode('tree-outline')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'tree-outline'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            📋 Taxonomy Outline
          </button>
        </div>
      </div>

      {/* Breadcrumb Navigator */}
      <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1">Active Stem:</span>
          
          <button
            onClick={() => onFilterByNode()}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 flex items-center gap-1 transition-colors font-semibold text-[11px] shadow-xs cursor-pointer"
          >
            <TreePine className="w-3 h-3 text-emerald-600" />
            <span>🌳 Root</span>
          </button>

          <span className="text-stone-400">/</span>

          <button
            onClick={() => onFilterByNode(activeDeptId)}
            className="px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 transition-colors font-semibold text-[11px] cursor-pointer"
          >
            <span>🪵 Trunk:</span>
            <span className="font-bold">{selectedDept.name}</span>
          </button>

          <span className="text-stone-400">/</span>

          <button
            onClick={() => onFilterByNode(activeDeptId, activeBranchId)}
            className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 transition-colors font-semibold text-[11px] cursor-pointer"
          >
            <span>🌿 Branch:</span>
            <span className="font-bold">{selectedBranch?.name || 'Category'}</span>
          </button>

          <span className="text-stone-400">/</span>

          <button
            onClick={() => onFilterByNode(activeDeptId, activeBranchId, activeTwigId)}
            className="px-2 py-0.5 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 flex items-center gap-1 transition-colors font-semibold text-[11px] cursor-pointer"
          >
            <span>🌱 Twig:</span>
            <span className="font-bold">{selectedTwig?.name || 'Sub-stream'}</span>
          </button>

          <span className="text-stone-400">/</span>

          <span className="px-2 py-0.5 rounded-md bg-lime-100 text-lime-900 border border-lime-300 flex items-center gap-1 font-bold text-[11px]">
            <span>🍃 {coursesForTwig.length} Leaves</span>
          </span>
        </div>

        {/* Tree Search & Path Highlighter */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search AI, Machine Learning, Prompt, Manufacturing..."
            value={treeSearchQuery}
            onChange={(e) => setTreeSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
        </div>
      </div>

      {/* MODE 1: BOTANICAL TREE DIAGRAM */}
      {viewMode === 'botanical-tree' && (
        <div className="p-4 sm:p-6 bg-white">
          <BotanicalTreeDiagram
            allCourses={allCourses}
            enrollments={enrollments}
            onSelectCourse={onSelectCourse}
            onFilterByNode={onFilterByNode}
            onOpenClassroom={onOpenClassroom}
          />
        </div>
      )}

      {/* MODE 2: COLUMN NAVIGATOR */}
      {viewMode === 'visual-graph' && (
        <div className="p-6 overflow-x-auto min-h-[480px] bg-white relative">
          <div className="min-w-[840px] grid grid-cols-4 gap-6 relative">
            
            {/* COLUMN 1: TRUNK */}
            <div className="space-y-3">
              <div className="px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center justify-between">
                <span>1. Trunk (Departments)</span>
                <span>🪵 Bark Ochre</span>
              </div>

              <div className="space-y-2">
                {TRUNK_DEPARTMENTS.map((dept) => {
                  const isActive = dept.id === activeDeptId;
                  return (
                    <div
                      key={dept.id}
                      onClick={() => {
                        setActiveDeptId(dept.id);
                        const firstBranch = BRANCH_CATEGORIES.find(b => b.departmentId === dept.id);
                        if (firstBranch) {
                          setActiveBranchId(firstBranch.id);
                          const firstTwig = TWIG_SUB_STREAMS.find(t => t.branchId === firstBranch.id);
                          if (firstTwig) setActiveTwigId(firstTwig.id);
                        }
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative ${
                        isActive
                          ? 'bg-amber-50 border-amber-500 text-stone-900 shadow-sm ring-1 ring-amber-400/30'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-amber-50/40 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold leading-snug">{dept.name}</span>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 ml-1" />}
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">{dept.tagline}</p>
                      
                      {isActive && (
                        <div className="mt-2 pt-2 border-t border-amber-200 flex items-center justify-between text-[10px] text-amber-800">
                          <span className="font-medium">{dept.branchesCount} Branches Active</span>
                          <span className="font-bold">Selected →</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLUMN 2: BRANCH */}
            <div className="space-y-3">
              <div className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center justify-between">
                <span>2. Branch (Categories)</span>
                <span>🌿 Forest Green</span>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {branchesForDept.map((branch) => {
                  const isActive = branch.id === activeBranchId;
                  const twigCount = TWIG_SUB_STREAMS.filter(t => t.branchId === branch.id).length;
                  return (
                    <div
                      key={branch.id}
                      onClick={() => {
                        setActiveBranchId(branch.id);
                        const firstTwig = TWIG_SUB_STREAMS.find(t => t.branchId === branch.id);
                        if (firstTwig) setActiveTwigId(firstTwig.id);
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isActive
                          ? 'bg-emerald-50 border-emerald-500 text-stone-900 shadow-sm ring-1 ring-emerald-400/30'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-emerald-50/40 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold leading-snug">{branch.name}</span>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 ml-1" />}
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">{branch.description}</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500">
                        <span className="text-emerald-700 font-semibold">{twigCount} Twig Streams</span>
                        {isActive && <span className="text-emerald-800 font-bold">Active →</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLUMN 3: TWIG */}
            <div className="space-y-3">
              <div className="px-2.5 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-[11px] font-bold uppercase tracking-wider text-teal-900 flex items-center justify-between">
                <span>3. Twig (Sub-streams)</span>
                <span>🌱 Spring Teal</span>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {twigsForBranch.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-stone-200 text-stone-500 text-xs text-center">
                    No twigs mapped yet.
                  </div>
                ) : (
                  twigsForBranch.map((twig) => {
                    const isActive = twig.id === activeTwigId;
                    const courseCount = allCourses.filter(c => c.twigId === twig.id).length;
                    return (
                      <div
                        key={twig.id}
                        onClick={() => setActiveTwigId(twig.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isActive
                            ? 'bg-teal-50 border-teal-500 text-stone-900 shadow-sm ring-1 ring-teal-400/30'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-teal-50/40 hover:border-teal-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold leading-snug">{twig.name}</span>
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 ml-1" />}
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">{twig.description}</p>
                        
                        <div className="mt-2 pt-1 border-t border-stone-200 text-[10px] text-teal-800 font-medium">
                          {twig.skillsFocus.slice(0, 2).join(' · ')}
                        </div>

                        <div className="mt-1 flex items-center justify-between text-[10px] text-stone-500">
                          <span className="text-emerald-700 font-bold">🍃 {courseCount} Leaves</span>
                          {isActive && <span className="text-teal-800 font-bold">Active →</span>}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* COLUMN 4: LEAF */}
            <div className="space-y-3">
              <div className="px-2.5 py-1.5 rounded-lg bg-lime-50 border border-lime-200 text-[11px] font-bold uppercase tracking-wider text-lime-900 flex items-center justify-between">
                <span>4. Leaf (Course Modules)</span>
                <span>🍃 Emerald Lime</span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {coursesForTwig.length === 0 ? (
                  <div className="p-6 rounded-xl border border-dashed border-stone-200 text-stone-500 text-xs text-center space-y-2">
                    <p>No verified course leaves published in this twig stream yet.</p>
                    <button
                      onClick={() => onFilterByNode(activeDeptId, activeBranchId)}
                      className="text-emerald-700 underline font-bold cursor-pointer"
                    >
                      Browse all {coursesForBranch.length} branch courses
                    </button>
                  </div>
                ) : (
                  coursesForTwig.map((course) => (
                    <div
                      key={course.id}
                      className="p-3.5 rounded-xl border border-stone-200 bg-white text-stone-900 hover:border-emerald-500 transition-all shadow-xs group"
                    >
                      <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-300 font-bold">
                          🍃 Leaf
                        </span>
                        <span>{course.durationHours} hrs · {course.level}</span>
                      </div>

                      <h4 
                        onClick={() => onSelectCourse(course)}
                        className="text-xs font-bold text-stone-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
                      >
                        {course.title}
                      </h4>

                      {/* Job Vacancy badge */}
                      {course.targetJobVacancies && course.targetJobVacancies.length > 0 && (
                        <div className="mt-2 p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-900">
                          <span className="font-bold text-stone-900">💼 {course.targetJobVacancies[0].title}</span>
                          <span className="text-emerald-700 ml-1 font-semibold">({course.targetJobVacancies[0].avgSalary})</span>
                        </div>
                      )}

                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="font-black text-emerald-800">₹{course.price}</span>
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          View Leaf
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODE 3: TAXONOMY OUTLINE */}
      {viewMode === 'tree-outline' && (
        <div className="p-6 bg-white space-y-6 max-h-[600px] overflow-y-auto">
          <div className="space-y-4">
            {TRUNK_DEPARTMENTS.map((dept) => {
              const branches = BRANCH_CATEGORIES.filter(b => b.departmentId === dept.id);
              return (
                <div key={dept.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span className="text-amber-800">🪵 Trunk:</span>
                      <span>{dept.name}</span>
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600">
                      {dept.branchesCount} Branches
                    </span>
                  </div>

                  <div className="pl-4 border-l-2 border-amber-300 space-y-3">
                    {branches.map((branch) => {
                      const twigs = TWIG_SUB_STREAMS.filter(t => t.branchId === branch.id);

                      return (
                        <div key={branch.id} className="space-y-2">
                          <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                            <span>🌿 Branch:</span>
                            <span>{branch.name}</span>
                          </h4>

                          <div className="pl-4 border-l-2 border-emerald-300 space-y-2">
                            {twigs.map((twig) => {
                              const twigCourses = allCourses.filter(c => c.twigId === twig.id);
                              return (
                                <div key={twig.id} className="space-y-1">
                                  <p className="text-[11px] font-bold text-teal-800 flex items-center gap-1">
                                    <span>🌱 Twig:</span>
                                    <span>{twig.name}</span>
                                  </p>

                                  <div className="pl-4 space-y-1">
                                    {twigCourses.map((c) => (
                                      <div 
                                        key={c.id}
                                        onClick={() => onSelectCourse(c)}
                                        className="text-[11px] text-stone-700 hover:text-emerald-700 cursor-pointer flex items-center justify-between py-1 px-2 rounded-md hover:bg-white transition-colors"
                                      >
                                        <span className="truncate font-medium">🍃 {c.title}</span>
                                        {c.targetJobVacancies && c.targetJobVacancies.length > 0 && (
                                          <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 ml-2 flex-shrink-0">
                                            💼 {c.targetJobVacancies[0].title}
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
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
