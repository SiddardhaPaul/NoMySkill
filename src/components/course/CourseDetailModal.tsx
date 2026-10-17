import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  BookOpen, 
  Check, 
  Award, 
  ShieldCheck, 
  Play, 
  Video, 
  ChevronDown, 
  ChevronUp, 
  ShoppingCart, 
  Sparkles,
  TreePine,
  ArrowRight,
  Briefcase,
  TrendingUp
} from 'lucide-react';
import { LeafCourse } from '../../types/tree';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { ConsultMentorSection } from './ConsultMentorSection';

interface CourseDetailModalProps {
  course: LeafCourse | null;
  onClose: () => void;
  onAddToCart: (course: LeafCourse) => void;
  onBuyNow: (course: LeafCourse) => void;
  isInCart: boolean;
  isEnrolled: boolean;
  onOpenClassroom: (courseId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onAddToCart,
  onBuyNow,
  isInCart,
  isEnrolled,
  onOpenClassroom
}) => {
  const [expandedChapterIndex, setExpandedChapterIndex] = useState<number>(0);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState<boolean>(false);

  if (!course) return null;

  const dept = TRUNK_DEPARTMENTS.find(d => d.id === course.departmentId);
  const branch = BRANCH_CATEGORIES.find(b => b.id === course.branchId);
  const twig = TWIG_SUB_STREAMS.find(t => t.id === course.twigId);

  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/30 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white border-2 border-stone-200 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar with Metaphor Stem Breadcrumb */}
        <div className="p-4 sm:px-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs flex-wrap min-w-0">
            <span className="text-emerald-800 font-bold flex items-center gap-1">
              <TreePine className="w-3.5 h-3.5 text-emerald-700" />
              <span>Upskilling Tree</span>
            </span>
            <span className="text-stone-300">/</span>
            <span className="text-amber-800 font-bold truncate">🪵 {dept?.name}</span>
            <span className="text-stone-300">/</span>
            <span className="text-emerald-800 font-bold truncate">🌿 {branch?.name}</span>
            <span className="text-stone-300">/</span>
            <span className="text-teal-800 font-medium truncate">🌱 {twig?.name}</span>
            <span className="text-stone-300">/</span>
            <span className="text-lime-800 font-bold truncate">🍃 Leaf Course</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors flex-shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* Hero Banner: Title, Video Preview & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Course Metadata */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-lime-500 text-stone-950 font-black text-xs">
                  🍃 Course Leaf
                </span>
                <span className="text-xs text-stone-500 font-medium">{course.level} Level</span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500 font-medium">{course.durationHours} hrs self-paced</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                {course.title}
              </h1>

              <p className="text-sm text-stone-600 leading-relaxed">
                {course.summary}
              </p>

              {/* Rating and Social Proof */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{course.rating}</span>
                </div>
                <span className="text-stone-500">
                  ({course.reviewCount.toLocaleString()} learner reviews)
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Upskilling Certificate
                </span>
              </div>

              {/* Instructor Card */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <p className="text-xs text-stone-500 font-medium">Taught by Leaf Instructor</p>
                  <p className="text-sm font-bold text-stone-900">{course.instructor.name}</p>
                  <p className="text-xs text-stone-600">{course.instructor.role} · {course.instructor.company}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Video Trailer & Instant CTA Box */}
            <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-stone-200 overflow-hidden shadow-xs">
              <div className="relative aspect-video bg-emerald-950/80 flex items-center justify-center overflow-hidden group">
                {isPlayingTrailer ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950 p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 animate-pulse flex items-center justify-center mb-2">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                    <p className="text-xs font-semibold text-emerald-300">Streaming Trailer...</p>
                    <p className="text-[11px] text-stone-200 mt-1 max-w-xs">{course.title}</p>
                    <button
                      onClick={() => setIsPlayingTrailer(false)}
                      className="mt-3 text-[11px] text-stone-300 hover:text-white underline cursor-pointer"
                    >
                      Close Trailer
                    </button>
                  </div>
                ) : (
                  <>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                    <div className="absolute inset-0 bg-stone-900/20 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlayingTrailer(true)}
                        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Play className="w-6 h-6 ml-1 fill-white" />
                      </button>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] text-stone-800 font-bold border border-stone-200 shadow-xs">
                      Preview Trailer (2m)
                    </span>
                  </>
                )}
              </div>

              {/* Price & Action Area */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-stone-900">₹{course.price}</span>
                    <span className="text-sm text-stone-400 line-through">₹{course.originalPrice}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    Special Offer
                  </span>
                </div>

                {isEnrolled ? (
                  <button
                    onClick={() => onOpenClassroom(course.id)}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Enter Interactive Classroom</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => onBuyNow(course)}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Buy Leaf Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onAddToCart(course)}
                      disabled={isInCart}
                      className={`w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        isInCart
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{isInCart ? 'Already Added to Cart' : 'Add to Shopping Cart'}</span>
                    </button>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-200 space-y-1.5 text-[11px] text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>30-Day Money-Back Upskilling Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Shareable Certificate with Verification Hash</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Section: What You Will Learn */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Competencies & Learning Outcomes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Resolved Job Vacancies / Career Pathways */}
          {course.targetJobVacancies && course.targetJobVacancies.length > 0 && (
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  <span>Target Career Vacancies & Job Profiles Qualified by this Leaf</span>
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Industry Demand Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.targetJobVacancies.map((vacancy, vIdx) => (
                  <div key={vIdx} className="p-3.5 rounded-xl bg-white border border-emerald-200 space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-stone-900 text-xs">{vacancy.title}</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {vacancy.demandLevel} Demand
                      </span>
                    </div>
                    <p className="text-xs font-mono font-bold text-emerald-800">
                      Average Compensation: {vacancy.avgSalary}
                    </p>
                    {vacancy.hiringCompanies && (
                      <p className="text-[11px] text-stone-500">
                        Top Employers: {vacancy.hiringCompanies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Consult a Mentor (1-on-1 Virtual Chat Session with Industry Professional) */}
          <ConsultMentorSection course={course} />

          {/* Section: Syllabus / Chapters & Lessons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Curriculum Outline ({course.chapters.length} Modules · {totalLessons} Lessons)</span>
              </h3>
              <span className="text-xs text-stone-500">{course.durationHours} hours total content</span>
            </div>

            <div className="space-y-2">
              {course.chapters.map((chapter, chIdx) => {
                const isExpanded = expandedChapterIndex === chIdx;
                return (
                  <div 
                    key={chapter.id} 
                    className="rounded-xl border border-stone-200 bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedChapterIndex(isExpanded ? -1 : chIdx)}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-emerald-800">
                          Module {chIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-stone-900">{chapter.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-500 text-xs">
                        <span>{chapter.lessons.length} lessons</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="divide-y divide-stone-100 bg-stone-50 px-3.5 py-1">
                        {chapter.lessons.map((lesson, lIdx) => (
                          <div 
                            key={lesson.id} 
                            className="py-2.5 flex items-center justify-between text-xs text-stone-700 hover:text-stone-900"
                          >
                            <div className="flex items-center gap-2">
                              <Video className="w-3.5 h-3.5 text-stone-400" />
                              <span>{lIdx + 1}. {lesson.title}</span>
                            </div>
                            <span className="text-stone-500 text-[11px] font-mono">
                              {lesson.durationMinutes} min
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Instructor Full Bio */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-emerald-500/30 flex-shrink-0"
            />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-stone-900">{course.instructor.name}</h4>
              <p className="text-xs text-emerald-800 font-medium">{course.instructor.role} · {course.instructor.company}</p>
              <p className="text-xs text-stone-600 leading-relaxed">{course.instructor.bio}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
