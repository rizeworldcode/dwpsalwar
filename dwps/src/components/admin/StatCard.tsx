import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  color?: 'green' | 'amber' | 'emerald' | 'indigo' | 'rose';
  delay?: number;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  color = 'green',
  delay = 0
}: StatCardProps) => {
  const colorMap = {
    green: {
      bg: 'bg-green-50/70',
      text: 'text-[#1a4d2e]',
      border: 'border-green-100',
      iconBg: 'bg-green-100/80',
      iconText: 'text-green-800'
    },
    emerald: {
      bg: 'bg-emerald-50/70',
      text: 'text-emerald-900',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-100/80',
      iconText: 'text-emerald-700'
    },
    amber: {
      bg: 'bg-amber-50/70',
      text: 'text-amber-900',
      border: 'border-amber-100',
      iconBg: 'bg-amber-100/80',
      iconText: 'text-amber-700'
    },
    indigo: {
      bg: 'bg-indigo-50/70',
      text: 'text-indigo-900',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-100/80',
      iconText: 'text-indigo-700'
    },
    rose: {
      bg: 'bg-rose-50/70',
      text: 'text-rose-900',
      border: 'border-rose-100',
      iconBg: 'bg-rose-100/80',
      iconText: 'text-rose-700'
    }
  };

  const currentStyles = colorMap[color] || colorMap.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`p-6 rounded-3xl border ${currentStyles.border} ${currentStyles.bg} flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]`}
    >
      <div className="space-y-1">
        <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block">{title}</span>
        <span className={`text-3xl font-black ${currentStyles.text} block`}>{value}</span>
        <span className="text-[11px] font-semibold text-gray-500 block">{description}</span>
      </div>
      <div className={`p-4 rounded-2xl ${currentStyles.iconBg} ${currentStyles.iconText} flex items-center justify-center`}>
        <Icon className="w-6 h-6 stroke-[1.8]" />
      </div>
    </motion.div>
  );
};

export default StatCard;
