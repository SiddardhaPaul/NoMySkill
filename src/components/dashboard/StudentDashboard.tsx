import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  TreePine, 
  Sparkles, 
  Printer,
  Compass,
  Target,
  Layers,
  ChevronRight,
  Sun,
  Droplets,
  History
} from 'lucide-react';
import { LeafCourse, UserEnrollment, ActiveUser } from '../../types/tree';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES } from '../../data/mockTreeData';
import { UpskillingHeatmap } from './UpskillingHeatmap';
import { CareerPathRoadmap } from './CareerPathRoadmap';
import { KnowledgeGapAnalyzer } from './KnowledgeGapAnalyzer';
import { SunlightWaterGarden } from './SunlightWaterGarden';
import { GrowthHistoryTimeline } from './GrowthHistoryTimeline';
import { BranchMasteryCelebrationModal } from './BranchMasteryCelebrationModal';

interface StudentDashboardProps {
  allCourses: LeafCourse[];
  enrollments: Record<string, UserEnrollment>;
  onOpenClassroom: (courseId: string) => void;
  onExploreCatalog: () => void;
  currentUser: ActiveUser;
  onSelectCourse?: (course: LeafCourse) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  allCourses,
  enrollments,
  onOpenClassroom,
  onExploreCatalog,
  currentUser,
  onSelectCourse = () => {}
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'leaves' | 'gamification' | 'growth-history' | 'career-path' | 'knowledge-gap'>('leaves');
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);

  const enrolledCourseIds = Object.keys(enrollments);
  const enrolledCourses = allCourses.filter(c => enrolledCourseIds.includes(c.id));

  const totalCourses = enrolledCourses.length;
  const completedCourses = Object.values(enrollments).filter(e => e.progressPercent === 100 || e.certificateEarned).length;
  const totalHoursLearned = enrolledCourses.reduce((sum, c) => {
    const progress = (enrollments[c.id]?.progressPercent || 0) / 100;
    return sum + Math.round(c.durationHours * progress);
  }, 0);
  const certificatesCount = Object.values(enrollments).filter(e => e.certificateEarned).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-stone-900">
      
      {/* Welcome Banner (Crisp White Botanical Theme) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <TreePine className="w-3.5 h-3.5 text-emerald-700" />
              <span>Upskilling Learner Portal</span>
            </span>
            <span className="text-stone-500 text-xs">Active Student Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
            Welcome back, {currentUser.name.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
            Track your career progression across the Upskilling Tree. You are currently cultivating leaves across Technical Engineering & Business domains.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsCelebrationOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4 text-stone-950" />
            <span>🏆 Branch Mastery Badge</span>
          </button>

          <button
            onClick={onExploreCatalog}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Harvest More Leaves</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Enrolled Leaves</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">{totalCourses}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Active curriculums</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Completed Leaves</span>
            <CheckCircle2 className="w-4 h-4 text-lime-600" />
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">{completedCourses}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">100% mastery achieved</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Hours Invested</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">{totalHoursLearned}h</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Self-paced study time</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Verified Credentials</span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">{certificatesCount}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Downloadable certificates</p>
        </div>
      </div>

      {/* DASHBOARD NAVIGATION SWITCHER */}
      <div className="flex items-center gap-1.5 p-1.5 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-bold overflow-x-auto max-w-full">
        <button
          onClick={() => setActiveSubTab('leaves')}
          className={`py-2 px-3.5 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'leaves'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>My Leaves</span>
        </button>

        <button
          onClick={() => setActiveSubTab('gamification')}
          className={`py-2 px-3.5 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'gamification'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>Sunlight & Water Garden</span>
        </button>

        <button
          onClick={() => setActiveSubTab('growth-history')}
          className={`py-2 px-3.5 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'growth-history'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <History className="w-3.5 h-3.5 text-emerald-600" />
          <span>Growth History</span>
        </button>

        <button
          onClick={() => setActiveSubTab('career-path')}
          className={`py-2 px-3.5 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'career-path'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Career Path Roadmap</span>
        </button>

        <button
          onClick={() => setActiveSubTab('knowledge-gap')}
          className={`py-2 px-3.5 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'knowledge-gap'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-emerald-700" />
          <span>Knowledge Gap Analyzer</span>
        </button>
      </div>

      {/* SUB-TAB 1: MY ENROLLED LEAVES & HEATMAP */}
      {activeSubTab === 'leaves' && (
        <div className="space-y-8">
          {/* GitHub-Style 365-Day Learning Contribution Heatmap & Streaks */}
          <UpskillingHeatmap />

          {/* Main Section: My Enrolled Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>In-Progress & Enrolled Courses</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                  {enrolledCourses.length}
                </span>
              </h2>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-stone-300 space-y-3">
                <TreePine className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-sm font-bold text-stone-900">Your Learning Garden is Ready</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  You haven't enrolled in any course leaves yet. Explore our Upskilling Tree catalog to begin your journey.
                </p>
                <button
                  onClick={onExploreCatalog}
                  className="mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Browse Upskilling Tree
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {enrolledCourses.map((course) => {
                  const enrollment = enrollments[course.id];
                  const progress = enrollment?.progressPercent || 0;
                  const isCompleted = enrollment?.certificateEarned || progress === 100;

                  return (
                    <div 
                      key={course.id}
                      className="bg-white rounded-2xl border-2 border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-emerald-400 transition-all"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-stone-100">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-lime-100 text-lime-900 border border-lime-300 font-bold text-[10px] shadow-xs">
                            🍃 Leaf
                          </div>
                          {isCompleted && (
                            <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black flex items-center gap-1 shadow-xs border border-amber-300">
                              <Award className="w-3 h-3 text-amber-950" />
                              <span>Certificate</span>
                            </div>
                          )}
                          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-stone-800 border border-stone-200 text-[10px] font-bold shadow-xs">
                            {course.durationHours}h total
                          </div>
                        </div>

                        <div className="p-4 space-y-3">
                          <h3 className="font-bold text-stone-900 text-sm line-clamp-2 leading-snug">
                            {course.title}
                          </h3>

                          <p className="text-xs text-stone-500">
                            Instructor: {course.instructor.name}
                          </p>

                          {/* Progress Bar */}
                          <div>
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="text-stone-500 font-medium">Curriculum Progress</span>
                              <span className="font-bold text-emerald-800">{progress}%</span>
                            </div>
                            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {enrollment.quizScore !== undefined && (
                            <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-stone-50 border border-stone-200">
                              <span className="text-stone-500">Assessment Score:</span>
                              <span className="font-bold text-stone-900">{enrollment.quizScore}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        <button
                          onClick={() => onOpenClassroom(course.id)}
                          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>{progress === 100 ? 'Review Classroom' : 'Resume Learning'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Verified Certificates Showcase */}
          {certificatesCount > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Your Verified Upskilling Credentials</h3>
                    <p className="text-xs text-stone-500">Shareable certificates with cryptographic verification</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {certificatesCount} Earned
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledCourses.filter(c => enrollments[c.id]?.certificateEarned).map((course) => {
                  const enrollment = enrollments[course.id];
                  return (
                    <div 
                      key={course.id}
                      className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-800">
                          ID: {enrollment.certificateId || 'CERT-NOMYSKILL-2026-LIVE'}
                        </span>
                        <h4 className="text-xs font-bold text-stone-900 mt-0.5 line-clamp-1">{course.title}</h4>
                        <p className="text-[11px] text-stone-500">Issued by {course.instructor.name}</p>
                      </div>

                      <button
                        onClick={() => onOpenClassroom(course.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>View / Print</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: SUNLIGHT & WATER GARDEN (GAMIFICATION) */}
      {activeSubTab === 'gamification' && (
        <div className="space-y-6">
          <SunlightWaterGarden 
            enrollments={enrollments} 
            onTriggerMastery={() => setIsCelebrationOpen(true)}
          />
        </div>
      )}

      {/* SUB-TAB 3: GROWTH HISTORY (TIMELINE) */}
      {activeSubTab === 'growth-history' && (
        <div className="space-y-6">
          <GrowthHistoryTimeline
            enrollments={enrollments}
            allCourses={allCourses}
            onOpenClassroom={onOpenClassroom}
            onExploreCatalog={onExploreCatalog}
          />
        </div>
      )}

      {/* SUB-TAB 4: CAREER PATH ROADMAP (Root to Leaf) */}
      {activeSubTab === 'career-path' && (
        <CareerPathRoadmap
          allCourses={allCourses}
          enrollments={enrollments}
          onSelectCourse={onSelectCourse}
          onOpenClassroom={onOpenClassroom}
        />
      )}

      {/* SUB-TAB 5: KNOWLEDGE GAP ANALYZER */}
      {activeSubTab === 'knowledge-gap' && (
        <KnowledgeGapAnalyzer
          allCourses={allCourses}
          enrollments={enrollments}
          onSelectCourse={onSelectCourse}
          onOpenClassroom={onOpenClassroom}
        />
      )}

      {/* Branch Mastery Celebration Overlay */}
      <BranchMasteryCelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        branchName="Artificial Intelligence & Machine Learning"
        departmentName="Technical & Engineering Trunk"
        completedLeavesCount={5}
        badgeId="BRANCH-MASTER-AI-2026-NOMYSKILL"
      />

    </div>
  );
};
