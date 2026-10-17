import React, { useState, useMemo, useEffect } from 'react';
import { 
  Flame, 
  Trophy, 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  TreePine,
  Info
} from 'lucide-react';

export interface DailyActivity {
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  count: number; // lessons completed
  minutes: number;
  level: 0 | 1 | 2 | 3 | 4;
  details: string;
  milestone?: string;
}

interface UpskillingHeatmapProps {
  onQuickStudy?: () => void;
}

export const UpskillingHeatmap: React.FC<UpskillingHeatmapProps> = ({ onQuickStudy }) => {
  const [selectedDay, setSelectedDay] = useState<DailyActivity | null>(null);
  const [activityFilter, setActivityFilter] = useState<'all' | 'high' | 'milestones'>('all');

  // Generate 52 weeks (364 days + current day = 365 days) ending today (2026-10-13)
  const [activitiesMap, setActivitiesMap] = useState<Record<string, DailyActivity>>(() => {
    const saved = localStorage.getItem('nomyskill_learning_activity');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }

    // Seed realistic 365 days learning data
    const map: Record<string, DailyActivity> = {};
    const today = new Date(2026, 9, 13); // Oct 13, 2026

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay();

      // Realistic learning patterns:
      // More active on weekdays, occasional weekends, periodic study sprints
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const seedVal = Math.sin(i * 0.15) + Math.cos(i * 0.08);
      
      let count = 0;
      let minutes = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      let details = 'No recorded learning sessions';
      let milestone: string | undefined = undefined;

      // Ensure recent 21 days have a solid streak leading to today
      if (i <= 21) {
        count = (i % 3) + 2;
        minutes = count * 25;
        level = count >= 4 ? 3 : 2;
        details = `${count} lessons completed in Enterprise Generative AI & Cloud Architecture`;
        if (i === 0) {
          details = 'Today: 3 lessons completed + interactive quiz passed';
          level = 3;
        } else if (i === 7) {
          milestone = 'Mastered Module 2: High-Performance Systems with Rust';
          level = 4;
        }
      } else if (seedVal > 0.8) {
        count = Math.floor((seedVal - 0.8) * 5) + 3;
        minutes = count * 20;
        level = count >= 6 ? 4 : 3;
        details = `${count} lessons completed · ${minutes}m intensive sprint`;
        if (count >= 5) {
          milestone = 'Earned 100% on Module Assessment Quiz';
        }
      } else if (seedVal > 0.1 && (!isWeekend || Math.sin(i) > 0.3)) {
        count = Math.floor(seedVal * 2.5) + 1;
        minutes = count * 20;
        level = count >= 2 ? 2 : 1;
        details = `${count} lessons reviewed · ${minutes}m study session`;
      }

      map[dateStr] = {
        dateStr,
        dayOfWeek,
        count,
        minutes,
        level,
        details,
        milestone
      };
    }

    return map;
  });

  // Persist activities map
  useEffect(() => {
    localStorage.setItem('nomyskill_learning_activity', JSON.stringify(activitiesMap));
  }, [activitiesMap]);

  // Transform into 52 weeks of 7 days
  const { weeks, monthLabels, stats } = useMemo(() => {
    const today = new Date(2026, 9, 13);
    const dayList: DailyActivity[] = [];

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const act = activitiesMap[dateStr] || {
        dateStr,
        dayOfWeek: d.getDay(),
        count: 0,
        minutes: 0,
        level: 0,
        details: 'No activity'
      };
      dayList.push(act);
    }

    // Pad beginning to start on Sunday (day 0)
    const firstDayOfWeek = dayList[0].dayOfWeek;
    const paddedList: (DailyActivity | null)[] = [];
    for (let p = 0; p < firstDayOfWeek; p++) {
      paddedList.push(null);
    }
    paddedList.push(...dayList);

    // Group into columns of 7 days
    const weekCols: (DailyActivity | null)[][] = [];
    for (let idx = 0; idx < paddedList.length; idx += 7) {
      weekCols.push(paddedList.slice(idx, idx + 7));
    }

    // Month headers positioning
    const months: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;
    weekCols.forEach((col, cIdx) => {
      const validDay = col.find(d => d !== null);
      if (validDay) {
        const m = new Date(validDay.dateStr).getMonth();
        if (m !== lastMonth) {
          const monthName = new Date(validDay.dateStr).toLocaleString('default', { month: 'short' });
          months.push({ label: monthName, colIndex: cIdx });
          lastMonth = m;
        }
      }
    });

    // Calculate Streak & Totals
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let totalActiveDays = 0;
    let totalLessons = 0;
    let totalMinutes = 0;

    // Evaluate streaks in chronological order
    dayList.forEach((day, index) => {
      if (day.count > 0) {
        totalActiveDays += 1;
        totalLessons += day.count;
        totalMinutes += day.minutes;
        tempStreak += 1;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    });

    // Current streak working backwards from today (last element)
    for (let i = dayList.length - 1; i >= 0; i--) {
      if (dayList[i].count > 0) {
        currentStreak += 1;
      } else {
        break;
      }
    }

    return {
      weeks: weekCols,
      monthLabels: months,
      stats: {
        currentStreak,
        longestStreak,
        totalActiveDays,
        totalLessons,
        totalHours: Math.round(totalMinutes / 60)
      }
    };
  }, [activitiesMap]);

  // Log a study session for today
  const handleLogTodayStudy = () => {
    const todayStr = '2026-10-13';
    const current = activitiesMap[todayStr] || {
      dateStr: todayStr,
      dayOfWeek: 2,
      count: 0,
      minutes: 0,
      level: 0,
      details: ''
    };

    const newCount = current.count + 2;
    const newMinutes = current.minutes + 30;
    const newLevel: 0 | 1 | 2 | 3 | 4 = newCount >= 6 ? 4 : newCount >= 4 ? 3 : 2;

    const updated: DailyActivity = {
      ...current,
      count: newCount,
      minutes: newMinutes,
      level: newLevel,
      details: `Today: Completed ${newCount} lessons (${newMinutes}m) · Micro-lab submitted`
    };

    setActivitiesMap(prev => ({
      ...prev,
      [todayStr]: updated
    }));

    setSelectedDay(updated);
    if (onQuickStudy) onQuickStudy();
  };

  const getCellColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-emerald-200 border-emerald-300';
      case 2: return 'bg-emerald-400 border-emerald-500';
      case 3: return 'bg-emerald-600 border-emerald-700';
      case 4: return 'bg-emerald-800 border-emerald-900';
      default: return 'bg-stone-100 border-stone-200/60';
    }
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-6">
      
      {/* Heatmap Top Bar with Streaks & Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>Learning Activity & Upskilling Heatmap</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  Past 365 Days
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Visualizing daily lesson completions, problem solving, and curriculum streaks along the Upskilling Tree.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Log Learning Session */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="p-1 bg-stone-50 border border-stone-200 rounded-lg flex items-center gap-1 text-xs">
            <button
              onClick={() => setActivityFilter('all')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activityFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Days
            </button>
            <button
              onClick={() => setActivityFilter('high')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activityFilter === 'high'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              High Focus (Level 3+)
            </button>
            <button
              onClick={() => setActivityFilter('milestones')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activityFilter === 'milestones'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Milestones
            </button>
          </div>

          <button
            onClick={handleLogTodayStudy}
            className="px-3.5 py-1.5 rounded-lg bg-lime-500 hover:bg-lime-400 text-stone-950 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            title="Log study time for today"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Study Today (+30m)</span>
          </button>
        </div>
      </div>

      {/* Streaks & Vital Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-[11px] font-semibold">Active Streak</span>
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
          <p className="text-xl font-black text-amber-950 mt-1">{stats.currentStreak} Days</p>
          <p className="text-[10px] text-amber-700/80">Unbroken learning</p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-[11px] font-semibold">Longest Streak</span>
            <Trophy className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-black text-emerald-950 mt-1">{stats.longestStreak} Days</p>
          <p className="text-[10px] text-emerald-700/80">Personal best record</p>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
          <div className="flex items-center justify-between text-stone-600">
            <span className="text-[11px] font-semibold">Active Days</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-black text-stone-900 mt-1">{stats.totalActiveDays}</p>
          <p className="text-[10px] text-stone-500">{Math.round((stats.totalActiveDays / 365) * 100)}% annual consistency</p>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
          <div className="flex items-center justify-between text-stone-600">
            <span className="text-[11px] font-semibold">Lessons Finished</span>
            <TreePine className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-xl font-black text-stone-900 mt-1">{stats.totalLessons}</p>
          <p className="text-[10px] text-stone-500">Curricular modules</p>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-stone-600">
            <span className="text-[11px] font-semibold">Total Study Time</span>
            <Clock className="w-4 h-4 text-stone-500" />
          </div>
          <p className="text-xl font-black text-stone-900 mt-1">{stats.totalHours} hrs</p>
          <p className="text-[10px] text-stone-500">Across all tree branches</p>
        </div>
      </div>

      {/* GitHub-Style 52-Week Contribution Matrix */}
      <div className="space-y-2">
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[780px]">
            
            {/* Month Labels along top */}
            <div className="flex pl-8 text-[11px] text-stone-400 font-medium mb-1.5 h-4 relative">
              {monthLabels.map((m, idx) => (
                <span
                  key={idx}
                  style={{ left: `${m.colIndex * 14.5 + 32}px` }}
                  className="absolute"
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Matrix Grid: Left Day-of-Week labels + 52 Week Columns */}
            <div className="flex gap-1.5">
              
              {/* Day-of-week labels (Mon, Wed, Fri) */}
              <div className="flex flex-col justify-between py-0.5 text-[10px] text-stone-400 font-medium pr-1 select-none h-[106px] w-7 text-right">
                <span className="opacity-0">Sun</span>
                <span>Mon</span>
                <span className="opacity-0">Tue</span>
                <span>Wed</span>
                <span className="opacity-0">Thu</span>
                <span>Fri</span>
                <span className="opacity-0">Sat</span>
              </div>

              {/* 52 Week Columns */}
              <div className="flex gap-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((day, dIdx) => {
                      if (!day) {
                        return (
                          <div 
                            key={`empty-${dIdx}`} 
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs opacity-0" 
                          />
                        );
                      }

                      let isFiltered = false;
                      if (activityFilter === 'high' && day.level < 3) isFiltered = true;
                      if (activityFilter === 'milestones' && !day.milestone) isFiltered = true;

                      const isSelected = selectedDay?.dateStr === day.dateStr;

                      return (
                        <button
                          key={day.dateStr}
                          onClick={() => setSelectedDay(day)}
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border transition-all ${getCellColor(
                            day.level
                          )} ${
                            isFiltered ? 'opacity-20' : 'hover:scale-125 hover:z-10'
                          } ${
                            isSelected ? 'ring-2 ring-stone-900 scale-125 z-20 shadow-xs' : ''
                          }`}
                          title={`${day.dateStr}: ${day.count} lessons (${day.minutes}m)${
                            day.milestone ? ` · ${day.milestone}` : ''
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Legend Bar & Selected Day Inspector */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-2 text-[11px]">
            <span>Less Activity</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-stone-100 border border-stone-200"></span>
              <span className="w-3 h-3 rounded-xs bg-emerald-200 border border-emerald-300"></span>
              <span className="w-3 h-3 rounded-xs bg-emerald-400 border border-emerald-500"></span>
              <span className="w-3 h-3 rounded-xs bg-emerald-600 border border-emerald-700"></span>
              <span className="w-3 h-3 rounded-xs bg-emerald-800 border border-emerald-900"></span>
            </div>
            <span>High Intensity</span>
          </div>

          <div className="text-[11px] text-stone-400">
            Tip: Click any cell to inspect detailed study notes and lesson history.
          </div>
        </div>
      </div>

      {/* Selected Day Inspector Banner */}
      {selectedDay && (
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition-all animate-in fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900">
                {new Date(selectedDay.dateStr).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                selectedDay.count > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
              }`}>
                {selectedDay.count} Lessons Completed ({selectedDay.minutes} mins)
              </span>
            </div>

            <p className="text-stone-600">
              {selectedDay.details}
            </p>

            {selectedDay.milestone && (
              <p className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Milestone: {selectedDay.milestone}</span>
              </p>
            )}
          </div>

          <button
            onClick={() => setSelectedDay(null)}
            className="text-[11px] text-stone-400 hover:text-stone-700 font-medium underline self-end sm:self-center"
          >
            Dismiss
          </button>
        </div>
      )}

    </div>
  );
};
