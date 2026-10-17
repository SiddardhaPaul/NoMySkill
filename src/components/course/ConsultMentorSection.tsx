import React, { useState } from 'react';
import { 
  MessageSquare, 
  Video, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  UserCheck, 
  Briefcase, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  GraduationCap,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { LeafCourse, Instructor } from '../../types/tree';

export interface IndustryMentor {
  id: string;
  name: string;
  role: string;
  company: string;
  photoAvatar: string;
  generatedAvatar: string;
  rating: number;
  sessionsCompleted: number;
  yearsExperience: number;
  bio: string;
  mentorshipPhilosophy: string;
  education: string;
  specialties: string[];
  hourlyRate: number;
  isOnlineNow: boolean;
  availableSlots: string[];
  studentReviewQuote: string;
}

interface ConsultMentorSectionProps {
  course: LeafCourse;
  currentUser?: {
    name: string;
    email: string;
  };
}

export const ConsultMentorSection: React.FC<ConsultMentorSectionProps> = ({ 
  course,
  currentUser = { name: 'Alex Rivera', email: 'alex.rivera@example.com' }
}) => {
  const primaryJob = course.targetJobVacancies?.[0]?.title || 'Senior Specialist';
  const targetCompany = course.targetJobVacancies?.[0]?.hiringCompanies?.[0] || 'Top Industry Leader';

  const mentors: IndustryMentor[] = [
    {
      id: `mentor-${course.instructor.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: course.instructor.name,
      role: course.instructor.role,
      company: course.instructor.company,
      photoAvatar: course.instructor.avatar,
      generatedAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(course.instructor.name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
      rating: course.instructor.rating,
      sessionsCompleted: 148,
      yearsExperience: 12,
      bio: `Lead course architect and senior practitioner with over a decade of enterprise production experience. Specializing in taking ${course.title} concepts into high-scale production systems. Dedicated to helping NoMySkill students master practical nuances, pass technical interviews, and deploy production-grade architectures.`,
      mentorshipPhilosophy: 'Hands-on architectural feedback with no generic fluff — we review your code, system design, and project trade-offs directly.',
      education: 'M.S. in Computer Science, Stanford University',
      specialties: [
        'Curriculum Deep-Dive',
        'Capstone Architecture Review',
        `${primaryJob} Interview Readiness`,
        'Portfolio Defense'
      ],
      hourlyRate: 0, // Complimentary 1st session with course
      isOnlineNow: true,
      availableSlots: ['4:30 PM - 5:00 PM', '7:00 PM - 7:30 PM', '8:30 PM - 9:00 PM'],
      studentReviewQuote: 'The 1-on-1 session helped me debug my capstone agent in 20 minutes and gave me exact talking points for my interview!'
    },
    {
      id: `mentor-industry-${course.id}`,
      name: course.departmentId === 'tech-engineering' ? 'Dr. Marcus Wei' :
            course.departmentId === 'business-operations' ? 'Sophia Lindqvist' :
            course.departmentId === 'creative-service' ? 'Julian Rossi' : 'Dr. Hannah Al-Mansoor',
      role: course.departmentId === 'tech-engineering' ? `Principal Systems Architect & Fellow` :
            course.departmentId === 'business-operations' ? `VP of Growth & Strategy` :
            course.departmentId === 'creative-service' ? `Global Director of Experience Design` : `Chief Learning Strategist`,
      company: targetCompany,
      photoAvatar: course.departmentId === 'tech-engineering' 
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
        : course.departmentId === 'business-operations'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
        : course.departmentId === 'creative-service'
        ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      generatedAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(course.id + 'mentor')}&backgroundColor=ffd5dc,ffdfbf`,
      rating: 4.98,
      sessionsCompleted: 215,
      yearsExperience: 15,
      bio: `Industry hiring manager and senior advisor at ${targetCompany}. Regularly evaluates candidates applying for ${primaryJob} openings and directs internal engineering guilds. Experienced in bridging academic knowledge gaps with high-velocity industry execution.`,
      mentorshipPhilosophy: 'I focus on real hiring rubrics: what makes hiring managers say YES when looking at your upskilling accomplishments.',
      education: 'Ph.D. in Engineering Systems, MIT',
      specialties: [
        'Mock Technical Screening',
        'Resume & GitHub Alignment',
        'Industry Referral Roadmap',
        'System Scalability Evaluation'
      ],
      hourlyRate: 3499, // ₹3,499 in INR
      isOnlineNow: false,
      availableSlots: ['11:30 AM - 12:00 PM', '3:00 PM - 3:30 PM', '5:00 PM - 5:30 PM'],
      studentReviewQuote: 'Marcus pointed out 3 critical blindspots in my system design that made all the difference in landing my offer!'
    }
  ];

  const [selectedMentorId, setSelectedMentorId] = useState<string>(mentors[0].id);
  const [avatarMode, setAvatarMode] = useState<'generated' | 'photo'>('generated');
  const [sessionType, setSessionType] = useState<'chat' | 'video' | 'review'>('chat');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('IST (UTC+5:30)');
  const [selectedSlot, setSelectedSlot] = useState<string>('4:30 PM - 5:00 PM');
  const [selectedTopic, setSelectedTopic] = useState<string>(`Preparing for ${primaryJob} openings`);
  const [studentNote, setStudentNote] = useState<string>('');
  
  // Booking confirmation & Chat state
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [activeChatOpen, setActiveChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'mentor'; text: string; time: string }>>([]);
  const [chatInput, setChatInput] = useState<string>('');

  const activeMentor = mentors.find(m => m.id === selectedMentorId) || mentors[0];

  const handleSelectMentor = (m: IndustryMentor) => {
    setSelectedMentorId(m.id);
    setSelectedSlot(m.availableSlots[0]);
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setChatMessages([
      {
        sender: 'mentor',
        text: `Hello ${currentUser.name}! I'm excited to connect with you regarding "${course.title}". I've received your request for our 1-on-1 session (${selectedSlot}). Feel free to ask any preliminary questions or share your current portfolio/repo link here anytime before our session!`,
        time: 'Just now'
      }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: nowTime }]);
    setChatInput('');

    // Simulated instant mentor response
    setTimeout(() => {
      let mentorReply = `Thanks for sharing! For ${course.title}, the biggest differentiator recruiters at companies like ${activeMentor.company} look for is demonstrable competency in real-world scenarios. We'll specifically review this during our upcoming session!`;
      if (userMsg.toLowerCase().includes('interview') || userMsg.toLowerCase().includes('job')) {
        mentorReply = `Great question on job readiness! During our 1-on-1, I'll walk you through the exact technical screening questions we use at ${activeMentor.company} for ${primaryJob} candidates.`;
      } else if (userMsg.toLowerCase().includes('code') || userMsg.toLowerCase().includes('project')) {
        mentorReply = `I love looking at code and project architectures! Go ahead and paste your GitHub or Figma link whenever you are ready so I can review it before our scheduled call.`;
      }

      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'mentor', 
          text: mentorReply, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }, 900);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-emerald-200 space-y-6 shadow-sm text-stone-900 relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300">
              <MessageSquare className="w-4 h-4 text-emerald-700" />
            </span>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <span>Consult an Industry Mentor</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                1-on-1 Virtual Session
              </span>
            </h3>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Connect directly with verified experts and instructors who work at top companies hiring for this leaf course.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>NoMySkill Verified Practitioners</span>
        </div>
      </div>

      {!bookingConfirmed ? (
        <div className="space-y-6">
          
          {/* Step 1: Mentor Selection & Avatar Toggle */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                1. Choose Your Industry Mentor for this Leaf
              </label>

              {/* Avatar API Toggle: Generated Avatar vs Photo */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-[11px]">
                <button
                  type="button"
                  onClick={() => setAvatarMode('generated')}
                  className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                    avatarMode === 'generated'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Placeholder API Generated Avatar"
                >
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Generated Avatar
                </button>
                <button
                  type="button"
                  onClick={() => setAvatarMode('photo')}
                  className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                    avatarMode === 'photo'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Photo Avatar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentors.map((mentor) => {
                const isSelected = mentor.id === selectedMentorId;
                const avatarSrc = avatarMode === 'generated' ? mentor.generatedAvatar : mentor.photoAvatar;

                return (
                  <div
                    key={mentor.id}
                    onClick={() => handleSelectMentor(mentor)}
                    className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                        : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={avatarSrc}
                          alt={mentor.name}
                          className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-400/40 bg-stone-100 shadow-xs"
                        />
                        {mentor.isOnlineNow && (
                          <span 
                            className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" 
                            title="Online Now"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-sm font-extrabold text-stone-900 truncate">{mentor.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {mentor.hourlyRate === 0 ? 'Complimentary' : `₹${mentor.hourlyRate.toLocaleString()}/session`}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800 font-semibold truncate">
                          {mentor.role}
                        </p>
                        <p className="text-[11px] text-stone-600 truncate flex items-center gap-1 mt-0.5">
                          <Briefcase className="w-3 h-3 text-stone-500" />
                          <span>{mentor.company} · {mentor.yearsExperience} yrs exp</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{mentor.rating}</span>
                        <span className="text-[11px] text-stone-500 font-normal">
                          ({mentor.sessionsCompleted} sessions)
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{mentor.availableSlots[0]}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {mentor.specialties.slice(0, 3).map((s, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DEDICATED MENTOR PROFILE SECTION */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>Mentor Profile: {activeMentor.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Avatar column */}
              <div className="md:col-span-3 flex flex-col items-center text-center space-y-2 bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <img
                  src={avatarMode === 'generated' ? activeMentor.generatedAvatar : activeMentor.photoAvatar}
                  alt={activeMentor.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-400 bg-stone-50"
                />
                <h5 className="font-extrabold text-stone-900 text-xs">{activeMentor.name}</h5>
                <p className="text-[11px] text-emerald-800 font-medium">{activeMentor.company}</p>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {activeMentor.yearsExperience}+ Years in Industry
                </span>
              </div>

              {/* Bio & Details column */}
              <div className="md:col-span-9 space-y-3">
                <div>
                  <h6 className="text-xs font-bold text-stone-800">Professional Bio</h6>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {activeMentor.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-500 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-emerald-600" />
                      <span>Education & Background</span>
                    </span>
                    <p className="text-xs font-semibold text-stone-800 mt-0.5">{activeMentor.education}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-500 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" />
                      <span>Mentorship Philosophy</span>
                    </span>
                    <p className="text-xs font-medium text-stone-700 mt-0.5 line-clamp-2">{activeMentor.mentorshipPhilosophy}</p>
                  </div>
                </div>

                {/* Specialties Tags */}
                <div>
                  <h6 className="text-[11px] font-bold text-stone-700 mb-1.5">Verified Areas of Expertise:</h6>
                  <div className="flex flex-wrap gap-1.5">
                    {activeMentor.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-700" />
                        <span>{spec}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Student review snippet */}
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="italic">"{activeMentor.studentReviewQuote}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Session Format & Slot */}
          <form onSubmit={handleBookSession} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Session Type */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  2. Session Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSessionType('chat')}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      sessionType === 'chat'
                        ? 'bg-emerald-50 border-emerald-500 text-stone-900 font-bold'
                        : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs">1-on-1 Chat</span>
                    <span className="text-[10px] text-stone-500">30 min</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessionType('video')}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      sessionType === 'video'
                        ? 'bg-emerald-50 border-emerald-500 text-stone-900 font-bold'
                        : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Video className="w-4 h-4 text-teal-700" />
                    <span className="text-xs">HD Video</span>
                    <span className="text-[10px] text-stone-500">45 min</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessionType('review')}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      sessionType === 'review'
                        ? 'bg-emerald-50 border-emerald-500 text-stone-900 font-bold'
                        : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-xs">Code/Portfolio</span>
                    <span className="text-[10px] text-stone-500">60 min</span>
                  </button>
                </div>
              </div>

              {/* Interactive Availability Calendar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                    3. Interactive Availability Calendar & Schedule Sync
                  </label>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Synced with Mentor's Schedule</span>
                  </div>
                </div>

                {/* Day Picker Carousel */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {[
                    { dayName: 'Today', dateStr: '15 Oct', dayOfWeek: 'Thu', slotsCount: 3 },
                    { dayName: 'Tomorrow', dateStr: '16 Oct', dayOfWeek: 'Fri', slotsCount: 4 },
                    { dayName: 'Sat', dateStr: '17 Oct', dayOfWeek: 'Sat', slotsCount: 2 },
                    { dayName: 'Sun', dateStr: '18 Oct', dayOfWeek: 'Sun', slotsCount: 1 },
                    { dayName: 'Mon', dateStr: '19 Oct', dayOfWeek: 'Mon', slotsCount: 4 },
                    { dayName: 'Tue', dateStr: '20 Oct', dayOfWeek: 'Tue', slotsCount: 3 },
                    { dayName: 'Wed', dateStr: '21 Oct', dayOfWeek: 'Wed', slotsCount: 5 },
                  ].map((d, dIdx) => (
                    <button
                      key={dIdx}
                      type="button"
                      onClick={() => {
                        setSelectedDayIndex(dIdx);
                        setSelectedSlot(dIdx === 0 ? '4:30 PM - 5:00 PM' : '11:00 AM - 11:30 AM');
                      }}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                        selectedDayIndex === dIdx
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      <span className="text-[10px] uppercase opacity-90">{d.dayName}</span>
                      <span className="text-xs font-black my-0.5">{d.dateStr}</span>
                      <span className={`text-[9px] px-1 rounded-full ${selectedDayIndex === dIdx ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-100 text-emerald-800'}`}>
                        {d.slotsCount} open
                      </span>
                    </button>
                  ))}
                </div>

                {/* Filter by Morning / Afternoon / Evening & Timezone */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-[11px] font-semibold">
                    {(['all', 'morning', 'afternoon', 'evening'] as const).map(period => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setSelectedTimePeriod(period)}
                        className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                          selectedTimePeriod === period
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Timezone:</span>
                    <select
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium px-2 py-0.5 text-stone-800 focus:outline-none"
                    >
                      <option value="IST (UTC+5:30)">IST (India Standard Time UTC+5:30)</option>
                      <option value="EST (UTC-5)">EST (Eastern Time UTC-5)</option>
                      <option value="PST (UTC-8)">PST (Pacific Time UTC-8)</option>
                      <option value="GMT (UTC+0)">GMT (London UTC+0)</option>
                      <option value="SGT (UTC+8)">SGT (Singapore UTC+8)</option>
                    </select>
                  </div>
                </div>

                {/* Filtered Slots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {[
                    { time: '09:30 AM - 10:00 AM', period: 'morning', status: 'Available' },
                    { time: '11:00 AM - 11:30 AM', period: 'morning', status: 'Available' },
                    { time: '02:00 PM - 02:30 PM', period: 'afternoon', status: 'Available' },
                    { time: '04:30 PM - 05:00 PM', period: 'afternoon', status: 'Popular Slot' },
                    { time: '07:00 PM - 07:30 PM', period: 'evening', status: 'Available' },
                    { time: '08:30 PM - 09:00 PM', period: 'evening', status: 'Available' },
                  ]
                    .filter(s => selectedTimePeriod === 'all' || s.period === selectedTimePeriod)
                    .map((slot, sIdx) => {
                      const isSelected = selectedSlot === slot.time;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/30'
                              : 'bg-white border-stone-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-900">{slot.time}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
                          </div>
                          <span className="text-[10px] text-emerald-700 font-medium mt-1">
                            {slot.status} · {selectedTimezone.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Topic & Note */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  4. Consultation Topic & What You Want to Cover
                </label>
                <input
                  type="text"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  placeholder="e.g. Capstone design review or Interview preparation"
                  className="w-full text-xs px-3 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-500 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Share Your Project Link or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  placeholder="Paste GitHub repository, portfolio link, or specific questions..."
                  className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-500 text-stone-900"
                />
              </div>
            </div>

            {/* Submit Request Button (Indian Rupees Currency) */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  Confirm 1-on-1 Session with {activeMentor.name} · {activeMentor.hourlyRate === 0 ? 'Complimentary (Included with Leaf)' : `₹${activeMentor.hourlyRate.toLocaleString()}`}
                </span>
              </button>
            </div>
          </form>

        </div>
      ) : (
        /* Booking Confirmed & Real-Time Chat Workspace */
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-900">Virtual Session Confirmed with {activeMentor.name}!</h4>
                  <p className="text-xs text-stone-600">
                    Scheduled for <strong>{selectedSlot}</strong> on {selectedTimezone} · Invitation dispatched to {currentUser.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setBookingConfirmed(false)}
                className="text-xs text-emerald-800 font-bold hover:underline cursor-pointer"
              >
                Modify Booking
              </button>
            </div>

            {/* Calendar Sync Actions */}
            <div className="pt-2 border-t border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-stone-600 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>Sync with your personal schedule:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`📅 Google Calendar event for "${course.title} Consultation with ${activeMentor.name}" has been generated and synced with your account.`)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3 text-emerald-700" />
                  <span>Sync Google Calendar</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nSUMMARY:1-on-1 Consultation: ${course.title} with ${activeMentor.name}\nDESCRIPTION:NoMySkill Academy Career Consultation\nSTATUS:CONFIRMED\nEND:VCALENDAR`;
                    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'nomyskill-mentor-session.ics');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Download .ICS File</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chat Window */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden flex flex-col h-72">
            <div className="p-3 bg-white border-b border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={avatarMode === 'generated' ? activeMentor.generatedAvatar : activeMentor.photoAvatar}
                  alt={activeMentor.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-bold text-stone-900">{activeMentor.name}</span>
                <span className="text-[10px] text-emerald-700 font-semibold">● Online</span>
              </div>
              <span className="text-stone-500 text-[11px]">Direct Pre-Session Chat</span>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
              {chatMessages.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 rounded-xl ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-white border border-stone-200 text-stone-900 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1 ${msg.sender === 'user' ? 'text-emerald-100' : 'text-stone-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Ask ${activeMentor.name.split(' ')[0]} a question or paste project link...`}
                className="flex-1 text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 text-stone-900"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
