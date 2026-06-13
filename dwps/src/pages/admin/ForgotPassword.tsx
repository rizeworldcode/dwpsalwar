import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, AlertCircle, Loader2, KeyRound, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import AdminCard from '../../components/admin/AdminCard';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  
  const otpInputsRef = useRef<HTMLInputElement[]>([]);

  // Countdown timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Admin Email is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:50000/sendOtpTOadmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setStep(2);
        setTimer(60);
        setCanResend(false);
      } else {
        setError(data.message || 'Failed to send OTP. Please check your email.');
      }
    } catch (err) {
      setError('Connection error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Clear previous input and focus it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpInputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setOtp(new Array(4).fill(''));
    setTimer(60);
    setCanResend(false);
    setError('');

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:50000/sendOtpTOadmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.message || 'Failed to resend OTP.');
      }
    } catch (err) {
      setError('Connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      setError('Please enter all 4 OTP digits.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:50000/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode }),
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setStep(3);
      } else {
        setError(data.message || 'Incorrect OTP. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:50000/admin_forgatePassword?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        // Navigate after showing success checkmark
        setTimeout(() => {
          navigate('/admin-login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to update password.');
      }
    } catch (err) {
      setError('Connection error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-linear-to-tr from-green-50 via-white to-green-100 flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo & School Header */}
          <div className="text-center mb-8 flex flex-col items-center">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPS_LOGO.png"
                alt="DWPS Logo"
                className="h-20 w-auto mb-4 hover:scale-105 transition-transform duration-300 select-none"
              />
            </Link>
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">Delhi World Public School</h1>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-1">Admin Portal</p>
          </div>

          <AdminCard className="relative overflow-hidden" delay={0.1}>
            {/* Success Popup inside the card */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                    className="w-20 h-20 bg-green-50 text-green-700 rounded-full flex items-center justify-center mb-4 border border-green-200 shadow-sm"
                  >
                    <Check className="w-10 h-10 stroke-[2.5]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">Password Reset Successful!</h3>
                  <p className="text-xs text-gray-500 mt-1">Your password has been updated. Redirecting to login...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back Button for forms */}
            <div className="mb-4">
              <button
                onClick={() => (step > 1 && !isSuccess ? setStep((step - 1) as any) : navigate('/admin-login'))}
                className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-gray-600 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {step === 1 ? 'Back to Login' : step === 2 ? 'Back to Email' : 'Back to OTP'}
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                {step === 1 ? 'Forgot Password' : step === 2 ? 'OTP Verification' : 'Reset Password'}
              </h2>
              <p className="text-xs text-gray-400 font-semibold mt-1">
                {step === 1
                  ? 'Request a verification code to access your admin dashboard'
                  : step === 2 
                    ? `Enter the 4-digit OTP code sent to ${email}`
                    : 'Create a new secure password for your account'}
              </p>
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

            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">
                    Admin Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1a4d2e] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@dwps.com"
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#1a4d2e]/10 focus:border-[#1a4d2e] focus:bg-white transition-all duration-200"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1a4d2e] hover:bg-[#143d24] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-green-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Send Verification Code'
                  )}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-between gap-3 px-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={(el) => { if (el) otpInputsRef.current[index] = el; }}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-14 h-16 text-center text-2xl font-black text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-hidden focus:border-[#1a4d2e] focus:bg-white focus:ring-4 focus:ring-[#1a4d2e]/5 transition-all duration-200"
                      disabled={isLoading}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500">
                    Didn't receive the code?{' '}
                    {timer > 0 ? (
                      <span className="text-[#1a4d2e]">Resend in {timer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-[#1a4d2e] hover:underline font-bold"
                      >
                        Resend Now
                      </button>
                    )}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1a4d2e] hover:bg-[#143d24] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-green-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Continue'
                  )}
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">
                    New Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1a4d2e] transition-colors">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#1a4d2e]/10 focus:border-[#1a4d2e] focus:bg-white transition-all duration-200"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">
                    Confirm New Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1a4d2e] transition-colors">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#1a4d2e]/10 focus:border-[#1a4d2e] focus:bg-white transition-all duration-200"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1a4d2e] hover:bg-[#143d24] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-green-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}
          </AdminCard>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ForgotPassword;
