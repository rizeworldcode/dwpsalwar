import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';

const Terms = () => {
  const sections = [
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: '1. Introduction',
      content: 'Welcome to the official website of Delhi World Public School Alwar. By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using this website\'s particular services, you shall be subject to any posted guidelines or rules applicable to such services.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
      title: '2. Website Usage Rules',
      content: 'You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else\'s use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      title: '3. Student and Parent Responsibilities',
      content: 'Parents and guardians utilizing our online portals for admissions, fee payments, or academic tracking are responsible for maintaining the confidentiality of their login credentials. Any information submitted through our forms must be accurate, current, and complete. The school reserves the right to suspend or terminate accounts that provide false information.'
    },
    {
      isHighlight: true,
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      title: '4. Admission Information Disclaimer',
      content: 'The submission of an online admission inquiry or registration form does not guarantee admission to Delhi World Public School Alwar. Admissions are subject to seat availability, eligibility criteria, and successful completion of our interaction and assessment processes.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: '5. Intellectual Property',
      content: 'All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Delhi World Public School Alwar or its content suppliers and is protected by copyright laws. You may not modify, copy, reproduce, republish, upload, post, transmit, or distribute any material from this site without prior written consent.'
    },
    {
      isList: true,
      icon: <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
      title: '6. Prohibited Activities',
      listItems: [
        'Attempting to gain unauthorized access to our secure portals or databases.',
        'Using the website to distribute spam, malware, or harmful code.',
        'Impersonating any school official, staff member, or other users.',
        'Data scraping, mining, or automated collection of school directory information.'
      ]
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
      title: '7. Accuracy of Information',
      content: 'While we strive to keep the information on this website accurate and up to date, Delhi World Public School Alwar makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
      title: '8. External Links',
      content: 'Through this website, you may be able to link to other websites which are not under the control of Delhi World Public School Alwar. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
      title: '9. Limitation of Liability',
      content: 'In no event will Delhi World Public School Alwar be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      title: '10. Changes to Terms',
      content: 'The school reserves the right to revise these terms and conditions at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms and Conditions of Use.'
    }
  ];

  return (
    <AnimatedPage>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-[300px] overflow-hidden bg-[#1a4d2e] flex items-center justify-center">
          <motion.img 
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6875.jpg.jpg" 
            alt="Terms and Conditions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a4d2e]/40 pointer-events-none"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <motion.h1 
                initial={{ opacity: 0, y: -20, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Terms & Conditions
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg max-w-2xl mx-auto text-green-100"
              >
                Please read these terms carefully before using our website.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6 relative z-10 -mt-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
              
              <div className="mb-10 pb-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#1a4d2e]">Terms of Service</h2>
                  <p className="text-gray-500 mt-2">Delhi World Public School Alwar</p>
                </div>
                <div className="text-right hidden md:block">
                  <span className="inline-block bg-green-50 text-[#1a4d2e] px-4 py-2 rounded-lg font-medium text-sm">
                    Last Updated: May 2026
                  </span>
                </div>
              </div>

              <div className="space-y-8 text-gray-600">
                {sections.map((sec, index) => (
                  <ScrollReveal key={index} direction="up" delay={0.05}>
                    {sec.isHighlight ? (
                      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                          {sec.icon}
                          {sec.title}
                        </h3>
                        <p className="leading-relaxed">{sec.content}</p>
                      </div>
                    ) : sec.isList ? (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                          {sec.icon}
                          {sec.title}
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {sec.listItems?.map((li, idx) => (
                            <li key={idx}>{li}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                          {sec.icon}
                          {sec.title}
                        </h3>
                        <p className="leading-relaxed">{sec.content}</p>
                      </div>
                    )}
                  </ScrollReveal>
                ))}

                {/* Section 11 - Contact Info */}
                <ScrollReveal direction="up" delay={0.1}>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">11. Contact Information</h3>
                    <p className="leading-relaxed mb-4">
                      If you have any questions or concerns regarding these Terms and Conditions, please contact us:
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <strong>Email:</strong> info@dwpsalwar.com
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <strong>Phone:</strong> +91 89308 57688 / +91 93092 88288
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Link to="/contact" className="text-[#1a4d2e] font-bold hover:underline">
                          Go to Contact Page &rarr;
                        </Link>
                      </div>
                    </div>
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

export default Terms;
