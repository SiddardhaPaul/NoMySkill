import React, { useState } from 'react';
import { 
  TreePine, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Cpu, 
  TrendingUp, 
  Sparkles, 
  GraduationCap,
  BookOpen,
  Layers,
  Compass
} from 'lucide-react';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { DepartmentId, LeafCourse } from '../../types/tree';

interface TreeMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHierarchy: (deptId?: DepartmentId, branchId?: string, twigId?: string) => void;
  onSelectCourse: (course: LeafCourse) => void;
  allCourses: LeafCourse[];
}

export const TreeMegaMenu: React.FC<TreeMegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectHierarchy,
  onSelectCourse,
  allCourses
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<DepartmentId>('tech-engineering');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch-ai');

  if (!isOpen) return null;

  const currentBranches = BRANCH_CATEGORIES.filter(b => b.departmentId === selectedDeptId);
  const currentTwigs = TWIG_SUB_STREAMS.filter(t => t.branchId === selectedBranchId);
  const currentCourses = allCourses.filter(c => c.branchId === selectedBranchId);

  const getDeptIcon = (id: DepartmentId) => {
    switch (id) {
      case 'tech-engineering': return <Cpu className="w-4 h-4 text-emerald-600" />;
      case 'business-operations': return <TrendingUp className="w-4 h-4 text-amber-600" />;
      case 'creative-service': return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'education-human': return <GraduationCap className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs transition-opacity">
      <div 
        className="fixed inset-x-0 top-16 bg-white border-b-2 border-stone-200 shadow-2xl max-h-[85vh] flex flex-col text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mega Menu Header & Metaphor Pathway */}
        <div className="px-6 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-stone-200 text-xs shadow-xs">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                Root: The Upskilling Tree
              </span>
              <span className="text-stone-400">→</span>
              <span className="text-amber-800 font-semibold">Trunk: Department</span>
              <span className="text-stone-400">→</span>
              <span className="text-emerald-700 font-semibold">Branch: Category</span>
              <span className="text-stone-400">→</span>
              <span className="text-teal-700 font-semibold">Twig: Focus Stream</span>
              <span className="text-stone-400">→</span>
              <span className="text-lime-700 font-semibold">Leaf: Course</span>
            </div>
            <span className="text-xs text-stone-500 hidden lg:inline">
              Click any level to jump straight to filtered learning paths.
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Column Hierarchical Explorer */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto divide-y md:divide-y-0 md:divide-x divide-stone-200 bg-white">
          
          {/* Column 1: Trunk Level (Departments) */}
          <div className="md:col-span-3 p-4 bg-stone-50/50">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 inline-block"></span>
                Trunk · Departments
              </span>
              <span className="text-[10px] text-stone-500 font-medium">{TRUNK_DEPARTMENTS.length} Domains</span>
            </div>

            <div className="space-y-1.5">
              {TRUNK_DEPARTMENTS.map((dept) => {
                const isSelected = dept.id === selectedDeptId;
                return (
                  <button
                    key={dept.id}
                    onClick={() => {
                      setSelectedDeptId(dept.id);
                      const firstBranch = BRANCH_CATEGORIES.find(b => b.departmentId === dept.id);
                      if (firstBranch) setSelectedBranchId(firstBranch.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 text-stone-900 shadow-xs ring-1 ring-amber-400/30'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-amber-50/30 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'}`}>
                        {getDeptIcon(dept.id)}
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight text-stone-900">{dept.name}</p>
                        <p className="text-[10px] text-stone-500 mt-0.5">{dept.branchesCount} Branches</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-700 translate-x-0.5' : 'text-stone-400'}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 px-2">
              <button
                onClick={() => {
                  onSelectHierarchy(selectedDeptId);
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Filter Entire {TRUNK_DEPARTMENTS.find(d => d.id === selectedDeptId)?.name} Trunk</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
              </button>
            </div>
          </div>

          {/* Column 2: Branch Level (Categories) */}
          <div className="md:col-span-4 p-4 bg-white">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                Branch · Categories
              </span>
              <span className="text-[10px] text-stone-500 font-medium">{currentBranches.length} Categories</span>
            </div>

            <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
              {currentBranches.map((branch) => {
                const isSelected = branch.id === selectedBranchId;
                const twigCount = TWIG_SUB_STREAMS.filter(t => t.branchId === branch.id).length;
                return (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-stone-900 shadow-xs ring-1 ring-emerald-400/30'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-emerald-50/30 hover:border-emerald-300'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-stone-900 truncate">{branch.name}</p>
                      <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{branch.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                        {twigCount} twigs
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 px-2">
              <button
                onClick={() => {
                  onSelectHierarchy(selectedDeptId, selectedBranchId);
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Explore This Branch</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
              </button>
            </div>
          </div>

          {/* Column 3: Twigs & Leaves (Focus Streams & Individual Courses) */}
          <div className="md:col-span-5 p-4 bg-stone-50/30">
            {/* Twigs Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
                  Twigs · Focus Sub-Streams
                </span>
                <span className="text-[10px] text-stone-500 font-medium">{currentTwigs.length} sub-streams</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {currentTwigs.map((twig) => (
                  <button
                    key={twig.id}
                    onClick={() => {
                      onSelectHierarchy(selectedDeptId, selectedBranchId, twig.id);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 border border-stone-200 hover:border-teal-400 text-stone-800 text-xs font-medium transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <span>🌱</span>
                    <span>{twig.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Leaves (Course Cards in Mega Menu) */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-lime-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-lime-600 inline-block"></span>
                  Leaves · Purchasable Courses
                </span>
                <span className="text-[10px] text-stone-500 font-medium">{currentCourses.length} active courses</span>
              </div>

              {currentCourses.length === 0 ? (
                <div className="p-6 text-center rounded-xl border border-dashed border-stone-200 text-stone-500 text-xs bg-white">
                  No courses published yet for this branch. You can author one in the Course Builder!
                </div>
              ) : (
                <div className="space-y-2 max-h-[36vh] overflow-y-auto pr-1">
                  {currentCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => {
                        onSelectCourse(course);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-400 cursor-pointer transition-all flex items-center gap-3 group shadow-xs"
                    >
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform border border-stone-200" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-medium">
                          <span className="text-emerald-700 font-bold">🍃 Leaf</span>
                          <span>·</span>
                          <span>{course.level}</span>
                          <span>·</span>
                          <span>{course.durationHours}h</span>
                        </div>
                        <p className="text-xs font-bold text-stone-900 truncate group-hover:text-emerald-800 transition-colors">
                          {course.title}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate">
                          {course.instructor.name} ({course.instructor.company})
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-black text-emerald-700">₹{course.price}</p>
                        <span className="text-[10px] text-stone-400 line-through">₹{course.originalPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mega Menu Footer Banner */}
        <div className="px-6 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-medium">Upskilling Tree Taxonomy: 4 Trunks · 18 Branches · 25+ Twigs · Continuously Expanding Leaves</span>
          </div>
          <button
            onClick={() => {
              onSelectHierarchy();
              onClose();
            }}
            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Reset & View Full Upskilling Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
          </button>
        </div>

      </div>
    </div>
  );
};
