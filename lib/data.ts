import { createElement } from "react";
import {
    LayoutDashboard,
    Users,
    UsersRound,
    User2Icon,
    GraduationCap,
    BookOpen,
    CreditCard,
    HeadphonesIcon,
    BarChart2,

} from 'lucide-react'


// Landing page
export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Courses",
    hash: "#courses",
  },
  {
    name: "Tutors",
    hash: "#tutors",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;


export const courses = [
  {
    name: "IGCSE Mathematics",
    level: "IGCSE",
    description: "Comprehensive coverage of IGCSE Math syllabus",
    icon: "📐",
  },
  {
    name: "A Level Physics",
    level: "A Level",
    description: "In-depth study of A Level Physics concepts",
    icon: "🔬",
  },
  {
    name: "Python Programming",
    level: "Programming",
    description: "Learn Python from basics to advanced topics",
    icon: "🐍",
  },
  {
    name: "IGCSE Biology",
    level: "IGCSE",
    description: "Explore the wonders of life sciences",
    icon: "🧬",
  },
  {
    name: "A Level Chemistry",
    level: "A Level",
    description: "Master complex chemical reactions and theories",
    icon: "⚗️",
  },
  {
    name: "Web Development",
    level: "Programming",
    description: "Build responsive websites with HTML, CSS, and JavaScript",
    icon: "🌐",
  },
  {
    name: "IGCSE English Literature",
    level: "IGCSE",
    description: "Analyze classic and contemporary literature",
    icon: "📚",
  },
  {
    name: "A Level Economics",
    level: "A Level",
    description: "Understand micro and macroeconomic principles",
    icon: "📊",
  },
  {
    name: "Java Programming",
    level: "Programming",
    description: "Object-oriented programming with Java",
    icon: "☕",
  },
] as const; 


export const tutors = [
  {
    name: "Saif Nasir",
    subjects: ["Mathematics", "Computer Science"] as const,
    rating: 4.9,
    imageUrl: "/images/tutors/saif-nasir.jpg",
    totalSessions: 120,
  },
  {
    name: "Nathan Crasto",
    subjects: ["Physics", "Chemistry"] as const,
    rating: 4.8,
    imageUrl: "/images/tutors/saif-nasir.jpg",
    totalSessions: 100,
  },
  {
    name: "Sara Khan",
    subjects: ["Biology", "English Literature"] as const,
    rating: 4.7,
    imageUrl: "/images/tutors/saif-nasir.jpg",
    totalSessions: 80,
  },
  {
    name: "Ahmed Ali",
    subjects: ["Economics", "Business Studies"] as const,
    rating: 4.6,
    imageUrl: "/images/tutors/saif-nasir.jpg",
    totalSessions: 60,
  },
  {
    name: "Sana Malik",
    subjects: ["Web Development", "Python Programming"] as const,
    rating: 4.5,
    imageUrl: "/images/tutors/saif-nasir.jpg",
    totalSessions: 40,
  }
] as const;


export const testimonies = [
  {
    studentName: "Alex Johnson",
    subject: "Mathematics",
    testimony: "The tutoring I received was exceptional. My tutor explained complex concepts in a way that was easy to understand, and my grades improved significantly.",
    rating: 5,
    imageUrl: "/images/alex-johnson.jpg",
    date: "May 15, 2023"
  },
  {
    studentName: "Emily Davis",
    subject: "Science",
    testimony: "I had an amazing experience with the science tutor. The interactive lessons made learning fun and engaging, and I gained a deeper understanding of the subject.",
    rating: 4,
    imageUrl: "/images/emily-davis.jpg",
    date: "June 20, 2023"
  },
  {
    studentName: "Michael Brown",
    subject: "History",
    testimony: "The history lessons were well-structured and informative. The tutor's passion for the subject was evident and made the classes very enjoyable.",
    rating: 4.5,
    imageUrl: "/images/michael-brown.jpg",
    date: "July 10, 2023"
  },
  {
    studentName: "Sophia Martinez",
    subject: "English",
    testimony: "The English tutor helped me improve my writing skills significantly. The feedback was constructive and helped me enhance my grammar and style.",
    rating: 5,
    imageUrl: "/images/sophia-martinez.jpg",
    date: "August 5, 2023"
  },
  {
    studentName: "Daniel Lee",
    subject: "Computer Science",
    testimony: "The computer science tutor was incredibly knowledgeable and supportive. The coding exercises were challenging and helped me advance my programming skills.",
    rating: 4.7,
    imageUrl: "/images/daniel-lee.jpg",
    date: "September 1, 2023"
  }
] as const;



// Admin Pages
export const adminSidebarItems = [
    { icon: createElement(LayoutDashboard), label: 'Dashboard', href: '/admin/dashboard' },
    { icon: createElement(UsersRound), label: 'User Management', href: '/admin/users' },
    { icon: createElement(Users), label: 'Student Management', href: '/admin/students' },
    { icon: createElement(GraduationCap), label: 'Tutor Management', href: '/admin/tutors' },
    { icon: createElement(BookOpen), label: 'Course Management', href: '/admin/courses' },
    { icon: createElement(CreditCard), label: 'Payment and Billing', href: '/admin/payments' },
    { icon: createElement(HeadphonesIcon), label: 'Customer Support', href: '/admin/support' },
    { icon: createElement(BarChart2), label: 'Analytics and Reporting', href: '/admin/analytics' },
    // { icon: createElement(Home), label: '', href: '/' },
]



// Student Pages

export const studentSidebarItems = [
    { icon: createElement(LayoutDashboard), label: 'Dashboard', href: '/dashboard' },
    { icon: createElement(GraduationCap), label: 'Courses', href: '/courses' },
    { icon: createElement(BarChart2), label: 'Progress', href: '/progress' },
    { icon: createElement(CreditCard), label: 'Payments', href: '/payments' },
    { icon: createElement(User2Icon), label: 'Profile', href: '/profile' },
    { icon: createElement(HeadphonesIcon), label: 'Support', href: '/support' },
]
