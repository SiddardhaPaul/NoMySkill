import React from 'react';
import { 
  TreePine, 
  ChevronRight, 
  Filter, 
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { DepartmentId } from '../../types/tree';

interface TreeHierarchicalFilterProps {
  selectedDeptId?: DepartmentId;
  selectedBranchId?: string;
  selectedTwigId?: string;
  onSelectDept: (deptId?: DepartmentId) => void;
  onSelectBranch: (branchId?: string) => void;
  onSelectTwig: (twigId?: string) => void;
  onResetFilters: () => void;
  difficultyFilter: string;
  setDifficultyFilter: (diff: string) => void;
  searchFilter: string;
  setSearchFilter: (query: string) => void;
  totalLeafCount: number;
}

export const TreeHierarchicalFilter: React.FC<TreeHierarchicalFilterProps> = ({
  selectedDeptId,
  selectedBranchId,
  selectedTwigId,
  onSelectDept,
  onSelectBranch,
  onSelectTwig,
  onResetFilters,
  difficultyFilter,
  setDifficultyFilter,
  searchFilter,
  setSearchFilter,
  totalLeafCount
}) => {
  const currentBranches = selectedDeptId 
    ? BRANCH_CATEGORIES.filter(b => b.departmentId === selectedDeptId)
    : BRANCH_CATEGORIES;

  const currentTwigs = selectedBranchId 
    ? TWIG_SUB_STREAMS.filter(t => t.branchId === selectedBranchId)
    : selectedDeptId
      ? TWIG_SUB_STREAMS.filter(t => t.departmentId === selectedDeptId)
      : TWIG_SUB_STREAMS;

  const activeDept = TRUNK_DEPARTMENTS.find(d => d.id === selectedDeptId);
  const activeBranch = BRANCH_CATEGORIES.find(b => b.id === selectedBranchId);
  const activeTwig = TWIG_SUB_STREAMS.find(t => t.id === selectedTwigId);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
      
      {/* Level 0: Tree Metaphor Breadcrumb & Clear Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center">
            <TreePine className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-stone-900 tracking-tight">The Upskilling Tree Hierarchy</h3>
            <p className="text-[11px] text-stone-500">Drill into specific domain branches and skill twigs</p>
          </div>
        </div>

        {(selectedDeptId || selectedBranchId || selectedTwigId || difficultyFilter !== 'all' || searchFilter) && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-stone-500" />
            <span>Reset Tree to Root</span>
          </button>
        )}
      </div>

      {/* 
        THE TREE-TO-LEAF BUTTON DRILLDOWN SEQUENCE (Requested in brief):
        1. Tree Button (Root)
        2. Trunk Button (Department)
        3. Branch Button (Category)
        4. Twig Button (Focus Sub-stream)
        5. Course Leaves
      */}
      <div className="space-y-3">
        
        {/* ROW 1: ROOT TREE BUTTON & TRUNK (DEPARTMENTS) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/80 flex items-center gap-1.5">
              <span>🪵 Step 1: Trunk Level (Departments)</span>
            </span>
            <span className="text-[10px] text-stone-400">Select top-level domain</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Tree Root All Button */}
            <button
              onClick={() => onSelectDept(undefined)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                !selectedDeptId
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <TreePine className="w-3.5 h-3.5 text-emerald-500" />
              <span>🌳 Tree (All Trunks)</span>
            </button>

            {/* Trunk Department Buttons (Bark Amber / Ochre) */}
            {TRUNK_DEPARTMENTS.map((dept) => {
              const isSelected = selectedDeptId === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => onSelectDept(dept.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
                      : 'bg-amber-50/70 text-amber-950 border-amber-200 hover:bg-amber-100/80'
                  }`}
                >
                  <span>🪵</span>
                  <span>{dept.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ROW 2: BRANCH LEVEL (CATEGORIES) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <span>🌿 Step 2: Branch Level (Educational Categories)</span>
            </span>
            <span className="text-[10px] text-stone-400">
              {activeDept ? `Branches in ${activeDept.name}` : 'All Categories'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => onSelectBranch(undefined)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                !selectedBranchId
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                  : 'bg-emerald-50/60 text-emerald-900 border-emerald-200 hover:bg-emerald-100/70'
              }`}
            >
              All Branches ({currentBranches.length})
            </button>

            {currentBranches.map((branch) => {
              const isSelected = selectedBranchId === branch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => onSelectBranch(branch.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm font-semibold'
                      : 'bg-emerald-50/50 text-emerald-950 border-emerald-200/80 hover:bg-emerald-100/80'
                  }`}
                >
                  <span>🌿</span>
                  <span>{branch.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ROW 3: TWIG LEVEL (FOCUS SUB-STREAMS) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
              <span>🌱 Step 3: Twig Level (Focus Sub-streams)</span>
            </span>
            <span className="text-[10px] text-stone-400">
              {activeBranch ? `Specializations in ${activeBranch.name}` : 'All Skill Twigs'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => onSelectTwig(undefined)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                !selectedTwigId
                  ? 'bg-teal-800 text-white border-teal-900 shadow-sm'
                  : 'bg-teal-50/60 text-teal-900 border-teal-200 hover:bg-teal-100/70'
              }`}
            >
              All Twigs ({currentTwigs.length})
            </button>

            {currentTwigs.map((twig) => {
              const isSelected = selectedTwigId === twig.id;
              return (
                <button
                  key={twig.id}
                  onClick={() => onSelectTwig(twig.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-800 shadow-sm font-semibold'
                      : 'bg-teal-50/50 text-teal-950 border-teal-200/80 hover:bg-teal-100/80'
                  }`}
                >
                  <span>🌱</span>
                  <span>{twig.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Search Input & Secondary Filter Controls */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Keyword Filter */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter courses by keyword, instructor, tool..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-xs text-stone-800 pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-stone-500">Difficulty:</span>
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                difficultyFilter === diff
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {diff === 'all' ? 'All Levels' : diff}
            </button>
          ))}
        </div>

        {/* Active Leaves Count Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lime-50 border border-lime-200 text-lime-900 font-semibold text-xs">
          <span>🍃 Showing</span>
          <span className="text-lime-800 font-bold">{totalLeafCount}</span>
          <span>Course Leaves</span>
        </div>

      </div>

    </div>
  );
};
