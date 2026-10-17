import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Brain, 
  RefreshCw, 
  X, 
  Quote, 
  ArrowRight, 
  Lightbulb,
  Compass,
  CheckCircle2
} from 'lucide-react';

export interface QLearningQuotePair {
  id: string;
  qLearningTitle: string;
  qLearningConcept: string;
  qLearningMathSnippet: string;
  careerTakeaway: string;
  quoteText: string;
  author: string;
  authorRole: string;
}

export const Q_LEARNING_QUOTES: QLearningQuotePair[] = [
  {
    id: 'q-bellman',
    qLearningTitle: 'The Bellman Optimality Principle',
    qLearningConcept: 'In Q-Learning, the true value of today’s action isn’t judged by immediate gratification, but by the expected discounted return of all future states.',
    qLearningMathSnippet: 'Q(s, a) ← Q(s, a) + α [ R + γ · max Q(s\', a\') - Q(s, a) ]',
    careerTakeaway: 'Every 20 minutes spent studying today increases your cumulative baseline career capital for years to come.',
    quoteText: 'Small daily improvements over time lead to stunning results. You do not have to be brilliant, just consistently better than yesterday.',
    author: 'James Clear',
    authorRole: 'Author of Atomic Habits'
  },
  {
    id: 'q-exploration',
    qLearningTitle: 'ε-Greedy: Exploration vs. Exploitation',
    qLearningConcept: 'An optimal agent balances exploiting known high-reward actions (80% core discipline mastery) with exploring unknown states (20% discovering emerging twigs like GenAI or Rust).',
    qLearningMathSnippet: 'action = argmax_a Q(s, a) with probability (1 - ε), random explore with ε',
    careerTakeaway: 'Double down on your primary branch while reserving an hour every week to explore an unfamiliar frontier topic.',
    quoteText: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    author: 'Mahatma Gandhi',
    authorRole: 'Philosopher & Leader'
  },
  {
    id: 'q-discount-gamma',
    qLearningTitle: 'The Discount Factor (γ): Valuing the Horizon',
    qLearningConcept: 'A high discount factor (γ ≈ 0.99) causes the agent to heavily value distant outcomes over short-term noise, aligning daily decisions with long-range mastery.',
    qLearningMathSnippet: 'Return G_t = R_{t+1} + γ R_{t+2} + γ² R_{t+3} + ...',
    careerTakeaway: 'Short-term sacrifice in deep focused practice yields exponential compounding career leverage.',
    quoteText: 'An investment in knowledge always pays the best interest.',
    author: 'Benjamin Franklin',
    authorRole: 'Polymath & Statesman'
  },
  {
    id: 'q-experience-replay',
    qLearningTitle: 'Experience Replay & Spaced Repetition',
    qLearningConcept: 'Deep Q-Networks achieve stability by storing past experiences (s, a, r, s\') in a replay buffer and sampling random batches to eliminate memory bias.',
    qLearningMathSnippet: 'Sample mini-batch (s_i, a_i, r_i, s\'_i) ~ Uniform(D)',
    careerTakeaway: 'Revisiting previous modules, review notes, and retaking quizzes solidifies memory traces against cognitive decay.',
    quoteText: 'I have not failed. I’ve just found 10,000 ways that will not work. Each attempt is training data.',
    author: 'Thomas A. Edison',
    authorRole: 'Inventor'
  },
  {
    id: 'q-reward-shaping',
    qLearningTitle: 'Reward Shaping & Micro-Milestones',
    qLearningConcept: 'Sparse reward signals lead to slow convergence. By engineering intermediate feedback rewards for micro-tasks, learning gradient velocity stays high.',
    qLearningMathSnippet: 'F(s, a, s\') = γ Φ(s\') - Φ(s) (Potential-Based Reward Shaping)',
    careerTakeaway: 'Celebrate each finished lesson video and quiz checkmark — continuous micro-reinforcement builds unstoppable momentum.',
    quoteText: 'The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks.',
    author: 'Mark Twain',
    authorRole: 'Author & Humorist'
  },
  {
    id: 'q-policy-convergence',
    qLearningTitle: 'Policy Convergence & Habit Automation',
    qLearningConcept: 'As state visitation approaches infinity, the Q-values converge to the optimal Q*(s, a), making the best decision intuitive and effortless.',
    qLearningMathSnippet: 'lim_{t → ∞} Q_t(s, a) = Q*(s, a) with probability 1',
    careerTakeaway: 'Deliberate practice transforms complex architectural reasoning into natural, effortless second nature.',
    quoteText: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    author: 'Will Durant',
    authorRole: 'Historian & Philosopher (on Aristotle)'
  },
  {
    id: 'q-td-error',
    qLearningTitle: 'Temporal Difference Error as the Engine of Growth',
    qLearningConcept: 'Learning only happens when there is a non-zero TD error δ — a gap between what you anticipated and what you actually observed.',
    qLearningMathSnippet: 'δ_t = R_{t+1} + γ max Q(s\', a\') - Q(s, a)',
    careerTakeaway: 'Embrace tough questions and buggy code; discrepancy between expectation and reality is the exact neurological trigger of true learning.',
    quoteText: 'The only real mistake is the one from which we learn nothing.',
    author: 'Henry Ford',
    authorRole: 'Industrial Pioneer'
  }
];

interface MotivationalQuoteBannerProps {
  onExploreBranch?: () => void;
}

export const MotivationalQuoteBanner: React.FC<MotivationalQuoteBannerProps> = ({ onExploreBranch }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    // Pick random index on first visit or rotation
    return Math.floor(Math.random() * Q_LEARNING_QUOTES.length);
  });
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const currentItem = Q_LEARNING_QUOTES[currentIndex];

  const handleNextQuote = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % Q_LEARNING_QUOTES.length);
      setIsRotating(false);
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white border-b border-stone-200 text-stone-800 relative overflow-hidden transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Left Column: Q-Learning Insight */}
          <div className="flex-1 space-y-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold">
                <Brain className="w-3.5 h-3.5 text-emerald-700" />
                <span>Q-Learning Principle</span>
              </span>
              <span className="text-xs font-bold text-stone-900 truncate">
                {currentItem.qLearningTitle}
              </span>
              <span className="hidden lg:inline text-[10px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                {currentItem.qLearningMathSnippet}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
              <span className="text-stone-500 font-medium">Core Concept: </span>
              {currentItem.qLearningConcept} <span className="text-emerald-800 font-semibold">{currentItem.careerTakeaway}</span>
            </p>
          </div>

          {/* Right Column: Daily Motivational Quote */}
          <div className="flex items-center gap-3 md:border-l md:border-stone-200 md:pl-5 flex-shrink-0 max-w-md w-full md:w-auto justify-between md:justify-end">
            <div className="text-left md:text-right space-y-0.5 min-w-0 flex-1 md:flex-initial">
              <div className="flex items-center gap-1 text-[11px] text-stone-600 md:justify-end">
                <Quote className="w-3 h-3 text-amber-500 inline" />
                <span className="italic truncate text-stone-800 font-medium">
                  "{currentItem.quoteText}"
                </span>
              </div>
              <p className="text-[10px] text-stone-500">
                — <span className="font-semibold text-stone-700">{currentItem.author}</span>, {currentItem.authorRole}
              </p>
            </div>

            {/* Controls: Shuffle Quote & Dismiss */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handleNextQuote}
                className={`p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-all cursor-pointer ${
                  isRotating ? 'rotate-180 text-emerald-600' : ''
                }`}
                title="Shuffle to another Q-Learning principle and motivational quote"
                aria-label="Next Quote"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
                title="Dismiss banner"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
