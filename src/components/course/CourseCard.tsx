import React from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  Clock, 
  BookOpen, 
  ShoppingCart, 
  ArrowRight, 
  Check, 
  ShieldCheck,
  Award,
  CheckCircle2,
  Briefcase,
  Sparkles,
  Download
} from 'lucide-react';
import { LeafCourse, UserEnrollment } from '../../types/tree';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { LeafProgressIndicator } from './LeafProgressIndicator';

interface CourseCardProps {
  course: LeafCourse;
  onSelectCourse: (course: LeafCourse) => void;
  onAddToCart: (course: LeafCourse) => void;
  isInCart: boolean;
  isEnrolled: boolean;
  enrollment?: UserEnrollment;
  progressPercent?: number;
  completedLessonIds?: string[];
  onOpenClassroom?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse,
  onAddToCart,
  isInCart,
  isEnrolled,
  enrollment,
  progressPercent: directProgressPercent,
  onOpenClassroom
}) => {
  const dept = TRUNK_DEPARTMENTS.find(d => d.id === course.departmentId);
  const branch = BRANCH_CATEGORIES.find(b => b.id === course.branchId);
  const twig = TWIG_SUB_STREAMS.find(t => t.id === course.twigId);

  // Compute progress & certificate status from enrollment
  const progressPercent = typeof directProgressPercent === 'number' 
    ? directProgressPercent 
    : (enrollment?.progressPercent ?? (isEnrolled ? 25 : 0));

  const isCompleted = isEnrolled && (enrollment?.certificateEarned || progressPercent === 100);

  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const completedLessons = enrollment?.completedLessonIds?.length 
    ?? Math.round((progressPercent / 100) * totalLessons);

  const discountPercent = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col group relative ${
        isCompleted
          ? 'border-amber-400 shadow-md ring-2 ring-amber-400/20'
          : isEnrolled
          ? 'border-emerald-400 shadow-md ring-1 ring-emerald-400/20'
          : 'border-stone-200 shadow-xs hover:border-emerald-400 hover:shadow-md'
      }`}
    >
      
      {/* Thumbnail with Leaf Badge & Progress / Certificate Overlay */}
      <div 
        className="relative aspect-video overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onSelectCourse(course)}
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/25 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Metaphor Tag: Leaf Level Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-900 font-bold text-[10px] shadow-xs border border-lime-300 flex items-center gap-1">
            <span>🍃 Leaf</span>
          </span>
          {course.isFeatured && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] border border-amber-300 shadow-xs">
              Featured
            </span>
          )}
        </div>

        {/* TOP-RIGHT: Visual Progress Ring OR Certificate Earned Badge Overlay */}
        <div className="absolute top-3 right-3 z-10">
          {isCompleted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black text-[11px] shadow-sm flex items-center gap-1.5 border border-amber-300"
            >
              <Award className="w-3.5 h-3.5 text-amber-950" />
              <span>Certificate Earned</span>
            </motion.div>
          ) : isEnrolled ? (
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-xs border border-emerald-300">
              <LeafProgressIndicator
                progressPercent={progressPercent}
                variant="ring"
                size="sm"
                theme="light"
              />
            </div>
          ) : null}
        </div>

        {/* Level & Duration Badge Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-stone-800 text-[10px] font-bold z-10">
          <span className="bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-stone-200 shadow-xs">
            {course.level}
          </span>
          <span className="bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-stone-200 shadow-xs flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-500" />
            {course.durationHours} hours
          </span>
        </div>
      </div>

      {/* Course Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Taxonomy Metaphor Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1.5 truncate">
            <span className="text-amber-800 font-bold">{dept?.name.split(' ')[0]}</span>
            <span aria-hidden="true" className="text-stone-300">/</span>
            <span className="text-emerald-800 font-bold">{branch?.name.split(' ')[0]}</span>
            <span aria-hidden="true" className="text-stone-300">/</span>
            <span className="text-teal-800 font-medium truncate">{twig?.name}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectCourse(course)}
            className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2"
          >
            {course.title}
          </h3>

          {/* Summary */}
          <p className="text-xs text-stone-600 line-clamp-2 mt-1.5">
            {course.summary}
          </p>

          {/* Career Vacancies / Target Job Profiles */}
          {course.targetJobVacancies && course.targetJobVacancies.length > 0 && (
            <div className="mt-2.5 p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-[11px] space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 text-emerald-900 font-bold">
                  <Briefcase className="w-3 h-3 text-emerald-700" />
                  <span>Job Profiles / Vacancies:</span>
                </span>
                <span className="text-emerald-800 font-mono font-bold">
                  {course.targetJobVacancies[0].avgSalary}
                </span>
              </div>
              <p className="font-semibold text-stone-900 text-[11px] truncate">
                {course.targetJobVacancies.map(v => v.title).join(' · ')}
              </p>
            </div>
          )}

          {/* Instructor & Star Rating */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-stone-200"
              />
              <span className="text-stone-700 font-medium truncate text-[11px]">
                {course.instructor.name}
              </span>
            </div>

            <div className="flex items-center gap-1 text-stone-900 font-bold text-xs flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating}</span>
              <span className="text-[10px] text-stone-400 font-normal">({course.reviewCount.toLocaleString()})</span>
            </div>
          </div>

          {/* VISUAL GROWTH BAR IF ENROLLED */}
          {isEnrolled && (
            <div className="pt-2.5 mt-2 border-t border-stone-100">
              <LeafProgressIndicator
                progressPercent={progressPercent}
                completedLessonsCount={completedLessons}
                totalLessonsCount={totalLessons}
                variant="bar"
                size="sm"
                theme="light"
                showStatusLabel={true}
              />
            </div>
          )}
        </div>

        {/* Pricing & Call to Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-stone-900">₹{course.price}</span>
              <span className="text-xs text-stone-400 line-through">₹{course.originalPrice}</span>
            </div>
            {discountPercent > 0 && (
              <span className="text-[10px] text-emerald-700 font-semibold">
                Save {discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {isCompleted ? (
              <button
                onClick={() => onOpenClassroom ? onOpenClassroom(course.id) : onSelectCourse(course)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certificate</span>
              </button>
            ) : isEnrolled ? (
              <button
                onClick={() => onOpenClassroom ? onOpenClassroom(course.id) : onSelectCourse(course)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Classroom</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onAddToCart(course)}
                  disabled={isInCart}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isInCart
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                  title={isInCart ? 'Already in cart' : 'Add course to cart'}
                  aria-label="Add to cart"
                >
                  {isInCart ? <Check className="w-4 h-4 text-emerald-600" /> : <ShoppingCart className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onSelectCourse(course)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                >
                  <span>View Leaf</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

      </div>

    </motion.div>
  );
};
