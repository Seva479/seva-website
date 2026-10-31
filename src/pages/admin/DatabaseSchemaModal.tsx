import React, { useState, useEffect } from 'react';
import {
  Database,
  Copy,
  Check,
  ShieldCheck,
  Code,
  FileText,
  Server,
  Layers,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  UploadCloud,
} from 'lucide-react';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  checkSupabaseHealth,
  insertApplicationToSupabase,
  QUICK_SETUP_SQL,
  SupabaseHealthStatus,
} from '../../services/supabase';
import { SevaStore } from '../../services/store';

export const DatabaseSchemaModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'tables' | 'sql' | 'rls'>('status');

  const [healthStatus, setHealthStatus] = useState<SupabaseHealthStatus | null>(null);
  const [checking, setChecking] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const runHealthCheck = async () => {
    setChecking(true);
    const res = await checkSupabaseHealth();
    setHealthStatus(res);
    setChecking(false);
  };

  useEffect(() => {
    runHealthCheck();
  }, []);

  const handleSyncAllToSupabase = async () => {
    setSyncing(true);
    setSyncMessage(null);
    const localApps = SevaStore.getApplications();
    let successCount = 0;
    let failCount = 0;
    let errorDetail = '';

    for (const app of localApps) {
      const res = await insertApplicationToSupabase(app);
      if (res.success) {
        successCount++;
      } else {
        failCount++;
        errorDetail = res.error || '';
      }
    }

    setSyncing(false);
    if (failCount === 0) {
      setSyncMessage(`Successfully synced all ${successCount} applications to Supabase!`);
    } else {
      setSyncMessage(
        `Synced: ${successCount}. Failed: ${failCount}. Reason: ${errorDetail || 'Table not initialized in Supabase SQL editor.'}`
      );
    }
    runHealthCheck();
  };

  const tablesList = [
    { name: 'applications', records: 'Dedicated columns for all 32 application fields', rls: 'Public Insert, Admin Read/Write' },
    { name: 'contact_messages', records: 'Inquiries submitted via contact form', rls: 'Public Insert, Admin Read/Write' },
    { name: 'profiles', records: 'Auth linked users, names, designations', rls: 'Admin only' },
    { name: 'user_roles', records: 'Role permissions (super_admin, programme_admin, reviewer)', rls: 'Admin only' },
    { name: 'application_documents', records: 'Uploaded registration certificates, reports, formats', rls: 'Admin only' },
    { name: 'application_reviews', records: 'Internal notes, weighted scoring (0-100), 70-30 cost estimates', rls: 'Admin only' },
    { name: 'application_status_history', records: 'Audit trail of all 11 status transitions with IST timestamps', rls: 'Admin only' },
    { name: 'meetings', records: 'Scoping sessions, Google Meet links, agendas, status', rls: 'Admin only' },
    { name: 'email_logs', records: 'Transactional logs for all 10 templates, recipient, status', rls: 'Admin only' },
    { name: 'programme_projects', records: 'Active projects with budget, 70% SEVA, 30% NGO', rls: 'Admin only' },
    { name: 'project_milestones', records: '9-stage milestone progression records and completion notes', rls: 'Admin only' },
    { name: 'project_team_members', records: 'Technical lead and field animator assignments', rls: 'Admin only' },
    { name: 'case_studies', records: 'Verified grassroots case studies with before/after results', rls: 'Public Read Published, Admin Write' },
    { name: 'impact_statistics', records: 'Editable impact metrics, labels, values, subtexts', rls: 'Public Read, Admin Write' },
    { name: 'resources', records: 'Knowledge centre guides, toolkits, templates', rls: 'Public Read Published, Admin Write' },
    { name: 'audit_logs', records: 'Comprehensive system mutation logs with JSON payloads', rls: 'Admin only' },
    { name: 'organisation_settings', records: 'SEVA coordinates, Ralegaon address, banner, settings', rls: 'Public Read, Admin Write' },
    { name: 'email_templates', records: '10 Reusable email templates with token placeholders', rls: 'Admin only' },
  ];

  const handleCopySql = (sqlText: string) => {
    navigator.clipboard.writeText(sqlText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Supabase Connection Information */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                Live Supabase Backend
              </span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Project ID: <span className="font-mono text-[#0B6643]">{SUPABASE_PROJECT_ID}</span>
            </h2>
            <p className="text-xs text-stone-500 font-mono">
              Endpoint: {SUPABASE_URL}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={runHealthCheck}
              disabled={checking}
              className="px-3.5 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
              <span>{checking ? 'Checking...' : 'Check Status'}</span>
            </button>

            <a
              href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Open Supabase SQL Editor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Diagnostics Box */}
        {healthStatus && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-semibold block text-[11px]">API &amp; Authentication</span>
              <div className="flex items-center gap-2 font-bold text-stone-900">
                {healthStatus.connected ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Connected (HTTP 200 OK)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Connection Failed</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-semibold block text-[11px]">Applications Table</span>
              <div className="flex items-center gap-2 font-bold text-stone-900">
                {healthStatus.hasApplicationsTable ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Table Initialized in Schema</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Table Not Created Yet</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-semibold block text-[11px]">Contact Messages Table</span>
              <div className="flex items-center gap-2 font-bold text-stone-900">
                {healthStatus.hasContactTable ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Table Initialized in Schema</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Table Not Created Yet</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Callout if tables not created */}
        {healthStatus && !healthStatus.hasApplicationsTable && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-3">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>One-Time Step: Create the 'applications' table in your Supabase backend</span>
            </div>
            <p className="leading-relaxed">
              Your Supabase credentials are valid and active! Because this is a new Supabase project, click the button below to copy the setup SQL script, then paste it into your Supabase SQL editor to create the table.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => handleCopySql(QUICK_SETUP_SQL)}
                className="px-4 py-2 bg-[#0B6643] text-white rounded-lg font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Setup SQL Copied!' : 'Copy 1-Click Setup SQL'}</span>
              </button>

              <a
                href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white text-stone-800 border border-stone-300 rounded-lg font-bold flex items-center gap-1.5"
              >
                <span>Go to Supabase SQL Editor</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Sync message notice */}
        {syncMessage && (
          <div className="p-3 bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-800 font-mono">
            {syncMessage}
          </div>
        )}

        {/* Sync Button */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            Once your table is created, you can sync all recorded applications to Supabase with one click:
          </p>
          <button
            onClick={handleSyncAllToSupabase}
            disabled={syncing}
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{syncing ? 'Syncing to Supabase...' : 'Sync Local Applications to Supabase'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-stone-200 p-1 flex gap-2">
        <button
          onClick={() => setActiveTab('status')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
            activeTab === 'status' ? 'bg-[#0B6643] text-white' : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          Setup SQL Script
        </button>
        <button
          onClick={() => setActiveTab('tables')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
            activeTab === 'tables' ? 'bg-[#0B6643] text-white' : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          18 Database Tables
        </button>
        <button
          onClick={() => setActiveTab('rls')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
            activeTab === 'rls' ? 'bg-[#0B6643] text-white' : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          Row Level Security (RLS)
        </button>
      </div>

      {activeTab === 'status' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900">
              Quick DDL for 'applications' &amp; 'contact_messages'
            </h3>
            <button
              onClick={() => handleCopySql(QUICK_SETUP_SQL)}
              className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-stone-900 text-stone-100 text-[11px] font-mono overflow-x-auto leading-relaxed max-h-96">
            {QUICK_SETUP_SQL}
          </pre>
        </div>
      )}

      {activeTab === 'tables' && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Table Name</th>
                  <th className="py-3 px-4">Field Purpose &amp; Dedicated Columns</th>
                  <th className="py-3 px-4">RLS Access Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {tablesList.map((t, idx) => (
                  <tr key={t.name} className="hover:bg-stone-50/70">
                    <td className="py-2.5 px-4 font-mono text-stone-400">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-[#0B6643]">
                      public.{t.name}
                    </td>
                    <td className="py-2.5 px-4 font-medium">{t.records}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] font-mono">
                        {t.rls}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rls' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs text-xs text-stone-700">
          <h3 className="font-bold text-sm text-stone-900">
            Row Level Security (RLS) Rules Implemented
          </h3>
          <ul className="space-y-2 list-disc pl-5 leading-relaxed">
            <li><strong>Public Submissions:</strong> Anonymous and authenticated public applicants can insert applications and contact messages.</li>
            <li><strong>Public Isolation:</strong> Public users cannot query or inspect other organisations' submitted applications.</li>
            <li><strong>Admin Authentication:</strong> Only users possessing verified roles in <code>public.user_roles</code> can query applications, reviews, and audit logs.</li>
            <li><strong>Internal Notes Isolation:</strong> Internal scores, complexity ratings, and reviewer notes in <code>public.application_reviews</code> are strictly isolated to authenticated administrators.</li>
            <li><strong>Public Read CMS:</strong> Published case studies, resources, and impact stats are readable by anyone, but writable only by administrators.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
