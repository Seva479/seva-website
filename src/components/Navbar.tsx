import React, { useState } from 'react';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About SEVA' },
    { id: 'why-digital', label: 'Why Digital?' },
    { id: 'programme', label: 'Tech Support' },
    { id: 'impact', label: 'Our Impact' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Utility Bar for Institutional Transparency */}
      <div className="bg-[#064E36] text-[#F7FAF8] text-xs py-1.5 px-4 sm:px-8 border-b border-[#0B6643]/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-emerald-100/90 font-medium tracking-tight">
            <span>Sustainable Ecology &amp; Rural Advancement</span>
            <span className="hidden sm:inline text-emerald-300/40">·</span>
            <span className="hidden sm:inline">Ralegaon, Yavatmal, Maharashtra</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100/90 font-medium">
            <a
              href="tel:+918999469974"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="tabular-nums">+91 8999469974</span>
            </a>
            <span className="text-emerald-300/40">·</span>
            <a
              href="mailto:seva.ecology@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="hidden md:inline">seva.ecology@gmail.com</span>
              <span className="md:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text element Brand Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left cursor-pointer group shrink-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B6643] flex items-center justify-center text-white font-bold text-xl tracking-tight shadow-xs">
                  S
                </div>
                <div>
                  <span className="block text-xl font-bold tracking-tight text-[#064E36] group-hover:text-[#0B6643] transition-colors whitespace-nowrap">
                    SEVA
                  </span>
                  <span className="block text-[11px] font-medium text-stone-500 tracking-tight uppercase whitespace-nowrap">
                    Rural Advancement
                  </span>
                </div>
              </div>
            </button>

            {/* Zone 2: 4-6 concise single-line text links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
                      isActive
                        ? 'border-[#0B6643] text-[#0B6643] font-semibold'
                        : 'border-transparent hover:text-[#0B6643] hover:border-[#0B6643]/30'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleNavClick('apply')}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.98]"
              >
                <span>Apply for Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-[#0B6643] rounded-lg focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                  currentView === link.id
                    ? 'bg-emerald-50 text-[#0B6643] font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('apply')}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#0B6643] rounded-lg"
              >
                <span>Apply for Technology Support</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
