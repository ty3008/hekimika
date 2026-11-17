import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Core Layouts (Always present in initial shell)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Primary Landing Page (Loaded immediately for instant FCP)
import Home from './pages/Home';

// Lazy-Loaded Public Pages (Loaded on demand as visitor navigates)
const About = lazy(() => import('./pages/About'));
const PerfectedInWisdom = lazy(() => import('./pages/PerfectedInWisdom'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const WisdomMoments = lazy(() => import('./pages/WisdomMoments'));
const YoungAndWise = lazy(() => import('./pages/YoungAndWise'));
const Resources = lazy(() => import('./pages/Resources'));
const WisdomForSingles = lazy(() => import('./pages/WisdomForSingles'));
const PurityWisdom = lazy(() => import('./pages/PurityWisdom'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ForumPage = lazy(() => import('./pages/ForumPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const VideoTeachings = lazy(() => import('./pages/VideoTeachings'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const Library = lazy(() => import('./pages/Library'));
const Reader = lazy(() => import('./pages/Reader'));

// Lazy-Loaded Admin Layout & Pages (Keeps 100% of admin overhead out of visitor bundle)
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminPrograms = lazy(() => import('./admin/AdminPrograms'));
const AdminBooks = lazy(() => import('./admin/AdminBooks'));
const AdminBlog = lazy(() => import('./admin/AdminBlog'));
const AdminFreeResources = lazy(() => import('./admin/AdminFreeResources'));
const AdminTestimonials = lazy(() => import('./admin/AdminTestimonials'));
const AdminHighlights = lazy(() => import('./admin/AdminHighlights'));

function PageFallback() {
  return (
    <div className="min-h-[55vh] flex flex-col items-center justify-center p-8 bg-white" aria-busy="true" aria-label="Loading page">
      <div
        className="w-10 h-10 rounded-full border-3 border-gray-200 border-t-[color:var(--gold)] animate-spin mb-3"
        style={{ borderTopColor: 'var(--gold)' }}
      />
      <p className="text-[11px] uppercase tracking-widest text-navy/60 font-semibold" style={{ color: 'var(--navy)' }}>
        Hekimika – Wise Nation
      </p>
    </div>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/perfected-in-wisdom" element={<PublicLayout><PerfectedInWisdom /></PublicLayout>} />
          <Route path="/programs/:slug" element={<PublicLayout><ProgramDetail /></PublicLayout>} />
          <Route path="/wisdom-moments" element={<PublicLayout><WisdomMoments /></PublicLayout>} />
          <Route path="/young-and-wise" element={<PublicLayout><YoungAndWise /></PublicLayout>} />
          <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
          <Route path="/read/:id" element={<Reader />} />
          <Route path="/wisdom-for-singles" element={<PublicLayout><WisdomForSingles /></PublicLayout>} />
          <Route path="/purity-wisdom" element={<PublicLayout><PurityWisdom /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
          <Route path="/forums/:slug" element={<PublicLayout><ForumPage /></PublicLayout>} />
          <Route path="/video-teachings" element={<PublicLayout><VideoTeachings /></PublicLayout>} />
          <Route path="/partnerships" element={<PublicLayout><Partnerships /></PublicLayout>} />
          <Route path="/library" element={<PublicLayout><Library /></PublicLayout>} />

          {/* Admin Auth Route */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/programs" element={<ProtectedRoute><AdminLayout><AdminPrograms /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/books" element={<ProtectedRoute><AdminLayout><AdminBooks /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/free-resources" element={<ProtectedRoute><AdminLayout><AdminFreeResources /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/blog" element={<ProtectedRoute><AdminLayout><AdminBlog /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><AdminLayout><AdminTestimonials /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/highlights" element={<ProtectedRoute><AdminLayout><AdminHighlights /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />

          {/* 404 Route */}
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </Suspense>
    </>
  );
}
