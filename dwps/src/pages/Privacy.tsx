import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';

const Privacy = () => {
  const sections = [
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: '1. Introduction',
      content: 'Delhi World Public School Alwar ("we," "our," or "us") is committed to protecting the privacy of our students, parents, staff, and website visitors. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit our website or use our educational portals.'
    },
    {
      isList: true,
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      title: '2. Information We Collect',
      desc: 'We may collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about the school, participating in activities on the website, or otherwise contacting us.',
      listItems: [
        'Personal Identification Data: Name, address, phone number, email address, date of birth.',
        'Academic Records: Previous school records, report cards, transfer certificates.',
        'Medical Information: Blood group, allergies, required medical certificates for student safety.',
        'Technical Data: IP address, browser type, operating system, and pages visited on our site.'
      ]
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      title: '3. Student & Parent Data Usage',
      content: 'The personal information collected is strictly used for educational and administrative purposes. This includes processing admissions, maintaining academic records, communicating important updates, managing fee collections, and ensuring the health and safety of students while on campus.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: '4. Cookies and Tracking Technologies',
      content: 'We may use cookies, web beacons, tracking pixels, and other tracking technologies on the website to help customize the site and improve your experience. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the website.'
    },
    {
      isHighlight: true,
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
      title: '5. Data Protection & Security',
      content: 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: '6. Third-Party Services',
      content: 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
      title: '7. Form Submission Data',
      content: 'Information submitted through our online inquiry, admission, and contact forms is stored securely on our servers. This data is accessed only by authorized school personnel for the purpose of responding to your requests and processing your applications.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
      title: '8. Communication Policy',
      content: 'By providing your email address and phone number, you consent to receive communications from the school regarding admissions, events, newsletters, and urgent updates. You may opt out of promotional communications at any time, but critical school updates cannot be opted out of for enrolled students.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>,
      title: "9. Children's Privacy",
      content: 'Our website is designed for parents and legal guardians. We do not knowingly solicit information from or market to children under the age of 13 without verifiable parental consent. If we learn we have collected personal information from a child under 13 without parental consent, we will delete that information as quickly as possible.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: '10. Your Data Rights',
      content: 'Parents and guardians have the right to review, update, or request deletion of their child\'s personal data. To exercise these rights, please contact the school administration office. Valid identification will be required to process such requests to ensure data security.'
    },
    {
      icon: <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      title: '11. Policy Updates',
      content: 'We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.'
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
            alt="Privacy Policy"
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
                Privacy Policy
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg max-w-2xl mx-auto text-green-100"
              >
                How we collect, use, and protect your information.
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
                  <h2 className="text-3xl font-bold text-[#1a4d2e]">Privacy Policy</h2>
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
                        <p className="leading-relaxed mb-3">{sec.desc}</p>
                        <ul className="list-disc pl-5 space-y-2">
                          {sec.listItems?.map((li, idx) => (
                            <li key={idx}>
                              <strong>{li.split(':')[0]}:</strong>
                              {li.split(':')[1]}
                            </li>
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

                {/* Section 12 - Contact Details */}
                <ScrollReveal direction="up" delay={0.1}>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">12. Contact Details</h3>
                    <p className="leading-relaxed mb-4">
                      If you have questions or comments about this Privacy Policy, please contact us at:
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <strong>Email:</strong> privacy@dwpsalwar.com
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1a4d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <strong>Phone:</strong> +91 89308 57688 / +91 93092 88288
                      </p>
                      <p className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#1a4d2e] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span><strong>Address:</strong><br />6th Milestone, Alwar Bhiwadi Highway,<br />Alwar, Rajasthan</span>
                      </p>
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

export default Privacy;
