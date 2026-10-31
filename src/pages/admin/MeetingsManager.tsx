import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  Plus,
  Send,
  Download,
  CheckCircle2,
  XCircle,
  FileText,
} from 'lucide-react';
import { Meeting, Application } from '../../types';
import { SevaStore } from '../../services/store';

interface MeetingsManagerProps {
  meetings: Meeting[];
  applications: Application[];
  onRefreshMeetings: () => void;
  preselectedApp?: Application | null;
}

export const MeetingsManager: React.FC<MeetingsManagerProps> = ({
  meetings,
  applications,
  onRefreshMeetings,
  preselectedApp,
}) => {
  const [showScheduleModal, setShowScheduleModal] = useState(!!preselectedApp);
  const [selectedAppId, setSelectedAppId] = useState(preselectedApp?.id || (applications[0]?.id || ''));

  const [formData, setFormData] = useState({
    title: preselectedApp ? `Technology Scoping Discussion: ${preselectedApp.name_of_organization}` : 'Technology Scoping Discussion',
    meeting_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    start_time: '11:00',
    end_time: '12:00',
    mode: 'Online' as 'Online' | 'Offline',
    platform: 'Google Meet' as 'Google Meet' | 'Zoom' | 'In-Person',
    meeting_link: 'https://meet.google.com/sev-tech-scoping',
    venue: '',
    agenda: '1. Review ground paper registers and data collection workflow.\n2. Discuss mobile/MIS system feasibility for rural staff.\n3. Outline 70-30 cost sharing model and agree on next steps.',
    internal_remarks: 'Pre-meeting notes.',
  });

  const selectedApp = applications.find((a) => a.id === selectedAppId);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    SevaStore.scheduleMeeting({
      application_id: selectedApp.id,
      organisation_name: selectedApp.name_of_organization,
      contact_email: selectedApp.organisation_email,
      contact_person: selectedApp.contact_person_name,
      title: formData.title,
      meeting_date: formData.meeting_date,
      start_time: formData.start_time,
      end_time: formData.end_time,
      mode: formData.mode,
      platform: formData.platform,
      meeting_link: formData.mode === 'Online' ? formData.meeting_link : undefined,
      venue: formData.mode === 'Offline' ? formData.venue : undefined,
      agenda: formData.agenda,
      internal_remarks: formData.internal_remarks,
      status: 'Scheduled',
      created_by: 'SEVA Secretariat',
      email_sent: true,
    });

    setShowScheduleModal(false);
    onRefreshMeetings();
  };

  // Generate .ICS Calendar Invite File
  const downloadIcs = (m: Meeting) => {
    const startDate = `${m.meeting_date.replace(/-/g, '')}T${m.start_time.replace(/:/g, '')}00`;
    const endDate = `${m.meeting_date.replace(/-/g, '')}T${m.end_time.replace(/:/g, '')}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SEVA//Technology Support Secretariat//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${m.title}`,
      `DESCRIPTION:${m.agenda.replace(/\n/g, '\\n')}`,
      `LOCATION:${m.mode === 'Online' ? m.meeting_link || 'Online' : m.venue || 'SEVA Office Ralegaon'}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `SEVA_Meeting_${m.application_id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Meeting Scheduling &amp; Dialogues
          </h2>
          <p className="text-xs text-stone-500">
            Coordinate virtual or in-person technical scoping sessions with shortlisted organisations
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Scoping Session</span>
        </button>
      </div>

      {/* Meetings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {meetings.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-xl border border-stone-200 text-stone-400 text-xs">
            No meetings currently scheduled. Click "Schedule New Scoping Session" above.
          </div>
        ) : (
          meetings.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                    {m.application_id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    m.status === 'Completed' ? 'bg-emerald-50 text-emerald-800' :
                    m.status === 'Cancelled' ? 'bg-red-50 text-red-800' :
                    'bg-indigo-50 text-indigo-800'
                  }`}>
                    {m.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-stone-900 line-clamp-1">{m.title}</h3>
                  <p className="text-xs text-stone-500">{m.organisation_name}</p>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-2 font-mono">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#0B6643]" />
                    <span>{m.meeting_date} · {m.start_time} - {m.end_time} IST</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {m.mode === 'Online' ? (
                      <Video className="w-3.5 h-3.5 text-indigo-600" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span className="truncate">{m.mode === 'Online' ? (m.meeting_link || m.platform) : m.venue}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-stone-50 border border-stone-100 text-[11px] text-stone-600 line-clamp-2">
                  <strong>Agenda:</strong> {m.agenda}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => downloadIcs(m)}
                  className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                  title="Download .ICS calendar file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Calendar .ics</span>
                </button>

                {m.status === 'Scheduled' && (
                  <button
                    onClick={() => {
                      SevaStore.updateMeetingStatus(m.id, 'Completed');
                      onRefreshMeetings();
                    }}
                    className="text-[11px] font-semibold text-[#0B6643] hover:underline cursor-pointer"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleScheduleSubmit}
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold text-stone-900">
                Schedule Technology Scoping Session
              </h3>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Select Organisation *</label>
                <select
                  value={selectedAppId}
                  onChange={(e) => {
                    setSelectedAppId(e.target.value);
                    const app = applications.find((a) => a.id === e.target.value);
                    if (app) {
                      setFormData({
                        ...formData,
                        title: `Technology Scoping Discussion: ${app.name_of_organization}`,
                      });
                    }
                  }}
                  className="w-full p-2.5 rounded-lg border border-stone-200 bg-white font-semibold"
                >
                  {applications.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.id} - {a.name_of_organization} ({a.district})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Meeting Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.meeting_date}
                    onChange={(e) => setFormData({ ...formData, meeting_date: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Start Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">End Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Mode *</label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value as any })}
                    className="w-full p-2 rounded-lg border border-stone-200 bg-white"
                  >
                    <option value="Online">Online Virtual Meeting</option>
                    <option value="Offline">In-Person / Office Visit</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Platform / Type</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                    className="w-full p-2 rounded-lg border border-stone-200 bg-white"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="In-Person">In-Person</option>
                  </select>
                </div>
              </div>

              {formData.mode === 'Online' ? (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Meeting Link *</label>
                  <input
                    type="url"
                    required
                    value={formData.meeting_link}
                    onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 font-mono"
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Venue Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g. SEVA Registered Office, Ralegaon, Yavatmal"
                    className="w-full p-2 rounded-lg border border-stone-200"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-stone-700 mb-1">Agenda *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.agenda}
                  onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                  className="w-full p-2 rounded-lg border border-stone-200"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 rounded-lg border border-stone-200 text-stone-600 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save &amp; Dispatch Invitation</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
