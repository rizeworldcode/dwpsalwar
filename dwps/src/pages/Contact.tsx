import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import { submitContactFormToWhatsApp } from '../utils/whatsapp';

const Contact = () => {
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
        source: 'Contact Page'
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
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-[350px] overflow-hidden bg-[#1a4d2e] flex items-center justify-center">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6875.jpg.jpg" 
            alt="Contact Us Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a4d2e]/40 pointer-events-none"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <motion.h1 
                initial={{ opacity: 0, y: -20, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl font-bold mb-4"
              >
                Contact Us
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl max-w-2xl mx-auto"
              >
                Get in touch with us for any inquiries about admissions, programs, or visits.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
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

        {/* Map Section */}
        <ScrollReveal direction="up" delay={0.1}>
          <section className="h-[450px] w-full relative overflow-hidden border-t border-gray-200 shadow-inner">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.6682971130626!2d76.65829627525108!3d27.634788076224268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39729a2694abb8ef%3A0x964a53540e8cdab1!2sDelhi%20World%20Public%20School!5e0!3m2!1sen!2sin!4v1779085866260!5m2!1sen!2sin" 
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000" 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        </ScrollReveal>
      </div>
    </AnimatedPage>
  );
};

export default Contact;
