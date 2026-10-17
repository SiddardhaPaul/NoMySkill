import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TreePine, 
  Calendar, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { UserEnrollment, LeafCourse } from '../../types/tree';

export interface GrowthMilestone {
  id: string;
  date: string;
  timestamp: string;
  type: 'seed' | 'sprout' | 'twig' | 'branch_mastery' | 'harvest';
  title: string;
  subtitle: string;
  branchName: string;
  departmentName: string;
  description: string;
  treeSnapshotStage: string; // e.g. "Seedling", "Sprouting Twigs", "Canopy Blooming", "Full Harvest"
  leavesGrownCount: number;
  badgeEarned?: string;
  skillsGained: string[];
}

interface GrowthHistoryTimelineProps {
  enrollments?: Record<string, UserEnrollment>;
  allCourses?: LeafCourse[];
  onOpenClassroom?: (courseId: string) => void;
  onExploreCatalog?: () => void;
}

export const GrowthHistoryTimeline: React.FC<GrowthHistoryTimelineProps> = ({
  enrollments = {},
  allCourses = [],
  onOpenClassroom,
  onExploreCatalog
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const milestones: GrowthMilestone[] = [
    {
      id: 'ms-1',
      date: 'May 14, 2026',
      timestamp: 'Today · 09:30 AM',
      type: 'branch_mastery',
      title: 'Branch Mastery: Artificial Intelligence & Machine Learning',
      subtitle: 'Technical & Engineering Trunk · 5 Course Leaves Mastered',
      branchName: 'Artificial Intelligence',
      departmentName: 'Technical & Engineering',
      description: 'Achieved 100% curriculum completion and verified assessment scores across all 5 courses under the AI branch.',
      treeSnapshotStage: 'Lush High-Canopy Blooming',
      leavesGrownCount: 5,
      badgeEarned: '🌿 Branch Master: Generative AI & Deep Learning',
      skillsGained: ['Prompt Engineering', 'LangGraph Swarms', 'RAG Embeddings', 'Vector Search', 'Fine-Tuning']
    },
    {
      id: 'ms-2',
      date: 'May 10, 2026',
      timestamp: '4 days ago',
      type: 'harvest',
      title: 'Harvested Verified Certificate: Enterprise Generative AI',
      subtitle: 'Issued with Cryptographic Signature ID #CERT-NOMYSKILL-2026-AI99',
      branchName: 'Artificial Intelligence',
      departmentName: 'Technical & Engineering',
      description: 'Submitted Capstone Multi-Agent Architecture with 96% peer evaluation score. Downloadable credential generated.',
      treeSnapshotStage: 'Golden Fruit Harvest',
      leavesGrownCount: 4,
      badgeEarned: '🏅 Verified Industry Practitioner',
      skillsGained: ['Autonomous Agents', 'Hallucination Mitigation', 'Evaluation Rubrics']
    },
    {
      id: 'ms-3',
      date: 'May 02, 2026',
      timestamp: '12 days ago',
      type: 'twig',
      title: 'First Twig Bloomed: Generative AI & LLMs',
      subtitle: 'Reached 80% Knowledge Density across LLM Frameworks',
      branchName: 'Artificial Intelligence',
      departmentName: 'Technical & Engineering',
      description: 'Completed foundational transformer architecture lessons, prompt design principles, and token optimization.',
      treeSnapshotStage: 'Specialized Twig Sprouting',
      leavesGrownCount: 3,
      skillsGained: ['Token Economics', 'Few-Shot Prompting', 'System Prompt Security']
    },
    {
      id: 'ms-4',
      date: 'April 24, 2026',
      timestamp: '3 weeks ago',
      type: 'sprout',
      title: 'Sprouted First Course Leaf',
      subtitle: 'Enrolled in "Enterprise Generative AI & Autonomous Agent Architecture"',
      branchName: 'Artificial Intelligence',
      departmentName: 'Technical & Engineering',
      description: 'Committed to career upskilling trajectory from Technical Trunk to targeted AI Engineer vacancies.',
      treeSnapshotStage: 'First Emerald Sprout',
      leavesGrownCount: 1,
      skillsGained: ['Development Environment Setup', 'API Grounding']
    },
    {
      id: 'ms-5',
      date: 'April 15, 2026',
      timestamp: '1 month ago',
      type: 'seed',
      title: 'Planted the Knowledge Root & Career Trunk',
      subtitle: 'Selected Technical & Engineering as Primary Focus Trunk',
      branchName: 'Foundational Root',
      departmentName: 'All Trunks',
      description: 'Initialized NoMySkill Upskilling Tree account. Configured target job vacancy roadmap and learning schedule.',
      treeSnapshotStage: 'Root Seedling Planted',
      leavesGrownCount: 0,
      skillsGained: ['Upskilling Taxonomy Onboarding', 'Career Gap Assessment']
    }
  ];

  const filteredMilestones = milestones.filter(m => {
    if (filterType === 'all') return true;
    return m.type === filterType;
  });

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'branch_mastery':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'harvest':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'twig':
        return <Layers className="w-5 h-5 text-teal-600" />;
      case 'sprout':
        return <TreePine className="w-5 h-5 text-lime-600" />;
      default:
        return <Calendar className="w-5 h-5 text-stone-600" />;
    }
  };

  const getBadgeBg = (type: string) => {
    switch (type) {
      case 'branch_mastery':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'harvest':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'twig':
        return 'bg-teal-100 text-teal-900 border-teal-300';
      case 'sprout':
        return 'bg-lime-100 text-lime-900 border-lime-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-sm overflow-hidden text-stone-900">
      
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-white border-b border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Clock className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-stone-900">Growth History & Botanical Timeline</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                  {milestones.length} Major Milestones Logged
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Visual chronological log tracing your evolving tree journey from initial root planting to branch mastery and credential harvests.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'branch_mastery', label: '🏆 Branch Mastery' },
            { id: 'harvest', label: '🏅 Credentials' },
            { id: 'twig', label: '🌿 Twigs' },
            { id: 'sprout', label: '🌱 Sprouted' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer border ${
                filterType === f.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-300 hover:text-stone-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="p-6 relative">
        
        {/* Continuous Trunk Timeline Guide Line */}
        <div className="absolute top-10 bottom-10 left-8 sm:left-10 w-1 bg-gradient-to-b from-amber-500 via-emerald-500 to-stone-300 rounded-full pointer-events-none" />

        <div className="space-y-8 relative">
          {filteredMilestones.map((ms, index) => (
            <motion.div
              key={ms.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 sm:gap-6 relative group"
            >
              
              {/* Timeline Node Badge with Glow */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-stone-200 shadow-md group-hover:border-emerald-400 group-hover:shadow-lg transition-all flex items-center justify-center">
                  {getMilestoneIcon(ms.type)}
                </div>
              </div>

              {/* Milestone Content Card */}
              <div className="flex-1 bg-stone-50/60 rounded-2xl border border-stone-200 hover:border-emerald-300 hover:bg-white p-5 transition-all shadow-xs space-y-3">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${getBadgeBg(ms.type)}`}>
                        {ms.type === 'branch_mastery' ? '🏆 Branch Mastery' :
                         ms.type === 'harvest' ? '🏅 Credential Harvest' :
                         ms.type === 'twig' ? '🌿 Twig Bloomed' :
                         ms.type === 'sprout' ? '🌱 Leaf Sprouted' : '🌰 Root Planted'}
                      </span>
                      <span className="text-[11px] font-semibold text-stone-500">{ms.timestamp}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-stone-900 mt-1">
                      {ms.title}
                    </h4>
                    <p className="text-xs text-stone-600">
                      {ms.subtitle}
                    </p>
                  </div>

                  {/* Botanical Tree Snapshot Tag */}
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-stone-200 text-right flex-shrink-0">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Tree Stage</span>
                    <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1 justify-end">
                      <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{ms.treeSnapshotStage}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {ms.description}
                </p>

                {/* Badge Award banner if available */}
                {ms.badgeEarned && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>Awarded: {ms.badgeEarned}</span>
                    </div>
                    <span className="text-[10px] uppercase bg-amber-200 px-2 py-0.5 rounded font-black">Verified</span>
                  </div>
                )}

                {/* Skills Gained Tags */}
                {ms.skillsGained.length > 0 && (
                  <div className="pt-1 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold text-stone-500 uppercase mr-1">Skills Cultivated:</span>
                    {ms.skillsGained.map((sk, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700">
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                )}

              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </div>
  );
};
