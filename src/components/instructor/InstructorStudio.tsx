import React, { useState } from 'react';
import { 
  Plus, 
  Sparkles, 
  DollarSign, 
  Users, 
  BookOpen, 
  Star, 
  Trash2, 
  Check, 
  ArrowRight, 
  TreePine,
  HelpCircle,
  Video,
  FileText
} from 'lucide-react';
import { LeafCourse, DepartmentId } from '../../types/tree';
import { TRUNK_DEPARTMENTS, BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';
import { ImagenTreeCoverGenerator } from './ImagenTreeCoverGenerator';

interface InstructorStudioProps {
  onAddCourse: (newCourse: LeafCourse) => void;
  instructorCourses: LeafCourse[];
}

export const InstructorStudio: React.FC<InstructorStudioProps> = ({
  onAddCourse,
  instructorCourses
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'builder'>('builder');
  
  // Wizard state for course creation
  const [selectedDeptId, setSelectedDeptId] = useState<DepartmentId>('tech-engineering');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch-ai');
  const [selectedTwigId, setSelectedTwigId] = useState<string>('twig-gen-ai');
  
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [price, setPrice] = useState<number>(99);
  const [durationHours, setDurationHours] = useState<number>(15);
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80');

  // Chapters & Lessons State
  const [chapterTitle, setChapterTitle] = useState('Module 1: Foundations & Architecture');
  const [lessonTitle, setLessonTitle] = useState('Lesson 1: Core Principles');
  const [lessonDuration, setLessonDuration] = useState(25);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState('What is the key advantage of this architecture?');
  const [quizOpt1, setQuizOpt1] = useState('It provides deterministic bounds');
  const [quizOpt2, setQuizOpt2] = useState('It requires no computation');
  const [quizOpt3, setQuizOpt3] = useState('It bypasses all network security');
  const [quizCorrect, setQuizCorrect] = useState(0);

  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const branches = BRANCH_CATEGORIES.filter(b => b.departmentId === selectedDeptId);
  const twigs = TWIG_SUB_STREAMS.filter(t => t.branchId === selectedBranchId);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCourse: LeafCourse = {
      id: `course-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      departmentId: selectedDeptId,
      branchId: selectedBranchId,
      twigId: selectedTwigId,
      summary: summary || 'Comprehensive hands-on curriculum authored on NoMySkill.',
      description: 'In-depth professional masterclass crafted to bridge the knowledge gap from theory to enterprise deployment.',
      thumbnail,
      level,
      durationHours,
      rating: 5.0,
      reviewCount: 1,
      price,
      originalPrice: Math.round(price * 1.5),
      instructor: {
        id: 'inst-current',
        name: 'Dr. Elena Vance',
        role: 'Lead Specialist Instructor',
        company: 'NoMySkill Faculty',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        bio: 'Senior researcher and professional practitioner with a passion for pedagogy.',
        rating: 4.95,
        studentsCount: 38400
      },
      whatYouWillLearn: [
        'Master core frameworks and deploy real-world enterprise architectures',
        'Analyze production trade-offs and latency constraints',
        'Implement standardized automated test suites and validation harnesses',
        'Earn an industry-recognized Verified Upskilling Leaf Certificate'
      ],
      prerequisites: ['Basic familiarity with domain concepts'],
      chapters: [
        {
          id: `ch-1-${Date.now()}`,
          title: chapterTitle,
          lessons: [
            { id: `l-1-${Date.now()}`, title: lessonTitle, durationMinutes: lessonDuration, type: 'video' },
            { id: `l-2-${Date.now()}`, title: 'Hands-on Sandbox Lab', durationMinutes: 40, type: 'lab' }
          ]
        }
      ],
      quiz: [
        {
          id: `q-1-${Date.now()}`,
          question: quizQuestion,
          options: [quizOpt1, quizOpt2, quizOpt3],
          correctAnswer: quizCorrect,
          explanation: 'Standard verified answer explanation based on curricular guidelines.'
        }
      ],
      status: 'published'
    };

    onAddCourse(newCourse);
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      setTitle('');
      setSummary('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Studio Header */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 sm:p-8 text-stone-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-1">
              <TreePine className="w-3.5 h-3.5 text-emerald-700" />
              <span>Upskilling Authoring Engine</span>
            </span>
            <span className="text-stone-500 text-xs">Instructor Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">Instructor Studio & Course Builder</h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Design structured course leaves, place them along the Upskilling Tree taxonomy, and distribute to thousands of ambitious learners.
          </p>
        </div>

        {/* View Switcher */}
        <div className="p-1 rounded-xl bg-stone-100 border border-stone-200 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'builder'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Course Leaf Builder
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Revenue & Analytics
          </button>
        </div>
      </div>

      {publishedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-3">
          <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-bold">Course Leaf Successfully Planted on the Tree!</p>
            <p className="text-[11px] text-emerald-700">Your new course is immediately published in the Tree Explorer & Catalog.</p>
          </div>
        </div>
      )}

      {activeTab === 'builder' ? (
        /* The Course Builder Wizard */
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-base font-bold text-stone-900">1. Placement along the Upskilling Tree</h2>
            <p className="text-xs text-stone-500">
              Every course leaf must branch off a specific Trunk domain, Category branch, and Focus twig.
            </p>
          </div>

          <form onSubmit={handleCreateCourse} className="space-y-6">
            
            {/* Tree Metaphor Placement Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  🪵 Trunk (Department)
                </label>
                <select
                  value={selectedDeptId}
                  onChange={(e) => {
                    const d = e.target.value as DepartmentId;
                    setSelectedDeptId(d);
                    const b = BRANCH_CATEGORIES.find(item => item.departmentId === d);
                    if (b) setSelectedBranchId(b.id);
                  }}
                  className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white font-medium"
                >
                  {TRUNK_DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-900 mb-1">
                  🌿 Branch (Category)
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => {
                    setSelectedBranchId(e.target.value);
                    const t = TWIG_SUB_STREAMS.find(item => item.branchId === e.target.value);
                    if (t) setSelectedTwigId(t.id);
                  }}
                  className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white font-medium"
                >
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  🌱 Twig (Sub-stream)
                </label>
                <select
                  value={selectedTwigId}
                  onChange={(e) => setSelectedTwigId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white font-medium"
                >
                  {twigs.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Metadata */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">2. Leaf Details & Specifications</h3>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus Systems in Go"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Course Headline & Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Short, punchy overview of what learners achieve."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* IMAGEN AI TREE COVER ART GENERATOR */}
              <div className="pt-2">
                <ImagenTreeCoverGenerator
                  courseTitle={title}
                  departmentName={TRUNK_DEPARTMENTS.find(d => d.id === selectedDeptId)?.name}
                  branchName={BRANCH_CATEGORIES.find(b => b.id === selectedBranchId)?.name}
                  onApplyThumbnail={(generatedUrl) => setThumbnail(generatedUrl)}
                  currentThumbnail={thumbnail}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Duration (Hours)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Price (INR / ₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-200 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Curriculum Sample Builder */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-sm font-bold text-stone-900">3. Curriculum Chapter & Initial Lesson</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Module 1 Chapter Title
                  </label>
                  <input
                    type="text"
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    First Video Lesson Title
                  </label>
                  <input
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Assessment Quiz Builder */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-sm font-bold text-stone-900">4. Interactive Assessment Question</h3>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Certification Quiz Question
                </label>
                <input
                  type="text"
                  value={quizQuestion}
                  onChange={(e) => setQuizQuestion(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Option A (Index 0)</label>
                  <input
                    type="text"
                    value={quizOpt1}
                    onChange={(e) => setQuizOpt1(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Option B (Index 1)</label>
                  <input
                    type="text"
                    value={quizOpt2}
                    onChange={(e) => setQuizOpt2(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Option C (Index 2)</label>
                  <input
                    type="text"
                    value={quizOpt3}
                    onChange={(e) => setQuizOpt3(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-stone-950 font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <TreePine className="w-4 h-4" />
              <span>Plant Course Leaf on the Tree</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>
      ) : (
        /* Analytics View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-semibold">Total Net Earnings (85% Split)</span>
              <p className="text-2xl font-black text-emerald-700 mt-2">₹23,45,000</p>
              <p className="text-[11px] text-stone-400 mt-1">Payout scheduled for Friday</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-semibold">Active Student Enrollments</span>
              <p className="text-2xl font-black text-stone-900 mt-2">1,842</p>
              <p className="text-[11px] text-stone-400 mt-1">+14% this month</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-semibold">Instructor Rating</span>
              <p className="text-2xl font-black text-amber-600 mt-2">4.95 ★</p>
              <p className="text-[11px] text-stone-400 mt-1">Based on 1,420 reviews</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 mb-4">My Published Leaves</h3>
            <div className="divide-y divide-stone-100">
              {instructorCourses.slice(0, 4).map((c) => (
                <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={c.thumbnail} alt={c.title} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="font-bold text-stone-900">{c.title}</p>
                      <p className="text-stone-400 text-[11px]">{c.level} · ₹{c.price}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold">
                    Published
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
