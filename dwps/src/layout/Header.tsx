import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 bg-transparent pointer-events-none"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-stretch gap-4 pointer-events-auto">

        {/* Left Pill - Logo */}
        <div className="bg-white text-[#1a4d2e] rounded-full px-6 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center shrink-0">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition cursor-pointer" onClick={closeMenu}>
            <img
              src="https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DWPS_LOGO.png"
              alt="DWPS Logo"
              className="h-10 w-auto"
            />
            <div className="hidden lg:block">
              <span className="text-sm font-bold block leading-tight tracking-wide uppercase">CBSE affiliated</span>
            </div>
          </Link>
        </div>

        {/* Right Pill - Navigation & Actions */}
        <div className="bg-white text-[#1a4d2e] rounded-full pl-6 pr-2 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center shrink-0">

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-[11px] lg:text-xs font-bold tracking-widest mr-6">
            <Link to="/" className="hover:text-green-600 transition">HOME</Link>
            <Link to="/about" className="hover:text-green-600 transition">ABOUT</Link>
            <Link to="/academics" className="hover:text-green-600 transition">ACADEMICS</Link>
            <Link to="/gallery" className="hover:text-green-600 transition">GALLERY</Link>
            <Link to="/admissions" className="hover:text-green-600 transition">ADMISSIONS</Link>
            <Link to="/mandatory-disclosure" className="hover:text-green-600 transition text-[#1a4d2e] font-extrabold">Mandatory Disclosures</Link>
            <a href="https://app.studybase.in/login" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#1a4d2e] text-white hover:bg-green-800 rounded-full transition-all duration-300 text-[10px] font-black tracking-widest shadow-xs uppercase whitespace-nowrap">PARENTS LOGIN</a>
            <Link to="/tc-login" className="px-4 py-2 bg-[#1a4d2e] text-white hover:bg-green-800 rounded-full transition-all duration-300 text-[10px] font-black tracking-widest shadow-xs uppercase whitespace-nowrap">TC</Link>
            <Link to="/admin-login" className="px-4 py-2 bg-[#1a4d2e] text-white hover:bg-green-800 rounded-full transition-all duration-300 text-[10px] font-black tracking-widest shadow-xs uppercase whitespace-nowrap">ADMIN LOGIN</Link>
          </nav>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-gray-300 mx-6"></div>

          {/* Actions */}
          <div className="flex items-center gap-5">

            <Link to="/contact" className="w-10 h-10 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center hover:bg-green-800 transition shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#1a4d2e] w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 bg-white text-[#1a4d2e] p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col gap-4 mx-4 font-bold tracking-widest text-sm border border-gray-100 pointer-events-auto">
          <Link to="/" onClick={closeMenu} className="hover:text-green-600 transition">HOME</Link>
          <Link to="/gallery" onClick={closeMenu} className="hover:text-green-600 transition">GALLERY</Link>
          <Link to="/about" onClick={closeMenu} className="hover:text-green-600 transition">ABOUT</Link>
          <Link to="/academics" onClick={closeMenu} className="hover:text-green-600 transition">ACADEMICS</Link>
          <Link to="/admissions" onClick={closeMenu} className="hover:text-green-600 transition">ADMISSIONS</Link>
          <Link to="/mandatory-disclosure" onClick={closeMenu} className="hover:text-green-600 transition text-green-700">Mandatory Disclosures</Link>
          <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
            <a href="https://app.studybase.in/login" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="w-full text-center py-3 bg-[#1a4d2e] text-white rounded-2xl hover:bg-green-800 transition-all duration-300 font-bold tracking-wider text-xs uppercase shadow-sm">PARENTS LOGIN</a>
            <Link to="/tc-login" onClick={closeMenu} className="w-full text-center py-3 bg-[#1a4d2e] text-white rounded-2xl hover:bg-green-800 transition-all duration-300 font-bold tracking-wider text-xs uppercase shadow-sm">TC Portal</Link>
            <Link to="/admin-login" onClick={closeMenu} className="w-full text-center py-3 border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold tracking-wider text-xs uppercase shadow-xs">Admin Login</Link>
          </div>
          <Link to="/contact" onClick={closeMenu} className="hover:text-green-600 transition pt-2 border-t border-gray-100 text-center">CONTACT US</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
