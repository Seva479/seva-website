import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Mail,
  PlayCircle,
  Settings,
  Database,
  ShieldCheck,
  LogOut,
  Bell,
  Search,
  UserCheck,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { SevaStore, ADMIN_USERS } from '../../services/store';
import { Application, UserProfile, Meeting, ProgrammeProject } from '../../types';
import { AdminOverview } from './AdminOverview';
import { ApplicationsManager } from './ApplicationsManager';
import { ApplicationDetailModal } from './ApplicationDetailModal';
import { MeetingsManager } from './MeetingsManager';
import { EmailManager } from './EmailManager';
import { ProjectsTracker } from './ProjectsTracker';
import { ContentManager } from './ContentManager';
import { DatabaseSchemaModal } from './DatabaseSchemaModal';
import { AdminLoginPage } from './AdminLoginPage';
import { UnauthorisedAccessPage } from './UnauthorisedAccessPage';
import { supabase, verifyIsSevaAdmin, logoutAdminFromSupabase } from '../../services/supabase';

interface AdminLayoutProps {
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitAdmin }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthorised, setIsAuthorised] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [unauthorizedDetails, setUnauthorizedDetails] = useState<{ email?: string; reason?: string } | null>(null);

  // Tab & data states
  const [activeTab, setActiveTab] = useState<
    'overview' | 'applications' | 'meetings' | 'emails' | 'projects' | 'cms' | 'database'
  >('overview');

  const [currentUser, setCurrentUser] = useState<UserProfile>(SevaStore.getCurrentUser());
  const [applications, setApplications] = useState<Application[]>(SevaStore.getApplications());
  const [projects, setProjects] = useState<ProgrammeProject[]>(SevaStore.getProjects());
  const [meetings, setMeetings] = useState<Meeting[]>(SevaStore.getMeetings());

  // Modal states
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [preselectedAppForMeeting, setPreselectedAppForMeeting] = useState<Application | null>(null);
  const [preselectedAppForEmail, setPreselectedAppForEmail] = useState<Application | null>(null);

  // Check Supabase session on mount
  useEffect(() => {
    let isMounted = true;

    async function checkCurrentSession() {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData?.session?.user;

        if (user) {
          const authCheck = await verifyIsSevaAdmin(user.email);
          if (isMounted) {
            if (authCheck.isAuthorised) {
              setIsAuthenticated(true);
              setIsAuthorised(true);
              const matchedProfile: UserProfile = {
                id: user.id,
                email: user.email || 'seva.ecology@gmail.com',
                name: user.user_metadata?.full_name || 'SEVA Administrator',
                role: (authCheck.role as any) || 'super_admin',
                designation: 'Designated SEVA Secretariat Admin',
              };
              setCurrentUser(matchedProfile);
              SevaStore.setCurrentUser(matchedProfile);
            } else {
              setIsAuthenticated(true);
              setIsAuthorised(false);
              setUnauthorizedDetails({
                email: user.email,
                reason: authCheck.error || 'User does not possess administrative privileges in public.is_seva_admin()',
              });
            }
          }
        }
      } catch (err) {
        console.warn('Session check exception:', err);
      } finally {
        if (isMounted) setIsCheckingAuth(false);
      }
    }

    checkCurrentSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authCheck = await verifyIsSevaAdmin(session.user.email);
        if (isMounted) {
          if (authCheck.isAuthorised) {
            setIsAuthenticated(true);
            setIsAuthorised(true);
            setUnauthorizedDetails(null);
          } else {
            setIsAuthenticated(true);
            setIsAuthorised(false);
            setUnauthorizedDetails({
              email: session.user.email,
              reason: authCheck.error || 'Role verification failed.',
            });
          }
        }
      } else {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsAuthorised(false);
        }
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const refreshAll = () => {
    setApplications(SevaStore.getApplications());
    setProjects(SevaStore.getProjects());
    setMeetings(SevaStore.getMeetings());
  };

  const handleUpdateApp = (updated: Application) => {
    refreshAll();
    setSelectedApp(updated);
  };

  const handleRoleChange = (roleName: string) => {
    const found = ADMIN_USERS.find((u) => u.role === roleName) || ADMIN_USERS[0];
    SevaStore.setCurrentUser(found);
    setCurrentUser(found);
  };

  const handleScheduleMeetingFromApp = (app: Application) => {
    setSelectedApp(null);
    setPreselectedAppForMeeting(app);
    setActiveTab('meetings');
  };

  const handleComposeEmailFromApp = (app: Application) => {
    setSelectedApp(null);
    setPreselectedAppForEmail(app);
    setActiveTab('emails');
  };

  const handleConvertToProjectFromApp = (app: Application) => {
    const newProj = SevaStore.convertApplicationToProject(app, {
      agreed_cost: 65000,
      assigned_lead: 'Pravin R. (SEVA Tech Lead)',
      duration_months: 4,
      start_date: new Date().toISOString().split('T')[0],
    });
    refreshAll();
    setSelectedApp(null);
    setActiveTab('projects');
  };

  const handleSignOut = async () => {
    await logoutAdminFromSupabase();
    setIsAuthenticated(false);
    setIsAuthorised(false);
    onExitAdmin();
  };

  // If checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-stone-300">
            Verifying SEVA Administrative Security Credentials...
          </p>
        </div>
      </div>
    );
  }

  // If user was rejected by public.is_seva_admin()
  if (isAuthenticated && !isAuthorised) {
    return (
      <UnauthorisedAccessPage
        userEmail={unauthorizedDetails?.email}
        reason={unauthorizedDetails?.reason}
        onBackToHome={onExitAdmin}
        onRetryLogin={() => {
          setIsAuthenticated(false);
          setIsAuthorised(false);
          setUnauthorizedDetails(null);
        }}
      />
    );
  }

  // If not authenticated, show private admin login form
  if (!isAuthenticated) {
    return (
      <AdminLoginPage
        onSuccess={(user, role) => {
          setIsAuthenticated(true);
          setIsAuthorised(true);
          const profile: UserProfile = {
            id: user.id || 'usr-super',
            email: user.email || 'seva.ecology@gmail.com',
            name: user.user_metadata?.full_name || 'SEVA Administrator',
            role: (role as any) || 'super_admin',
            designation: 'Designated Administrator',
          };
          setCurrentUser(profile);
          SevaStore.setCurrentUser(profile);
        }}
        onUnauthorized={(email, reason) => {
          setIsAuthenticated(true);
          setIsAuthorised(false);
          setUnauthorizedDetails({ email, reason });
        }}
        onCancel={onExitAdmin}
      />
    );
  }

  const newCount = applications.filter((a) => a.status === 'New Application').length;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="bg-[#064E36] text-white sticky top-0 z-40 border-b border-[#0B6643] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand & Area */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0B6643] flex items-center justify-center font-bold text-lg border border-emerald-400/30">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight block">
                  SEVA Administration Console
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-[10px] text-emerald-300 font-mono border border-emerald-700/60 hidden sm:inline">
                  Verified Admin
                </span>
              </div>
              <span className="text-[11px] text-emerald-200/80 block -mt-0.5">
                Grassroots Digital Management Platform · Secured by public.is_seva_admin()
              </span>
            </div>
          </div>

          {/* User & Role Switcher + Exit */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs">
            {/* Active User Email */}
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-100 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-800/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px]">{currentUser.email}</span>
            </div>

            {/* Role Switcher */}
            <div className="hidden md:flex items-center gap-2 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
              <UserCheck className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="text-emerald-200 font-medium">Role:</span>
              <select
                value={currentUser.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="super_admin" className="text-stone-900">Super Admin (seva.ecology@gmail.com)</option>
                <option value="programme_admin" className="text-stone-900">Programme Administrator</option>
                <option value="reviewer" className="text-stone-900">Technical Reviewer</option>
              </select>
            </div>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-white font-semibold transition-colors cursor-pointer border border-emerald-600/50"
              title="Sign out of Supabase and exit"
            >
              <LogOut className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation Sub-Bar */}
      <nav className="bg-white border-b border-stone-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#0B6643] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 relative ${
              activeTab === 'applications'
                ? 'bg-[#0B6643] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Applications ({applications.length})</span>
            {newCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'applications' ? 'bg-amber-400 text-stone-900' : 'bg-[#D97706] text-white'
              }`}>
                {newCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('meetings')}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'meetings'
                ? 'bg-[#0B6643] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Meetings ({meetings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'emails'
                ? 'bg-[#0B6643] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Center</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[#0B6643] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Active Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'cms'
                ? 'bg-[#0B6643] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Website CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'database'
                ? 'bg-[#0B6643] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase DDL</span>
          </button>
        </div>
      </nav>

      {/* Main Admin Workspace Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'overview' && (
          <AdminOverview
            applications={applications}
            projects={projects}
            meetings={meetings}
            onSelectApplication={(app) => setSelectedApp(app)}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsManager
            applications={applications}
            onSelectApplication={(app) => setSelectedApp(app)}
          />
        )}

        {activeTab === 'meetings' && (
          <MeetingsManager
            meetings={meetings}
            applications={applications}
            onRefreshMeetings={refreshAll}
            preselectedApp={preselectedAppForMeeting}
          />
        )}

        {activeTab === 'emails' && (
          <EmailManager
            applications={applications}
            preselectedApp={preselectedAppForEmail}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsTracker
            projects={projects}
            onRefreshProjects={refreshAll}
          />
        )}

        {activeTab === 'cms' && <ContentManager />}

        {activeTab === 'database' && <DatabaseSchemaModal />}
      </main>

      {/* Application Detail / Review Modal */}
      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUpdateApp={handleUpdateApp}
          onScheduleMeeting={handleScheduleMeetingFromApp}
          onComposeEmail={handleComposeEmailFromApp}
          onConvertToProject={handleConvertToProjectFromApp}
        />
      )}
    </div>
  );
};
