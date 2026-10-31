import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  FileText,
  Clock,
  Eye,
  RefreshCw,
  Search,
} from 'lucide-react';
import { EmailTemplate, EmailLog, Application } from '../../types';
import { SevaStore } from '../../services/store';

interface EmailManagerProps {
  applications: Application[];
  preselectedApp?: Application | null;
}

export const EmailManager: React.FC<EmailManagerProps> = ({
  applications,
  preselectedApp,
}) => {
  const templates = SevaStore.getEmailTemplates();
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>(SevaStore.getEmailLogs());
  const [selectedAppId, setSelectedAppId] = useState(preselectedApp?.id || (applications[0]?.id || ''));
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || '');

  const selectedApp = applications.find((a) => a.id === selectedAppId);
  const currentTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  // Helper to replace template tags
  const renderTemplateTokens = (text: string, app?: Application): string => {
    if (!app) return text;
    return text
      .replace(/{{contact_person}}/g, app.contact_person_name)
      .replace(/{{organisation_name}}/g, app.name_of_organization)
      .replace(/{{application_id}}/g, app.id)
      .replace(/{{district}}/g, app.district)
      .replace(/{{state}}/g, app.state)
      .replace(/{{support_areas}}/g, app.support_type_seeking.join(', '))
      .replace(/{{meeting_date}}/g, '5 November 2026')
      .replace(/{{meeting_time}}/g, '11:00 AM IST')
      .replace(/{{meeting_mode}}/g, 'Virtual Google Meet')
      .replace(/{{meeting_link}}/g, 'https://meet.google.com/sev-tech-scoping')
      .replace(/{{project_duration}}/g, '4 Months')
      .replace(/{{assigned_lead}}/g, 'Pravin R. (SEVA Lead Technologist)')
      .replace(/{{milestone_title}}/g, 'Stage 1: Needs Assessment')
      .replace(/{{milestone_status}}/g, 'In Progress')
      .replace(/{{milestone_notes}}/g, 'Field interviews completed across 12 villages.')
      .replace(/{{rejection_reason}}/g, 'Scope exceeds technical feasibility for current cohort.');
  };

  const [subject, setSubject] = useState(renderTemplateTokens(currentTemplate?.subject || '', selectedApp));
  const [body, setBody] = useState(renderTemplateTokens(currentTemplate?.body || '', selectedApp));
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  // When changing template or application, re-populate tokens
  const handleTemplateChange = (tplId: string) => {
    setSelectedTemplateId(tplId);
    const tpl = templates.find((t) => t.id === tplId);
    if (tpl) {
      setSubject(renderTemplateTokens(tpl.subject, selectedApp));
      setBody(renderTemplateTokens(tpl.body, selectedApp));
    }
  };

  const handleAppChange = (appId: string) => {
    setSelectedAppId(appId);
    const app = applications.find((a) => a.id === appId);
    if (app && currentTemplate) {
      setSubject(renderTemplateTokens(currentTemplate.subject, app));
      setBody(renderTemplateTokens(currentTemplate.body, app));
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setSending(true);
    setTimeout(() => {
      const newLog = SevaStore.sendEmail({
        application_id: selectedApp.id,
        recipient_email: selectedApp.organisation_email,
        recipient_name: selectedApp.contact_person_name,
        subject,
        body,
        template_used: currentTemplate?.category,
        sent_by: 'SEVA Operations Secretariat',
      });

      setEmailLogs(SevaStore.getEmailLogs());
      setSending(false);
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">
          Email Communication &amp; Transactional Notifications
        </h2>
        <p className="text-xs text-stone-500">
          Official templates powered by Resend with dynamic variable token replacement
        </p>
      </div>

      {sendSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-[#064E36] rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#0B6643]" />
          <span>Official email successfully transmitted and recorded in communication logs!</span>
        </div>
      )}

      {/* Composer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Template Selector & Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              1. Select Recipient &amp; Template
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Recipient Organisation *
              </label>
              <select
                value={selectedAppId}
                onChange={(e) => handleAppChange(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs font-medium"
              >
                {applications.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id} - {a.name_of_organization} ({a.organisation_email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Official Email Template (10 Available) *
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs font-semibold text-[#0B6643]"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedApp && (
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1 text-stone-600">
                <div><strong>To:</strong> {selectedApp.contact_person_name} &lt;{selectedApp.organisation_email}&gt;</div>
                <div><strong>Location:</strong> {selectedApp.district}, {selectedApp.state}</div>
                <div><strong>Current Status:</strong> <span className="font-semibold text-stone-800">{selectedApp.status}</span></div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Message Editor & Preview */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSendEmail}
            className="bg-white rounded-xl border border-stone-200 p-6 space-y-5 shadow-xs"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              2. Review, Customize &amp; Dispatch
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Subject Line *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-stone-200 text-xs sm:text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Message Body *
              </label>
              <textarea
                required
                rows={11}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-3 rounded-lg border border-stone-200 text-xs leading-relaxed font-mono whitespace-pre-wrap"
              />
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 text-[11px] text-stone-500">
              <strong>Official Sender Signature:</strong> SEVA – Sustainable Ecology &amp; Rural Advancement · 31 B, Jalka, Ralegaon, Yavatmal, Maharashtra.
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2.5 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {sending ? <span>Transmitting...</span> : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Official Email</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sent Email Logs Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-stone-100 font-bold text-xs text-stone-800">
          Sent Email History &amp; Delivery Audit Logs
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200 text-[11px]">
              <tr>
                <th className="py-2.5 px-4">Application ID</th>
                <th className="py-2.5 px-4">Recipient</th>
                <th className="py-2.5 px-4">Subject</th>
                <th className="py-2.5 px-4">Template</th>
                <th className="py-2.5 px-4">Sent At (IST)</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {emailLogs.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50/70">
                  <td className="py-2.5 px-4 font-mono font-bold">{log.application_id || 'N/A'}</td>
                  <td className="py-2.5 px-4">{log.recipient_name} ({log.recipient_email})</td>
                  <td className="py-2.5 px-4 max-w-[240px] truncate" title={log.subject}>{log.subject}</td>
                  <td className="py-2.5 px-4 font-medium text-stone-600">{log.template_used || 'Custom'}</td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-stone-500">
                    {new Date(log.sent_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
