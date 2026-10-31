import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Calendar,
  Mail,
  PlayCircle,
  FileText,
  User,
  Building,
  Smartphone,
  Layers,
  Save,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Application, ApplicationStatus, PriorityLevel, ApplicationReview } from '../../types';
import { SevaStore } from '../../services/store';

interface ApplicationDetailModalProps {
  application: Application;
  onClose: () => void;
  onUpdateApp: (updated: Application) => void;
  onScheduleMeeting: (app: Application) => void;
  onComposeEmail: (app: Application) => void;
  onConvertToProject: (app: Application) => void;
}

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  application,
  onClose,
  onUpdateApp,
  onScheduleMeeting,
  onComposeEmail,
  onConvertToProject,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'internal_review' | 'workflow' | 'history'>('details');

  // Status Change State
  const [targetStatus, setTargetStatus] = useState<ApplicationStatus>(application.status);
  const [statusRemarks, setStatusRemarks] = useState('');
  const [approvalChecklist, setApprovalChecklist] = useState({
    reviewed: false,
    feasibilityConfirmed: false,
    contributionDiscussed: false,
  });
  const [rejectionReason, setRejectionReason] = useState('Scope does not align with current cohort criteria.');

  // Review & Scoring State
  const initialReview = application.reviews || {
    id: `rev-${Date.now()}`,
    application_id: application.id,
    reviewer_id: 'user-1',
    reviewer_name: 'SEVA Review Committee',
    review_date: new Date().toISOString(),
    internal_notes: '',
    assessment_summary: '',
    technical_feasibility: 'Medium',
    organisational_readiness: 'Medium',
    expected_impact: 'High',
    estimated_complexity: 'Medium',
    estimated_programme_cost: 60000,
    organisation_contribution_estimate: 18000, // 30%
    seva_contribution_estimate: 42000, // 70%
    score_relevance: 16,
    score_impact: 16,
    score_reach: 12,
    score_urgency: 12,
    score_readiness: 8,
    score_feasibility: 8,
    score_sustainability: 8,
    total_score: 80,
  };

  const [reviewData, setReviewData] = useState<ApplicationReview>(initialReview);
  const [selectedPriority, setSelectedPriority] = useState<PriorityLevel>(application.priority);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Auto-calculate score
  const updateScoreField = (field: keyof ApplicationReview, val: number) => {
    const updated = { ...reviewData, [field]: val };
    const total =
      (Number(field === 'score_relevance' ? val : updated.score_relevance) || 0) +
      (Number(field === 'score_impact' ? val : updated.score_impact) || 0) +
      (Number(field === 'score_reach' ? val : updated.score_reach) || 0) +
      (Number(field === 'score_urgency' ? val : updated.score_urgency) || 0) +
      (Number(field === 'score_readiness' ? val : updated.score_readiness) || 0) +
      (Number(field === 'score_feasibility' ? val : updated.score_feasibility) || 0) +
      (Number(field === 'score_sustainability' ? val : updated.score_sustainability) || 0);

    updated.total_score = total;

    // Auto-suggest priority if not manually changed
    if (total >= 85) setSelectedPriority('High');
    else if (total >= 60) setSelectedPriority('Medium');
    else setSelectedPriority('Low');

    setReviewData(updated);
  };

  // Cost calculation updates
  const handleCostChange = (totalCost: number) => {
    const cost = Math.max(0, totalCost);
    setReviewData({
      ...reviewData,
      estimated_programme_cost: cost,
      organisation_contribution_estimate: Math.round(cost * 0.3), // 30%
      seva_contribution_estimate: Math.round(cost * 0.7), // 70%
    });
  };

  // Save Review & Scoring
  const handleSaveReview = () => {
    const updated = SevaStore.saveApplicationReview(application.id, reviewData, selectedPriority);
    if (updated) {
      onUpdateApp(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  // Execute Status Transition
  const handleStatusChange = () => {
    if (targetStatus === 'Approved') {
      if (!approvalChecklist.reviewed || !approvalChecklist.feasibilityConfirmed || !approvalChecklist.contributionDiscussed) {
        alert('Please complete all pre-approval verification checklist items.');
        return;
      }
    }

    const remarks = targetStatus === 'Rejected'
      ? `Rejection Reason: ${rejectionReason}. Remarks: ${statusRemarks}`
      : statusRemarks;

    const updated = SevaStore.updateApplicationStatus(
      application.id,
      targetStatus,
      remarks,
      'SEVA Appraisal Desk'
    );

    if (updated) {
      onUpdateApp(updated);
      setStatusRemarks('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const allStatuses: ApplicationStatus[] = [
    'New Application',
    'Under Initial Review',
    'Additional Information Required',
    'Shortlisted',
    'Meeting Scheduled',
    'Approved',
    'Rejected',
    'On Hold',
    'Agreement Pending',
    'Implementation Started',
    'Implementation Completed',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-5 sm:px-8 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                {application.id}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Submitted on {new Date(application.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                application.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-stone-100 text-stone-700'
              }`}>
                {application.priority} Priority
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#172B24]">
              {application.name_of_organization}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              title="Print Summary"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Action Shortcuts */}
        <div className="px-5 sm:px-8 border-b border-stone-200 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'border-[#0B6643] text-[#0B6643]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              All 32 Submitted Fields
            </button>
            <button
              onClick={() => setActiveTab('internal_review')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'internal_review'
                  ? 'border-[#0B6643] text-[#0B6643]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Internal Review &amp; Scoring ({reviewData.total_score}/100)
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'workflow'
                  ? 'border-[#0B6643] text-[#0B6643]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Status Transition
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'history'
                  ? 'border-[#0B6643] text-[#0B6643]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Audit History ({application.status_history?.length || 0})
            </button>
          </div>

          {/* Action shortcuts */}
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => onScheduleMeeting(application)}
              className="px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Schedule Meeting</span>
            </button>

            <button
              onClick={() => onComposeEmail(application)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-stone-600" />
              <span>Send Email</span>
            </button>

            {application.status === 'Approved' && (
              <button
                onClick={() => onConvertToProject(application)}
                className="px-3 py-1.5 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Start Project</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8 text-stone-700 text-xs sm:text-sm">
          {saveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#0B6643] rounded-lg text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Changes updated successfully in system database!</span>
            </div>
          )}

          {/* TAB 1: ALL 32 SUBMITTED FIELDS */}
          {activeTab === 'details' && (
            <div className="space-y-8">
              {/* Section A */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0B6643] uppercase tracking-wider border-b border-stone-200 pb-2">
                  Section A: Organisational Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div><span className="text-stone-400 block text-[11px]">1. Organisation Name</span><strong>{application.name_of_organization}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">2. Organisation Type</span><strong>{application.type_of_organization}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">3. Year of Establishment</span><strong>{application.year_of_establishment}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">4. Registration Number</span><strong className="font-mono">{application.registration_number}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">5. State</span><strong>{application.state}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">6. District</span><strong>{application.district}</strong></div>
                  <div className="sm:col-span-3"><span className="text-stone-400 block text-[11px]">7. Registered Office Address</span>{application.organisation_address}</div>
                  <div><span className="text-stone-400 block text-[11px]">8. Website URL</span>{application.organisation_website ? <a href={application.organisation_website} target="_blank" rel="noreferrer" className="text-[#0B6643] underline">{application.organisation_website}</a> : 'Not Available'}</div>
                  <div><span className="text-stone-400 block text-[11px]">9. Organisation Email</span><strong>{application.organisation_email}</strong></div>
                </div>
              </div>

              {/* Section B */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0B6643] uppercase tracking-wider border-b border-stone-200 pb-2">
                  Section B: Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div><span className="text-stone-400 block text-[11px]">10. Contact Person Name</span><strong>{application.contact_person_name}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">11. Designation</span><strong>{application.designation}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">12. Contact Number</span><strong className="font-mono">+91 {application.contact_number}</strong></div>
                </div>
              </div>

              {/* Section C */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0B6643] uppercase tracking-wider border-b border-stone-200 pb-2">
                  Section C: Organisational Profile
                </h3>
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div><span className="text-stone-400 block text-[11px]">13. Brief Description</span><p className="leading-relaxed">{application.brief_description}</p></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div><span className="text-stone-400 block text-[11px]">14. Key Areas of Work</span><strong>{application.key_areas_of_work?.join(', ')}</strong></div>
                    <div><span className="text-stone-400 block text-[11px]">15. Villages Covered</span><strong>{application.villages_covered}</strong></div>
                    <div><span className="text-stone-400 block text-[11px]">16. Geographical Area of Operation</span><strong>{application.geographical_area_of_operation}</strong></div>
                    <div><span className="text-stone-400 block text-[11px]">17. Annual Beneficiaries Reached</span><strong className="tabular-nums font-mono">{application.annual_beneficiaries_reached.toLocaleString('en-IN')}</strong></div>
                    <div className="sm:col-span-2"><span className="text-stone-400 block text-[11px]">18. Primary Beneficiaries</span><strong>{application.primary_beneficiaries}</strong></div>
                  </div>
                </div>
              </div>

              {/* Section D */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0B6643] uppercase tracking-wider border-b border-stone-200 pb-2">
                  Section D: Existing Digital Infrastructure
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div><span className="text-stone-400 block text-[11px]">19. Currently Has Website?</span><strong>{application.has_website ? 'Yes' : 'No'}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">20. Currently Uses MIS?</span><strong>{application.has_mis_system ? 'Yes' : 'No'}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">21. Current Digital Tools</span><strong>{application.current_digital_tools?.join(', ') || 'None'}</strong></div>
                </div>
              </div>

              {/* Section E */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0B6643] uppercase tracking-wider border-b border-stone-200 pb-2">
                  Section E: Technology Challenges &amp; Requirements
                </h3>
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div><span className="text-stone-400 block text-[11px]">22. Major Technology Challenges</span><p className="leading-relaxed">{application.major_technology_challenges}</p></div>
                  <div><span className="text-stone-400 block text-[11px]">23. Type of Support Seeking</span><strong>{application.support_type_seeking?.join(', ')}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">24. Description of Solution Needed</span><p className="leading-relaxed">{application.description_of_solution_needed}</p></div>
                  <div><span className="text-stone-400 block text-[11px]">25. Main Problem to Solve</span><p className="leading-relaxed">{application.main_problem_to_solve}</p></div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div><span className="text-stone-400 block text-[11px]">26. Intended Users</span><strong>{application.intended_users}</strong></div>
                    <div><span className="text-stone-400 block text-[11px]">27. Estimated Number of Users</span><strong>{application.estimated_users_count}</strong></div>
                  </div>
                </div>
              </div>

              {/* Section F & G */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0B6643] uppercase tracking-wider border-b border-stone-200 pb-2">
                  Section F &amp; G: Previous Experience, Priority &amp; Timeline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div><span className="text-stone-400 block text-[11px]">28. Previous Tech Project?</span><strong>{application.has_previous_digital_project ? 'Yes' : 'No'}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">29. Previous Project Details</span>{application.previous_digital_project_details || 'N/A'}</div>
                  <div><span className="text-stone-400 block text-[11px]">30. Requirement Urgency</span><strong>{application.requirement_urgency}</strong></div>
                  <div><span className="text-stone-400 block text-[11px]">31. Preferred Timeline</span><strong>{application.preferred_timeline}</strong></div>
                  <div className="sm:col-span-2"><span className="text-stone-400 block text-[11px]">32. First Priority Support</span><strong className="text-stone-900 text-sm font-bold">{application.first_priority_support}</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERNAL REVIEW & NUMERICAL SCORING (Part 8.3 & 8.4) */}
          {activeTab === 'internal_review' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#D97706]" />
                <span><strong>Internal Appraisal Panel:</strong> These notes, scores, and cost calculations are strictly confidential and never visible to the applicant.</span>
              </div>

              {/* Numerical Scoring System (0 to 100) */}
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900">
                    Weighted Priority Assessment Criteria
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 font-semibold">Total Score:</span>
                    <span className="text-2xl font-mono font-extrabold text-[#0B6643] tabular-nums">
                      {reviewData.total_score} / 100
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Relevance of Tech Need (0–20)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={reviewData.score_relevance}
                      onChange={(e) => updateScoreField('score_relevance', parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Potential Impact (0–20)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={reviewData.score_impact}
                      onChange={(e) => updateScoreField('score_impact', parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Reach &amp; Scale (0–15)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={15}
                      value={reviewData.score_reach}
                      onChange={(e) => updateScoreField('score_reach', parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Urgency (0–15)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={15}
                      value={reviewData.score_urgency}
                      onChange={(e) => updateScoreField('score_urgency', parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Org Readiness (0–10)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={reviewData.score_readiness}
                      onChange={(e) => updateScoreField('score_readiness', parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Tech Feasibility (0–10)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={reviewData.score_feasibility}
                      onChange={(e) => updateScoreField('score_feasibility', parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Sustainability &amp; Ownership (0–10)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={reviewData.score_sustainability}
                      onChange={(e) => updateScoreField('score_sustainability', parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Assigned Priority Level
                    </label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value as PriorityLevel)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-semibold"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Qualitative Appraisal Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Technical Feasibility</label>
                  <select
                    value={reviewData.technical_feasibility}
                    onChange={(e) => setReviewData({ ...reviewData, technical_feasibility: e.target.value as any })}
                    className="w-full p-2 rounded border border-stone-200 bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Organisational Readiness</label>
                  <select
                    value={reviewData.organisational_readiness}
                    onChange={(e) => setReviewData({ ...reviewData, organisational_readiness: e.target.value as any })}
                    className="w-full p-2 rounded border border-stone-200 bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Expected Impact</label>
                  <select
                    value={reviewData.expected_impact}
                    onChange={(e) => setReviewData({ ...reviewData, expected_impact: e.target.value as any })}
                    className="w-full p-2 rounded border border-stone-200 bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Implementation Complexity</label>
                  <select
                    value={reviewData.estimated_complexity}
                    onChange={(e) => setReviewData({ ...reviewData, estimated_complexity: e.target.value as any })}
                    className="w-full p-2 rounded border border-stone-200 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Financial Estimates & 70-30 Breakdown */}
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Cost-Sharing Estimation (INR)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-600 text-xs font-semibold mb-1">
                      Total Estimated Programme Cost (₹)
                    </label>
                    <input
                      type="number"
                      step={5000}
                      value={reviewData.estimated_programme_cost}
                      onChange={(e) => handleCostChange(parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-bold text-sm"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] font-semibold text-[#0B6643] block">
                      SEVA Subsidy (70%)
                    </span>
                    <span className="text-base font-bold font-mono text-[#064E36] tabular-nums">
                      ₹{reviewData.seva_contribution_estimate.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <span className="text-[11px] font-semibold text-[#D97706] block">
                      Organisation 30% Contribution
                    </span>
                    <span className="text-base font-bold font-mono text-[#D97706] tabular-nums">
                      ₹{reviewData.organisation_contribution_estimate.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Notes & Assessment Summary */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Internal Review Notes
                  </label>
                  <textarea
                    rows={3}
                    value={reviewData.internal_notes}
                    onChange={(e) => setReviewData({ ...reviewData, internal_notes: e.target.value })}
                    placeholder="Enter confidential technical notes from meetings, field checks, animator feedback..."
                    className="w-full p-3 rounded-lg border border-stone-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0B6643]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Assessment Summary
                  </label>
                  <textarea
                    rows={2}
                    value={reviewData.assessment_summary}
                    onChange={(e) => setReviewData({ ...reviewData, assessment_summary: e.target.value })}
                    placeholder="Final executive appraisal summary for the approval committee..."
                    className="w-full p-3 rounded-lg border border-stone-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0B6643]/30"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveReview}
                  className="px-6 py-2.5 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Review &amp; Scoring</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: STATUS WORKFLOW (Part 8.5 & 8.6) */}
          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-xs text-stone-500 font-semibold uppercase">Current Status</div>
                <div className="text-lg font-bold text-[#0B6643] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0B6643]" />
                  <span>{application.status}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Transition Application Status To:
                  </label>
                  <select
                    value={targetStatus}
                    onChange={(e) => setTargetStatus(e.target.value as ApplicationStatus)}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-sm font-semibold"
                  >
                    {allStatuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* Pre-approval verification checklist (Part 8.6) */}
                {targetStatus === 'Approved' && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <span className="font-bold text-emerald-950 text-xs block">
                      Mandatory Pre-Approval Verification Checklist:
                    </span>
                    <label className="flex items-center gap-2 text-xs text-emerald-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={approvalChecklist.reviewed}
                        onChange={(e) => setApprovalChecklist({ ...approvalChecklist, reviewed: e.target.checked })}
                        className="text-[#0B6643]"
                      />
                      <span>Application has been thoroughly reviewed and technical scores are logged.</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-emerald-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={approvalChecklist.feasibilityConfirmed}
                        onChange={(e) => setApprovalChecklist({ ...approvalChecklist, feasibilityConfirmed: e.target.checked })}
                        className="text-[#0B6643]"
                      />
                      <span>Scope of work and timeline are technically feasible for the rural deployment team.</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-emerald-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={approvalChecklist.contributionDiscussed}
                        onChange={(e) => setApprovalChecklist({ ...approvalChecklist, contributionDiscussed: e.target.checked })}
                        className="text-[#0B6643]"
                      />
                      <span>70-30 cost sharing model has been discussed with leadership and confirmed.</span>
                    </label>
                  </div>
                )}

                {/* Rejection reason dialogue (Part 8.6) */}
                {targetStatus === 'Rejected' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
                    <span className="font-bold text-red-950 text-xs block">
                      Select Rejection Reason:
                    </span>
                    <select
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full p-2 rounded border border-red-200 bg-white text-xs"
                    >
                      <option value="Scope does not align with current cohort criteria.">Scope does not align with current cohort criteria.</option>
                      <option value="Proposed system exceeds current technical or bandwidth feasibility.">Proposed system exceeds current technical or bandwidth feasibility.</option>
                      <option value="Organisation scale or field presence is outside our operational geography.">Organisation scale or field presence is outside our operational geography.</option>
                      <option value="Cost-sharing 30% contribution was declined by applicant.">Cost-sharing 30% contribution was declined by applicant.</option>
                      <option value="Duplicate or incomplete application submission.">Duplicate or incomplete application submission.</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Internal Remarks &amp; Audit Justification:
                  </label>
                  <textarea
                    rows={3}
                    value={statusRemarks}
                    onChange={(e) => setStatusRemarks(e.target.value)}
                    placeholder="Provide specific justification for this status change (saved into permanent audit history)..."
                    className="w-full p-3 rounded-lg border border-stone-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0B6643]/30"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStatusChange}
                    className="px-6 py-2.5 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-bold cursor-pointer shadow-xs"
                  >
                    Confirm &amp; Record Status Change
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT HISTORY (Part 8.5) */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">
                Application Audit &amp; Status Progression Trail
              </h3>
              <div className="space-y-3">
                {(application.status_history || []).map((sh) => (
                  <div key={sh.id} className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">
                        {sh.previous_status} &rarr; <span className="text-[#0B6643]">{sh.new_status}</span>
                      </span>
                      <span className="text-stone-400 font-mono">
                        {new Date(sh.changed_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </span>
                    </div>
                    <div className="text-stone-600">
                      <strong>By:</strong> {sh.changed_by}
                    </div>
                    {sh.internal_remarks && (
                      <p className="text-stone-500 italic mt-1 bg-white p-2 rounded border border-stone-100">
                        "{sh.internal_remarks}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
