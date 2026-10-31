export type Role = 'super_admin' | 'programme_admin' | 'reviewer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  designation: string;
}

export type ApplicationStatus =
  | 'New Application'
  | 'Under Initial Review'
  | 'Additional Information Required'
  | 'Shortlisted'
  | 'Meeting Scheduled'
  | 'Approved'
  | 'Rejected'
  | 'On Hold'
  | 'Agreement Pending'
  | 'Implementation Started'
  | 'Implementation Completed';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export interface ApplicationDocument {
  id: string;
  application_id: string;
  document_name: string;
  document_type: string;
  file_url: string;
  file_size?: string;
  uploaded_at: string;
}

export interface ApplicationReview {
  id: string;
  application_id: string;
  reviewer_id: string;
  reviewer_name: string;
  review_date: string;
  internal_notes: string;
  assessment_summary: string;
  technical_feasibility: 'High' | 'Medium' | 'Low';
  organisational_readiness: 'High' | 'Medium' | 'Low';
  expected_impact: 'High' | 'Medium' | 'Low';
  estimated_complexity: 'Low' | 'Medium' | 'High';
  estimated_programme_cost: number;
  organisation_contribution_estimate: number; // 30%
  seva_contribution_estimate: number; // 70%
  // Score breakdown (0-100)
  score_relevance: number; // weight 20
  score_impact: number; // weight 20
  score_reach: number; // weight 15
  score_urgency: number; // weight 15
  score_readiness: number; // weight 10
  score_feasibility: number; // weight 10
  score_sustainability: number; // weight 10
  total_score: number; // calculated 0-100
}

export interface StatusHistoryEntry {
  id: string;
  application_id: string;
  previous_status: ApplicationStatus | 'None';
  new_status: ApplicationStatus;
  changed_by: string;
  changed_at: string; // ISO
  internal_remarks: string;
}

export interface Application {
  id: string; // e.g., 'SEVA-2026-0042'
  created_at: string;
  updated_at: string;
  status: ApplicationStatus;
  priority: PriorityLevel;
  assigned_reviewer_id?: string;
  assigned_reviewer_name?: string;

  // SECTION A: ORGANISATIONAL INFORMATION
  name_of_organization: string; // Field 1
  type_of_organization: string; // Field 2: Trust, Society, Section 8 Company, Community-Based Organisation (CBO), Other
  year_of_establishment: number; // Field 3
  registration_number: string; // Field 4
  state: string; // Field 5
  district: string; // Field 6
  organisation_address: string; // Field 7
  organisation_website?: string; // Field 8
  organisation_email: string; // Field 9

  // SECTION B: CONTACT INFORMATION
  contact_person_name: string; // Field 10
  designation: string; // Field 11
  contact_number: string; // Field 12 (10-digit Indian Mobile)

  // SECTION C: ORGANISATIONAL PROFILE
  brief_description: string; // Field 13
  key_areas_of_work: string[]; // Field 14 (Agriculture, Water, Education, Health, Women Empowerment, Livelihoods, Natural Resource Management, etc.)
  villages_covered: number; // Field 15
  geographical_area_of_operation: string; // Field 16 (Blocks, Talukas, Districts)
  annual_beneficiaries_reached: number; // Field 17
  primary_beneficiaries: string; // Field 18 (e.g. Smallholder farmers, women self-help groups, tribal communities, rural youth)

  // SECTION D: EXISTING DIGITAL INFRASTRUCTURE
  has_website: boolean; // Field 19
  has_mis_system: boolean; // Field 20
  current_digital_tools: string[]; // Field 21 (Excel/Spreadsheets, WhatsApp, Google Drive, KoboToolbox, ODK, Tally, Custom Software, None)

  // SECTION E: TECHNOLOGY CHALLENGES AND SUPPORT REQUIREMENTS
  major_technology_challenges: string; // Field 22
  support_type_seeking: string[]; // Field 23 (Website Development, MIS & Digital Data, Mobile/Web App, Social Media & Communication, Digital Capacity Building, Reporting & Documentation)
  description_of_solution_needed: string; // Field 24
  main_problem_to_solve: string; // Field 25
  intended_users: string; // Field 26 (Field Coordinators, Project Managers, Community Mobilisers, Leadership, Beneficiaries)
  estimated_users_count: number; // Field 27

