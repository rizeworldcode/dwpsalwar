import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import { submitAdmissionFormToWhatsApp } from '../utils/whatsapp';

const Admissions = () => {
  const steps = [
    {
      num: 1,
      title: 'Registration',
      desc: 'Register online or visit our school office to collect the admission form. Fill in all details accurately.'
    },
    {
      num: 2,
      title: 'Document Submission',
      desc: 'Submit the completed application form along with all required documents and registration fee.'
    },
    {
      num: 3,
      title: 'Interaction/Assessment',
      desc: 'Candidates will be invited for an interaction session (and written assessment for higher grades).'
    },
    {
      num: 4,
      title: 'Admission Offer',
      desc: 'Selected candidates will receive an admission offer. Complete fee payment to secure the seat.'
    }
  ];

  const [admissionForm, setAdmissionForm] = useState({ parentName: '', childName: '', grade: '', email: '', phone: '', message: '' });
  const [admissionErrors, setAdmissionErrors] = useState<Partial<typeof admissionForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: any = {};
    if (!admissionForm.parentName.trim()) errors.parentName = 'Required';
    if (!admissionForm.childName.trim()) errors.childName = 'Required';
    if (!admissionForm.grade) errors.grade = 'Required';
    if (!admissionForm.email.trim()) errors.email = 'Required';
    else if (!/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/.test(admissionForm.email)) errors.email = 'Invalid email';
    if (!admissionForm.phone.trim()) errors.phone = 'Required';
    else if (!/^\+?[\d\s-]{10,}$/.test(admissionForm.phone)) errors.phone = 'Invalid phone';
    
    if (Object.keys(errors).length > 0) {
      setAdmissionErrors(errors);
      return;
    }
    
    setAdmissionErrors({});
    setIsSubmitting(true);
    
    setTimeout(() => {
      submitAdmissionFormToWhatsApp(admissionForm);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setAdmissionForm({ parentName: '', childName: '', grade: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 800);
  };

  const focusAnimation = {
    scale: 1.01,
    borderColor: '#1a4d2e',
    boxShadow: '0 0 14px rgba(26, 77, 46, 0.18)'
  };

  return (
    <AnimatedPage>
      <div className="bg-white min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-[400px] overflow-hidden bg-black flex items-center justify-center">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04594.JPG.jpg" 
            alt="Admissions Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <motion.h1 
                initial={{ opacity: 0, y: -20, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl font-bold mb-4"
              >
                Admissions
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl max-w-2xl mx-auto"
              >
                Join our community of learners and leaders. Your journey to excellence begins here.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Admissions Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left Column: Process & Eligibility */}
              <div>
                <div className="mb-12">
                  <ScrollReveal direction="left">
                    <h2 className="text-3xl font-bold text-[#1a4d2e] mb-6">Admission Process</h2>
                    <p className="text-gray-600 mb-8">We follow a transparent and straightforward admission process to ensure equal opportunities for all deserving candidates.</p>
                  </ScrollReveal>
                  
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <ScrollReveal key={index} direction="left" delay={index * 0.12}>
                        <motion.div 
                          whileHover={{ x: 6, scale: 1.01, boxShadow: '0 8px 20px rgba(0,0,0,0.03)' }}
                          transition={{ duration: 0.2 }}
                          className="flex bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-xs cursor-pointer"
                        >
                          <div className="w-12 h-12 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                            {step.num}
                          </div>
                          <div className="ml-6">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
                            <p className="text-gray-600">{step.desc}</p>
                          </div>
                        </motion.div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>

                <ScrollReveal direction="up" delay={0.2}>
                  <div>
                    <h2 className="text-3xl font-bold text-[#1a4d2e] mb-6">Eligibility Criteria</h2>
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-green-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <span className="text-gray-700"><strong>Nursery:</strong> Minimum 3 years of age as of March 31st of the academic year.</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-green-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <span className="text-gray-700"><strong>KG to Grade 1:</strong> Corresponding age criteria applied based on Nursery baseline.</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-green-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <span className="text-gray-700"><strong>Grade 2 and above:</strong> Admission subject to availability of seats and performance in the admission assessment.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Required Documents & Inquiry Form */}
              <div className="space-y-8">
                <ScrollReveal direction="right" delay={0.1}>
                  <motion.div 
                    whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(26, 77, 46, 0.15)' }}
                    className="bg-[#1a4d2e] text-white p-8 rounded-2xl shadow-lg cursor-pointer"
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      Required Documents
                    </h2>
                    <ul className="space-y-4 text-green-100">
                      {[
                        'Birth Certificate (Original & Photocopy)',
                        'Previous School Records / Transfer Certificate (if applicable)',
                        '4 Passport Size Photographs of the student',
                        '2 Passport Size Photographs of parents',
                        'Parent/Guardian ID Proof (Aadhar Card/Passport)',
                        'Address Proof'
                      ].map((doc, idx) => (
                        <motion.li 
                          key={idx} 
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          {doc}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.3}>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <h2 className="text-2xl font-bold text-[#1a4d2e] mb-2">Admission Inquiry</h2>
                    <p className="text-gray-600 mb-6 text-sm">Fill out this form and our admissions team will get back to you shortly.</p>
                    <form onSubmit={handleAdmissionSubmit} className="space-y-4">
                      {submitSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="bg-green-100 text-green-800 p-3 rounded-lg text-sm mb-4 border border-green-200"
                        >
                          Thank you! You will be redirected to WhatsApp to submit your application.
                        </motion.div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Name *</label>
                          <motion.input 
                            whileFocus={focusAnimation}
                            type="text" 
                            value={admissionForm.parentName}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, parentName: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${admissionErrors.parentName ? 'border-red-500' : 'border-gray-300'} focus:outline-none transition-all duration-200`} 
                          />
                          {admissionErrors.parentName && <p className="text-red-500 text-xs mt-1">{admissionErrors.parentName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Child's Name *</label>
                          <motion.input 
                            whileFocus={focusAnimation}
                            type="text" 
                            value={admissionForm.childName}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, childName: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${admissionErrors.childName ? 'border-red-500' : 'border-gray-300'} focus:outline-none transition-all duration-200`} 
                          />
                          {admissionErrors.childName && <p className="text-red-500 text-xs mt-1">{admissionErrors.childName}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Grade Applying For *</label>
                        <motion.select 
                          whileFocus={focusAnimation}
                          value={admissionForm.grade}
                          onChange={(e) => setAdmissionForm({ ...admissionForm, grade: e.target.value })}
                          className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${admissionErrors.grade ? 'border-red-500' : 'border-gray-300'} focus:outline-none transition-all duration-200`} 
                        >
                          <option value="">Select Grade</option>
                          <option value="nursery">Nursery</option>
                          <option value="kg">Kindergarten</option>
                          <option value="1">Grade 1</option>
                          <option value="2">Grade 2</option>
                          <option value="3">Grade 3</option>
                          <option value="4">Grade 4</option>
                          <option value="5">Grade 5</option>
                          <option value="6">Grade 6</option>
                          <option value="7">Grade 7</option>
                          <option value="8">Grade 8</option>
                          <option value="9">Grade 9</option>
                          <option value="10">Grade 10</option>
                        </motion.select>
                        {admissionErrors.grade && <p className="text-red-500 text-xs mt-1">{admissionErrors.grade}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <motion.input 
                          whileFocus={focusAnimation}
                          type="email" 
                          value={admissionForm.email}
                          onChange={(e) => setAdmissionForm({ ...admissionForm, email: e.target.value })}
                          className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${admissionErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none transition-all duration-200`} 
                        />
                        {admissionErrors.email && <p className="text-red-500 text-xs mt-1">{admissionErrors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <motion.input 
                          whileFocus={focusAnimation}
                          type="tel" 
                          value={admissionForm.phone}
                          onChange={(e) => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                          className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${admissionErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none transition-all duration-200`} 
                        />
                        {admissionErrors.phone && <p className="text-red-500 text-xs mt-1">{admissionErrors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
                        <motion.textarea 
                          whileFocus={focusAnimation}
                          rows={3} 
                          value={admissionForm.message}
                          onChange={(e) => setAdmissionForm({ ...admissionForm, message: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none transition-all duration-200 resize-none"
                        ></motion.textarea>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.025, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full bg-[#1a4d2e] text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800 transition duration-300 cursor-pointer shadow-md flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : 'Submit Inquiry'}
                      </motion.button>
                    </form>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default Admissions;
