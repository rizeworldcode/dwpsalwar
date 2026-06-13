import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import Lightbox from '../components/Lightbox';

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const galleryItems = [
    { title: 'Annual Sports Day', desc: 'Students participating in various sports events', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC06011.JPG.jpg' },
    { title: 'Science Exhibition', desc: 'Innovative projects by our talented students', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04181.JPG.jpg' },
    { title: 'Cultural Program', desc: 'Celebrating diversity through arts and performance', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1781263182/WhatsApp_Image_2026-06-12_at_4.35.24_PM.jpg' },
    { title: 'Educational Trip', desc: 'Learning beyond classroom walls', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04825.JPG.jpg' },
    { title: 'Award Ceremony', desc: 'Recognizing excellence and achievement', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05237.JPG.jpg' },
    { title: 'Community Service', desc: 'Making a difference in society', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08102.JPG.jpg' },
    { title: 'Art Exhibition', desc: 'Creative artwork by primary students', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04108.JPG.jpeg' },
    { title: 'Music Concert', desc: 'School choir performance', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08830.JPG.jpg' },
    { title: 'Tech Workshop', desc: 'Robotics and coding session', img: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04214.JPG.jpg' }
  ];

  return (
    <AnimatedPage>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-[400px] overflow-hidden bg-black flex items-center justify-center">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6853.jpg.jpg" 
            alt="Gallery Banner"
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
                School Gallery
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl max-w-2xl mx-auto"
              >
                Explore moments from our school life - events, activities, and achievements that make Delhi World Public School Alwar special.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Gallery Grid Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => (
                <ScrollReveal key={index} direction="up" delay={(index % 3) * 0.12}>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.01, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                    onClick={() => setActiveIndex(index)}
                    className="bg-[#1a4d2e] text-white rounded-lg overflow-hidden group cursor-zoom-in shadow-md hover:shadow-xl transition flex flex-col h-full border border-gray-100/10"
                  >
                    <div className="relative h-64 overflow-hidden bg-white flex items-center justify-center p-3 border-b border-gray-100">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="max-w-full max-h-full w-auto h-auto object-contain transition duration-500 group-hover:scale-104"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition duration-300"></div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-[#1a4d2e]/85 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6 relative grow">
                      <div className="absolute -top-6 right-6 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Event
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-green-200 transition-colors duration-300">{item.title}</h3>
                      <p className="text-green-100">{item.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reusable Lightbox Component */}
        <Lightbox
          isOpen={activeIndex !== null}
          images={galleryItems}
          currentIndex={activeIndex ?? 0}
          onClose={() => setActiveIndex(null)}
          onIndexChange={(index) => setActiveIndex(index)}
        />
      </div>
    </AnimatedPage>
  );
};

export default Gallery;
