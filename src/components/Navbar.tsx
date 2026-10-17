import React, { useState } from 'react';
import { 
  TreePine, 
  Search, 
  ShoppingCart, 
  BookOpen, 
  Layers, 
  Briefcase, 
  ShieldAlert, 
  FileCode, 
  ChevronDown, 
  User,
  Compass,
  X,
  Globe
} from 'lucide-react';
import { ActiveUser, CartItem, LeafCourse } from '../types/tree';
import { ShareAppModal } from './common/ShareAppModal';

interface NavbarProps {
  activeTab: 'catalog' | 'visual-tree' | 'dashboard' | 'instructor' | 'admin' | 'blueprints';
  setActiveTab: (tab: 'catalog' | 'visual-tree' | 'dashboard' | 'instructor' | 'admin' | 'blueprints') => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  currentUser: ActiveUser;
  setCurrentUser: (user: ActiveUser) => void;
  onSelectCourse: (course: LeafCourse) => void;
  allCourses: LeafCourse[];
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartItems,
  setIsCartOpen,
  currentUser,
  setCurrentUser,
  onSelectCourse,
  allCourses,
  isMegaMenuOpen,
  setIsMegaMenuOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : allCourses.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const cartCount = cartItems.length;

  return (
    <header className="sticky top-0 z-40 bg-white text-stone-900 border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Metaphor Badge */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setActiveTab('catalog'); setIsMegaMenuOpen(false); }}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-400/40 group-hover:scale-105 transition-transform">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold tracking-tight text-lg text-stone-900">NoMy<span className="text-emerald-700">Skill</span></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">Tree OS</span>
                </div>
                <p className="text-[11px] text-stone-500 hidden sm:block">The Upskilling Tree Platform</p>
              </div>
            </button>

            {/* Tree Mega-Menu Toggle Button */}
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isMegaMenuOpen 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                  : 'bg-stone-50 text-emerald-800 border-stone-200 hover:bg-emerald-50 hover:border-emerald-300'
              }`}
            >
              <TreePine className="w-3.5 h-3.5 text-emerald-700" />
              <span>Upskilling Tree Hierarchy</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Global Search Bar with Autocomplete */}
          <div className="flex-1 max-w-md relative hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across Trunks, Branches, Twigs & Leaves..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => setIsSearchDropdownOpen(true)}
                className="w-full bg-stone-50 text-sm text-stone-900 placeholder-stone-400 pl-9 pr-8 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim().length > 0 && (
              <div 
                className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden z-50 text-left"
                onMouseLeave={() => setIsSearchDropdownOpen(false)}
              >
                <div className="p-2 border-b border-stone-100 text-[11px] font-semibold text-stone-500 flex items-center justify-between bg-stone-50">
                  <span>Found {searchResults.length} matching course leaves</span>
                  <span className="text-emerald-700">Press Esc to close</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-stone-500">
                    No matching courses found for "{searchQuery}".
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {searchResults.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => {
                          onSelectCourse(course);
                          setIsSearchDropdownOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full px-3.5 py-2.5 flex items-center gap-3 hover:bg-stone-50 text-left transition-colors cursor-pointer"
                      >
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-stone-900 truncate">{course.title}</p>
                          <p className="text-[11px] text-stone-500 truncate">
                            {course.instructor.name} · {course.level} · ₹{course.price}
                          </p>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime-100 text-lime-900 border border-lime-300 font-bold flex-shrink-0">
                          Leaf
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => { setActiveTab('catalog'); setIsMegaMenuOpen(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'catalog' 
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Tree Catalog</span>
            </button>

            <button
              onClick={() => { setActiveTab('visual-tree'); setIsMegaMenuOpen(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'visual-tree' 
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Botanical Tree Diagram</span>
            </button>

            <button
              onClick={() => { setActiveTab('dashboard'); setIsMegaMenuOpen(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dashboard' 
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">My Classroom</span>
            </button>

            <button
              onClick={() => { setActiveTab('instructor'); setIsMegaMenuOpen(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs transition-colors hidden md:flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'instructor' 
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
              <span>Course Builder</span>
            </button>

            <button
              onClick={() => { setActiveTab('admin'); setIsMegaMenuOpen(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs transition-colors hidden lg:flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'admin' 
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Deliverables & Technical Blueprints Modal Trigger */}
            <button
              onClick={() => { setActiveTab('blueprints'); setIsMegaMenuOpen(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 border cursor-pointer ${
                activeTab === 'blueprints'
                  ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                  : 'border-amber-200 text-amber-800 hover:bg-amber-50'
              }`}
              title="View all 10 technical deliverables requested"
            >
              <FileCode className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-bold">Blueprints (10)</span>
            </button>
          </nav>

          {/* Right Action Cluster: Share, Cart & User Role Switcher */}
          <div className="flex items-center gap-2">
            
            {/* Open in Browser / Share App Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Open app in a different browser or device"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Open in Browser</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile & Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-colors text-xs cursor-pointer"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-500/50"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-[11px] font-bold text-stone-800 leading-none">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold capitalize leading-tight">{currentUser.role}</p>
                </div>
                <ChevronDown className="w-3 h-3 text-stone-500" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl py-2 z-50 text-left"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                  </div>

                  <div className="p-1">
                    <p className="px-2.5 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Switch Persona</p>
                    <button
                      onClick={() => {
                        setCurrentUser({
                          ...currentUser,
                          role: 'learner',
                          name: 'Alex Rivera (Learner)'
                        });
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                        currentUser.role === 'learner' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>Learner View</span>
                      {currentUser.role === 'learner' && <span className="text-[10px] text-emerald-700 font-bold">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        setCurrentUser({
                          ...currentUser,
                          role: 'instructor',
                          name: 'Dr. Elena Vance (Instructor)'
                        });
                        setActiveTab('instructor');
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                        currentUser.role === 'instructor' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>Instructor Studio</span>
                      {currentUser.role === 'instructor' && <span className="text-[10px] text-emerald-700 font-bold">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        setCurrentUser({
                          ...currentUser,
                          role: 'admin',
                          name: 'Super Admin (Operations)'
                        });
                        setActiveTab('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                        currentUser.role === 'admin' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>Admin Console</span>
                      {currentUser.role === 'admin' && <span className="text-[10px] text-emerald-700 font-bold">Active</span>}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Share and Open in External Browser Modal */}
      <ShareAppModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </header>
  );
};