  // SECTION F: PREVIOUS EXPERIENCE
  has_previous_digital_project: boolean; // Field 28
  previous_digital_project_details?: string; // Field 29

  // SECTION G: PRIORITY AND TIMELINE
  requirement_urgency: 'Immediate (Within 1 month)' | 'Moderate (1-3 months)' | 'Planning Stage (3-6 months)'; // Field 30
  preferred_timeline: string; // Field 31
  first_priority_support: string; // Field 32

  // Additional metadata & documents
  documents: ApplicationDocument[];
  reviews?: ApplicationReview;
  status_history: StatusHistoryEntry[];
}

export interface Meeting {
  id: string;
  application_id: string;
  organisation_name: string;
  contact_email: string;
  contact_person: string;
  title: string;
  meeting_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  mode: 'Online' | 'Offline';
  platform?: 'Google Meet' | 'Zoom' | 'Microsoft Teams' | 'In-Person';
  meeting_link?: string;
  venue?: string;
  agenda: string;
  internal_remarks?: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  created_at: string;
  created_by: string;
  email_sent: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category:
    | 'Application Received'
    | 'Application Under Review'
    | 'Additional Information Required'
    | 'Shortlisted'
    | 'Meeting Invitation'
    | 'Meeting Reminder'
    | 'Application Approved'
    | 'Application Rejected'
    | 'Programme Onboarding'
    | 'Implementation Update';
}

export interface EmailLog {
  id: string;
  application_id: string;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  body: string;
  sent_at: string;
  sent_by: string;
  status: 'Delivered' | 'Sent' | 'Failed';
  template_used?: string;
}

export interface ProjectMilestone {
  id: string;
  stage_number: number;
  title: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  target_date: string;
  completed_date?: string;
  notes?: string;
}

export interface ProgrammeProject {
  id: string;
  application_id: string;
  organisation_name: string;
  state: string;
  district: string;
  approved_support_areas: string[];
  start_date: string;
  expected_completion_date: string;
  project_duration_months: number;
  agreed_programme_cost: number;
  seva_support_contribution: number; // 70%
  organisation_contribution: number; // 30%
  assigned_technical_lead: string;
  assigned_team_members: string[];
  implementation_status: 'Onboarding' | 'Needs Assessment' | 'Active Development' | 'Testing & Training' | 'Handover' | 'Completed';
  milestones: ProjectMilestone[];
  review_meetings_count: number;
  deliverables_summary: string;
  completion_notes?: string;
}

export interface CaseStudy {
  id: string;
  organisation_name: string;
  state: string;
  district: string;
  organisation_background: string;
  challenge_before_support: string;
  technology_support_provided: string;
  implementation_process: string;
  results_and_improvements: string[];
  image_url: string;
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_designation?: string;
  date_published: string;
  is_published: boolean;
  is_sample?: boolean;
}

export interface ImpactStatistic {
  id: string;
  metric_key: string;
  label: string;
  value: string;
  subtext: string;
  order?: number;
  sort_order?: number;
  is_verified: boolean;
  last_updated: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category:
    | 'Digital Tools for NGOs'
    | 'MIS and Data Management'
    | 'NGO Website Development'
    | 'Digital Communication'
    | 'Project Monitoring'
    | 'Documentation and Reporting'
    | 'Digital Security'
    | 'Capacity Building'
    | 'Technology for Rural Development';
  summary: string;
  content: string;
  format: 'Guide' | 'Template' | 'Toolkit' | 'Video Overview';
  download_name?: string;
  read_time: string;
  published_date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  organisation?: string;
  subject: string;
  message: string;
  submitted_at: string;
  status: 'Unread' | 'Replied' | 'Archived';
}

export interface OrganisationSettings {
  org_name: string;
  tagline: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  address_district: string;
  address_state: string;
  address_pin: string;
  website_url: string;
  facebook_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  announcement_banner?: string;
  enable_applications: boolean;
}
