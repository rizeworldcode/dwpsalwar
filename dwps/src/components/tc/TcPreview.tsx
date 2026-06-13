import { motion } from 'framer-motion';
import { FileText, Download, Eye, CheckCircle2, ShieldCheck, Calendar } from 'lucide-react';
import { TCRecord } from '../../utils/tcState';

interface TcPreviewProps {
  tc: TCRecord;
  onDownload?: () => void;
  onViewFull?: () => void;
}

const TcPreview = ({ tc, onDownload, onViewFull }: TcPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border-2 border-dashed border-green-200 rounded-3xl p-6 md:p-8 shadow-[0_12px_40px_rgba(26,77,46,0.06)] relative overflow-hidden"
    >
      {/* Background Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <img
          src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPS_LOGO.png"
          alt="DWPS Watermark"
          className="w-80 h-auto select-none"
        />
      </div>

      {/* Verification Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
          tc.status === 'Verified' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : tc.status === 'Pending' 
            ? 'bg-amber-50 text-amber-700 border border-amber-200' 
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {tc.status === 'Verified' && <ShieldCheck className="w-4 h-4 stroke-2" />}
          {tc.status === 'Pending' && <Calendar className="w-4 h-4 stroke-2" />}
          {tc.status === 'Rejected' && <CheckCircle2 className="w-4 h-4 stroke-2" />}
          {tc.status.toUpperCase()}
        </span>
      </div>

      {/* Student details and certificate action panel */}
      <div className="relative z-10 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold text-gray-400 tracking-wider uppercase block">Student Transfer Certificate</span>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{tc.studentName}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4">
            <div className="space-y-0.5 col-span-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Student ID</span>
              <span className="text-sm font-extrabold text-[#1a4d2e]">{tc.studentId}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {onDownload && (
            <button
              onClick={onDownload}
              className="flex-1 bg-[#1a4d2e] hover:bg-green-800 text-white font-bold text-xs tracking-wider uppercase py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download TC
            </button>
          )}
          {onViewFull && (
            <button
              onClick={onViewFull}
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs tracking-wider uppercase py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-gray-500" />
              View Full PDF
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TcPreview;
