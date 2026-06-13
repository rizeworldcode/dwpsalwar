import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import MandatoryDisclosure from './pages/MandatoryDisclosure';
import WhatsAppButton from './components/WhatsAppButton';
import InfiniteGridScroller from './components/InfiniteGridScroller';

// TC System Pages
import AdminLogin from './pages/admin/Login';
import ForgotPassword from './pages/admin/ForgotPassword';
import TcUpload from './pages/admin/TcUpload';
import StudentLogin from './pages/tc/Login';
import StudentTc from './pages/tc/StudentTc';

function ScrollToTopAndReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Setup reveal on scroll intersection observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTopAndReveal />
      <Header />
      <div className="min-h-dvh bg-white w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
          
          {/* TC Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/tc-upload" element={<TcUpload />} />
          <Route path="/tc-login" element={<StudentLogin />} />
          <Route path="/student-tc" element={<StudentTc />} />
        </Routes>
        <InfiniteGridScroller />
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
