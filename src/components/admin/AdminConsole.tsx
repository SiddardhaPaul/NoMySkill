import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  Users, 
  BookOpen, 
  Check, 
  X, 
  Sliders, 
  TreePine,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { LeafCourse } from '../../types/tree';

interface AdminConsoleProps {
  allCourses: LeafCourse[];
  onApproveCourse?: (courseId: string) => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  allCourses,
  onApproveCourse
}) => {
  const [commissionSplit, setCommissionSplit] = useState<number>(85); // 85% instructor / 15% platform
  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  const handleApprove = (id: string) => {
    setApprovedIds(prev => [...prev, id]);
    if (onApproveCourse) onApproveCourse(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-8 text-stone-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Platform Administration</span>
            </span>
            <span className="text-stone-500 text-xs">Super Admin Authority</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">Upskilling Tree Governance Console</h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Oversee ecosystem economics, review incoming course submissions for pedagogical quality, and configure commission splits.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-right">
          <p className="text-[11px] text-stone-500">Platform Health</p>
          <p className="text-sm font-bold text-emerald-700 flex items-center gap-1.5 justify-end">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All Systems Optimal</span>
          </p>
        </div>
      </div>

      {/* Platform Macro Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold">Gross Marketplace GMV</span>
          <p className="text-2xl font-black text-stone-900 mt-2">₹18,45,200</p>
          <p className="text-[11px] text-emerald-700 mt-1 font-semibold">+23.4% this quarter</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold">Active Registered Learners</span>
          <p className="text-2xl font-black text-stone-900 mt-2">24,890</p>
          <p className="text-[11px] text-stone-400 mt-1">Across 128 countries</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold">Active Leaves (Courses)</span>
          <p className="text-2xl font-black text-stone-900 mt-2">{allCourses.length}</p>
          <p className="text-[11px] text-stone-400 mt-1">Across 4 Trunks & 18 Branches</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold">Platform Commission Net</span>
          <p className="text-2xl font-black text-emerald-700 mt-2">
            ₹{Math.round(1845200 * ((100 - commissionSplit) / 100)).toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">{100 - commissionSplit}% platform retention</p>
        </div>
      </div>

      {/* Commission Split & Policy Configuration */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">Marketplace Commission Split Policy</h3>
            <p className="text-xs text-stone-500">
              Configure the revenue distribution percentage between course author instructors and platform infrastructure.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 bg-stone-100 rounded-lg text-stone-800">
            {commissionSplit}% Instructor / {100 - commissionSplit}% Platform
          </span>
        </div>

        <div className="space-y-2 max-w-xl">
          <input
            type="range"
            min={70}
            max={95}
            step={1}
            value={commissionSplit}
            onChange={(e) => setCommissionSplit(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-400 font-mono">
            <span>70% Minimum</span>
            <span>Current: {commissionSplit}%</span>
            <span>95% Maximum</span>
          </div>
        </div>
      </div>

      {/* Course Approval Queue */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">Course Leaf Moderation & Approval Queue</h3>
            <p className="text-xs text-stone-500">
              Validate syllabus depth and assessment rigor before courses are published to the public Upskilling Tree.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            2 Pending Review
          </span>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'pending-1',
              title: 'Vector Databases in Rust: HNSW Indexing from Scratch',
              instructor: 'Dr. Linus Berg',
              branch: 'AI & Machine Intelligence',
              submittedAt: 'Today at 09:15 AM',
              price: '₹1,999'
            },
            {
              id: 'pending-2',
              title: 'Hospitality Revenue Optimization with Opera Cloud',
              instructor: 'Camille Laurent',
              branch: 'Hotel Management',
              submittedAt: 'Yesterday at 04:30 PM',
              price: '₹1,499'
            }
          ].map((item) => {
            const isApproved = approvedIds.includes(item.id);

            return (
              <div 
                key={item.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 mb-1">
                    <span className="text-emerald-700 font-semibold">{item.branch}</span>
                    <span>·</span>
                    <span>Submitted {item.submittedAt}</span>
                    <span>·</span>
                    <span className="font-bold text-stone-900">{item.price}</span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900">{item.title}</h4>
                  <p className="text-[11px] text-stone-500">Author: {item.instructor}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isApproved ? (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Approved & Planted</span>
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Course</span>
                      </button>

                      <button
                        className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors"
                      >
                        Request Edits
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
