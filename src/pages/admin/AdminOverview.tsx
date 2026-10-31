import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  XCircle,
  PauseCircle,
  PlayCircle,
  Award,
  Layers,
  TrendingUp,
  MapPin,
  Building,
  ArrowUpRight,
} from 'lucide-react';
import { Application, ProgrammeProject, Meeting } from '../../types';

interface AdminOverviewProps {
  applications: Application[];
  projects: ProgrammeProject[];
  meetings: Meeting[];
  onSelectApplication: (app: Application) => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  applications,
  projects,
  meetings,
  onSelectApplication,
  onNavigateTab,
}) => {
  // Count by status
  const counts = {
    total: applications.length,
    new: applications.filter((a) => a.status === 'New Application').length,
    underReview: applications.filter((a) => a.status === 'Under Initial Review' || a.status === 'Additional Information Required').length,
    shortlisted: applications.filter((a) => a.status === 'Shortlisted').length,
    meetingScheduled: applications.filter((a) => a.status === 'Meeting Scheduled').length,
    approved: applications.filter((a) => a.status === 'Approved' || a.status === 'Agreement Pending').length,
    rejected: applications.filter((a) => a.status === 'Rejected').length,
    onHold: applications.filter((a) => a.status === 'On Hold').length,
    ongoing: projects.filter((p) => p.implementation_status !== 'Completed').length,
    completed: projects.filter((p) => p.implementation_status === 'Completed').length,
  };

  // State distribution
  const stateDist: { [key: string]: number } = {};
  applications.forEach((a) => {
    stateDist[a.state] = (stateDist[a.state] || 0) + 1;
  });

  // Org type distribution
  const orgTypeDist: { [key: string]: number } = {};
  applications.forEach((a) => {
    orgTypeDist[a.type_of_organization] = (orgTypeDist[a.type_of_organization] || 0) + 1;
  });

  // Priority distribution
  const priorityDist = {
    High: applications.filter((a) => a.priority === 'High').length,
    Medium: applications.filter((a) => a.priority === 'Medium').length,
    Low: applications.filter((a) => a.priority === 'Low').length,
  };

  // Support requirement distribution
  const supportDist: { [key: string]: number } = {};
  applications.forEach((a) => {
    (a.support_type_seeking || []).forEach((s) => {
      supportDist[s] = (supportDist[s] || 0) + 1;
    });
  });

  return (
    <div className="space-y-8">
      {/* 1. Metric Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-stone-900 tracking-tight">
            Application Pipeline &amp; Programme Metrics
          </h2>
          <span className="text-xs text-stone-500 font-mono">Real-time status</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-500 font-medium">Total Applications</span>
            <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">{counts.total}</div>
            <span className="text-[11px] text-stone-400">All received to date</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-blue-200/80 shadow-xs space-y-1">
            <span className="text-xs text-blue-700 font-medium">New Submissions</span>
            <div className="text-2xl font-bold font-mono text-blue-800 tabular-nums">{counts.new}</div>
            <span className="text-[11px] text-blue-600/70">Awaiting initial triage</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200/80 shadow-xs space-y-1">
            <span className="text-xs text-amber-700 font-medium">Under Review</span>
            <div className="text-2xl font-bold font-mono text-amber-800 tabular-nums">{counts.underReview}</div>
            <span className="text-[11px] text-amber-600/70">Appraisal in progress</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-purple-200/80 shadow-xs space-y-1">
            <span className="text-xs text-purple-700 font-medium">Shortlisted</span>
            <div className="text-2xl font-bold font-mono text-purple-800 tabular-nums">{counts.shortlisted}</div>
            <span className="text-[11px] text-purple-600/70">High impact alignment</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-indigo-200/80 shadow-xs space-y-1">
            <span className="text-xs text-indigo-700 font-medium">Meetings Scheduled</span>
            <div className="text-2xl font-bold font-mono text-indigo-800 tabular-nums">{counts.meetingScheduled}</div>
            <span className="text-[11px] text-indigo-600/70">Scoping dialogue active</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-emerald-200/80 shadow-xs space-y-1">
            <span className="text-xs text-[#0B6643] font-medium">Approved</span>
            <div className="text-2xl font-bold font-mono text-[#064E36] tabular-nums">{counts.approved}</div>
            <span className="text-[11px] text-emerald-600">Scope &amp; 30% confirmed</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-600 font-medium">On Hold</span>
            <div className="text-2xl font-bold font-mono text-stone-700 tabular-nums">{counts.onHold}</div>
            <span className="text-[11px] text-stone-400">Next cohort consideration</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-red-200/80 shadow-xs space-y-1">
            <span className="text-xs text-red-700 font-medium">Rejected</span>
            <div className="text-2xl font-bold font-mono text-red-800 tabular-nums">{counts.rejected}</div>
            <span className="text-[11px] text-red-500">Not aligned with cohort</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-emerald-300 shadow-xs space-y-1">
            <span className="text-xs text-[#0B6643] font-semibold">Active Projects</span>
            <div className="text-2xl font-bold font-mono text-[#0B6643] tabular-nums">{counts.ongoing}</div>
            <span className="text-[11px] text-emerald-700">Implementation ongoing</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-600 font-medium">Completed</span>
            <div className="text-2xl font-bold font-mono text-stone-800 tabular-nums">{counts.completed}</div>
            <span className="text-[11px] text-stone-500">Deployed &amp; handed over</span>
          </div>
        </div>
      </div>

      {/* 2. Analytical Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Requirements Breakdown */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-stone-900 flex items-center justify-between">
            <span>Applications by Support Requirement</span>
            <span className="text-xs text-stone-400 font-normal">Count</span>
          </h3>
          <div className="space-y-3 pt-1">
            {Object.entries(supportDist).map(([key, val]) => {
              const pct = Math.round((val / (applications.length || 1)) * 100);
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs text-stone-700">
                    <span className="truncate pr-2">{key}</span>
                    <span className="font-mono font-semibold tabular-nums">{val} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0B6643] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority & Organisation Type Grid */}
        <div className="space-y-6">
          {/* Priority Breakdown */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900">
              Applications by Priority Assessment
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200/70">
                <div className="text-xs text-red-700 font-semibold">High Priority</div>
                <div className="text-xl font-bold font-mono text-red-900 tabular-nums mt-1">{priorityDist.High}</div>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/70">
                <div className="text-xs text-amber-700 font-semibold">Medium Priority</div>
                <div className="text-xl font-bold font-mono text-amber-900 tabular-nums mt-1">{priorityDist.Medium}</div>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-xs text-stone-600 font-semibold">Low Priority</div>
                <div className="text-xl font-bold font-mono text-stone-800 tabular-nums mt-1">{priorityDist.Low}</div>
              </div>
            </div>
          </div>

          {/* Org Type Distribution */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900">
              Organisation Legal Structure
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(orgTypeDist).map(([type, count]) => (
                <div key={type} className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                  <span className="font-medium">{type}</span>
                  <span className="font-mono font-bold text-[#0B6643] bg-white px-1.5 py-0.5 rounded border border-stone-200 tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Urgent Action Queue & Recent Applications */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-stone-900">
              Recent Application Queue
            </h3>
            <p className="text-xs text-stone-500">
              Review, score, and update status directly
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('applications')}
            className="text-xs font-semibold text-[#0B6643] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Applications</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-stone-100">
          {applications.slice(0, 5).map((app) => (
            <div
              key={app.id}
              className="p-4 sm:px-6 hover:bg-stone-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                    {app.id}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    app.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {app.priority} Priority
                  </span>
                  <span className="text-xs text-stone-400">·</span>
                  <span className="text-xs text-stone-500">{app.district}, {app.state}</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  {app.name_of_organization}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-1">
                  Seeking: {app.support_type_seeking.join(', ')} · Contact: {app.contact_person_name} ({app.contact_number})
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                  {app.status}
                </span>
                <button
                  onClick={() => onSelectApplication(app)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-md transition-colors cursor-pointer"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
