import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import AdminCard from '../../components/admin/AdminCard';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Field validations
    if (!email) {
      setError('Admin Email is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:50000/admin_login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // include credentials in case backend sets cookies
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({ success: false, message: 'Invalid server response' }));

      if (res.ok && data && data.success) {
        // Persist token if provided and mark logged-in
        if (data.token) localStorage.setItem('admin_token', data.token);
  // Persist admin email for UI display
  localStorage.setItem('admin_email', email);
        localStorage.setItem('admin_logged_in', 'true');
        setIsLoading(false);
        navigate('/admin/tc-upload');
      } else {
        setIsLoading(false);
        setError(data && data.message ? String(data.message) : 'Invalid Admin Email or Password.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Network error. Could not reach backend.');
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-linear-to-tr from-green-50 via-white to-green-100 flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo and Title */}
          <div className="text-center mb-8 flex flex-col items-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
              src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPS_LOGO.png"
              alt="DWPS Logo"
              className="h-20 w-auto mb-4 hover:scale-105 transition-transform duration-300 select-none"
            />
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
              Admin Portal
            </motion.p>
          </div>

          {/* Login Card */}
          <AdminCard className="relative overflow-hidden" delay={0.2}>
            <div className="mb-6 text-center">
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Admin Login</h2>
              <p className="text-xs text-gray-400 font-semibold mt-1">Access secure TC uploading dashboard</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800 font-semibold"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Admin Email field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Admin Email</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a4d2e] transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    placeholder="admin@dwpsalwar.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-gray-50/50 border border-gray-200 text-[#1a4d2e] font-semibold text-sm px-5 py-3.5 pl-11 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Password</label>
                  <Link
                    to="/admin-forgot-password"
                    className="text-xs font-bold text-[#1a4d2e] hover:text-green-800 transition"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a4d2e] transition-colors duration-300">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-gray-50/50 border border-gray-200 text-[#1a4d2e] font-semibold text-sm px-5 py-3.5 pl-11 pr-11 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] focus:bg-white transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                    Validating Credentials...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Secure Login
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

export default AdminLogin;
