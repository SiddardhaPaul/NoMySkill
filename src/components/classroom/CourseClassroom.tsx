import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Circle, 
  Award, 
  ArrowLeft, 
  FileText, 
  HelpCircle, 
  Download, 
  Printer, 
  Sparkles,
  TreePine,
  Clock,
  BookOpen,
  Volume2,
  Maximize,
  ShieldCheck
} from 'lucide-react';
import { LeafCourse, UserEnrollment, ActiveUser } from '../../types/tree';

interface CourseClassroomProps {
  course: LeafCourse;
  enrollment: UserEnrollment;
  onUpdateEnrollment: (courseId: string, updated: Partial<UserEnrollment>) => void;
  onBackToDashboard: () => void;
  currentUser: ActiveUser;
}

export const CourseClassroom: React.FC<CourseClassroomProps> = ({
  course,
  enrollment,
  onUpdateEnrollment,
  onBackToDashboard,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'quiz' | 'certificate'>('video');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [userNotes, setUserNotes] = useState<string>(enrollment.notes || '');
  
  // Find all lessons in order
  const allLessons = course.chapters.flatMap(ch => ch.lessons);
  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || '');
  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];
  const activeChapter = course.chapters.find(ch => ch.lessons.some(l => l.id === activeLessonId));

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(enrollment.quizScore !== undefined);
  const [quizScorePercent, setQuizScorePercent] = useState<number>(enrollment.quizScore || 0);

  const completedIds = enrollment.completedLessonIds || [];

  const handleToggleLessonComplete = (lessonId: string) => {
    let nextCompleted: string[];
    if (completedIds.includes(lessonId)) {
      nextCompleted = completedIds.filter(id => id !== lessonId);
    } else {
      nextCompleted = [...completedIds, lessonId];
    }
    
    const progress = Math.round((nextCompleted.length / allLessons.length) * 100);
    const certificateEarned = progress === 100 && (enrollment.quizPassed || course.quiz.length === 0);

    onUpdateEnrollment(course.id, {
      completedLessonIds: nextCompleted,
      progressPercent: progress,
      certificateEarned: certificateEarned || enrollment.certificateEarned,
      certificateId: enrollment.certificateId || (certificateEarned ? `CERT-NOMYSKILL-2026-${Date.now().toString().slice(-6)}` : undefined)
    });
  };

  const handleSelectQuizAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    course.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / course.quiz.length) * 100);
    const passed = score >= 70;
    const progress = enrollment.progressPercent;
    const earnedCert = passed && progress === 100;

    setQuizScorePercent(score);
    setIsQuizSubmitted(true);

    onUpdateEnrollment(course.id, {
      quizScore: score,
      quizPassed: passed,
      certificateEarned: earnedCert || enrollment.certificateEarned,
      certificateId: enrollment.certificateId || (earnedCert ? `CERT-NOMYSKILL-2026-${Date.now().toString().slice(-6)}` : undefined)
    });

    if (earnedCert) {
      setActiveTab('certificate');
    }
  };

  const handleSaveNotes = () => {
    onUpdateEnrollment(course.id, {
      notes: userNotes
    });
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const certificateId = enrollment.certificateId || `CERT-NOMYSKILL-2026-${course.id.slice(-4).toUpperCase()}`;

  return (
    <div className="bg-white text-stone-900 min-h-screen flex flex-col">
      
      {/* Top Classroom Bar */}
      <div className="px-4 py-3 bg-white border-b border-stone-200 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-bold border border-stone-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                🍃 Course Leaf
              </span>
              <h2 className="text-sm font-black text-stone-900 truncate max-w-md">
                {course.title}
              </h2>
            </div>
            <p className="text-[11px] text-stone-500 truncate mt-0.5">
              {activeChapter?.title} · Lesson: {activeLesson?.title}
            </p>
          </div>
        </div>

        {/* Progress % Widget */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-emerald-700">{enrollment.progressPercent}% Completed</span>
            <div className="w-32 bg-stone-100 h-2 rounded-full overflow-hidden mt-1 border border-stone-200">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${enrollment.progressPercent}%` }}
              ></div>
            </div>
          </div>

          {enrollment.certificateEarned && (
            <button
              onClick={() => setActiveTab('certificate')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">View Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Player on Left, Curriculum Sidebar on Right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-white">
        
        {/* Left Column (8 Cols): Video Player & Classroom Tabs */}
        <div className="lg:col-span-8 flex flex-col border-b lg:border-b-0 lg:border-r border-stone-200 overflow-y-auto">
          
          {/* Interactive Simulated Video Player */}
          <div className="bg-stone-900 relative aspect-video flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
            
            {/* Simulated Frame */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white relative z-10">
              <div 
                className="w-16 h-16 rounded-full bg-emerald-600/95 hover:bg-emerald-500 text-white flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 transition-transform"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </div>

              <div className="mt-4 max-w-lg">
                <span className="text-xs font-mono text-emerald-400">Now Streaming: {activeLesson?.title}</span>
                <p className="text-xs text-stone-300 mt-1">
                  Presented by {course.instructor.name} · {activeLesson?.durationMinutes} minutes
                </p>
                {isPlaying && (
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[11px] text-emerald-300 font-mono">Stream Active ({playbackSpeed}x)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Video Player Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs text-stone-300 z-20">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
                  <span>04:12</span>
                  <span>/</span>
                  <span>{activeLesson?.durationMinutes}:00</span>
                </div>

                {/* Progress Scrubber */}
                <div className="w-32 sm:w-64 bg-stone-700 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div className="bg-emerald-500 h-full w-1/3"></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Speed Selector */}
                <select 
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-stone-800 text-stone-200 border border-stone-700 rounded px-1.5 py-0.5 text-[11px]"
                >
                  <option value={1}>1.0x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2.0x</option>
                </select>

                <Volume2 className="w-4 h-4 text-stone-400" />
                <Maximize className="w-4 h-4 text-stone-400" />
              </div>
            </div>
          </div>

          {/* Interactive Classroom Tab Headers */}
          <div className="px-4 bg-stone-50 border-b border-stone-200 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('video')}
              className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'video'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lesson Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'notes'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>My Study Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'quiz'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Module Assessment Quiz ({course.quiz.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'certificate'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Verified Certificate</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-5 flex-1 bg-white">
            
            {/* TAB 1: VIDEO OVERVIEW */}
            {activeTab === 'video' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-900">{activeLesson?.title}</h3>
                  <button
                    onClick={() => activeLesson && handleToggleLessonComplete(activeLesson.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeLesson && completedIds.includes(activeLesson.id)
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {activeLesson && completedIds.includes(activeLesson.id)
                        ? 'Lesson Completed'
                        : 'Mark Lesson Complete'}
                    </span>
                  </button>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  In this session, we investigate practical implementations for this skill twig. You will examine reference patterns, analyze failure modes, and apply architectural best practices.
                </p>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Key Outcomes for this Module
                  </h4>
                  <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside">
                    {course.whatYouWillLearn.slice(0, 3).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: STUDY NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Course Notes Notebook</h3>
                    <p className="text-xs text-stone-500">Jot down timestamps, takeaways, and questions.</p>
                  </div>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Save Notes
                  </button>
                </div>

                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Record your personal notes here..."
                  rows={8}
                  className="w-full bg-white text-stone-800 border border-stone-200 rounded-2xl p-3 text-xs font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 leading-relaxed shadow-xs"
                />
              </div>
            )}

            {/* TAB 3: MODULE QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Course Knowledge Assessment</h3>
                    <p className="text-xs text-stone-500">Score 70% or higher to unlock your Verified Upskilling Certificate.</p>
                  </div>
                  {isQuizSubmitted && (
                    <div className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs">
                      Score: <span className="font-bold text-emerald-700">{quizScorePercent}%</span> · {enrollment.quizPassed ? 'Passed' : 'Needs Review'}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {course.quiz.map((q, qIndex) => {
                    const selected = selectedAnswers[q.id];
                    const isCorrect = selected === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                        <p className="text-xs font-bold text-stone-900">
                          {qIndex + 1}. {q.question}
                        </p>

                        <div className="space-y-1.5">
                          {q.options.map((option, optIndex) => {
                            let optionStyle = 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100';
                            if (selected === optIndex) {
                              optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-400/30';
                            }
                            if (isQuizSubmitted) {
                              if (optIndex === q.correctAnswer) {
                                optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                              } else if (selected === optIndex && !isCorrect) {
                                optionStyle = 'bg-red-50 border-red-300 text-red-900';
                              }
                            }

                            return (
                              <button
                                key={optIndex}
                                onClick={() => handleSelectQuizAnswer(q.id, optIndex)}
                                className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${optionStyle}`}
                              >
                                <span>{option}</span>
                                {selected === optIndex && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {isQuizSubmitted && (
                          <div className="p-3 rounded-xl bg-white text-[11px] text-stone-600 border border-stone-200">
                            <span className="font-bold text-emerald-700">Explanation: </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!isQuizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < course.quiz.length}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Submit Assessment for Grading
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsQuizSubmitted(false);
                      setSelectedAnswers({});
                    }}
                    className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
                  >
                    Retake Assessment
                  </button>
                )}
              </div>
            )}

            {/* TAB 4: CERTIFICATE GENERATOR */}
            {activeTab === 'certificate' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Verified Certificate of Upskilling</h3>
                    <p className="text-xs text-stone-500">Official credentials issued by the NoMySkill Tree Academy.</p>
                  </div>
                  <button
                    onClick={handlePrintCertificate}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>

                {/* Printable Certificate Canvas */}
                <div 
                  id="printable-certificate"
                  className="bg-amber-50/40 border-4 border-double border-emerald-700/60 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-lg text-stone-900"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <TreePine className="w-64 h-64 text-emerald-800" />
                  </div>

                  <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2">
                      <TreePine className="w-6 h-6 text-emerald-700" />
                      <span className="font-extrabold text-sm tracking-wider uppercase text-emerald-800">
                        NoMySkill Upskilling Academy
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-stone-900 uppercase">
                      Certificate of Achievement
                    </h2>

                    <p className="text-xs text-stone-500">
                      This is to certify that
                    </p>

                    <p className="text-xl font-bold text-emerald-900 font-serif border-b-2 border-amber-300 pb-2 inline-block px-8">
                      {currentUser.name}
                    </p>

                    <p className="text-xs text-stone-600 leading-relaxed max-w-lg mx-auto">
                      has successfully mastered the course curriculum and passed the standardized leaf assessment for
                    </p>

                    <p className="text-base font-bold text-stone-900">
                      "{course.title}"
                    </p>

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 text-xs text-stone-600">
                      <div className="text-left">
                        <p className="font-mono text-[10px] text-stone-400">ISSUED CREDENTIAL ID</p>
                        <p className="font-mono font-bold text-emerald-800">{certificateId}</p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto rounded-full border-2 border-emerald-600/50 flex items-center justify-center text-emerald-700 bg-white shadow-xs">
                          <Award className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 font-semibold">VERIFIED NOMYSKILL SEAL</p>
                      </div>

                      <div className="text-right">
                        <p className="font-serif italic text-stone-900 font-bold">{course.instructor.name}</p>
                        <p className="text-[10px] text-stone-400">Lead Curriculum Instructor</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Right Column (4 Cols): Curriculum Outline Sidebar */}
        <div className="lg:col-span-4 bg-stone-50 p-4 overflow-y-auto space-y-4 border-l border-stone-200">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Course Outline
            </h3>
            <span className="text-[11px] text-stone-500 font-medium">
              {completedIds.length} of {allLessons.length} done
            </span>
          </div>

          <div className="space-y-3">
            {course.chapters.map((chapter, chIdx) => (
              <div key={chapter.id} className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs">
                <div className="p-3 bg-stone-100/70 text-xs font-bold text-stone-800 border-b border-stone-200 flex items-center justify-between">
                  <span>Module {chIdx + 1}: {chapter.title}</span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    {chapter.lessons.length} lessons
                  </span>
                </div>

                <div className="divide-y divide-stone-100">
                  {chapter.lessons.map((lesson) => {
                    const isCompleted = completedIds.includes(lesson.id);
                    const isActive = activeLessonId === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`p-2.5 flex items-center justify-between text-xs transition-colors ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-950 font-bold'
                            : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <div 
                          className="flex items-center gap-2 flex-1 cursor-pointer min-w-0"
                          onClick={() => {
                            setActiveLessonId(lesson.id);
                            setIsPlaying(true);
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleLessonComplete(lesson.id);
                            }}
                            className="flex-shrink-0 cursor-pointer"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                            ) : (
                              <Circle className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                            )}
                          </button>
                          <span className="truncate">{lesson.title}</span>
                        </div>

                        <span className="text-[10px] text-stone-400 font-mono ml-2 flex-shrink-0">
                          {lesson.durationMinutes}m
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
