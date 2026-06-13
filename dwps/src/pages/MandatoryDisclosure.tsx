import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';

// Teacher data array matching the prompt
interface Teacher {
  sNo: number;
  name: string;
  designation: string;
}

const teachersList: Teacher[] = [
  { sNo: 1, name: 'Anjali Sharma', designation: 'PRT' },
  { sNo: 2, name: 'Ankit Khattar', designation: 'Admin. & Study Base' },
  { sNo: 3, name: 'Ankur Bijarnia', designation: 'PRT' },
  { sNo: 4, name: 'Bela Ahuja', designation: 'PRT' },
  { sNo: 5, name: 'Deepa Ganda', designation: 'PRT' },
  { sNo: 6, name: 'Deepesh Saini', designation: 'Sports Teacher' },
  { sNo: 7, name: 'Deepika Sharma', designation: 'TGT' },
  { sNo: 8, name: 'Dolly Majoka', designation: 'PRT' },
  { sNo: 9, name: 'Ekta Baweja', designation: 'TGT' },
  { sNo: 10, name: 'Eva Bhatnagar', designation: 'TGT' },
  { sNo: 11, name: 'Hemant Saini', designation: 'Admin & Transport' },
  { sNo: 12, name: 'Jagriti Singh', designation: 'PRT' },
  { sNo: 13, name: 'Jyotsna Vinayak', designation: 'PRT' },
  { sNo: 14, name: 'Kamalkant Sharma', designation: 'Music Teacher' },
  { sNo: 15, name: 'Kirandeep Kaur', designation: 'TGT' },
  { sNo: 16, name: 'Lata Mehra', designation: 'Dance Teacher' },
  { sNo: 17, name: 'Mansi Saini', designation: 'MT' },
  { sNo: 18, name: 'Namisha Adlakha', designation: 'TGT' },
  { sNo: 19, name: 'Naresh Sharma', designation: 'Sports Teacher' },
  { sNo: 20, name: 'Pankaj Yadav', designation: 'TGT' },
  { sNo: 21, name: 'Pooja Sharma', designation: 'PRT' },
  { sNo: 22, name: 'Poonam Choudhary', designation: 'TGT' },
  { sNo: 23, name: 'Prabhjeet Kaur', designation: 'MT' },
  { sNo: 24, name: 'Prabhjot Kaur', designation: 'MT' },
  { sNo: 25, name: 'Priya Sharma', designation: 'TGT' },
  { sNo: 26, name: 'Rahul Choudhary', designation: 'Admin. & Accounts' },
  { sNo: 27, name: 'Ram Lal', designation: 'Admin. & Typist' },
  { sNo: 28, name: 'Rashmi Upadhyay', designation: 'PRT' },
  { sNo: 29, name: 'Samiksa Jain', designation: '' },
  { sNo: 30, name: 'Sangeeta Saini', designation: 'PRT' },
  { sNo: 31, name: 'Sneha Sharma', designation: 'PRT' },
  { sNo: 32, name: 'Suman Chauhan', designation: 'MT' },
  { sNo: 33, name: 'Sunila Choudhary', designation: 'Principal' },
  { sNo: 34, name: 'Susheela Rathi', designation: 'PRT' },
  { sNo: 35, name: 'Tanuja Rawat', designation: 'TGT' }
];

