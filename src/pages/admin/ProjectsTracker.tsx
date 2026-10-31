import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Layers,
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  FileCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ProgrammeProject, ProjectMilestone } from '../../types';
import { SevaStore } from '../../services/store';

interface ProjectsTrackerProps {
  projects: ProgrammeProject[];
  onRefreshProjects: () => void;
}

export const ProjectsTracker: React.FC<ProjectsTrackerProps> = ({
  projects,
  onRefreshProjects,
}) => {
  const [expandedProjectId, setExpandedProjectId] = useState<string>(projects[0]?.id || '');

  const handleUpdateMilestone = (
    projectId: string,
    milestoneId: string,
    newStatus: 'Not Started' | 'In Progress' | 'Completed'
  ) => {
    SevaStore.updateProjectMilestone(projectId, milestoneId, newStatus);
    onRefreshProjects();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">
          Active Programme Implementation Tracker
        </h2>
        <p className="text-xs text-stone-500">
          Tracking the 9-stage engineering &amp; capacity lifecycle for approved grassroots partner organisations
        </p>
      </div>

      <div className="space-y-6">
        {projects.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-stone-200 text-stone-400 text-xs">
            No active projects. Approve an application to start implementation tracking.
          </div>
        ) : (
          projects.map((proj) => {
            const isExpanded = expandedProjectId === proj.id;
            const completedCount = proj.milestones.filter((m) => m.status === 'Completed').length;
            const progressPct = Math.round((completedCount / proj.milestones.length) * 100);

            return (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs space-y-4"
              >
                {/* Project Header */}
                <div
                  onClick={() => setExpandedProjectId(isExpanded ? '' : proj.id)}
                  className="p-6 hover:bg-stone-50/70 transition-colors cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                        {proj.application_id}
                      </span>
                      <span className="text-xs text-stone-500">
                        {proj.district}, {proj.state}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {proj.implementation_status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900">
                      {proj.organisation_name}
                    </h3>

                    <p className="text-xs text-stone-500">
                      Approved Areas: {proj.approved_support_areas.join(', ')}
                    </p>
                  </div>

                  {/* Progress & Financials Summary */}
                  <div className="flex flex-wrap items-center gap-6 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-stone-500">
                        <span>Milestones: {completedCount} of 9</span>
                        <span className="font-bold text-[#0B6643]">{progressPct}%</span>
                      </div>
                      <div className="w-36 h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0B6643] rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-stone-400 block">Total Programme Cost</span>
                      <span className="font-bold font-mono text-stone-900">
                        ₹{proj.agreed_programme_cost.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        SEVA 70% (₹{proj.seva_support_contribution.toLocaleString('en-IN')}) · NGO 30% (₹{proj.organisation_contribution.toLocaleString('en-IN')})
                      </span>
                    </div>

                    <div className="text-stone-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Milestones & Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-stone-100 space-y-6 text-xs">
                    {/* Assigned Team & Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                      <div>
                        <span className="text-stone-500 font-semibold block mb-0.5">Assigned Technical Lead</span>
                        <strong className="text-stone-800">{proj.assigned_technical_lead}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 font-semibold block mb-0.5">Timeline Window</span>
                        <span className="font-mono text-stone-700">
                          {proj.start_date} &rarr; {proj.expected_completion_date} ({proj.project_duration_months} Months)
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-500 font-semibold block mb-0.5">Review Meetings Held</span>
                        <span className="font-mono font-bold text-stone-800">{proj.review_meetings_count} sessions</span>
                      </div>
                    </div>

                    {/* 9-Stage Milestones Accordion/List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        9-Stage Implementation Roadmap:
                      </h4>

                      <div className="space-y-2.5">
                        {proj.milestones.map((m) => (
                          <div
                            key={m.id}
                            className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              m.status === 'Completed'
                                ? 'bg-emerald-50/50 border-emerald-200'
                                : m.status === 'In Progress'
                                ? 'bg-amber-50/50 border-amber-200'
                                : 'bg-white border-stone-200'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-stone-900">{m.title}</span>
                                <span className="text-[11px] font-mono text-stone-400">
                                  Target: {m.target_date}
                                </span>
                              </div>
                              <p className="text-stone-600 text-[11px] leading-snug">
                                {m.description}
                              </p>
                              {m.notes && (
                                <p className="text-[#0B6643] text-[11px] italic font-medium">
                                  Note: {m.notes}
                                </p>
                              )}
                            </div>

                            {/* Milestone Status Toggle */}
                            <div className="flex items-center gap-2 shrink-0">
                              <select
                                value={m.status}
                                onChange={(e) => handleUpdateMilestone(proj.id, m.id, e.target.value as any)}
                                className={`p-1.5 rounded-lg border text-xs font-semibold ${
                                  m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                                  m.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                                  'bg-stone-50 text-stone-700 border-stone-200'
                                }`}
                              >
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
