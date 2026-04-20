import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import PerfectedInWisdom from './pages/PerfectedInWisdom';
import ProgramDetail from './pages/ProgramDetail';
import WisdomMoments from './pages/WisdomMoments';
import YoungAndWise from './pages/YoungAndWise';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminPrograms from './admin/AdminPrograms';
import AdminBooks from './admin/AdminBooks';
import AdminBlog from './admin/AdminBlog';
import AdminFreeResources from './admin/AdminFreeResources';
import Reader from './pages/Reader';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();

  // Don't animate full page transitions to avoid layout thrashing, 
  // framer motion is used extensively inside the pages themselves.
  return (
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
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Admin Auth Route (hidden entry point) */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/programs" element={<ProtectedRoute><AdminLayout><AdminPrograms /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/books" element={<ProtectedRoute><AdminLayout><AdminBooks /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/free-resources" element={<ProtectedRoute><AdminLayout><AdminFreeResources /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/blog" element={<ProtectedRoute><AdminLayout><AdminBlog /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/login" element={<Navigate to="/admin" replace />} />

      {/* 404 Route */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}
