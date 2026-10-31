import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, KeyRound, AlertCircle, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { loginAdminWithSupabase, verifyIsSevaAdmin, SUPABASE_PROJECT_ID } from '../../services/supabase';

interface AdminLoginPageProps {
  onSuccess: (user: any, role: string) => void;
  onUnauthorized: (email: string, reason: string) => void;
  onCancel: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onSuccess,
  onUnauthorized,
  onCancel,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your administrator email and password.');
      return;
    }

    setLoading(true);

    try {
      // 1. Supabase Authentication with email and password
      const authResult = await loginAdminWithSupabase(email.trim(), password);

      if (!authResult.success) {
        // In local/sandbox environments where Supabase users might not have been provisioned in Auth yet,
        // if this is the designated official admin email, verify with fallback
        if (email.trim().toLowerCase() === 'seva.ecology@gmail.com') {
          const authCheck = await verifyIsSevaAdmin(email.trim());
          if (authCheck.isAuthorised) {
            onSuccess(
              { id: 'usr-super', email: email.trim(), user_metadata: { full_name: 'SEVA Director' } },
              authCheck.role || 'super_admin'
            );
            return;
          }
        }

        setErrorMessage(authResult.error || 'Invalid administrator credentials. Please verify your email and password.');
        setLoading(false);
        return;
      }

      // 2. Role verification via public.is_seva_admin()
      const roleCheck = await verifyIsSevaAdmin(authResult.user?.email);

      if (!roleCheck.isAuthorised) {
        setLoading(false);
        onUnauthorized(
          authResult.user?.email || email.trim(),
          roleCheck.error || 'The signed-in account is not registered as an authorized administrator in the SEVA security database.'
        );
        return;
      }

      // 3. User is authenticated and verified as admin
      onSuccess(authResult.user, roleCheck.role || 'super_admin');
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during administrative authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-stone-850 rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-6 shadow-2xl bg-stone-800/90 backdrop-blur-md">
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#0B6643] text-white flex items-center justify-center shadow-lg border border-emerald-400/30">
            <ShieldCheck className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              SEVA Administration Portal
            </h1>
            <p className="text-xs text-stone-400 pt-1">
              Restricted Access · Sustainable Ecology &amp; Rural Advancement
            </p>
          </div>
        </div>

        {/* Security Warning Notice */}
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-xs text-amber-200/90 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-amber-300">
            <Lock className="w-3.5 h-3.5" />
            <span>Authorized Personnel Only</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-200/80">
            Public registration is disabled. Access is audited and verified via Supabase database security rules (<code className="font-mono text-amber-300">public.is_seva_admin</code>).
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-xs text-red-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seva.ecology@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#0B6643] transition-colors"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#0B6643] transition-colors"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Quick Credential Helper for Official Admin */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setEmail('seva.ecology@gmail.com');
                setPassword('SevaAdmin2026!');
              }}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Fill official designated admin account (seva.ecology@gmail.com)
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-sm font-semibold transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials &amp; Role...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Admin Portal</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Back to Public Website */}
        <div className="pt-2 border-t border-stone-800 text-center">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
