import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Share2, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Send, 
  Plus, 
  ArrowRight,
  Code,
  FileText,
  UserCheck,
  ShieldCheck,
  Calendar,
  Flame
} from 'lucide-react';
import { LeafCourse, ActiveUser, DepartmentId } from '../../types/tree';
import { BRANCH_CATEGORIES, TWIG_SUB_STREAMS } from '../../data/mockTreeData';

export interface StudyCircleGroup {
  id: string;
  name: string;
  branchId: string;
  twigId?: string;
  topic: string;
  membersCount: number;
  activeNowCount: number;
  nextSessionTime: string;
  description: string;
  tags: string[];
  recentDiscussion: string;
  avatarSeed: string;
}

interface BranchStudyCirclesProps {
  currentBranchId?: string;
  currentTwigId?: string;
  allCourses: LeafCourse[];
  currentUser: ActiveUser;
  onSelectCourse?: (course: LeafCourse) => void;
}

export const BranchStudyCircles: React.FC<BranchStudyCirclesProps> = ({
  currentBranchId = 'branch-ai',
  currentTwigId,
  allCourses,
  currentUser,
  onSelectCourse
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(currentBranchId);
  const [selectedCircleId, setSelectedCircleId] = useState<string>('circle-ai-1');
  const [activeTab, setActiveTab] = useState<'chat' | 'reviews' | 'schedule'>('chat');
  
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: string;
    role: string;
    avatar: string;
    text: string;
    time: string;
    isPeerReview?: boolean;
    repoLink?: string;
  }>>([
    {
      id: 'msg-1',
      sender: 'Elena Rostova',
      role: 'Peer Learner · 90% Completed',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: "Hey everyone! Working on the Retrieval-Augmented Generation (RAG) vector embeddings module. Has anyone benchmarked ChromaDB vs Pinecone for local embeddings?",
      time: '10:15 AM'
    },
    {
      id: 'msg-2',
      sender: 'Kenji Sato',
      role: 'Branch Study Leader',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: "Great question Elena! ChromaDB is fantastic for zero-cost rapid local prototyping, while Pinecone shines in distributed serverless pipelines. Check lesson 4's architecture diagram!",
      time: '10:18 AM'
    },
    {
      id: 'msg-3',
      sender: 'Maya Lin',
      role: 'Peer Reviewer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: "Just submitted my Capstone agent for peer review. Would love feedback on my token optimization prompt logic!",
      time: '10:24 AM',
      isPeerReview: true,
      repoLink: 'github.com/maya-lin/rag-agent-evaluation'
    }
  ]);

  // Peer reviews state
  const [peerReviews, setPeerReviews] = useState<Array<{
    id: string;
    author: string;
    courseTitle: string;
    projectTitle: string;
    status: 'pending' | 'reviewed';
    reviewsCount: number;
    description: string;
  }>>([
    {
      id: 'pr-1',
      author: 'Maya Lin',
      courseTitle: 'Generative AI & LLM Engineering',
      projectTitle: 'Autonomous Multi-Agent Researcher with LangGraph',
      status: 'pending',
      reviewsCount: 2,
      description: 'Built a 3-agent research synthesis pipeline with citation validation and hallucination checks.'
    },
    {
      id: 'pr-2',
      author: 'David Okonjo',
      courseTitle: 'Full-Stack React & Node',
      projectTitle: 'Real-Time Collaborative Canvas App',
      status: 'reviewed',
      reviewsCount: 4,
      description: 'Implemented WebSocket room syncing with optimistic UI updates and undo/redo history.'
    }
  ]);

  const activeBranch = BRANCH_CATEGORIES.find(b => b.id === selectedBranchId) || BRANCH_CATEGORIES[0];
  const branchTwigs = TWIG_SUB_STREAMS.filter(t => t.branchId === activeBranch.id);

  // Circles for each branch
  const studyCircles: StudyCircleGroup[] = [
    {
      id: 'circle-ai-1',
      name: 'Generative AI & Agentic Guild',
      branchId: 'branch-ai',
      topic: 'LLM Fine-tuning, RAG Architectures & Multi-Agent Swarms',
      membersCount: 42,
      activeNowCount: 7,
      nextSessionTime: 'Today at 6:00 PM EST',
      description: 'Collaborative peer group dedicated to sharing prompt strategies, debugging model agents, and peer-reviewing capstone projects.',
      tags: ['LangChain', 'LlamaIndex', 'RAG', 'PyTorch'],
      recentDiscussion: 'Evaluating Claude 3.7 vs Gemini 2.5 Flash for agent routing',
      avatarSeed: 'GenAIGuild'
    },
    {
      id: 'circle-ai-2',
      name: 'Computer Vision & Deep Learning Circle',
      branchId: 'branch-ai',
      topic: 'Object Detection, YOLOv10 & Diffusion Models',
      membersCount: 28,
      activeNowCount: 4,
      nextSessionTime: 'Tomorrow at 4:30 PM EST',
      description: 'Hands-on practice session for dataset curation, annotation pipelines, and edge device deployment.',
      tags: ['OpenCV', 'Diffusion', 'YOLO', 'ONNX'],
      recentDiscussion: 'Quantizing TensorRT models for real-time edge inference',
      avatarSeed: 'VisionLab'
    },
    {
      id: 'circle-cloud-1',
      name: 'Cloud & Kubernetes DevOps Squad',
      branchId: 'branch-cloud',
      topic: 'Microservices, Terraform & Production CI/CD',
      membersCount: 35,
      activeNowCount: 6,
      nextSessionTime: 'Thursday at 7:00 PM EST',
      description: 'Peer group reviewing real cloud infrastructure configurations and disaster recovery strategies.',
      tags: ['K8s', 'Docker', 'AWS', 'GCP'],
      recentDiscussion: 'ArgoCD GitOps deployment rollbacks under high traffic',
      avatarSeed: 'DevOpsCircle'
    },
    {
      id: 'circle-cyber-1',
      name: 'Zero-Trust Cybersecurity Guild',
      branchId: 'branch-cyber',
      topic: 'Penetration Testing, IAM & Defensive Architectures',
      membersCount: 24,
      activeNowCount: 3,
      nextSessionTime: 'Friday at 5:00 PM EST',
      description: 'Ethical hacking capture-the-flag practice and vulnerability disclosure walkthroughs.',
      tags: ['SIEM', 'ZeroTrust', 'OAuth', 'BurpSuite'],
      recentDiscussion: 'Mitigating SSRF vulnerabilities in AI agent tool callers',
      avatarSeed: 'CyberGuild'
    },
    {
      id: 'circle-growth-1',
      name: 'Growth & Performance Marketing Circle',
      branchId: 'branch-growth',
      topic: 'CAC/LTV Optimization, SEO & Conversion Funnels',
      membersCount: 31,
      activeNowCount: 5,
      nextSessionTime: 'Wednesday at 3:00 PM EST',
      description: 'Weekly campaign teardowns, copy reviews, and growth experimentation framework exchanges.',
      tags: ['Growth', 'A/B Testing', 'Retention', 'Funnels'],
      recentDiscussion: 'Optimizing product onboarding flows for 40% D7 retention',
      avatarSeed: 'GrowthLab'
    }
  ];

  const currentCircles = studyCircles.filter(c => c.branchId === selectedBranchId);
  const activeCircle = studyCircles.find(c => c.id === selectedCircleId) || currentCircles[0] || studyCircles[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentUser.name,
      role: 'Active Learner (You)',
      avatar: currentUser.avatar,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    // Simulated peer reply
    setTimeout(() => {
      const peerReplies = [
        "That's a very sharp insight! Thanks for sharing with the circle.",
        "Completely agree! We actually discussed that during yesterday's study lab.",
        "Check out lesson 3 in the curriculum, it dives right into that exact design pattern!",
        "Awesome point! Let's review that during our upcoming virtual group session."
      ];
      const randomReply = peerReplies[Math.floor(Math.random() * peerReplies.length)];

      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'Kenji Sato',
          role: 'Branch Study Leader',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1100);
  };

  const handleJoinSession = () => {
    alert(`🎉 You have registered for the upcoming live session of "${activeCircle.name}" on ${activeCircle.nextSessionTime}. A calendar invite has been dispatched!`);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-200 shadow-sm overflow-hidden text-stone-900">
      
      {/* Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-white border-b border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-stone-900">Branch Study Circles & Peer Reviews</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                  Live Collaborative Rooms
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Join fellow learners cultivating the same branch and twig courses. Share code, get peer review, and attend scheduled study labs.
              </p>
            </div>
          </div>
        </div>

        {/* Branch Selector Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 text-xs">
          {BRANCH_CATEGORIES.slice(0, 5).map(branch => (
            <button
              key={branch.id}
              onClick={() => {
                setSelectedBranchId(branch.id);
                const matching = studyCircles.find(c => c.branchId === branch.id);
                if (matching) setSelectedCircleId(matching.id);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedBranchId === branch.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-300 hover:text-stone-900'
              }`}
            >
              🌿 {branch.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Circle Navigation Sidebar + Interactive Room Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        
        {/* Left Sidebar: Active Circles in Selected Branch */}
        <div className="lg:col-span-4 border-r border-stone-200 p-4 space-y-3 bg-stone-50/50">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              {activeBranch.name} Circles ({currentCircles.length})
            </span>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Peer Rooms
            </span>
          </div>

          <div className="space-y-2.5">
            {currentCircles.length === 0 ? (
              <div className="p-4 rounded-xl bg-white border border-dashed border-stone-300 text-center text-xs text-stone-500">
                A new circle is forming for this branch. Be the founding member!
              </div>
            ) : (
              currentCircles.map(circle => {
                const isSelected = circle.id === selectedCircleId;
                return (
                  <button
                    key={circle.id}
                    onClick={() => setSelectedCircleId(circle.id)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-400/20'
                        : 'bg-white border-stone-200 hover:border-emerald-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {circle.activeNowCount} Active Now
                      </span>
                      <span className="text-[10px] text-stone-500 font-medium">
                        {circle.membersCount} Peers
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-stone-900 leading-snug line-clamp-1">
                      {circle.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                      {circle.topic}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                      <span className="text-stone-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span className="truncate">{circle.nextSessionTime}</span>
                      </span>
                      <span className={`font-bold ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`}>
                        {isSelected ? 'In Room →' : 'Join'}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Stats Box */}
          <div className="p-3 rounded-2xl bg-white border border-stone-200 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-600 font-medium">Weekly Study Hours</span>
              <span className="font-bold text-emerald-700">142h Logged</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600 font-medium">Peer Reviews Completed</span>
              <span className="font-bold text-amber-700">89 Projects</span>
            </div>
          </div>
        </div>

        {/* Right Area: Interactive Circle Room Workspace */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          
          {/* Room Top Banner */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/30">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-stone-900 text-sm sm:text-base">
                  {activeCircle.name}
                </h4>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  {activeCircle.activeNowCount} peers studying
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                {activeCircle.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleJoinSession}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Next Lab: {activeCircle.nextSessionTime}</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs: Live Chat vs Peer Review Submissions vs Schedule */}
          <div className="flex items-center border-b border-stone-200 px-4 sm:px-5 bg-white text-xs font-bold gap-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-3 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'chat'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Collaborative Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Peer Review Queue ({peerReviews.length})</span>
            </button>
          </div>

          {/* Workspace Body */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 max-h-[380px]">
            
            {activeTab === 'chat' && (
              <div className="space-y-3.5">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <img 
                      src={msg.avatar} 
                      alt={msg.sender} 
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{msg.sender}</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">{msg.role}</span>
                        <span className="text-[10px] text-stone-400">{msg.time}</span>
                      </div>
                      
                      <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-800 mt-1 leading-relaxed">
                        <p>{msg.text}</p>
                        {msg.isPeerReview && msg.repoLink && (
                          <div className="mt-2 pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
                            <span className="font-mono text-emerald-700 font-semibold">{msg.repoLink}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              Review Requested
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold">Peer Code & Capstone Review Protocol</h5>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Review 2 fellow learners' capstone deliverables to unlock your own verified Peer Evaluation badge.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] flex-shrink-0">
                    Submit Project
                  </span>
                </div>

                {peerReviews.map(pr => (
                  <div key={pr.id} className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 transition-all shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        {pr.courseTitle}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        pr.status === 'pending'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {pr.status === 'pending' ? 'Needs Review' : 'Verified'}
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-stone-900">{pr.projectTitle}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{pr.description}</p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-500">By {pr.author} · {pr.reviewsCount} reviews logged</span>
                      <button 
                        onClick={() => alert(`Opening Peer Review Workspace for "${pr.projectTitle}" by ${pr.author}. Review rubric and scoring will be submitted.`)}
                        className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300 transition-colors cursor-pointer"
                      >
                        Inspect & Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Chat Message Input Bar */}
          {activeTab === 'chat' && (
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-stone-200 bg-stone-50/50 flex items-center gap-2">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Ask ${activeCircle.name} peers or share notes...`}
                className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
