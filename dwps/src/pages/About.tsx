import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  return (
    <AnimatedPage>
      <div className="bg-white min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-[400px] overflow-hidden bg-black flex items-center justify-center">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6875.jpg.jpg" 
            alt="About Us Banner"
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
                About Us
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl max-w-2xl mx-auto text-green-100"
              >
                Delhi World Public School Alwar - Shaping Bright Futures through excellence in education.
              </motion.p>
            </div>
          </div>
        </section>

        {/* School Introduction */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left">
                <div>
                  <p className="text-[#1a4d2e] text-sm font-bold uppercase tracking-wider mb-2">Our History</p>
                  <h2 className="text-4xl font-bold text-[#1a4d2e] mb-6">A Legacy of Educational Excellence</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We inspire, we educate, and we shape the future! Our commitment to excellence in education has made us a leading institution in Alwar, Rajasthan. Since our inception, we have been dedicated to providing a nurturing environment where students can discover their potential and develop into responsible global citizens.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our state-of-the-art facilities, experienced faculty, and comprehensive curriculum ensure that every student receives a well-rounded education that prepares them for the challenges of tomorrow.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-2 gap-4">
                <ScrollReveal direction="right" delay={0.1}>
                  <motion.div 
                    whileHover={{ scale: 1.03, rotateZ: -1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-lg shadow-md w-full h-48 bg-gray-50 flex items-center justify-center p-2 border border-gray-100 overflow-hidden cursor-pointer"
                  >
                    <img src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6875.jpg.jpg" alt="Campus 1" className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg" />
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.3}>
                  <motion.div 
                    whileHover={{ scale: 1.03, rotateZ: 1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-lg shadow-md w-full h-48 bg-gray-50 flex items-center justify-center p-2 border border-gray-100 overflow-hidden mt-8 cursor-pointer"
                  >
                    <img src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6891.jpg.jpg" alt="Campus 2" className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg" />
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 px-6 bg-[#1a4d2e] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal direction="up" delay={0.1}>
                <motion.div 
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/20 h-full cursor-pointer"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                  <p className="text-green-100 text-lg leading-relaxed">
                    To create a learning environment that fosters intellectual curiosity, critical thinking, and a lifelong love for learning, empowering students to become ethical and innovative leaders of the future.
                  </p>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <motion.div 
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/20 h-full cursor-pointer"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                  <p className="text-green-100 text-lg leading-relaxed">
                    To provide holistic education that balances academic excellence with character building, sports, and extracurricular activities, ensuring every child develops to their fullest potential.
                  </p>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-[#1a4d2e] mb-4">Why Choose Us?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">We offer a unique educational experience that combines traditional values with modern teaching methodologies.</p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: 'Modern Curriculum', desc: 'Comprehensive curriculum designed to foster critical thinking and practical knowledge.' },
                { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', title: 'Expert Faculty', desc: 'Highly qualified and experienced teachers dedicated to student success.' },
                { icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title: 'Global Perspective', desc: 'Preparing students to be confident global citizens in an interconnected world.' },
              ].map((feature, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.15}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border border-gray-100 p-8 rounded-2xl shadow-xs text-center group cursor-pointer h-full"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1a4d2e] transition-colors duration-300">
                      <svg className="w-8 h-8 text-[#1a4d2e] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1a4d2e] mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default About;
