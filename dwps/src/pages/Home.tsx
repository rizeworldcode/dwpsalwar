import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import Lightbox from '../components/Lightbox';
import { submitContactFormToWhatsApp } from '../utils/whatsapp';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [academicActiveIndex, setAcademicActiveIndex] = useState<number | null>(null);
  
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactErrors, setContactErrors] = useState<Partial<typeof contactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: any = {};
    if (!contactForm.name.trim()) errors.name = 'Name is required';
    if (!contactForm.email.trim()) errors.email = 'Email is required';
    else if (!/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactForm.email)) errors.email = 'Invalid email address';
    if (!contactForm.phone.trim()) errors.phone = 'Phone is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(contactForm.phone)) errors.phone = 'Invalid phone number';
    if (!contactForm.message.trim()) errors.message = 'Message is required';
    
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    
    setContactErrors({});
    setIsSubmitting(true);
    
    setTimeout(() => {
      submitContactFormToWhatsApp({
        ...contactForm,
        source: 'Homepage Contact Form'
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 800);
  };

  const focusAnimation = {
    scale: 1.015,
    borderColor: '#1a4d2e',
    boxShadow: '0 0 14px rgba(26, 77, 46, 0.18)'
  };

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <section id="home" className="relative w-full overflow-hidden bg-black min-h-[480px]">
        <video
          src="https://res.cloudinary.com/djl7acbck/video/upload/v1780461426/WhatsApp_Video_2026-06-03_at_10.04.59_AM_1_wtbsq1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">Welcome to Delhi World Public School Alwar</h1>
              <p className="text-base md:text-xl mb-4 md:mb-6">Excellence in Education, Building Tomorrow's Leaders</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 text-sm">
                <p>We provide students with a high-quality education that allows them to develop their personal skills and interests.</p>
                <p>We pay special attention to the development of team spirit and social activities to form future leaders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Features Section */}
      <section id="about" className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* About Card */}
            <ScrollReveal direction="left" className="md:col-span-2">
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(26, 77, 46, 0.12)' }}
                transition={{ duration: 0.3 }}
                className="bg-[#1a4d2e] text-white p-8 rounded-lg h-full cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <p className="text-green-300 text-sm mb-2 font-bold tracking-wider uppercase">About Us</p>
                    <h2 className="text-2xl font-bold mb-4">Delhi World Public School Alwar - Shaping Bright Futures</h2>
                    <p className="text-green-100 leading-relaxed">We inspire, we educate, and we shape the future! Our commitment to excellence in education has made us a leading institution in Alwar, Rajasthan.</p>
                  </div>
                  <div className="w-full md:w-48 h-48 bg-white flex items-center justify-center p-2 rounded-lg shrink-0 overflow-hidden shadow-inner">
                    <img 
                      src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04204.JPG.jpg" 
                      alt="Students"
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg transition duration-500 hover:scale-104"
                    />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Library Card */}
            <ScrollReveal direction="right" delay={0.1}>
              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1a4d2e] text-white p-8 rounded-lg relative overflow-hidden group h-full cursor-pointer shadow-md"
              >
                <img 
                  src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04209.JPG.jpg" 
                  alt="Library"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-45 transition duration-500 group-hover:scale-104"
                />
                <div className="relative z-10">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold leading-snug">A place to work quietly on your own and your projects.</h3>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Sports Card */}
            <ScrollReveal direction="right" delay={0.2} className="md:row-span-2">
              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1a4d2e] text-white p-8 rounded-lg relative overflow-hidden group h-full cursor-pointer shadow-md"
              >
                <img 
                  src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05724.JPG.jpg" 
                  alt="Sports"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-45 transition duration-500 group-hover:scale-104"
                />
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold leading-snug">A source of health, strength and athletic achievement.</h3>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Classrooms Card */}
            <ScrollReveal direction="left" delay={0.3} className="md:col-span-2">
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                transition={{ duration: 0.3 }}
                className="bg-[#f0f0f0] p-8 rounded-lg h-full cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-64 h-48 bg-white flex items-center justify-center p-2 rounded-lg shrink-0 overflow-hidden shadow-inner border border-gray-200/40">
                    <img 
                      src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04594.JPG.jpg" 
                      alt="Classroom"
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg transition duration-500 hover:scale-104"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1a4d2e] text-sm mb-2 font-bold tracking-wider uppercase">Classrooms</p>
                    <h2 className="text-2xl font-bold text-[#1a4d2e] mb-4">Modern equipment</h2>
                    <p className="text-gray-600 leading-relaxed">The classrooms of our school have been equipped with the latest technology, creating an ideal learning environment for students and teachers. This provides them with the necessary tools to engage in active learning and interaction.</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Science & Innovation Lab Card */}
            <ScrollReveal direction="right" delay={0.35}>
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                transition={{ duration: 0.3 }}
                className="bg-[#f0f0f0] p-8 rounded-lg h-full cursor-pointer flex flex-col gap-6"
              >
                <div className="w-full h-48 bg-white flex items-center justify-center p-2 rounded-lg overflow-hidden shadow-inner border border-gray-200/40">
                  <img 
                    src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08104.JPG.jpg" 
                    alt="Science Lab"
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg transition duration-500 hover:scale-104"
                  />
                </div>
                <div>
                  <p className="text-[#1a4d2e] text-sm mb-2 font-bold tracking-wider uppercase">Science Lab</p>
                  <h2 className="text-xl font-bold text-[#1a4d2e] mb-2">Innovation & Discovery</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">Advanced laboratories equipped for experiments, research, and fostering scientific curiosity among students.</p>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="mb-12">
              <h2 className="text-[#1a4d2e] text-3xl md:text-4xl font-bold mb-4">Gallery</h2>
              <p className="text-gray-600 max-w-2xl">Explore moments from our school life - events, activities, and achievements that make Delhi World Public School Alwar special.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Annual Sports Day', desc: 'Students participating in various sports events', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05756.JPG.jpg' },
              { title: 'Science Exhibition', desc: 'Innovative projects by our talented students', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC07188.JPG.jpg' },
              { title: 'Cultural Program', desc: 'Celebrating diversity through arts and performance', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1781263428/WhatsApp_Image_2026-06-12_at_4.34.45_PM.jpg' },
              { title: 'Educational Trip', desc: 'Learning beyond classroom walls', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04812.JPG.jpg' },
              { title: 'Award Ceremony', desc: 'Recognizing excellence and achievement', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05231.JPG.jpg' },
              { title: 'Community Service', desc: 'Making a difference in society', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6959.jpg.jpg' }
            ].map((item, index) => (
              <ScrollReveal key={index} direction="up" delay={(index % 3) * 0.12}>
                <motion.div 
                  whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  onClick={() => setActiveIndex(index)}
                  className="bg-[#1a4d2e] text-white rounded-lg overflow-hidden group cursor-zoom-in flex flex-col h-full border border-white/5 shadow-md"
                >
                  <div className="relative h-48 overflow-hidden bg-white flex items-center justify-center p-3 border-b border-gray-100">
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="max-w-full max-h-full w-auto h-auto object-contain transition duration-500 group-hover:scale-104"
                    />
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#1a4d2e]/85 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6 grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-green-200 transition-colors duration-300">{item.title}</h3>
                    <p className="text-green-100 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Lightbox / Modal */}
        <Lightbox
          isOpen={activeIndex !== null}
          images={[
            { title: 'Annual Sports Day', desc: 'Students participating in various sports events', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05756.JPG.jpg' },
            { title: 'Science Exhibition', desc: 'Innovative projects by our talented students', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC07188.JPG.jpg' },
            { title: 'Cultural Program', desc: 'Celebrating diversity through arts and performance', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1781263428/WhatsApp_Image_2026-06-12_at_4.34.45_PM.jpg' },
            { title: 'Educational Trip', desc: 'Learning beyond classroom walls', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04812.JPG.jpg' },
            { title: 'Award Ceremony', desc: 'Recognizing excellence and achievement', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05231.JPG.jpg' },
            { title: 'Community Service', desc: 'Making a difference in society', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6959.jpg.jpg' }
          ]}
          currentIndex={activeIndex ?? 0}
          onClose={() => setActiveIndex(null)}
          onIndexChange={(index) => setActiveIndex(index)}
        />
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="mb-12">
              <h2 className="text-[#1a4d2e] text-3xl md:text-4xl font-bold mb-4">Our Academic Excellence</h2>
              <p className="text-gray-600 max-w-2xl">Discover a learning environment that nurtures intellectual curiosity, creativity, and leadership skills for the future.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Innovative Teaching', desc: 'Fusing technology with traditional methods to provide interactive and engaging learning experiences.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04603.JPG.jpg' },
              { title: 'Holistic Development', desc: 'Focusing on academic excellence alongside physical, emotional, and social well-being of every student.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05216.JPG.jpg' },
              { title: 'Global Curriculum', desc: 'A forward-thinking educational framework that prepares students for global challenges and opportunities.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05227.JPG.jpg' }
            ].map((item, index) => (
              <ScrollReveal key={index} direction="up" delay={(index % 3) * 0.12}>
                <motion.div 
                  whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  onClick={() => setAcademicActiveIndex(index)}
                  className="bg-[#1a4d2e] text-white rounded-lg overflow-hidden flex flex-col h-full group cursor-zoom-in border border-white/5 shadow-md"
                >
                  <div className="relative h-48 overflow-hidden bg-white flex items-center justify-center p-3 border-b border-gray-100">
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="max-w-full max-h-full w-auto h-auto object-contain transition duration-500 group-hover:scale-104"
                    />
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#1a4d2e]/85 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6 grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-green-200 transition-colors duration-300">{item.title}</h3>
                    <p className="text-green-100 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Lightbox / Modal for Academics */}
        <Lightbox
          isOpen={academicActiveIndex !== null}
          images={[
            { title: 'Innovative Teaching', desc: 'Fusing technology with traditional methods to provide interactive and engaging learning experiences.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04603.JPG.jpg' },
            { title: 'Holistic Development', desc: 'Focusing on academic excellence alongside physical, emotional, and social well-being of every student.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05216.JPG.jpg' },
            { title: 'Global Curriculum', desc: 'A forward-thinking educational framework that prepares students for global challenges and opportunities.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05227.JPG.jpg' }
          ]}
          currentIndex={academicActiveIndex ?? 0}
          onClose={() => setAcademicActiveIndex(null)}
          onIndexChange={(index) => setAcademicActiveIndex(index)}
        />
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="py-16 px-4 md:px-6 bg-[#1a4d2e] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Admissions Open</h2>
                <p className="text-green-100 mb-8">Join Delhi World Public School Alwar and be part of a community dedicated to excellence in education. We are now accepting applications for the upcoming academic year.</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Fill Application Form</h4>
                      <p className="text-green-100 text-sm">Complete the online or offline admission form</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Submit Documents</h4>
                      <p className="text-green-100 text-sm">Provide required documents and photographs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Interaction & Confirmation</h4>
                      <p className="text-green-100 text-sm">Attend interaction session and complete admission process</p>
                    </div>
                  </div>
                </div>

                <motion.a 
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="/admissions" 
                  className="bg-white text-[#1a4d2e] px-8 py-3 rounded-lg font-bold hover:bg-green-100 transition inline-block text-center shadow-md cursor-pointer"
                >
                  Apply Now
                </motion.a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <motion.div 
                whileHover={{ scale: 1.015 }}
                className="bg-white/10 p-8 rounded-lg cursor-pointer border border-white/10 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6">Admission Requirements</h3>
                <ul className="space-y-4 text-green-100">
                  {[
                    'Birth Certificate',
                    'Previous School Records (if applicable)',
                    'Passport Size Photographs',
                    'Parent/Guardian ID Proof',
                    'Address Proof'
                  ].map((req, idx) => (
                    <motion.li 
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <svg className="w-5 h-5 text-green-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {req}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="mb-12">
              <h2 className="text-[#1a4d2e] text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600 max-w-2xl">Get in touch with us for any inquiries about admissions, programs, or visits.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="bg-[#1a4d2e] text-white p-8 rounded-lg h-full">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-green-300 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold mb-1">Address</h4>
                      <p className="text-green-100">6th Milestone, Alwar Bhiwadi Highway,<br/>Alwar, Rajasthan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-green-300 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h4 className="font-bold mb-1">Phone</h4>
                      <p className="text-green-100">+91 9309288288, +91 8875029666</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-green-300 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-green-100">dwpsalwar@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-green-300 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold mb-1">Office Hours</h4>
                      <p className="text-green-100">Monday - Saturday: 8:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="bg-green-100 text-green-800 p-3 rounded-lg text-sm mb-4 border border-green-200"
                  >
                    Thanks! You will be redirected to WhatsApp to send your message.
                  </motion.div>
                )}
                <div>
                  <motion.input 
                    whileFocus={focusAnimation}
                    type="text" 
                    placeholder="Your Name" 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${contactErrors.name ? 'border-red-500' : 'border-gray-300'} text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200`}
                  />
                  {contactErrors.name && <p className="text-red-500 text-xs mt-1">{contactErrors.name}</p>}
                </div>
                <div>
                  <motion.input 
                    whileFocus={focusAnimation}
                    type="email" 
                    placeholder="Your Email" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${contactErrors.email ? 'border-red-500' : 'border-gray-300'} text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200`}
                  />
                  {contactErrors.email && <p className="text-red-500 text-xs mt-1">{contactErrors.email}</p>}
                </div>
                <div>
                  <motion.input 
                    whileFocus={focusAnimation}
                    type="tel" 
                    placeholder="Your Phone Number" 
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${contactErrors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200`}
                  />
                  {contactErrors.phone && <p className="text-red-500 text-xs mt-1">{contactErrors.phone}</p>}
                </div>
                <div>
                  <motion.textarea 
                    whileFocus={focusAnimation}
                    placeholder="Your Message" 
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${contactErrors.message ? 'border-red-500' : 'border-gray-300'} text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 resize-none`}
                  ></motion.textarea>
                  {contactErrors.message && <p className="text-red-500 text-xs mt-1">{contactErrors.message}</p>}
                </div>
                <motion.button 
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#1a4d2e] text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800 transition duration-300 w-full cursor-pointer shadow-md flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </motion.button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Home;