const pdfDocs = [
  { title: "Affiliation/Upgradation Letter", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1781263645/CBSE_Affilation.pdf" },
  { title: "Societies/Trust Registration Certificate", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/TRUSTDEED.pdf" },
  { title: "No Objection Certificate (NOC)", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/STATEAFFILATION.pdf" },
  { title: "Recognition Certificate Under RTE Act, 2009", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/STATEAFFILATION.pdf" },
  { title: "Building Safety Certificate", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/BUILDINGCERTIFICATE_new.pdf-1.pdf" },
  { title: "Fire Safety Certificate", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/FIRENOC-1.pdf" },
  { title: "Self Certification / DEO Certificate", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/SelfCertification2.pdf" },
  { title: "Water, Health and Sanitation Certificates", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/SAFEDRINKINGWATERCERTIFICATE1.pdf" },
  { title: "Fee Structure of the School", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/FEE_STRUCTURE.pdf" },
  { title: "Annual Academic Calendar", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/ACADEMICCALANDER.pdf" },
  { title: "School Management Committee (SMC) List", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/SCHOOLMANAGEMENTCOMMITTEE.pdf" },
  { title: "Parents Teachers Association (PTA) Members List", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/PARENTSTEACHERASSOCIATION.pdf" },
  { title: "Mandatory Public Disclosure Letter", url: "https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPSLETTER-1.pdf" }
];

const MandatoryDisclosure = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePdfIndex, setActivePdfIndex] = useState<number | null>(null);

  const openPdfViewer = (url: string) => {
    const index = pdfDocs.findIndex(doc => doc.url === url);
    if (index !== -1) {
      setActivePdfIndex(index);
    }
  };

  const handlePrevPdf = () => {
    if (activePdfIndex !== null) {
      setActivePdfIndex((activePdfIndex - 1 + pdfDocs.length) % pdfDocs.length);
    }
  };

  const handleNextPdf = () => {
    if (activePdfIndex !== null) {
      setActivePdfIndex((activePdfIndex + 1) % pdfDocs.length);
    }
  };

  const filteredTeachers = teachersList.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Trigger Print to PDF
  const handlePrintPDF = () => {
    window.print();
  };

  // Export Teacher Details to CSV/Excel
  const handleExportExcel = () => {
    const headers = ['S No', 'Name', 'Designation'];
    const csvRows = [
      headers.join(','),
      ...teachersList.map(t => [t.sNo, `"${t.name}"`, `"${t.designation}"`].join(','))
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'DWPS_Alwar_Teacher_Details.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatedPage>
      <div className="bg-gray-50 min-h-screen pb-16">
        {/* Injecting CSS overrides for print mode */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            header, footer, .no-print, button, .whatsapp-button, #infinite-grid-scroller {
              display: none !important;
            }
            body {
              background-color: white !important;
              color: black !important;
            }
            .print-card {
              border: none !important;
              box-shadow: none !important;
              background: transparent !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .print-table {
              border-collapse: collapse !important;
              width: 100% !important;
            }
            .print-table th, .print-table td {
              border: 1px solid #ddd !important;
              padding: 6px !important;
              font-size: 11px !important;
              color: black !important;
            }
            .print-title {
              font-size: 20px !important;
              margin-bottom: 5px !important;
            }
            .print-section-title {
              font-size: 14px !important;
              margin-top: 15px !important;
              margin-bottom: 5px !important;
              border-bottom: 2px solid #1a4d2e !important;
              padding-bottom: 2px !important;
            }
            .print-page-break {
              page-break-before: always;
            }
          }
        `}} />

        {/* Hero Section */}
        <section className="relative h-[280px] overflow-hidden bg-black flex items-center justify-center no-print">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 1.2 }}
            src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6875.jpg.jpg"
            alt="DWPS Alwar School Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span className="text-xs font-bold tracking-widest bg-white/20 px-3 py-1 rounded-full uppercase mb-3 inline-block">
                CBSE Mandatory Disclosure
              </span>
              <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">
                Public Disclosures
              </h1>
              <p className="text-sm md:text-base max-w-2xl mx-auto text-gray-200 font-medium">
                Delhi World Public School Alwar - Statutory Information in Compliance with CBSE Guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 print-card">
          {/* Header Card with PDF download and view buttons */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 no-print">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#1a4d2e] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">Public Disclosure Documents</h2>
                <p className="text-xs text-gray-500 mt-1">Download official copy or view certificates below</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPSLETTER-1.pdf")}
                className="w-full sm:w-auto bg-[#1a4d2e] hover:bg-green-800 text-white font-bold text-xs tracking-wider px-6 py-3.5 rounded-full shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                VIEW DISCLOSURE LETTER
              </button>
              <button
                onClick={handlePrintPDF}
                className="w-full sm:w-auto border border-[#1a4d2e] text-[#1a4d2e] hover:bg-green-50 font-bold text-xs tracking-wider px-6 py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4" />
                </svg>
                PRINT THIS PAGE
              </button>
            </div>
          </div>

          <div className="text-center mb-6 hidden print:block">
            <h1 className="text-2xl font-bold text-gray-900 print-title">DELHI WORLD PUBLIC SCHOOL ALWAR</h1>
            <p className="text-sm font-semibold text-gray-600">Mandatory Public Disclosure (CBSE Compliance)</p>
          </div>

          {/* SECTION 1: GENERAL INFORMATION */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 md:p-8 mb-8 print-card">
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-6 flex items-center gap-3 print-section-title pb-2">
                <span className="w-1.5 h-6 bg-[#1a4d2e] rounded-full inline-block no-print"></span>
                A. GENERAL INFORMATION
              </h3>
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left print-table">
                  <thead>
                    <tr className="bg-green-50/50 text-[#1a4d2e] text-xs font-bold uppercase tracking-wider">
                      <th className="py-4 px-6 w-16">SL NO.</th>
                      <th className="py-4 px-6 w-1/3">INFORMATION</th>
                      <th className="py-4 px-6">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    <tr>
                      <td className="py-4 px-6 font-semibold">1</td>
                      <td className="py-4 px-6 font-medium text-gray-950">NAME OF THE SCHOOL</td>
                      <td className="py-4 px-6 font-bold text-[#1a4d2e]">DELHI WORLD PUBLIC SCHOOL</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">2</td>
                      <td className="py-4 px-6 font-medium text-gray-950">AFFILIATION NO. (IF APPLICABLE)</td>
                      <td className="py-4 px-6 font-bold text-[#1a4d2e]">1731263</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">3</td>
                      <td className="py-4 px-6 font-medium text-gray-950">SCHOOL CODE (IF APPLICABLE)</td>
                      <td className="py-4 px-6 font-bold text-[#1a4d2e]">11882</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">4</td>
                      <td className="py-4 px-6 font-medium text-gray-950">COMPLETE ADDRESS WITH PIN CODE</td>
                      <td className="py-4 px-6">6TH MILE STONE, ALWAR BHIWADI HIGHWAY, ALWAR RAJASTHAN-301001</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">5</td>
                      <td className="py-4 px-6 font-medium text-gray-950">PRINCIPAL NAME & EDUCATION</td>
                      <td className="py-4 px-6 font-semibold">Ms. Sunila Choudhary (MA (PSYCHOLOGY), B.ED)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">6</td>
                      <td className="py-4 px-6 font-medium text-gray-950">SCHOOL EMAIL ID</td>
                      <td className="py-4 px-6">
                        <a href="mailto:dwpsalwar@gmail.com" className="text-green-700 font-semibold hover:underline">DWPSALWAR1@GMAIL.COM</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">7</td>
                      <td className="py-4 px-6 font-medium text-gray-950">CONTACT DETAILS (LANDLINE/MOBILE)</td>
                      <td className="py-4 px-6 font-semibold">8875029666</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* SECTION 2: DOCUMENTS AND INFORMATION */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 md:p-8 mb-8 print-card">
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-6 flex items-center gap-3 print-section-title pb-2">
                <span className="w-1.5 h-6 bg-[#1a4d2e] rounded-full inline-block no-print"></span>
                B. DOCUMENTS AND INFORMATION
              </h3>
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left print-table">
                  <thead>
                    <tr className="bg-green-50/50 text-[#1a4d2e] text-xs font-bold uppercase tracking-wider">
                      <th className="py-4 px-6 w-16">SL NO.</th>
                      <th className="py-4 px-6 w-[60%]">DOCUMENTS / INFORMATION</th>
                      <th className="py-4 px-6 text-center">UPLOAD DOCUMENTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    <tr>
                      <td className="py-4 px-6 font-semibold">1</td>
                      <td className="py-4 px-6 font-medium text-gray-950">
                        COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1781263645/CBSE_Affilation.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Document
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/CBSE_Affilation.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">2</td>
                      <td className="py-4 px-6 font-medium text-gray-950">
                        COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/TRUSTDEED.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Document
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/TRUSTDEED.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">3</td>
                      <td className="py-4 px-6 font-medium text-gray-950">
                        COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/STATEAFFILATION.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Document
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/STATEAFFILATION.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">4</td>
                      <td className="py-4 px-6 font-medium text-gray-950">
                        COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT'S RENEWAL IF APPLICABLE
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/STATEAFFILATION.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Document
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/STATEAFFILATION.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">5</td>
                      <td className="py-4 px-6 font-medium text-gray-950">
                        COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/BUILDINGCERTIFICATE_new.pdf-1.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Certificate
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/BUILDINGCERTIFICATE_new.pdf-1.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">6</td>
                      <td className="py-4 px-6 font-medium text-gray-950">
                        COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/FIRENOC-1.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Document
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/FIRENOC-1.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">7</td>
                      <td className="py-4 px-6 font-medium text-gray-950">
                        COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/ UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/SelfCertification2.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Document
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/SelfCertification2.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">8</td>
                      <td className="py-4 px-6 font-medium text-gray-950">
                        COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/SAFEDRINKINGWATERCERTIFICATE1.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Document
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/SAFEDRINKINGWATERCERTIFICATE1.pdf</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* SECTION 3: RESULT AND ACADEMICS */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 md:p-8 mb-8 print-card print-page-break">
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-6 flex items-center gap-3 print-section-title pb-2">
                <span className="w-1.5 h-6 bg-[#1a4d2e] rounded-full inline-block no-print"></span>
                C. RESULT AND ACADEMICS
              </h3>
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left print-table">
                  <thead>
                    <tr className="bg-green-50/50 text-[#1a4d2e] text-xs font-bold uppercase tracking-wider">
                      <th className="py-4 px-6 w-16">SL NO.</th>
                      <th className="py-4 px-6 w-[60%]">DOCUMENTS / INFORMATION</th>
                      <th className="py-4 px-6 text-center">UPLOAD DOCUMENTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    <tr>
                      <td className="py-4 px-6 font-semibold">1</td>
                      <td className="py-4 px-6 font-medium text-gray-950">FEE STRUCTURE OF THE SCHOOL</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/FEE_STRUCTURE.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Fee Details
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/FEE_STRUCTURE.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">2</td>
                      <td className="py-4 px-6 font-medium text-gray-950">ANNUAL ACADEMIC CALENDER</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/ACADEMICCALANDER.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View Calendar
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/RESULT AND ACADEMICS/ACADEMICCALANDER.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">3</td>
                      <td className="py-4 px-6 font-medium text-gray-950">LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/SCHOOLMANAGEMENTCOMMITTEE.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View SMC List
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/RESULT AND ACADEMICS/SCHOOLMANAGEMENTCOMMITTEE.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">4</td>
                      <td className="py-4 px-6 font-medium text-gray-950">LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/PARENTSTEACHERASSOCIATION.pdf")}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#1a4d2e] hover:bg-green-800 font-bold px-3 py-1.5 rounded-full transition no-print cursor-pointer"
                        >
                          View PTA Members
                        </button>
                        <span className="hidden print:inline text-xs underline break-all">/documents/RESULT AND ACADEMICS/PARENTSTEACHERASSOCIATION.pdf</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">5</td>
                      <td className="py-4 px-6 font-medium text-gray-950">LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION</td>
                      <td className="py-4 px-6">
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                          <span className="font-bold text-xs uppercase bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                            NA
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* SECTION 4: STAFF (TEACHING) */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 md:p-8 mb-8 print-card">
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-6 flex items-center gap-3 print-section-title pb-2">
                <span className="w-1.5 h-6 bg-[#1a4d2e] rounded-full inline-block no-print"></span>
                D. STAFF (TEACHING)
              </h3>
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left print-table">
                  <thead>
                    <tr className="bg-green-50/50 text-[#1a4d2e] text-xs font-bold uppercase tracking-wider">
                      <th className="py-4 px-6 w-16">S.NO.</th>
                      <th className="py-4 px-6 w-[45%]">INFORMATION</th>
                      <th className="py-4 px-6">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    <tr>
                      <td className="py-4 px-6 font-semibold">1</td>
                      <td className="py-4 px-6 font-medium text-gray-950">PRINCIPAL</td>
                      <td className="py-4 px-6 font-bold text-gray-900">Ms. Sunila Choudhary</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">2</td>
                      <td className="py-4 px-6 font-medium text-gray-950">TOTAL NO. OF TEACHERS</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap items-center gap-3 font-semibold text-xs text-gray-900">
                          <span className="bg-green-50 text-[#1a4d2e] px-3 py-1 rounded-full border border-green-100">
                            Total: 35
                          </span>
                          <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                            PGT: NA
                          </span>
                          <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                            TGT: 9
                          </span>
                          <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                            PRT: 12
                          </span>
                          <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                            MT: 4
                          </span>
                          <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                            PET/Others: 4
                          </span>
                          <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                            Admin/Non-Teaching: 5
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">3</td>
                      <td className="py-4 px-6 font-medium text-gray-950">TEACHERS SECTION RATIO</td>
                      <td className="py-4 px-6 font-bold text-[#1a4d2e]">1:13</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">4</td>
                      <td className="py-4 px-6 font-medium text-gray-950">DETAILS OF SPECIAL EDUCATOR</td>
                      <td className="py-4 px-6 font-semibold">Ms. Bela Ahuja</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">5</td>
                      <td className="py-4 px-6 font-medium text-gray-950">DETAILS OF COUNSELLOR AND WELLNESS TEACHER</td>
                      <td className="py-4 px-6 font-semibold">Ms. Rani Dev</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* SECTION 5: SCHOOL INFRASTRUCTURE */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 md:p-8 mb-8 print-card print-page-break">
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-6 flex items-center gap-3 print-section-title pb-2">
                <span className="w-1.5 h-6 bg-[#1a4d2e] rounded-full inline-block no-print"></span>
                E. SCHOOL INFRASTRUCTURE
              </h3>
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left print-table">
                  <thead>
                    <tr className="bg-green-50/50 text-[#1a4d2e] text-xs font-bold uppercase tracking-wider">
                      <th className="py-4 px-6 w-16">SL NO.</th>
                      <th className="py-4 px-6 w-[45%]">INFORMATION</th>
                      <th className="py-4 px-6">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    <tr>
                      <td className="py-4 px-6 font-semibold">1</td>
                      <td className="py-4 px-6 font-medium text-gray-950">TOTAL CAMPUS AREA OF THE SCHOOL</td>
                      <td className="py-4 px-6 font-bold text-[#1a4d2e]">14568 (IN SQUARE MTR)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">2</td>
                      <td className="py-4 px-6 font-medium text-gray-950">NO. AND SIZE OF THE CLASS ROOMS</td>
                      <td className="py-4 px-6">
                        <div className="space-y-1.5 text-xs font-medium text-gray-600">
                          <p><strong className="text-gray-900 font-bold">2 Class Rooms:</strong> 785 Sq Ft (73 Sq Mtr)</p>
                          <p><strong className="text-gray-900 font-bold">5 Class Rooms:</strong> 624 Sq Ft (58 Sq Mtr)</p>
                          <p><strong className="text-gray-900 font-bold">8 Class Rooms:</strong> 549 Sq Ft (51 Sq Mtr)</p>
                          <p><strong className="text-gray-900 font-bold">3 Class Rooms:</strong> 328 Sq Ft (30 Sq Mtr)</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">3</td>
                      <td className="py-4 px-6 font-medium text-gray-950">NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS</td>
                      <td className="py-4 px-6">
                        <div className="space-y-1.5 text-xs font-medium text-gray-600">
                          <p><strong className="text-gray-900 font-bold">1. Science Composite Lab:</strong> 632 Sq Ft (59 Sq Mtr)</p>
                          <p><strong className="text-gray-900 font-bold">2. Computer Lab:</strong> 889 Sq Ft (83 Sq Mtr)</p>
                          <p><strong className="text-gray-900 font-bold">3. Maths Lab:</strong> 557 Sq Ft (52 Sq Mtr)</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">4</td>
                      <td className="py-4 px-6 font-medium text-gray-950">INTERNET FACILITY (Y/N)</td>
                      <td className="py-4 px-6 font-bold text-green-700">YES</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">5</td>
                      <td className="py-4 px-6 font-medium text-gray-950">NO. OF GIRLS TOILETS</td>
                      <td className="py-4 px-6 font-semibold">12 WC & 2 Physically Handicapped Washrooms</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">6</td>
                      <td className="py-4 px-6 font-medium text-gray-950">NO. OF BOYS TOILETS</td>
                      <td className="py-4 px-6 font-semibold">12 Urinals, 4 WC & 2 Physically Handicapped Washrooms</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">7</td>
                      <td className="py-4 px-6 font-medium text-gray-950">YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE</td>
                      <td className="py-4 px-6">
                        <span className="text-xs text-gray-400 italic font-semibold">Under Process / Uploading Soon</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* SECTION 6: TEACHER DETAILS DIRECTORY */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 md:p-8 print-card print-page-break">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 no-print">
                <h3 className="text-xl font-bold text-[#1a4d2e] flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#1a4d2e] rounded-full inline-block"></span>
                  F. TEACHER DETAILS DIRECTORY
                </h3>
                <button
                  onClick={handleExportExcel}
                  className="bg-[#1a4d2e] hover:bg-green-800 text-white font-bold text-xs tracking-wider px-5 py-2.5 rounded-full shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  CLICK HERE TO DOWNLOAD EXCEL
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#1a4d2e] mb-4 hidden print:block print-section-title">
                F. TEACHER DETAILS DIRECTORY
              </h3>

              {/* Search Bar */}
              <div className="mb-6 relative no-print">
                <input
                  type="text"
                  placeholder="Search teachers by name or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-[#1a4d2e] font-medium text-sm px-5 py-3.5 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] transition"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Table */}
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left print-table">
                  <thead>
                    <tr className="bg-green-50/50 text-[#1a4d2e] text-xs font-bold uppercase tracking-wider">
                      <th className="py-4 px-6 w-16">S No</th>
                      <th className="py-4 px-6 w-1/2">Name</th>
                      <th className="py-4 px-6">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher) => (
                        <tr key={teacher.sNo} className="hover:bg-gray-50/50 transition">
                          <td className="py-3 px-6 font-semibold">{teacher.sNo}</td>
                          <td className="py-3 px-6 font-bold text-gray-900">{teacher.name}</td>
                          <td className="py-3 px-6 font-medium text-[#1a4d2e]">{teacher.designation}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-gray-400 italic">
                          No teachers match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mandatory Public Disclosure Link/Document Card */}
              <div className="mt-8 p-6 bg-green-50/30 border border-green-150 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-green-50 text-[#1a4d2e] rounded-xl flex items-center justify-center border border-green-150 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-950">Mandatory Public Disclosure</h4>
                    <p className="text-xs text-gray-500 font-semibold mt-0.5">Click the button to view the official mandatory public disclosure letter</p>
                  </div>
                </div>
                <button
                  onClick={() => openPdfViewer("https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPSLETTER-1.pdf")}
                  className="w-full sm:w-auto text-center bg-[#1a4d2e] hover:bg-green-800 text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full shadow-sm transition cursor-pointer"
                >
                  VIEW PDF DOCUMENT
                </button>
              </div>
              <div className="hidden print:block mt-6 border-t border-gray-200 pt-4">
                <p className="text-xs font-bold text-[#1a4d2e]">Mandatory Public Disclosure Document Link:</p>
                <p className="text-xs text-gray-500 underline break-all mt-1">/documents/DWPSLETTER-1.pdf</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Full-Screen PDF Viewer Modal */}
        {/* Full-Screen PDF Viewer Modal */}
        {activePdfIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col no-print">
            {/* Top Bar */}
            <div className="bg-[#1a4d2e] px-4 py-3 flex items-center justify-between border-b border-white/10 shadow-lg shrink-0">
              {/* Back / Close Button */}
              <button
                onClick={() => setActivePdfIndex(null)}
                className="flex items-center gap-2 text-white hover:text-green-150 font-bold text-xs bg-red-600 hover:bg-red-700 active:scale-95 px-4 py-2 rounded-full transition-all duration-300 shadow-md cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                ← BACK TO PAGE
              </button>

              {/* Document Title (Centered on Desktop) */}
              <h3 className="hidden md:block text-sm font-bold text-white tracking-wide uppercase truncate max-w-xl">
                {pdfDocs[activePdfIndex].title}
              </h3>

              {/* Top Right Close Button */}
              <button
                onClick={() => setActivePdfIndex(null)}
                className="flex items-center gap-1.5 text-white/90 hover:text-white font-bold text-xs bg-white/10 hover:bg-white/20 active:scale-95 px-4 py-2 rounded-full transition cursor-pointer"
                title="Close Viewer"
              >
                <span>CLOSE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Viewer Area with Non-Overlapping Sidebar Navigation */}
            <div className="flex-1 flex items-stretch justify-between relative overflow-hidden px-2 md:px-6 py-4">
              {/* Desktop Left Sidebar: Previous Button */}
              <div className="hidden md:flex w-20 flex-col items-center justify-center shrink-0 z-10">
                <button
                  onClick={handlePrevPdf}
                  className="w-14 h-14 bg-[#1a4d2e]/95 hover:bg-green-800 active:scale-95 text-white rounded-full flex items-center justify-center border border-white/20 shadow-xl transition-all cursor-pointer hover:shadow-green-950/50"
                  title="Previous Document"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              {/* PDF Container (iframe) - Spans full width of remaining area, isolated from side bars */}
              <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                <iframe
                  key={activePdfIndex} // Force reload of iframe on index change
                  src={pdfDocs[activePdfIndex].url}
                  className="w-full h-full border-none"
                  title={pdfDocs[activePdfIndex].title}
                />
              </div>

              {/* Desktop Right Sidebar: Next Button */}
              <div className="hidden md:flex w-20 flex-col items-center justify-center shrink-0 z-10">
                <button
                  onClick={handleNextPdf}
                  className="w-14 h-14 bg-[#1a4d2e]/95 hover:bg-green-800 active:scale-95 text-white rounded-full flex items-center justify-center border border-white/20 shadow-xl transition-all cursor-pointer hover:shadow-green-950/50"
                  title="Next Document"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom Navigation and Info Bar (Highly Tappable & Fully Clickable) */}
            <div className="bg-[#1a4d2e] px-4 py-3 flex items-center justify-between border-t border-white/10 shadow-inner shrink-0 no-print">
              {/* Prev Button */}
              <button
                onClick={handlePrevPdf}
                className="flex items-center gap-1.5 text-white/95 hover:text-white font-bold text-xs bg-white/10 hover:bg-white/20 active:scale-95 px-4 py-2.5 rounded-full transition cursor-pointer md:px-5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span>PREV</span>
              </button>

              {/* Progress & Title Info */}
              <div className="text-center">
                <span className="text-white/80 font-bold text-xs bg-white/10 px-3 py-1.5 rounded-full tracking-wider">
                  {activePdfIndex + 1} / {pdfDocs.length}
                </span>
                <div className="text-[10px] sm:text-xs text-gray-300 font-semibold mt-1 uppercase max-w-[150px] sm:max-w-xs md:max-w-md truncate">
                  {pdfDocs[activePdfIndex].title}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPdf}
                className="flex items-center gap-1.5 text-white/95 hover:text-white font-bold text-xs bg-white/10 hover:bg-white/20 active:scale-95 px-4 py-2.5 rounded-full transition cursor-pointer md:px-5"
              >
                <span>NEXT</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default MandatoryDisclosure;
