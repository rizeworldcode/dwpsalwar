export interface Student {
  id: string;
  name: string;
  className: string;
  session: string;
}

export interface TCRecord {
  studentId: string;
  studentName: string;
  className: string;
  session: string;
  tcNumber: string;
  uploadDate: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  passwordSet: string;
  remarks: string;
  fileName: string;
  fileSize: string;
}

export const DUMMY_STUDENTS: Student[] = [
  { id: 'DWPS2026001', name: 'Aarav Sharma', className: 'Class XII-A', session: '2025-2026' },
  { id: 'DWPS2026002', name: 'Diya Patel', className: 'Class X-B', session: '2025-2026' },
  { id: 'DWPS2026003', name: 'Kabir Singh', className: 'Class XII-C', session: '2025-2026' },
  { id: 'DWPS2026004', name: 'Ananya Iyer', className: 'Class XII-B', session: '2025-2026' },
  { id: 'DWPS2026005', name: 'Rohan Verma', className: 'Class XII-A', session: '2025-2026' },
  { id: 'DWPS2026006', name: 'Sanya Gupta', className: 'Class X-A', session: '2025-2026' }
];

const DEFAULT_TCS: TCRecord[] = [
  {
    studentId: 'DWPS2026001',
    studentName: 'Aarav Sharma',
    className: 'Class XII-A',
    session: '2025-2026',
    tcNumber: 'TC/2026/104',
    uploadDate: '2026-05-12',
    status: 'Verified',
    passwordSet: 'aarav123',
    remarks: 'Passed Class XII board exams with flying colors. Good character.',
    fileName: 'aarav_sharma_tc.pdf',
    fileSize: '412 KB'
  },
  {
    studentId: 'DWPS2026002',
    studentName: 'Diya Patel',
    className: 'Class X-B',
    session: '2025-2026',
    tcNumber: 'TC/2026/105',
    uploadDate: '2026-05-18',
    status: 'Pending',
    passwordSet: 'diya123',
    remarks: 'Applying for TC due to relocation of parents.',
    fileName: 'diya_patel_tc.pdf',
    fileSize: '389 KB'
  }
];

export const getStudents = (): Student[] => {
  return DUMMY_STUDENTS;
};

export const getTcs = (): TCRecord[] => {
  const tcs = localStorage.getItem('dwps_tcs');
  if (!tcs) {
    localStorage.setItem('dwps_tcs', JSON.stringify(DEFAULT_TCS));
    return DEFAULT_TCS;
  }
  return JSON.parse(tcs);
};

export const saveTcs = (tcs: TCRecord[]): void => {
  localStorage.setItem('dwps_tcs', JSON.stringify(tcs));
};

export const addTc = (tc: TCRecord): void => {
  const tcs = getTcs();
  // Remove existing TC for this student if present, then add new one
  const filtered = tcs.filter(item => item.studentId !== tc.studentId);
  filtered.unshift(tc); // Add to the top of the table
  saveTcs(filtered);
};

export const deleteTc = (studentId: string): void => {
  const tcs = getTcs();
  const filtered = tcs.filter(item => item.studentId !== studentId);
  saveTcs(filtered);
};

export const updateTc = (updatedTc: TCRecord): void => {
  const tcs = getTcs();
  const index = tcs.findIndex(item => item.studentId === updatedTc.studentId);
  if (index !== -1) {
    tcs[index] = updatedTc;
    saveTcs(tcs);
  }
};
