import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  Printer,
  Copy,
  Check,
  Building,
  User,
  Laptop,
  Layers,
  Clock,
  Send,
} from 'lucide-react';
import { SevaStore } from '../services/store';
import { Application } from '../types';
import { insertApplicationToSupabase, SUPABASE_PROJECT_ID } from '../services/supabase';

interface ApplyPageProps {
  onNavigate: (view: string) => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 32 Form Fields State
  const [formData, setFormData] = useState({
    // SECTION A: ORGANISATIONAL INFORMATION
    name_of_organization: '', // 1
    type_of_organization: 'Society', // 2
    year_of_establishment: 2018, // 3
    registration_number: '', // 4
    state: 'Maharashtra', // 5
    district: 'Yavatmal', // 6
    organisation_address: '', // 7
    organisation_website: '', // 8
    organisation_email: '', // 9

    // SECTION B: CONTACT INFORMATION
    contact_person_name: '', // 10
    designation: '', // 11
    contact_number: '', // 12

    // SECTION C: ORGANISATIONAL PROFILE
    brief_description: '', // 13
    key_areas_of_work: ['Agriculture', 'Livelihoods'] as string[], // 14
    villages_covered: 15, // 15
    geographical_area_of_operation: '', // 16
    annual_beneficiaries_reached: 1200, // 17
    primary_beneficiaries: '', // 18

    // SECTION D: EXISTING DIGITAL INFRASTRUCTURE
    has_website: false, // 19
    has_mis_system: false, // 20
    current_digital_tools: ['WhatsApp', 'Excel/Spreadsheets'] as string[], // 21

    // SECTION E: TECHNOLOGY CHALLENGES AND SUPPORT REQUIREMENTS
    major_technology_challenges: '', // 22
    support_type_seeking: ['MIS and Digital Data Management'] as string[], // 23
    description_of_solution_needed: '', // 24
    main_problem_to_solve: '', // 25
    intended_users: '', // 26
    estimated_users_count: 5, // 27

    // SECTION F: PREVIOUS EXPERIENCE
    has_previous_digital_project: false, // 28
    previous_digital_project_details: '', // 29

    // SECTION G: PRIORITY AND TIMELINE
    requirement_urgency: 'Moderate (1-3 months)' as Application['requirement_urgency'], // 30
    preferred_timeline: '3 to 4 months', // 31
    first_priority_support: '', // 32

    // Optional supporting documents
    documents: [] as { document_name: string; document_type: string; file_url: string; file_size: string }[],
  });

  const orgTypes = [
    'Society',
    'Trust',
    'Section 8 Company',
    'Community-Based Organisation (CBO)',
    'Farmer Producer Organisation (FPO)',
    'Federation of SHGs',
    'Other Non-Profit Entity',
  ];

  const stateOptions = [
    'Maharashtra',
    'Madhya Pradesh',
    'Chhattisgarh',
    'Gujarat',
    'Telangana',
    'Odisha',
    'Rajasthan',
    'Karnataka',
    'Other State in India',
  ];

  const maharashtraDistricts = [
    'Yavatmal',
    'Wardha',
    'Amravati',
    'Nagpur',
    'Chandrapur',
    'Gadchiroli',
    'Akola',
    'Buldhana',
    'Washim',
    'Bhandara',
    'Gondia',
    'Nanded',
    'Hingoli',
    'Parbhani',
    'Jalna',
    'Aurangabad (Chhatrapati Sambhajinagar)',
    'Pune',
    'Nashik',
    'Other District',
  ];

  const workAreaOptions = [
    'Agriculture',
    'Natural Resource Management',
    'Water & Watershed',
    'Women Empowerment',
    'Livelihoods',
    'Health & Nutrition',
    'Education',
    'Tribal Development',
    'Panchayati Raj & Local Governance',
    'Environment & Ecology',
    'Child Rights',
    'Disability & Inclusion',
  ];

