export type DepartmentId = 
  | 'tech-engineering'
  | 'business-operations'
  | 'creative-service'
  | 'education-human';

export interface TrunkDepartment {
  id: DepartmentId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  colorTone: {
    badgeBg: string;
    badgeText: string;
    border: string;
    accent: string;
    gradient: string;
  };
  branchesCount: number;
}

export interface BranchCategory {
  id: string;
  departmentId: DepartmentId;
  name: string;
  description: string;
  iconName: string;
}

export interface TwigSubStream {
  id: string;
  branchId: string;
  departmentId: DepartmentId;
  name: string;
  description: string;
  skillsFocus: string[];
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'lab' | 'reading';
  videoUrl?: string;
  summary?: string;
  completed?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  rating: number;
  studentsCount: number;
}

export interface JobVacancy {
  title: string;
  avgSalary: string;
  demandLevel: 'High' | 'Very High' | 'Critical';
  hiringCompanies?: string[];
}

export interface LeafCourse {
  id: string;
  title: string;
  slug: string;
  departmentId: DepartmentId;
  branchId: string;
  twigId: string;
  summary: string;
  description: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  instructor: Instructor;
  whatYouWillLearn: string[];
  prerequisites: string[];
  chapters: Chapter[];
  quiz: QuizQuestion[];
  status: 'published' | 'draft' | 'pending_approval';
  targetJobVacancies?: JobVacancy[];
}

export interface UserEnrollment {
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessonIds: string[];
  quizScore?: number;
  quizPassed?: boolean;
  certificateEarned?: boolean;
  certificateId?: string;
  notes?: string;
}

export interface CartItem {
  course: LeafCourse;
  addedAt: string;
}

export interface OrderReceipt {
  id: string;
  items: LeafCourse[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: 'stripe' | 'paypal' | 'razorpay';
  customerName: string;
  customerEmail: string;
  purchasedAt: string;
}

export interface ActiveUser {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'instructor' | 'admin';
  avatar: string;
}
