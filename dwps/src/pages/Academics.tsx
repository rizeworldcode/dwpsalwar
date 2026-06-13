import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import Lightbox from '../components/Lightbox';

const Academics = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const curriculumItems = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#1a4d2e] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Courses Offered',
      desc: 'Holistic education with a blend of academics, arts, and life skills designed to bring out the best in every child.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#1a4d2e] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Primary Curriculum',
      desc: 'Strong foundation in core subjects: English, Mathematics, Science, Social Studies, and Hindi.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#1a4d2e] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      title: 'Co-curricular Activities',
      desc: 'Music, art, sports, and technology programs to foster creativity and teamwork.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#1a4d2e] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Life Skills Development',
      desc: 'Interactive sessions on leadership, communication, and problem-solving to prepare students for tomorrow.'
    }
  ];

  const galleryImages = [
    { title: 'School Music Assembly & Performance', desc: 'Students gathered in the main auditorium enjoying a musical performance and active presentations by their peers.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6853.jpg.jpg', className: 'col-span-1 md:col-span-2 lg:col-span-2' },
    { title: 'Welcoming Learning Environment', desc: 'A cheerful primary school student wearing a green-checkered uniform and schoolbag, smiling and waving in the school corridor.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08125.JPG.jpg', className: 'col-span-1' },
    { title: 'Student Keyboard Performance', desc: 'Nurturing musical talent: A dedicated student performing on the keyboard during a school music workshop, showcasing his artistic skills.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08838.JPG.jpg', className: 'col-span-1' },
    { title: 'Guided Vocal Choir Rehearsal', desc: 'Choral group practice: A vocal coach guiding our talented students during a vocal choir rehearsal in front of the Ustad Bismillah Khan tribute banner.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08843.JPG.jpg', className: 'col-span-1' },
    { title: 'Active Learning & Core Academics', desc: 'A primary school student smiling and pointing to her head with a thinking pose while holding an English grammar book, reflecting enthusiastic learning.', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08114.JPG.jpg', className: 'col-span-1 md:col-span-2 lg:col-span-1' }
  ];

  return (
    <AnimatedPage>
      <div className="bg-white min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-[400px] overflow-hidden bg-black flex items-center justify-center">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04209.JPG.jpg" 
            alt="Academic Excellence Banner"
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
                Academic Excellence
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl max-w-2xl mx-auto text-green-100"
              >
                Explore our robust curriculum and diverse learning opportunities for students starting from Nursery.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Curriculum Details Sections */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {curriculumItems.map((item, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.15}>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-8 rounded-2xl shadow-xs border border-gray-100 flex flex-col items-center text-center group cursor-pointer h-full"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1a4d2e] transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a4d2e] mb-4 group-hover:text-green-800 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery (5 Images) */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <h2 className="text-3xl font-bold text-[#1a4d2e] mb-10 text-center">Campus Life & Learning</h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.12} className={image.className}>
                  <motion.div 
                    whileHover={{ scale: 1.025, rotateZ: index % 2 === 0 ? 0.5 : -0.5 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    onClick={() => setActiveIndex(index)}
                    className="h-[300px] bg-white flex items-center justify-center p-2 rounded-xl shadow-xs border border-gray-100 overflow-hidden cursor-zoom-in group relative"
                  >
                    <img 
                      src={image.img} 
                      alt={image.title} 
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg transition duration-500 group-hover:scale-102" 
                    />
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#1a4d2e]/85 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reusable Lightbox for Academics Gallery */}
        <Lightbox
          isOpen={activeIndex !== null}
          images={galleryImages}
          currentIndex={activeIndex ?? 0}
          onClose={() => setActiveIndex(null)}
          onIndexChange={(index) => setActiveIndex(index)}
        />
      </div>
    </AnimatedPage>
  );
};

export default Academics;
