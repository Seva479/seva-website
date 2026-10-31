import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ApproachPage } from './pages/ApproachPage';
import { WhyDigitalPage } from './pages/WhyDigitalPage';
import { ProgrammePage } from './pages/ProgrammePage';
import { ImpactPage } from './pages/ImpactPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { ApplyPage } from './pages/ApplyPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { SevaStore } from './services/store';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [isSecureAdminRoute, setIsSecureAdminRoute] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(true);

  const settings = SevaStore.getSettings();

  // Handle URL path and hash navigation on mount and hashchange
  useEffect(() => {
    const evaluateRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const rawHash = window.location.hash.replace('#', '').toLowerCase();

      // Check for secure admin route: /seva-secure-panel or #seva-secure-panel
      if (
        path === '/seva-secure-panel' ||
        path.startsWith('/seva-secure-panel') ||
        rawHash === 'seva-secure-panel' ||
        rawHash.startsWith('seva-secure-panel')
      ) {
        setIsSecureAdminRoute(true);
        return;
      }

      // Legacy fallback: if someone types #admin, redirect to secret route #seva-secure-panel
      if (rawHash === 'admin') {
        window.location.hash = 'seva-secure-panel';
        setIsSecureAdminRoute(true);
        return;
      }

      // Public view routing
      setIsSecureAdminRoute(false);
      if (rawHash) {
        setCurrentView(rawHash);
      }
    };

    evaluateRoute();
    window.addEventListener('hashchange', evaluateRoute);
    window.addEventListener('popstate', evaluateRoute);

    return () => {
      window.removeEventListener('hashchange', evaluateRoute);
      window.removeEventListener('popstate', evaluateRoute);
    };
  }, []);

  const handleNavigate = (view: string) => {
    setIsSecureAdminRoute(false);
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    setIsSecureAdminRoute(false);
    window.location.hash = 'home';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Secure Admin Route, render the Admin Portal with authentication & role verification
  if (isSecureAdminRoute) {
    return <AdminLayout onExitAdmin={handleExitAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-[#172B24] font-sans selection:bg-[#0B6643] selection:text-white">
      {/* Announcement Banner if configured */}
      {showBanner && settings.announcement_banner && (
        <div className="bg-[#D97706] text-white text-xs py-2 px-4 text-center font-medium relative flex items-center justify-center gap-3 shadow-xs">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{settings.announcement_banner}</span>
          </div>
          <button
            onClick={() => handleNavigate('apply')}
            className="underline font-bold hover:text-amber-100 cursor-pointer hidden sm:inline"
          >
            Apply Now &rarr;
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-3 text-amber-200 hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navbar (Zero admin links) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Body View */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentView === 'approach' && <ApproachPage onNavigate={handleNavigate} />}
        {currentView === 'why-digital' && <WhyDigitalPage onNavigate={handleNavigate} />}
        {currentView === 'programme' && <ProgrammePage onNavigate={handleNavigate} />}
        {currentView === 'impact' && <ImpactPage onNavigate={handleNavigate} />}
        {currentView === 'resources' && <ResourcesPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'apply' && <ApplyPage onNavigate={handleNavigate} />}
      </main>

      {/* Main Footer (Zero admin links) */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
