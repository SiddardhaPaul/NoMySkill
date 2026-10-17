import React, { useState, useEffect } from 'react';
import { 
  TreePine, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Layers, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  Search,
  Filter,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { TreeMegaMenu } from './components/tree/TreeMegaMenu';
import { BotanicalTreeDiagram } from './components/tree/BotanicalTreeDiagram';
import { InteractiveTreeVisualizer } from './components/tree/InteractiveTreeVisualizer';
import { TreeHierarchicalFilter } from './components/tree/TreeHierarchicalFilter';
import { CourseCard } from './components/course/CourseCard';
import { CourseDetailModal } from './components/course/CourseDetailModal';
import { CourseClassroom } from './components/classroom/CourseClassroom';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { InstructorStudio } from './components/instructor/InstructorStudio';
import { AdminConsole } from './components/admin/AdminConsole';
import { SystemBlueprintsModal } from './components/blueprints/SystemBlueprintsModal';
import { MotivationalQuoteBanner } from './components/quote/MotivationalQuoteBanner';
import { BranchStudyCircles } from './components/community/BranchStudyCircles';

import { 
  LeafCourse, 
  DepartmentId, 
  UserEnrollment, 
  CartItem, 
  ActiveUser, 
  OrderReceipt 
} from './types/tree';
import { 
  INITIAL_LEAF_COURSES, 
  INITIAL_USER_ENROLLMENTS, 
  TRUNK_DEPARTMENTS, 
  BRANCH_CATEGORIES, 
  TWIG_SUB_STREAMS 
} from './data/mockTreeData';

export default function App() {
  // Course State
  const [courses, setCourses] = useState<LeafCourse[]>(() => {
    const saved = localStorage.getItem('nomyskill_courses') || localStorage.getItem('arbor_courses');
    return saved ? JSON.parse(saved) : INITIAL_LEAF_COURSES;
  });

  // Enrollments State
  const [enrollments, setEnrollments] = useState<Record<string, UserEnrollment>>(() => {
    const saved = localStorage.getItem('nomyskill_enrollments') || localStorage.getItem('arbor_enrollments');
    return saved ? JSON.parse(saved) : INITIAL_USER_ENROLLMENTS;
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nomyskill_cart') || localStorage.getItem('arbor_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // User State
  const [currentUser, setCurrentUser] = useState<ActiveUser>({
    id: 'user-alex',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    role: 'learner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  });

  // Active View State
  const [activeTab, setActiveTab] = useState<'catalog' | 'visual-tree' | 'dashboard' | 'instructor' | 'admin' | 'blueprints'>('catalog');
  
  // Navigation & Hierarchy Filters
  const [selectedDeptId, setSelectedDeptId] = useState<DepartmentId | undefined>(undefined);
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
  const [selectedTwigId, setSelectedTwigId] = useState<string | undefined>(undefined);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [catalogViewMode, setCatalogViewMode] = useState<'tree' | 'grid' | 'both' | 'circles'>('tree');

  // UI Modals & Drawers
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<LeafCourse | null>(null);
  const [activeClassroomCourseId, setActiveClassroomCourseId] = useState<string | null>(null);
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [directCheckoutItems, setDirectCheckoutItems] = useState<LeafCourse[] | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('nomyskill_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('nomyskill_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('nomyskill_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handlers
  const handleAddToCart = (course: LeafCourse) => {
    if (cartItems.some(item => item.course.id === course.id)) return;
    setCartItems(prev => [...prev, { course, addedAt: new Date().toISOString() }]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (courseId: string) => {
    setCartItems(prev => prev.filter(item => item.course.id !== courseId));
  };

  const handleBuyNow = (course: LeafCourse) => {
    setDirectCheckoutItems([course]);
    setCheckoutDiscount(0);
    setIsCheckoutOpen(true);
    setSelectedCourseForModal(null);
  };

  const handleProceedFromCart = (discount: number) => {
    setDirectCheckoutItems(null);
    setCheckoutDiscount(discount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (receipt: OrderReceipt) => {
    // Enroll the user in all purchased courses
    const updatedEnrollments = { ...enrollments };
    receipt.items.forEach(course => {
      if (!updatedEnrollments[course.id]) {
        updatedEnrollments[course.id] = {
          courseId: course.id,
          enrolledAt: new Date().toISOString(),
          progressPercent: 0,
          completedLessonIds: [],
          certificateEarned: false
        };
      }
    });

    setEnrollments(updatedEnrollments);
    setCartItems([]);
  };

  const handleUpdateEnrollment = (courseId: string, updated: Partial<UserEnrollment>) => {
    setEnrollments(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        ...updated
      }
    }));
  };

  const handleAddNewCourse = (newCourse: LeafCourse) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const handleHierarchySelect = (deptId?: DepartmentId, branchId?: string, twigId?: string) => {
    setSelectedDeptId(deptId);
    setSelectedBranchId(branchId);
    setSelectedTwigId(twigId);
    setActiveTab('catalog');
  };

  const handleResetFilters = () => {
    setSelectedDeptId(undefined);
    setSelectedBranchId(undefined);
    setSelectedTwigId(undefined);
    setDifficultyFilter('all');
    setSearchFilter('');
  };

  // Filter courses for catalog display
  const filteredCourses = courses.filter(course => {
    if (selectedDeptId && course.departmentId !== selectedDeptId) return false;
    if (selectedBranchId && course.branchId !== selectedBranchId) return false;
    if (selectedTwigId && course.twigId !== selectedTwigId) return false;
    if (difficultyFilter !== 'all' && course.level !== difficultyFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchSummary = course.summary.toLowerCase().includes(q);
      const matchInstructor = course.instructor.name.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchInstructor) return false;
    }
    return true;
  });

  const activeClassroomCourse = courses.find(c => c.id === activeClassroomCourseId);

  // If active in a course classroom, render the classroom view
  if (activeClassroomCourse && activeClassroomCourseId) {
    const enrollment = enrollments[activeClassroomCourseId] || {
      courseId: activeClassroomCourseId,
      enrolledAt: new Date().toISOString(),
      progressPercent: 0,
      completedLessonIds: []
    };

    return (
      <CourseClassroom
        course={activeClassroomCourse}
        enrollment={enrollment}
        onUpdateEnrollment={handleUpdateEnrollment}
        onBackToDashboard={() => setActiveClassroomCourseId(null)}
        currentUser={currentUser}
      />
    );
  }

  // Calculate items and totals for checkout modal
  const checkoutItems = directCheckoutItems || cartItems.map(i => i.course);
  const checkoutSubtotal = checkoutItems.reduce((sum, c) => sum + c.price, 0);
  const checkoutFinal = Math.max(0, checkoutSubtotal - checkoutDiscount);

  return (
    <div className="min-h-screen bg-white flex flex-col text-stone-900">
      
      {/* Global Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onSelectCourse={(course) => setSelectedCourseForModal(course)}
        allCourses={courses}
        isMegaMenuOpen={isMegaMenuOpen}
        setIsMegaMenuOpen={setIsMegaMenuOpen}
      />

      {/* Daily Q-Learning Principle & Motivational Quote Compass */}
      <MotivationalQuoteBanner />

      {/* Multi-Level Upskilling Tree Mega Menu */}
      <TreeMegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectHierarchy={handleHierarchySelect}
        onSelectCourse={(course) => setSelectedCourseForModal(course)}
        allCourses={courses}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: CATALOG (HOMEPAGE WITH TREE FILTERS) */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            
            {/* Hero Banner: Explaining the Upskilling Tree Metaphor */}
            <section className="bg-white text-stone-900 border-b border-stone-200 py-10 sm:py-14 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl space-y-4">
                  
                  {/* Taxonomy Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
                    <TreePine className="w-3.5 h-3.5 text-emerald-700" />
                    <span>The Upskilling Tree Metaphor</span>
                    <span className="text-emerald-500">·</span>
                    <span>Root → Trunk → Branch → Twig → Leaf</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-stone-900">
                    Choose Your Course Leaf to <span className="text-emerald-700">Upskill Your Career</span> Path
                  </h1>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
                    Navigate our hierarchical knowledge tree from broad foundational trunks to targeted skill twigs. Master verified industry courses and harvest certificates of achievement.
                  </p>

                  {/* Metaphor Quick Path Indicators */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                    <button
                      onClick={() => setActiveTab('visual-tree')}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Launch Visual Tree Map</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('blueprints')}
                      className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-300 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Inspect 10 System Blueprints</span>
                    </button>
                  </div>
                </div>

                {/* 4 Trunk Department Fast-Pick Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 mt-6 border-t border-stone-200">
                  {TRUNK_DEPARTMENTS.map((dept) => {
                    const isSelected = selectedDeptId === dept.id;
                    return (
                      <div
                        key={dept.id}
                        onClick={() => setSelectedDeptId(isSelected ? undefined : dept.id)}
                        className={`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/30 shadow-md'
                            : 'bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-amber-800 text-xs font-bold">🪵 Trunk</span>
                          <span className="text-[10px] text-stone-500 font-medium">{dept.branchesCount} Branches</span>
                        </div>
                        <h4 className="text-xs font-extrabold text-stone-900 mt-1 leading-snug">{dept.name}</h4>
                        <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">{dept.tagline}</p>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* Catalog & Hierarchical Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* View Switcher: Botanical Tree Diagram vs Course Card Grid */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold">
                    <TreePine className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-stone-900">Upskilling Tree Metaphor View</h3>
                    <p className="text-[11px] text-stone-500">Explore living branches, twigs, and leaf courses with job profiles</p>
                  </div>
                </div>

                <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
                  <button
                    onClick={() => setCatalogViewMode('tree')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      catalogViewMode === 'tree'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <TreePine className="w-3.5 h-3.5" />
                    <span>🌳 Botanical Tree Diagram</span>
                  </button>
                  <button
                    onClick={() => setCatalogViewMode('both')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      catalogViewMode === 'both'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>🌲 Tree + Cards</span>
                  </button>
                  <button
                    onClick={() => setCatalogViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      catalogViewMode === 'grid'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>🍃 Course Cards Grid</span>
                  </button>
                  <button
                    onClick={() => setCatalogViewMode('circles')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      catalogViewMode === 'circles'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>👥 Branch Study Circles</span>
                  </button>
                </div>
              </div>

              {/* RENDER BOTANICAL TREE DIAGRAM IF TREE OR BOTH IS SELECTED */}
              {(catalogViewMode === 'tree' || catalogViewMode === 'both') && (
                <div className="space-y-4">
                  <BotanicalTreeDiagram
                    allCourses={courses}
                    enrollments={enrollments}
                    onSelectCourse={(course) => setSelectedCourseForModal(course)}
                    onFilterByNode={(deptId, branchId, twigId) => {
                      handleHierarchySelect(deptId, branchId, twigId);
                    }}
                    onOpenClassroom={(id) => setActiveClassroomCourseId(id)}
                  />
                </div>
              )}

              {/* Hierarchical Filter with Tree Buttons */}
              {(catalogViewMode === 'grid' || catalogViewMode === 'both') && (
                <TreeHierarchicalFilter
                  selectedDeptId={selectedDeptId}
                  selectedBranchId={selectedBranchId}
                  selectedTwigId={selectedTwigId}
                  onSelectDept={(deptId) => {
                    setSelectedDeptId(deptId);
                    setSelectedBranchId(undefined);
                    setSelectedTwigId(undefined);
                  }}
                  onSelectBranch={(branchId) => {
                    setSelectedBranchId(branchId);
                    setSelectedTwigId(undefined);
                  }}
                  onSelectTwig={(twigId) => setSelectedTwigId(twigId)}
                  onResetFilters={handleResetFilters}
                  difficultyFilter={difficultyFilter}
                  setDifficultyFilter={setDifficultyFilter}
                  searchFilter={searchFilter}
                  setSearchFilter={setSearchFilter}
                  totalLeafCount={filteredCourses.length}
                />
              )}

              {/* Course Leaves Grid */}
              {(catalogViewMode === 'grid' || catalogViewMode === 'both') && (
                filteredCourses.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
                    <TreePine className="w-12 h-12 text-stone-300 mx-auto" />
                    <h3 className="text-sm font-bold text-stone-800">No Course Leaves Match Current Stem</h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Try broadening your selection to all trunks or clearing the keyword query.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Reset Hierarchy Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => {
                      const isInCart = cartItems.some(item => item.course.id === course.id);
                      const isEnrolled = !!enrollments[course.id];

                      return (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onSelectCourse={(c) => setSelectedCourseForModal(c)}
                          onAddToCart={handleAddToCart}
                          isInCart={isInCart}
                          isEnrolled={isEnrolled}
                          enrollment={enrollments[course.id]}
                          progressPercent={enrollments[course.id]?.progressPercent}
                          onOpenClassroom={(id) => setActiveClassroomCourseId(id)}
                        />
                      );
                    })}
                  </div>
                )
              )}

              {/* Branch Study Circles collaborative chat and peer review mode */}
              {catalogViewMode === 'circles' && (
                <div className="space-y-4">
                  <BranchStudyCircles
                    currentBranchId={selectedBranchId || 'branch-ai'}
                    currentTwigId={selectedTwigId}
                    allCourses={courses}
                    currentUser={currentUser}
                    onSelectCourse={(course) => setSelectedCourseForModal(course)}
                  />
                </div>
              )}

            </div>

          </div>
        )}

        {/* VIEW 2: VISUAL TREE MAP */}
        {activeTab === 'visual-tree' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <BotanicalTreeDiagram
              allCourses={courses}
              enrollments={enrollments}
              onSelectCourse={(course) => setSelectedCourseForModal(course)}
              onFilterByNode={(deptId, branchId, twigId) => {
                handleHierarchySelect(deptId, branchId, twigId);
              }}
              onOpenClassroom={(id) => setActiveClassroomCourseId(id)}
            />
          </div>
        )}

        {/* VIEW 3: STUDENT DASHBOARD */}
        {activeTab === 'dashboard' && (
          <StudentDashboard
            allCourses={courses}
            enrollments={enrollments}
            onOpenClassroom={(courseId) => setActiveClassroomCourseId(courseId)}
            onExploreCatalog={() => setActiveTab('catalog')}
            currentUser={currentUser}
            onSelectCourse={(course) => setSelectedCourseForModal(course)}
          />
        )}

        {/* VIEW 4: INSTRUCTOR STUDIO */}
        {activeTab === 'instructor' && (
          <InstructorStudio
            onAddCourse={handleAddNewCourse}
            instructorCourses={courses}
          />
        )}

        {/* VIEW 5: ADMIN MANAGEMENT CONSOLE */}
        {activeTab === 'admin' && (
          <AdminConsole
            allCourses={courses}
            onApproveCourse={(id) => {
              // Mark course approved
            }}
          />
        )}

        {/* VIEW 6: 10 SYSTEM BLUEPRINTS & DELIVERABLES */}
        {activeTab === 'blueprints' && (
          <SystemBlueprintsModal />
        )}

      </main>

      {/* Global Course Detail Modal (Leaf Course Page) */}
      <CourseDetailModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isInCart={selectedCourseForModal ? cartItems.some(i => i.course.id === selectedCourseForModal.id) : false}
        isEnrolled={selectedCourseForModal ? !!enrollments[selectedCourseForModal.id] : false}
        onOpenClassroom={(id) => {
          setSelectedCourseForModal(null);
          setActiveClassroomCourseId(id);
        }}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedFromCart}
      />

      {/* Payment Gateway Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        totalAmount={checkoutSubtotal}
        discountAmount={checkoutDiscount}
        finalAmount={checkoutFinal}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Footer (Crisp White Theme) */}
      <footer className="bg-white border-t border-stone-200 text-stone-600 py-10 mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <TreePine className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 text-sm">NoMySkill Academy</span>
                <p className="text-[11px] text-stone-500">The Upskilling Tree Career Platform</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <button onClick={() => setActiveTab('catalog')} className="hover:text-emerald-700 cursor-pointer">Tree Catalog</button>
              <button onClick={() => setActiveTab('visual-tree')} className="hover:text-emerald-700 cursor-pointer">Visual Tree Map</button>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-700 cursor-pointer">Student Classroom</button>
              <button onClick={() => setActiveTab('instructor')} className="hover:text-emerald-700 cursor-pointer">Instructor Studio</button>
              <button onClick={() => setActiveTab('admin')} className="hover:text-emerald-700 cursor-pointer">Admin Console</button>
              <button onClick={() => setActiveTab('blueprints')} className="text-amber-800 hover:text-amber-900 font-bold cursor-pointer">10 Technical Blueprints</button>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
            <p>© 2026 NoMySkill Upskilling Tree Inc. All rights reserved.</p>
            <p>Taxonomy Metaphor: Root → Trunk → Branch → Twig → Leaf</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
