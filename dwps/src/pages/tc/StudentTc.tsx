import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, UserCheck, User, AlertCircle } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import TcPreview from '../../components/tc/TcPreview';
import { TCRecord } from '../../utils/tcState';

const StudentTc = () => {
  const navigate = useNavigate();
  const [tcRecord, setTcRecord] = useState<TCRecord | null>(null);
  // modal preview removed; we open PDFs in a new tab instead

  useEffect(() => {
    const fetchTcFromServer = async () => {
      const isLoggedIn = localStorage.getItem('student_logged_in');
      const studentId = localStorage.getItem('current_student_id');

      if (!isLoggedIn || !studentId) {
        navigate('/tc-login');
        return;
      }

      try {
        const res = await fetch(`http://localhost:50000/TC_view/${encodeURIComponent(studentId)}`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data && data.success && data.tc_data) {
          const tc = data.tc_data;
          const mapped: TCRecord = {
            studentId: tc.student_ID || tc.studentId || '',
            studentName: tc.student_name || tc.studentName || '',
            className: tc.className || 'Unknown',
            session: tc.session || '',
            tcNumber: tc.tcNumber || '',
            uploadDate: tc.created_at ? new Date(tc.created_at).toISOString().split('T')[0] : '',
            status: tc.status || 'Pending',
            passwordSet: '',
            remarks: tc.remarks || '',
            fileName: data.TC || tc.TC_photo || '',
            fileSize: tc.fileSize || ''
          };
          setTcRecord(mapped);
        } else {
          // invalid session or no record
          localStorage.removeItem('student_logged_in');
          localStorage.removeItem('current_student_id');
          navigate('/tc-login');
        }
      } catch (err) {
        console.error('Error fetching student TC:', err);
        localStorage.removeItem('student_logged_in');
        localStorage.removeItem('current_student_id');
        navigate('/tc-login');
      }
    };

    fetchTcFromServer();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:50000/student_logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Student logout API failed:', err);
    }

    // Clear all local student data
    localStorage.removeItem('student_logged_in');
    localStorage.removeItem('current_student_id');
    localStorage.removeItem('student_token');
    
    // Redirect to login
    navigate('/tc-login');
  };

  const handleDownload = () => {
  if (!tcRecord) return;
  const url = buildFileUrl(tcRecord.fileName);
  if (!url) return;
  // Open file in new tab which will use browser's PDF viewer / download UI
  window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Build a full URL to the backend-hosted file
  const buildFileUrl = (filePath: string | undefined | null) => {
    if (!filePath) return '';
  // Use the secure proxy endpoint to stream files with permissive headers
  const normalized = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  // If filePath already an absolute URL, return it
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;
  return `http://localhost:50000/public-file?path=${encodeURIComponent(normalized)}`;
  };

  // No iframe preview in dev fallback; open in new tab instead
  const handleViewFull = (tc?: TCRecord | null) => {
    if (!tc) return;
    const url = buildFileUrl(tc.fileName);
    if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!tcRecord) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-gray-400 text-sm font-semibold animate-pulse">Loading TC Record...</div>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50/50 pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* HEADER ROW */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-black text-gray-950 tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-7 bg-[#1a4d2e] rounded-full inline-block"></span>
                My Document Center
              </h1>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-1">
                View & download your official school transfer documents
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs tracking-wider rounded-xl transition cursor-pointer self-start sm:self-auto border border-rose-150"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* STUDENT SUMMARY CARDS */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
              <div className="w-11 h-11 bg-green-50 text-[#1a4d2e] rounded-2xl flex items-center justify-center">
                <User className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Student Name</span>
                <span className="text-sm font-black text-gray-900">{tcRecord.studentName}</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
              <div className="w-11 h-11 bg-green-50 text-[#1a4d2e] rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Student ID</span>
                <span className="text-sm font-black text-gray-900">{tcRecord.studentId}</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
              <div className="w-11 h-11 bg-green-50 text-[#1a4d2e] rounded-2xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Student Status</span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                  tcRecord.status.toLowerCase() === 'verified' || tcRecord.status.toLowerCase() === 'active'
                    ? 'text-green-700 bg-green-50 border-green-150'
                    : 'text-amber-700 bg-amber-50 border-amber-150'
                }`}>
                  {tcRecord.status.toLowerCase() === 'verified' || tcRecord.status.toLowerCase() === 'active' ? 'TC Issued' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* MAIN TC PREVIEW BLOCK */}
          <div className="space-y-6">
            {tcRecord.status.toLowerCase() === 'verified' || tcRecord.status.toLowerCase() === 'active' ? (
              <TcPreview
                tc={tcRecord}
                onDownload={handleDownload}
                onViewFull={() => handleViewFull(tcRecord)}
              />
            ) : (
              <div className="bg-amber-50/50 border-2 border-dashed border-amber-200 rounded-3xl p-8 text-center shadow-[0_12px_40px_rgba(245,158,11,0.04)] relative overflow-hidden">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
                  <AlertCircle className="w-8 h-8 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-amber-950 mb-2">TC Document Processing</h3>
                <p className="text-sm font-semibold text-amber-800 max-w-md mx-auto leading-relaxed">
                  Your tc is currently being processed. It will be available for download once issued by the administration.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

  {/* Preview modal removed: PDFs open in a new tab as fallback for dev environment */}
    </AnimatedPage>
  );
};

export default StudentTc;
