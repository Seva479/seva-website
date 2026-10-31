import React from 'react';
import { ShieldAlert, ArrowLeft, LogOut, Lock, AlertTriangle } from 'lucide-react';
import { logoutAdminFromSupabase } from '../../services/supabase';

interface UnauthorisedAccessPageProps {
  userEmail?: string;
  reason?: string;
  onBackToHome: () => void;
  onRetryLogin: () => void;
}

export const UnauthorisedAccessPage: React.FC<UnauthorisedAccessPageProps> = ({
  userEmail,
  reason = 'Your account does not possess authorized administrator privileges.',
  onBackToHome,
  onRetryLogin,
}) => {
  const handleSignOut = async () => {
    await logoutAdminFromSupabase();
    onRetryLogin();
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-stone-850 rounded-2xl border border-red-800/40 p-6 sm:p-8 space-y-6 shadow-2xl bg-stone-800/90 backdrop-blur-md">
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-400 mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-950/60 text-red-300 text-xs font-mono border border-red-800/60">
            <Lock className="w-3 h-3" />
            <span>HTTP 403 · Access Denied</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Unauthorised Access
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Access to the SEVA Administrative Portal is strictly restricted to designated personnel and verified administrators.
          </p>
        </div>

        {/* Security Notice Details */}
        <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-700 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-stone-400">
            <span>Signed In Account:</span>
            <span className="font-mono text-stone-200 font-semibold">{userEmail || 'Anonymous'}</span>
          </div>
          <div className="flex items-start justify-between text-stone-400 gap-2">
            <span>Security Verification:</span>
            <span className="text-red-400 text-right font-medium">Failed public.is_seva_admin()</span>
          </div>
          <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 leading-normal">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 inline mr-1 -mt-0.5" />
            {reason}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-stone-700 hover:bg-stone-600 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-amber-400" />
            <span>Sign Out &amp; Try Another Account</span>
          </button>

          <button
            onClick={onBackToHome}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-950 text-stone-300 hover:text-white text-xs sm:text-sm font-medium transition-colors border border-stone-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>
        </div>

        {/* Footer Audit Notice */}
        <p className="text-[11px] text-center text-stone-400 leading-tight">
          All administrative access attempts are logged for security auditing under SEVA IT Policy.
        </p>
      </div>
    </div>
  );
};
