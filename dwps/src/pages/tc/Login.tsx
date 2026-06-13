import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import AdminCard from '../../components/admin/AdminCard';
// server-validated student login

const StudentLogin = () => {
  const [tcNumber, setTcNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Field validation
    if (!tcNumber) {
      setError('TC Number is required.');
      return;
    }

    setIsLoading(true);
    (async () => {
      try {
        const res = await fetch('http://localhost:50000/student_login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ TC_number: tcNumber }),
        });

        const data = await res.json().catch(() => ({ success: false, message: 'Invalid server response' }));

        if (res.ok && data && data.success) {
          setIsLoading(false);
          // Persist login state and tokens
          localStorage.setItem('student_logged_in', 'true');
          localStorage.setItem('current_student_id', data.studentId || '');
          if (data.token) localStorage.setItem('student_token', data.token);
          
          // Redirect to StudentTc page and replace history so back button won't return to login
          navigate('/student-tc', { replace: true });
        } else {
          setIsLoading(false);
          setError(data && data.message ? String(data.message) : 'Invalid TC Number.');
        }
      } catch (err: any) {
        setIsLoading(false);
        setError(err?.message || 'Network error. Could not reach backend.');
      }
    })();
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-linear-to-tr from-green-50 via-white to-green-100 flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo & School Header */}
          <div className="text-center mb-8 flex flex-col items-center">
            <Link to="/">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
                src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPS_LOGO.png"
                alt="DWPS Logo"
                className="h-20 w-auto mb-4 hover:scale-105 transition-transform duration-300 select-none"
              />
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-black text-gray-950 tracking-tight"
            >
              Delhi World Public School
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-1"
            >
              TC Download Portal
            </motion.p>
          </div>

          {/* Student Login Card */}
          <AdminCard className="relative overflow-hidden" delay={0.2}>
            <div className="mb-6 text-center">
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Access Your TC</h2>
              <p className="text-xs text-gray-400 font-semibold mt-1">Enter your TC number to access your Transfer Certificate</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-xs text-rose-850 font-semibold"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* TC Number field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">TC Number</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a4d2e] transition-colors duration-300">
                    <FileText className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. TC/2026/101"
                    value={tcNumber}
                    onChange={(e) => setTcNumber(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-gray-50/50 border border-gray-200 text-[#1a4d2e] font-semibold text-sm px-5 py-3.5 pl-11 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1a4d2e] hover:bg-green-800 disabled:bg-green-900/50 text-white font-bold text-xs tracking-wider uppercase py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Accessing TC Portal...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Get My TC
                  </>
                )}
              </button>
            </form>
          </AdminCard>

          <div className="text-center mt-6">
            <Link to="/" className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition">
              ← Return to School Homepage
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default StudentLogin;