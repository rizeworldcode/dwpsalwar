import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud, Trash2, Edit3, Eye, EyeOff, FileText, CheckCircle, Clock,
  LogOut, Plus, ShieldCheck, AlertCircle, Loader2, X, FileIcon, Search
} from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import AdminCard from '../../components/admin/AdminCard';
import StatCard from '../../components/admin/StatCard';
import {
  getStudents, TCRecord, Student
} from '../../utils/tcState';

const TcUpload = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [tcs, setTcs] = useState<TCRecord[]>([]);
  // Server-provided metrics (prefer these when available)
  const [serverTotalTcs, setServerTotalTcs] = useState<number | null>(null);
  const [serverVerifiedTcs, setServerVerifiedTcs] = useState<number | null>(null);
  const [serverUnverifiedTcs, setServerUnverifiedTcs] = useState<number | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Helper to fetch dashboard data from backend and populate states
  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin_dashboardGet`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json().catch(() => null);
  if (data && (data.success || data.tcData)) {
        const remoteTcData = data.tcData || [];
  if (data.email) setAdminEmail(data.email);
        if (typeof data.total_tc_uploaded === 'number') setServerTotalTcs(data.total_tc_uploaded);
        if (typeof data.verifiedTc === 'number') setServerVerifiedTcs(data.verifiedTc);
        if (typeof data.unverifiedTc === 'number') setServerUnverifiedTcs(data.unverifiedTc);

        const mapped: TCRecord[] = remoteTcData.map((item: any) => ({
          studentId: item.student_ID || item.studentId || '',
          studentName: item.student_name || item.studentName || '',
          className: item.className || 'Unknown',
          session: item.session || '',
          tcNumber: item.tcNumber || item.TC_number || '',
          uploadDate: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : '',
          status: item.status || 'Pending',
          passwordSet: '',
          remarks: item.remarks || '',
          fileName: item.TC_photo || '',
          fileSize: item.fileSize || ''
        }));

  setTcs(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch admin dashboard data:', err);
    }
  };

  // Fetch single TC details (including stored file name) and open preview
  const fetchTcView = async (studentId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/TC_view/${encodeURIComponent(studentId)}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json().catch(() => null);
      if (data && data.success && data.tc_data) {
        const tc = data.tc_data;
        const mapped: TCRecord = {
          studentId: tc.student_ID || tc.studentId || '',
          studentName: tc.student_name || tc.studentName || '',
          className: tc.className || 'Unknown',
          session: tc.session || '',
          tcNumber: tc.tcNumber || tc.TC_number || '',
          uploadDate: tc.created_at ? new Date(tc.created_at).toISOString().split('T')[0] : '',
          status: tc.status || 'Pending',
          passwordSet: '',
          remarks: tc.remarks || '',
          fileName: data.TC || tc.TC_photo || '',
          fileSize: tc.fileSize || ''
        };
        setPreviewTc(mapped);
      } else {
        setFormError((data && data.message) || 'Failed to load TC from server.');
      }
    } catch (err: any) {
      console.error('Error fetching TC view:', err);
      setFormError(err?.message || 'Network error fetching TC');
    }
  };

  // Refs for moving focus to next options
  const studentNameRef = useRef<HTMLInputElement>(null);
  const studentIdRef = useRef<HTMLInputElement>(null);
  const tcNumberRef = useRef<HTMLInputElement>(null);
  const remarksRef = useRef<HTMLTextAreaElement>(null);

  // Form States
  const [studentIdInput, setStudentIdInput] = useState('');
  const [studentSearchInput, setStudentSearchInput] = useState('');
  const [tcNumberInput, setTcNumberInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  // selectedClass and selectedSession were removed because server-driven data is used



  const [remarks, setRemarks] = useState('');
  const [tcStatus, setTcStatus] = useState<'Verified' | 'Pending' | 'Rejected'>('Verified');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; file?: File } | null>(null);
  
  // Drag and drop dragover state
  const [isDragOver, setIsDragOver] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & UI States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [previewTc, setPreviewTc] = useState<TCRecord | null>(null);
  const [editingTc, setEditingTc] = useState<TCRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Security Check: Redirect to login if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin-login');
    } else {
  setStudents(getStudents());
  // Initialize admin email from localStorage (login saves it), then load server data
  const storedEmail = localStorage.getItem('admin_email');
  if (storedEmail) setAdminEmail(storedEmail);
  // Load server dashboard data
  fetchDashboardData();
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/admin_logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout API failed:', err);
    }
    
    // Clear all local state and storage
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_logged_in_time');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    
    // Redirect to login
    navigate('/admin-login');
  };



  // Mock file drop handler
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'application/pdf') {
        setFormError('Only PDF files are supported.');
        return;
      }
      setUploadedFile({
  name: file.name,
  size: `${(file.size / 1024).toFixed(0)} KB`,
  file
      });
      setFormError('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setFormError('Only PDF files are supported.');
        return;
      }
      setUploadedFile({
  name: file.name,
  size: `${(file.size / 1024).toFixed(0)} KB`,
  file
      });
      setFormError('');
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const studentName = studentSearchInput.trim();
    const studentId = studentIdInput.trim();
    const tcNumber = tcNumberInput.trim();

    if (!studentName) {
      setFormError('Please enter a student name.');
      return;
    }
    if (!studentId) {
      setFormError('Please enter a student ID.');
      return;
    }
    if (!tcNumber) {
      setFormError('Please enter a TC number.');
      return;
    }
    if (!uploadedFile) {
      setFormError('Please upload a TC PDF document.');
      return;
    }

    setIsSubmitting(true);
    // Ensure we have the actual File object
    const fileObj = uploadedFile?.file;
    if (!fileObj) {
      setIsSubmitting(false);
      setFormError('Please upload a TC PDF document.');
      return;
    }

    // Build FormData for multipart upload
    const formData = new FormData();
    formData.append('student_name', studentName);
    formData.append('student_ID', studentId);
    formData.append('status', tcStatus);
    formData.append('TC_number', tcNumber);
    formData.append('TC_photo', fileObj);

    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/TC_uplode`, {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });

        const data = await res.json().catch(() => ({ success: false, message: 'Invalid server response' }));

        if (res.ok && data && data.success) {
          // Refresh server data instead of local optimistic update
          await fetchDashboardData();

          // Reset form
          setStudentIdInput('');
          setStudentSearchInput('');
          setTcNumberInput('');
          setRemarks('');
          setUploadedFile(null);
          setTcStatus('Verified');

          setIsSubmitting(false);
          setSuccessMessage(`Transfer Certificate for ${studentName} uploaded successfully!`);
          setShowSuccessModal(true);
        } else {
          setIsSubmitting(false);
          setFormError(data && data.message ? String(data.message) : 'TC upload failed.');
        }
      } catch (err: any) {
        setIsSubmitting(false);
        setFormError(err?.message || 'Network error. Could not reach backend.');
      }
    })();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this TC record?')) return;

    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/TC_delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ student_ID: id }),
        });

        const data = await res.json().catch(() => ({ success: false, message: 'Invalid server response' }));

        if (res.ok && data && data.success) {
          await fetchDashboardData();
          setSuccessMessage('TC record deleted successfully');
          setShowSuccessModal(true);
        } else {
          setFormError(data && data.message ? String(data.message) : 'Failed to delete TC.');
        }
      } catch (err: any) {
        console.error('Delete TC error:', err);
        setFormError(err?.message || 'Network error while deleting TC');
      }
    })();
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTc) return;

    try {
      const payload: any = {
        status: editingTc.status,
      };

      // Only include TC number if it's being changed
      if (editingTc.tcNumber && editingTc.tcNumber.trim() !== '') {
        payload.TC_number = editingTc.tcNumber;
      }

      const res = await fetch(`${API_BASE_URL}/update-tc/${encodeURIComponent(editingTc.studentId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({ success: false, message: 'Invalid server response' }));

      if (res.ok && data && data.success) {
        await fetchDashboardData();
        setEditingTc(null);
        setSuccessMessage('TC record updated successfully!');
        setShowSuccessModal(true);
      } else {
        setFormError(data && data.message ? String(data.message) : 'Failed to update TC.');
      }
    } catch (err: any) {
      setFormError(err?.message || 'Network error while updating TC');
    }
  };

  // KPIs - prefer server metrics when available
  const totalTcs = serverTotalTcs !== null ? serverTotalTcs : tcs.length;
  const pendingTcs = serverUnverifiedTcs !== null ? serverUnverifiedTcs : tcs.filter(t => t.status === 'Pending').length;
  const verifiedTcs = serverVerifiedTcs !== null ? serverVerifiedTcs : tcs.filter(t => t.status === 'Verified').length;

  // Filtered records
  const filteredTcs = tcs.filter(item =>
    item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tcNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50/70 pb-20 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* TOP ERP SECTION */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-950 tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-8 bg-[#1a4d2e] rounded-full inline-block"></span>
                DWPS ERP Dashboard
              </h1>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-1">
                Secure TC Upload & Student Account Provisioning
              </p>
            </div>

            {/* Admin Profile Card */}
            <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-[#1a4d2e] font-black rounded-full flex items-center justify-center border border-green-100 select-none">
                  {adminEmail ? adminEmail.charAt(0).toUpperCase() : 'SC'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-950">{adminEmail || 'Sunila Choudhary'}</h4>
                  <span className="text-[10px] text-[#1a4d2e] font-extrabold uppercase tracking-wide">Principal / Admin</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition"
                title="Secure Logout"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* METRIC STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
              title="Total TCs Uploaded"
              value={totalTcs}
              icon={FileText}
              description="Active student certificates issued"
              color="indigo"
              delay={0.05}
            />
            <StatCard
              title="Pending Verification"
              value={pendingTcs}
              icon={Clock}
              description="Awaiting school board clearance"
              color="amber"
              delay={0.1}
            />
            <StatCard
              title="Verified & Live"
              value={verifiedTcs}
              icon={ShieldCheck}
              description="Student logins activated"
              color="emerald"
              delay={0.15}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: UPLOAD FORM */}
            <div className="lg:col-span-5">
              <AdminCard className="sticky top-28">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-950 leading-tight">Upload Student TC</h3>
                  <p className="text-xs text-gray-400 font-semibold mt-1">Issue a new Transfer Certificate and set access credentials</p>
                </div>

                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2 text-xs text-rose-800 font-semibold"
                  >
                    <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
                    <span>{formError}</span>
                  </motion.div>
                )}

                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  {/* Search Student Input */}
                  <div className="space-y-1.5 relative">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Student Name</label>
                    <div className="relative">
                      <input
                        ref={studentNameRef}
                        type="text"
                        value={studentSearchInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setStudentSearchInput(val);
                          setShowSuggestions(true);
                          
                          // Check if typed name matches exactly a student
                          const match = students.find(s => s.name.toLowerCase() === val.toLowerCase());
                          if (match) {
                            setStudentIdInput(match.id);
                          } else {
                            if (!val.trim()) {
                              setStudentIdInput('');
                            } else if (!studentIdInput || students.some(s => s.id === studentIdInput)) {
                              const tempId = `DWPS${new Date().getFullYear()}${Math.floor(100 + Math.random() * 900)}`;
                              setStudentIdInput(tempId);
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            // Select first suggestion if showing and matches
                            const filtered = students.filter(s => 
                              s.name.toLowerCase().includes(studentSearchInput.toLowerCase())
                            );
                            if (filtered.length > 0 && showSuggestions) {
                              const first = filtered[0];
                              setStudentSearchInput(first.name);
                              setStudentIdInput(first.id);
                              setShowSuggestions(false);
                            }
                            setTimeout(() => {
                              studentIdRef.current?.focus();
                            }, 50);
                          }
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => {
                          // Delay hiding to allow item click
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                        disabled={isSubmitting}
                        placeholder="Type student name (e.g. Aarav Sharma)"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] transition"
                      />
                      {studentSearchInput && (
                        <button
                          type="button"
                          onClick={() => {
                            setStudentSearchInput('');
                            setStudentIdInput('');
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Suggestions Panel */}
                    <AnimatePresence>
                      {showSuggestions && studentSearchInput && students.filter(s => 
                        s.name.toLowerCase().includes(studentSearchInput.toLowerCase())
                      ).length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-48 overflow-y-auto"
                        >
                          {students
                            .filter(s => s.name.toLowerCase().includes(studentSearchInput.toLowerCase()))
                            .map(s => (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => {
                                  setStudentSearchInput(s.name);
                                  setStudentIdInput(s.id);
                                  setShowSuggestions(false);
                                  setTimeout(() => {
                                    studentIdRef.current?.focus();
                                  }, 50);
                                }}
                                className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-green-50 text-gray-800 hover:text-[#1a4d2e] border-b border-gray-50 last:border-b-0 transition flex justify-between items-center"
                              >
                                <span>{s.name}</span>
                                <span className="text-[10px] text-gray-400">{s.className} ({s.id})</span>
                              </button>
                            ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Student ID field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Student ID</label>
                    <input
                      ref={studentIdRef}
                      type="text"
                      value={studentIdInput}
                      onChange={(e) => setStudentIdInput(e.target.value)}
                      disabled={isSubmitting}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          tcNumberRef.current?.focus();
                        }
                      }}
                      placeholder="Enter or generate Student ID"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] transition"
                    />
                  </div>

                  {/* TC Number Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">TC Number</label>
                    <input
                      ref={tcNumberRef}
                      type="text"
                      value={tcNumberInput}
                      onChange={(e) => setTcNumberInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          remarksRef.current?.focus();
                        }
                      }}
                      disabled={isSubmitting}
                      placeholder="Enter TC Number (e.g. TC/2026/101)"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] transition"
                    />
                  </div>

                  {/* Drag and Drop TC File Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Upload TC File (PDF)</label>
                    
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleFileDrop}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition ${
                        isDragOver 
                          ? 'border-[#1a4d2e] bg-green-50/50' 
                          : uploadedFile 
                          ? 'border-green-300 bg-green-50/20' 
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50/10'
                      }`}
                      onClick={() => document.getElementById('tc-file-input')?.click()}
                    >
                      <input
                        id="tc-file-input"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      {uploadedFile ? (
                        <div className="flex flex-col items-center">
                          <FileIcon className="w-10 h-10 text-green-700 mb-2 stroke-[1.8]" />
                          <span className="text-xs font-bold text-gray-900 truncate max-w-full px-2">
                            {uploadedFile.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold mt-1">
                            {uploadedFile.size} - Ready to upload
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud className="w-10 h-10 text-gray-400 mb-2 stroke-[1.5]" />
                          <span className="text-xs font-bold text-gray-700">Drag & drop TC file here</span>
                          <span className="text-[10px] text-gray-400 font-semibold mt-1">or browse files (PDF only)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Status</label>
                    <select
                      value={tcStatus}
                      onChange={(e) => setTcStatus(e.target.value as any)}
                      disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] transition"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    </select>
                  </div>

                  {/* Remarks textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Remarks & Student Conduct</label>
                    <textarea
                      ref={remarksRef}
                      rows={3}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      disabled={isSubmitting}
                      placeholder="Excellent character, passed secondary board exam..."
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-medium text-xs px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] transition resize-none"
                    />
                  </div>

                  {/* Upload button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1a4d2e] hover:bg-green-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed text-white font-bold text-xs tracking-wider uppercase py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        Uploading TC & Setting Password...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Upload TC
                      </>
                    )}
                  </button>
                </form>
              </AdminCard>
            </div>

            {/* RIGHT SIDE: TC LIST TABLE */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                
                {/* TABLE HEADER & FILTER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-950 leading-tight">Uploaded TC Records</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-1">Manage, edit, and review student Transfer Certificates</p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs px-4 py-3 pl-9 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/10 focus:border-[#1a4d2e] transition"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* TABLE CONTAINER */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-green-50/50 text-[#1a4d2e] text-[10px] font-black uppercase tracking-wider border-b border-gray-100">
                        <th className="py-4 px-4 rounded-l-xl">Student Name</th>
                        <th className="py-4 px-4">Student ID</th>
                        <th className="py-4 px-4">Upload Date</th>
                        <th className="py-4 px-4">TC Status</th>
                        <th className="py-4 px-4 text-right rounded-r-xl">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                      {filteredTcs.length > 0 ? (
                        filteredTcs.map((item) => (
                          <tr key={item.studentId} className="hover:bg-gray-50/40 transition">
                            <td className="py-4 px-4">
                              <span className="font-bold text-gray-950 block">{item.studentName}</span>
                            </td>
                            <td className="py-4 px-4 font-extrabold text-[#1a4d2e]">{item.studentId}</td>
                            <td className="py-4 px-4 font-semibold text-gray-500">{item.uploadDate}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                item.status === 'Verified' 
                                  ? 'bg-green-50 text-green-700 border border-green-150' 
                                  : item.status === 'Pending' 
                                  ? 'bg-amber-50 text-amber-700 border border-amber-150' 
                                  : 'bg-rose-50 text-rose-700 border border-rose-150'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => fetchTcView(item.studentId)}
                                  className="p-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-950 transition"
                                  title="View Certificate Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingTc(item)}
                                  className="p-2 bg-green-50 text-[#1a4d2e] rounded-lg hover:bg-green-100 transition"
                                  title="Edit Record"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.studentId)}
                                  className="p-2 bg-rose-50 text-rose-650 rounded-lg hover:bg-rose-100 transition"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-400 italic">
                            No Transfer Certificates found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* POPUP MODAL: SUCCESS */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="bg-white rounded-3xl p-6 text-center max-w-sm w-full shadow-2xl border border-gray-150"
            >
              <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-150">
                <CheckCircle className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">TC Uploaded Successfully</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{successMessage}</p>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 w-full bg-[#1a4d2e] hover:bg-green-800 text-white font-bold text-xs tracking-wider uppercase py-3 rounded-2xl transition shadow-md"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP MODAL: VIEW PREVIEW */}
      <AnimatePresence>
        {previewTc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setPreviewTc(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Document Preview Mode</span>
                <h3 className="text-xl font-black text-gray-900 leading-tight">Transfer Certificate Details</h3>
              </div>

              {/* Simulated Certificate Display */}
              <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 relative aspect-[1.4/1] overflow-hidden flex flex-col justify-between shadow-inner">
                {/* Watermark logo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                  <img src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPS_LOGO.png" alt="DWPS" className="w-56 h-auto" />
                </div>

                {/* PDF embed preview (if backend file present) */}
                {previewTc.fileName && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
                    <iframe
                      src={previewTc.fileName.startsWith('uploads') ? `${API_BASE_URL}/${previewTc.fileName}` : `${API_BASE_URL}/uploads/tc/${previewTc.fileName}`}
                      title="TC Preview"
                      className="w-full h-full rounded-2xl border"
                      style={{ minHeight: 300 }}
                    />
                  </div>
                )}

                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2">
                    <img src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPS_LOGO.png" alt="Logo" className="h-8 w-auto" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-950 leading-tight">Delhi World Public School Alwar</h4>
                      <span className="text-[8px] text-gray-400 block tracking-wide uppercase font-semibold">Affiliated to CBSE, New Delhi</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-150">
                    STATUS: {previewTc.status}
                  </span>
                </div>

                <div className="my-4 grid grid-cols-2 gap-y-3 gap-x-6 text-[11px]">
                  <div>
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">Student Name</span>
                    <span className="font-extrabold text-gray-950">{previewTc.studentName}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">Student ID</span>
                    <span className="font-extrabold text-[#1a4d2e]">{previewTc.studentId}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">TC Certificate Number</span>
                    <span className="font-extrabold text-gray-850">{previewTc.tcNumber}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">Issue Date</span>
                    <span className="font-bold text-gray-800">{previewTc.uploadDate}</span>
                  </div>
                </div>

                <div className="border-t border-gray-150 pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-gray-400 font-bold uppercase block">Remarks</span>
                    <p className="text-[10px] text-gray-500 font-medium italic truncate max-w-[280px]">"{previewTc.remarks}"</p>
                  </div>
                  <div className="text-right">
                    <div className="h-6 w-16 bg-gray-200/50 border border-gray-300 border-dashed rounded flex items-center justify-center text-[7px] text-gray-400 font-bold uppercase select-none">
                      Authorized Seal
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                {previewTc.fileName ? (
                  (() => {
                    const fname = previewTc.fileName;
                    const href = fname.startsWith('uploads') ? `${API_BASE_URL}/${fname}` : `${API_BASE_URL}/uploads/tc/${fname}`;
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#1a4d2e] hover:bg-green-800 text-white font-bold text-xs tracking-wider uppercase py-3 px-5 rounded-xl flex items-center gap-1.5 transition shadow-md"
                      >
                        Download PDF
                      </a>
                    );
                  })()
                ) : (
                  <span className="text-xs text-gray-400">No file available</span>
                )}
                <button
                  onClick={() => setPreviewTc(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs tracking-wider uppercase py-3 px-5 rounded-xl transition"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP MODAL: EDIT RECORD */}
      <AnimatePresence>
        {editingTc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setEditingTc(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Update Record</span>
                <h3 className="text-xl font-black text-gray-900 leading-tight">Edit TC Details</h3>
                <p className="text-xs text-[#1a4d2e] font-bold mt-1">Student: {editingTc.studentName} ({editingTc.studentId})</p>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                {/* TC Number input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">TC Number</label>
                  <input
                    type="text"
                    value={editingTc.tcNumber}
                    onChange={(e) => setEditingTc({ ...editingTc, tcNumber: e.target.value })}
                    placeholder="Leave blank to keep current TC number"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] transition"
                  />
                </div>

                {/* Status Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Status</label>
                  <select
                    value={editingTc.status}
                    onChange={(e) => setEditingTc({ ...editingTc, status: e.target.value as any })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] transition"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#1a4d2e] hover:bg-green-800 text-white font-bold text-xs tracking-wider uppercase py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTc(null)}
                    className="flex-1 bg-gray-150 hover:bg-gray-200 text-gray-700 font-bold text-xs tracking-wider uppercase py-3.5 rounded-2xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AnimatedPage>
  );
};

export default TcUpload;