  const digitalToolsOptions = [
    'Excel/Spreadsheets',
    'WhatsApp',
    'Google Drive / Docs',
    'KoboToolbox / ODK',
    'Tally / Accounting Software',
    'Custom Database / Portal',
    'None (Strictly Paper Registers)',
  ];

  const supportTypeOptions = [
    'Website Development and Support',
    'MIS and Digital Data Management',
    'Mobile or Web-Based Application Development',
    'Social Media and Digital Communication Training',
    'Digital Capacity Building and Technical Support',
    'Data Management, Documentation and Reporting Systems',
    'Other Technology-Related Support',
  ];

  const toggleArrayItem = (key: 'key_areas_of_work' | 'current_digital_tools' | 'support_type_seeking', val: string) => {
    const arr = [...formData[key]];
    const index = arr.indexOf(val);
    if (index >= 0) {
      arr.splice(index, 1);
    } else {
      arr.push(val);
    }
    setFormData({ ...formData, [key]: arr });
  };

  // Validation rules per step
  const validateStep = (step: number): boolean => {
    const errs: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.name_of_organization.trim()) errs.name_of_organization = 'Organization Name is required.';
      if (!formData.registration_number.trim()) errs.registration_number = 'Registration Number is required.';
      if (!formData.organisation_address.trim()) errs.organisation_address = 'Full address is required.';
      if (!formData.organisation_email.trim() || !formData.organisation_email.includes('@')) {
        errs.organisation_email = 'Valid organization email is required.';
      }
      if (!formData.year_of_establishment || formData.year_of_establishment < 1900 || formData.year_of_establishment > 2026) {
        errs.year_of_establishment = 'Enter a valid year of establishment (e.g. 2014).';
      }
    }

    if (step === 2) {
      if (!formData.contact_person_name.trim()) errs.contact_person_name = 'Contact person name is required.';
      if (!formData.designation.trim()) errs.designation = 'Designation is required.';
      // Indian phone validation
      const cleanedPhone = formData.contact_number.replace(/\D/g, '');
      if (cleanedPhone.length < 10) {
        errs.contact_number = 'Please enter a valid 10-digit Indian mobile number.';
      }
      if (!formData.brief_description.trim()) errs.brief_description = 'Please provide a brief description.';
      if (formData.key_areas_of_work.length === 0) errs.key_areas_of_work = 'Select at least one key area of work.';
      if (!formData.geographical_area_of_operation.trim()) errs.geographical_area_of_operation = 'Geographical area (blocks/talukas) is required.';
      if (!formData.primary_beneficiaries.trim()) errs.primary_beneficiaries = 'Primary beneficiaries description is required.';
    }

    if (step === 4) {
      if (!formData.major_technology_challenges.trim()) errs.major_technology_challenges = 'Please describe your technology challenges.';
      if (formData.support_type_seeking.length === 0) errs.support_type_seeking = 'Select at least one support type.';
      if (!formData.description_of_solution_needed.trim()) errs.description_of_solution_needed = 'Please describe the solution you are seeking.';
      if (!formData.main_problem_to_solve.trim()) errs.main_problem_to_solve = 'State the main problem you want to solve.';
      if (!formData.intended_users.trim()) errs.intended_users = 'Specify who will use the system.';
    }

    if (step === 5) {
      if (formData.has_previous_digital_project && !formData.previous_digital_project_details.trim()) {
        errs.previous_digital_project_details = 'Please describe the previously implemented system.';
      }
      if (!formData.first_priority_support.trim()) {
        errs.first_priority_support = 'Please specify what should be the FIRST priority.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc = {
        document_name: file.name,
        document_type: 'Supporting Document',
        file_url: '#',
        file_size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      };
      setFormData({
        ...formData,
        documents: [...formData.documents, newDoc],
      });
    }
  };

  const [supabaseSyncResult, setSupabaseSyncResult] = useState<{
    status: 'idle' | 'saving' | 'synced' | 'pending_setup' | 'failed';
    message?: string;
  }>({ status: 'idle' });

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    // 1. Save in local database store
    const newApp = SevaStore.submitApplication({
      ...formData,
      annual_beneficiaries_reached: Number(formData.annual_beneficiaries_reached) || 0,
      villages_covered: Number(formData.villages_covered) || 0,
      estimated_users_count: Number(formData.estimated_users_count) || 1,
      year_of_establishment: Number(formData.year_of_establishment) || 2020,
    });

    setSubmittedApp(newApp);
    setSupabaseSyncResult({ status: 'saving' });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 2. Transmit directly to user's connected Supabase backend
    try {
      const res = await insertApplicationToSupabase(newApp);
      if (res.success) {
        setSupabaseSyncResult({
          status: 'synced',
          message: `Application data successfully committed to Supabase table public.applications (Project: ${SUPABASE_PROJECT_ID}).`,
        });
      } else if (res.code === 'PGRST205') {
        // Table needs to be created in Supabase SQL editor
        setSupabaseSyncResult({
          status: 'pending_setup',
          message: `Connected to Supabase project (${SUPABASE_PROJECT_ID}). The 'applications' table has not yet been initialized in your Supabase SQL editor. Your application is safely recorded locally and ready to sync.`,
        });
      } else {
        setSupabaseSyncResult({
          status: 'failed',
          message: res.error || 'Could not commit to Supabase.',
        });
      }
    } catch (err: any) {
      setSupabaseSyncResult({
        status: 'failed',
        message: err.message,
      });
    }
  };

  const copyApplicationId = () => {
    if (submittedApp) {
      navigator.clipboard.writeText(submittedApp.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedApp) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-md space-y-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0B6643] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0B6643] uppercase">
              Application Successfully Received
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172B24]">
              Thank You for Applying to SEVA's Technology Support Programme
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              "Thank you for submitting your application to SEVA's Technology Support Programme. Your application has been successfully received. Our team will review the information and contact you regarding the next steps."
            </p>
          </div>

          {/* Application Reference ID Box */}
          <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 max-w-md mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-stone-500 tracking-wider">
              Your Unique Application Reference ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-mono font-extrabold text-[#0B6643] tracking-tight">
                {submittedApp.id}
              </span>
              <button
                onClick={copyApplicationId}
                className="p-2 rounded-md hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                title="Copy ID"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-stone-500">
              Please preserve this reference ID for all future correspondence. An acknowledgement email has been dispatched to <strong>{submittedApp.organisation_email}</strong>.
            </p>
          </div>

          {/* Supabase Backend Sync Status */}
          <div className="p-4 rounded-xl border text-xs max-w-md mx-auto text-left space-y-1 bg-stone-50 border-stone-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0B6643]" />
                <span>Supabase Backend ({SUPABASE_PROJECT_ID})</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                supabaseSyncResult.status === 'synced' ? 'bg-emerald-100 text-emerald-800' :
                supabaseSyncResult.status === 'pending_setup' ? 'bg-amber-100 text-amber-800' :
                supabaseSyncResult.status === 'saving' ? 'bg-blue-100 text-blue-800' :
                'bg-stone-200 text-stone-700'
              }`}>
                {supabaseSyncResult.status === 'synced' ? 'Saved to Supabase' :
                 supabaseSyncResult.status === 'pending_setup' ? 'Pending SQL Setup' :
                 supabaseSyncResult.status === 'saving' ? 'Syncing...' : 'Local Recorded'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              {supabaseSyncResult.message || 'Connecting to backend database...'}
            </p>
          </div>

          {/* Important Selection Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left max-w-2xl mx-auto space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#D97706]" />
              <span>Important Note Regarding Selection:</span>
            </div>
            <p className="leading-relaxed">
              Submission of this application does not guarantee selection. SEVA evaluates all submissions based on organizational readiness, ground presence, community scale, and technological feasibility within our cohort capacity.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-2 cursor-pointer no-print"
            >
              <Printer className="w-4 h-4" />
              <span>Print Application Summary</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-2.5 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-semibold cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stepsConfig = [
    { num: 1, title: 'Organisation Details', icon: Building },
    { num: 2, title: 'Contact & Profile', icon: User },
    { num: 3, title: 'Existing Infrastructure', icon: Laptop },
    { num: 4, title: 'Challenges & Needs', icon: Layers },
    { num: 5, title: 'Timeline & Priority', icon: Clock },
    { num: 6, title: 'Review & Submit', icon: Send },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 space-y-8">
      {/* Page Title & Intro */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
          Application Portal
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172B24]">
          Apply for SEVA's Technology Support Programme
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Tell us about your organisation, your current systems and the technology-related challenges you are facing. Our team will review your application and assess how SEVA can support your organisation.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-xs">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {stepsConfig.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                className={`text-left p-2 rounded-lg transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-50 text-[#0B6643] border border-emerald-200'
                    : isCompleted
                    ? 'text-stone-700 hover:bg-stone-50'
                    : 'text-stone-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6643]" />
                  ) : (
                    <span>0{s.num}</span>
                  )}
                </div>
                <div className="text-[11px] font-semibold tracking-tight truncate mt-0.5">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleFinalSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8">
        {/* STEP 1: ORGANISATIONAL INFORMATION (Fields 1-9) */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#0B6643] uppercase">Section A</span>
              <h2 className="text-xl font-bold text-[#172B24]">Organisational Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 1: Name of Organization */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  1. Name of Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name_of_organization}
                  onChange={(e) => setFormData({ ...formData, name_of_organization: e.target.value })}
                  placeholder="e.g. Gramin Vikas Sanstha"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.name_of_organization && <p className="text-xs text-red-600 mt-1">{errors.name_of_organization}</p>}
              </div>

              {/* Field 2: Type of Organization */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  2. Type of Organization *
                </label>
                <select
                  value={formData.type_of_organization}
                  onChange={(e) => setFormData({ ...formData, type_of_organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm bg-white focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                >
                  {orgTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Field 3: Year of Establishment */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  3. Year of Establishment *
                </label>
                <input
                  type="number"
                  min={1900}
                  max={2026}
                  required
                  value={formData.year_of_establishment}
                  onChange={(e) => setFormData({ ...formData, year_of_establishment: parseInt(e.target.value) || 2020 })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.year_of_establishment && <p className="text-xs text-red-600 mt-1">{errors.year_of_establishment}</p>}
              </div>

              {/* Field 4: Registration Number */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  4. Registration Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.registration_number}
                  onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                  placeholder="e.g. MAH/721/2012/YTL or Trust Registration No."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.registration_number && <p className="text-xs text-red-600 mt-1">{errors.registration_number}</p>}
              </div>

              {/* Field 5: State */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  5. State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm bg-white focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                >
                  {stateOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Field 6: District */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  6. District *
                </label>
                {formData.state === 'Maharashtra' ? (
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm bg-white focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                  >
                    {maharashtraDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Enter district name"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                  />
                )}
              </div>

              {/* Field 7: Organisation Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  7. Organisation Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.organisation_address}
                  onChange={(e) => setFormData({ ...formData, organisation_address: e.target.value })}
                  placeholder="Complete physical office address including village/town and PIN code"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.organisation_address && <p className="text-xs text-red-600 mt-1">{errors.organisation_address}</p>}
              </div>

              {/* Field 8: Organization Website */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  8. Organization Website (If available)
                </label>
                <input
                  type="url"
                  value={formData.organisation_website}
                  onChange={(e) => setFormData({ ...formData, organisation_website: e.target.value })}
                  placeholder="https://www.example.org (Leave blank if none)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
              </div>

              {/* Field 9: Organisation Email ID */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  9. Organisation Email ID *
                </label>
                <input
                  type="email"
                  required
                  value={formData.organisation_email}
                  onChange={(e) => setFormData({ ...formData, organisation_email: e.target.value })}
                  placeholder="e.g. contact@organisation.org"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.organisation_email && <p className="text-xs text-red-600 mt-1">{errors.organisation_email}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CONTACT & ORGANISATIONAL PROFILE (Fields 10-18) */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#0B6643] uppercase">Section B &amp; C</span>
              <h2 className="text-xl font-bold text-[#172B24]">Contact Information &amp; Organisational Profile</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 10: Contact Person Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  10. Contact Person Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact_person_name}
                  onChange={(e) => setFormData({ ...formData, contact_person_name: e.target.value })}
                  placeholder="e.g. Kavita Gawande"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.contact_person_name && <p className="text-xs text-red-600 mt-1">{errors.contact_person_name}</p>}
              </div>

              {/* Field 11: Designation */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  11. Designation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Secretary / Project Lead"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.designation && <p className="text-xs text-red-600 mt-1">{errors.designation}</p>}
              </div>

              {/* Field 12: Contact Number */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  12. Contact Number (10-digit Indian Mobile) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-stone-200 bg-stone-50 text-stone-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={formData.contact_number}
                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value.replace(/\D/g, '') })}
                    placeholder="9822000000"
                    className="w-full px-3.5 py-2.5 rounded-r-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                  />
                </div>
                {errors.contact_number && <p className="text-xs text-red-600 mt-1">{errors.contact_number}</p>}
              </div>

              {/* Field 13: Briefly describe your organization */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  13. Briefly describe your organization *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.brief_description}
                  onChange={(e) => setFormData({ ...formData, brief_description: e.target.value })}
                  placeholder="Briefly describe your history, vision, and core interventions..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.brief_description && <p className="text-xs text-red-600 mt-1">{errors.brief_description}</p>}
              </div>

              {/* Field 14: Key Areas of Work (Multi-select) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  14. Key Areas of Work * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {workAreaOptions.map((area) => {
                    const isSelected = formData.key_areas_of_work.includes(area);
                    return (
                      <button
                        type="button"
                        key={area}
                        onClick={() => toggleArrayItem('key_areas_of_work', area)}
                        className={`text-left p-2.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 text-[#0B6643] border-emerald-300'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span>{area}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#0B6643]" />}
                      </button>
                    );
                  })}
                </div>
                {errors.key_areas_of_work && <p className="text-xs text-red-600 mt-1">{errors.key_areas_of_work}</p>}
              </div>

              {/* Field 15: Villages/Communities Covered */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  15. Number of Villages/Communities Covered *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={formData.villages_covered}
                  onChange={(e) => setFormData({ ...formData, villages_covered: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
              </div>

              {/* Field 16: Geographical Area of Operation */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  16. Geographical Area of Operation (Talukas/Blocks) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.geographical_area_of_operation}
                  onChange={(e) => setFormData({ ...formData, geographical_area_of_operation: e.target.value })}
                  placeholder="e.g. Ralegaon and Kalamb blocks"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.geographical_area_of_operation && <p className="text-xs text-red-600 mt-1">{errors.geographical_area_of_operation}</p>}
              </div>

              {/* Field 17: Approximate Number of Beneficiaries Reached Annually */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  17. Approximate Number of Beneficiaries Reached Annually *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={formData.annual_beneficiaries_reached}
                  onChange={(e) => setFormData({ ...formData, annual_beneficiaries_reached: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
              </div>

              {/* Field 18: Primary Communities / Beneficiaries */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  18. Who are your primary communities/beneficiaries? *
                </label>
                <input
                  type="text"
                  required
                  value={formData.primary_beneficiaries}
                  onChange={(e) => setFormData({ ...formData, primary_beneficiaries: e.target.value })}
                  placeholder="e.g. Tribal women SHGs, smallholder farmers"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.primary_beneficiaries && <p className="text-xs text-red-600 mt-1">{errors.primary_beneficiaries}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EXISTING DIGITAL INFRASTRUCTURE (Fields 19-21) */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#0B6643] uppercase">Section D</span>
              <h2 className="text-xl font-bold text-[#172B24]">Existing Digital Infrastructure</h2>
            </div>

            <div className="space-y-6">
              {/* Field 19: Does your organisation currently have a website? */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  19. Does your organisation currently have a functional website? *
                </label>
                <div className="flex gap-6 pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="has_website"
                      checked={formData.has_website === true}
                      onChange={() => setFormData({ ...formData, has_website: true })}
                      className="text-[#0B6643] focus:ring-[#0B6643]"
                    />
                    <span>Yes, we have an active website</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="has_website"
                      checked={formData.has_website === false}
                      onChange={() => setFormData({ ...formData, has_website: false })}
                      className="text-[#0B6643] focus:ring-[#0B6643]"
                    />
                    <span>No, we do not have a website</span>
                  </label>
                </div>
              </div>

              {/* Field 20: Does your organisation currently use any MIS/Data Management System? */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  20. Does your organisation currently use any MIS/Data Management System? *
                </label>
                <div className="flex gap-6 pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="has_mis_system"
                      checked={formData.has_mis_system === true}
                      onChange={() => setFormData({ ...formData, has_mis_system: true })}
                      className="text-[#0B6643] focus:ring-[#0B6643]"
                    />
                    <span>Yes, we currently use an MIS</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="has_mis_system"
                      checked={formData.has_mis_system === false}
                      onChange={() => setFormData({ ...formData, has_mis_system: false })}
                      className="text-[#0B6643] focus:ring-[#0B6643]"
                    />
                    <span>No, we do not use an MIS</span>
                  </label>
                </div>
              </div>

              {/* Field 21: What digital tools does your organisation currently use? */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  21. What digital tools does your organisation currently use? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {digitalToolsOptions.map((tool) => {
                    const isSelected = formData.current_digital_tools.includes(tool);
                    return (
                      <button
                        type="button"
                        key={tool}
                        onClick={() => toggleArrayItem('current_digital_tools', tool)}
                        className={`text-left p-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 text-[#0B6643] border-emerald-300'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span>{tool}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#0B6643]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: TECHNOLOGY CHALLENGES & SUPPORT REQUIREMENTS (Fields 22-27) */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#0B6643] uppercase">Section E</span>
              <h2 className="text-xl font-bold text-[#172B24]">Technology Challenges &amp; Requirements</h2>
            </div>

            <div className="space-y-5">
              {/* Field 22: What are the major technology challenges faced by your organisation? */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  22. What are the major technology challenges faced by your organisation? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.major_technology_challenges}
                  onChange={(e) => setFormData({ ...formData, major_technology_challenges: e.target.value })}
                  placeholder="Describe your daily bottlenecks (e.g., paper registers getting lost, time taken to assemble donor reports, multiple duplicate Excel files)..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.major_technology_challenges && <p className="text-xs text-red-600 mt-1">{errors.major_technology_challenges}</p>}
              </div>

              {/* Field 23: What type of technology support are you seeking? */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  23. What type of technology support are you seeking? * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {supportTypeOptions.map((support) => {
                    const isSelected = formData.support_type_seeking.includes(support);
                    return (
                      <button
                        type="button"
                        key={support}
                        onClick={() => toggleArrayItem('support_type_seeking', support)}
                        className={`text-left p-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 text-[#0B6643] border-emerald-300'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span>{support}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#0B6643]" />}
                      </button>
                    );
                  })}
                </div>
                {errors.support_type_seeking && <p className="text-xs text-red-600 mt-1">{errors.support_type_seeking}</p>}
              </div>

              {/* Field 24: Please describe the technology solution/support you are looking for */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  24. Please describe the technology solution/support you are looking for *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description_of_solution_needed}
                  onChange={(e) => setFormData({ ...formData, description_of_solution_needed: e.target.value })}
                  placeholder="What specific software, app, or website structure do you envision?"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.description_of_solution_needed && <p className="text-xs text-red-600 mt-1">{errors.description_of_solution_needed}</p>}
              </div>

              {/* Field 25: What is the main problem you want to solve through technology? */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  25. What is the main problem you want to solve through technology? *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.main_problem_to_solve}
                  onChange={(e) => setFormData({ ...formData, main_problem_to_solve: e.target.value })}
                  placeholder="Summarize the core institutional problem (e.g., duplicate entries, delayed donor reporting, lack of public visibility)..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.main_problem_to_solve && <p className="text-xs text-red-600 mt-1">{errors.main_problem_to_solve}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Field 26: Who will use the proposed technology/system? */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    26. Who will use the proposed technology/system? *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.intended_users}
                    onChange={(e) => setFormData({ ...formData, intended_users: e.target.value })}
                    placeholder="e.g. 10 Field animators, 2 Project Officers, 1 Director"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                  />
                  {errors.intended_users && <p className="text-xs text-red-600 mt-1">{errors.intended_users}</p>}
                </div>

                {/* Field 27: Estimated number of users */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    27. Estimated number of active users *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.estimated_users_count}
                    onChange={(e) => setFormData({ ...formData, estimated_users_count: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PREVIOUS EXPERIENCE & TIMELINE (Fields 28-32) */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#0B6643] uppercase">Section F &amp; G</span>
              <h2 className="text-xl font-bold text-[#172B24]">Previous Experience, Priority &amp; Timeline</h2>
            </div>

            <div className="space-y-6">
              {/* Field 28: Has your organisation previously implemented any digital/MIS/technology project? */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  28. Has your organisation previously implemented any digital/MIS/technology project? *
                </label>
                <div className="flex gap-6 pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="has_previous_digital_project"
                      checked={formData.has_previous_digital_project === true}
                      onChange={() => setFormData({ ...formData, has_previous_digital_project: true })}
                      className="text-[#0B6643] focus:ring-[#0B6643]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="has_previous_digital_project"
                      checked={formData.has_previous_digital_project === false}
                      onChange={() => setFormData({ ...formData, has_previous_digital_project: false, previous_digital_project_details: '' })}
                      className="text-[#0B6643] focus:ring-[#0B6643]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Field 29: Conditional - If yes, please describe */}
              {formData.has_previous_digital_project && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    29. If yes, please describe the technology/digital system implemented *
                  </label>
                  <textarea
                    rows={2}
                    value={formData.previous_digital_project_details}
                    onChange={(e) => setFormData({ ...formData, previous_digital_project_details: e.target.value })}
                    placeholder="What software was used, what worked, and what difficulties did your team encounter?"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                  />
                  {errors.previous_digital_project_details && <p className="text-xs text-red-600 mt-1">{errors.previous_digital_project_details}</p>}
                </div>
              )}

              {/* Field 30: How urgent is your technology requirement? */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  30. How urgent is your technology requirement? *
                </label>
                <select
                  value={formData.requirement_urgency}
                  onChange={(e) => setFormData({ ...formData, requirement_urgency: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm bg-white focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                >
                  <option value="Immediate (Within 1 month)">Immediate (Within 1 month)</option>
                  <option value="Moderate (1-3 months)">Moderate (1-3 months)</option>
                  <option value="Planning Stage (3-6 months)">Planning Stage (3-6 months)</option>
                </select>
              </div>

              {/* Field 31: Preferred implementation timeline */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  31. Preferred implementation timeline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.preferred_timeline}
                  onChange={(e) => setFormData({ ...formData, preferred_timeline: e.target.value })}
                  placeholder="e.g. 3 to 4 months before next project cycle"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
              </div>

              {/* Field 32: What should be the FIRST priority for technology support? */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  32. What should be the FIRST priority for technology support? *
                </label>
                <input
                  type="text"
                  required
                  value={formData.first_priority_support}
                  onChange={(e) => setFormData({ ...formData, first_priority_support: e.target.value })}
                  placeholder="e.g. Centralised Beneficiary Database / Official Website"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                />
                {errors.first_priority_support && <p className="text-xs text-red-600 mt-1">{errors.first_priority_support}</p>}
              </div>

              {/* Optional Supporting Documents */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <label className="block text-xs font-bold text-stone-700">
                  Optional Supporting Documents (Registration certificate, annual report, sample MIS formats)
                </label>
                <div className="border-2 border-dashed border-stone-200 rounded-xl p-6 text-center space-y-2 hover:border-emerald-300 transition-colors">
                  <Upload className="w-6 h-6 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-600">
                    Upload PDF or scanned copy (Max 10MB)
                  </p>
                  <label className="inline-block px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg cursor-pointer">
                    Browse File
                    <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className="space-y-1.5">
                    {formData.documents.map((d, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg text-xs text-stone-700 border border-stone-200">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#0B6643]" />
                          <span>{d.document_name}</span>
                          <span className="text-stone-400">({d.file_size})</span>
                        </div>
                        <span className="text-emerald-700 font-semibold">Attached</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & SUBMIT */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#0B6643] uppercase">Step 6</span>
              <h2 className="text-xl font-bold text-[#172B24]">Review Your Answers Before Submission</h2>
              <p className="text-xs text-stone-500 mt-1">
                Please verify all 32 submitted details. You can click previous steps if any correction is needed.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Summary Block 1 */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900">1. Organisation &amp; Contact</span>
                  <button type="button" onClick={() => setCurrentStep(1)} className="text-[#0B6643] font-semibold underline text-xs">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-600">
                  <div><strong>Name:</strong> {formData.name_of_organization}</div>
                  <div><strong>Type:</strong> {formData.type_of_organization} ({formData.year_of_establishment})</div>
                  <div><strong>Reg. No:</strong> {formData.registration_number}</div>
                  <div><strong>Location:</strong> {formData.district}, {formData.state}</div>
                  <div><strong>Contact Person:</strong> {formData.contact_person_name} ({formData.designation})</div>
                  <div><strong>Phone:</strong> +91 {formData.contact_number}</div>
                  <div><strong>Email:</strong> {formData.organisation_email}</div>
                  {formData.organisation_website && <div><strong>Website:</strong> {formData.organisation_website}</div>}
                </div>
              </div>

              {/* Summary Block 2 */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900">2. Scale &amp; Scope</span>
                  <button type="button" onClick={() => setCurrentStep(2)} className="text-[#0B6643] font-semibold underline text-xs">Edit</button>
                </div>
                <div className="space-y-1 text-stone-600">
                  <div><strong>Villages Covered:</strong> {formData.villages_covered} in {formData.geographical_area_of_operation}</div>
                  <div><strong>Annual Beneficiaries:</strong> {formData.annual_beneficiaries_reached.toLocaleString('en-IN')}</div>
                  <div><strong>Primary Beneficiaries:</strong> {formData.primary_beneficiaries}</div>
                  <div><strong>Key Areas:</strong> {formData.key_areas_of_work.join(', ')}</div>
                </div>
              </div>

              {/* Summary Block 3 */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900">3. Support Required &amp; Urgency</span>
                  <button type="button" onClick={() => setCurrentStep(4)} className="text-[#0B6643] font-semibold underline text-xs">Edit</button>
                </div>
                <div className="space-y-1 text-stone-600">
                  <div><strong>First Priority:</strong> {formData.first_priority_support}</div>
                  <div><strong>Support Areas:</strong> {formData.support_type_seeking.join(', ')}</div>
                  <div><strong>Urgency:</strong> {formData.requirement_urgency} (Preferred: {formData.preferred_timeline})</div>
                  <div><strong>Intended Users:</strong> {formData.intended_users} (~{formData.estimated_users_count} users)</div>
                </div>
              </div>
            </div>

            {/* Cost-Sharing Acknowledgment */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <span className="font-bold block">Cost-Sharing Confirmation:</span>
              <p className="leading-relaxed">
                By submitting this application, we acknowledge that SEVA's Technology Support Programme operates under a transparent 70-30 cost-sharing model (70% SEVA subsidy / 30% participating organisation contribution). Final financial contribution is agreed upon only after scoping discussion.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2.5 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Continue to Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Submit Official Application</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
