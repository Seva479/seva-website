import {
  Application,
  ApplicationReview,
  CaseStudy,
  ContactMessage,
  EmailLog,
  EmailTemplate,
  ImpactStatistic,
  Meeting,
  OrganisationSettings,
  ProgrammeProject,
  ResourceItem,
  UserProfile,
} from '../types';

// Default Organisation Settings
export const DEFAULT_ORG_SETTINGS: OrganisationSettings = {
  org_name: 'Sustainable Ecology & Rural Advancement (SEVA)',
  tagline: 'Empowering Grassroots Organisations Through Technology, Knowledge and Digital Transformation',
  email: 'seva.ecology@gmail.com',
  phone: '+91 8999469974',
  address_line1: '31 B, Jalka, Ralegaon',
  address_line2: '',
  address_district: 'District Yavatmal',
  address_state: 'Maharashtra',
  address_pin: '445402',
  website_url: 'https://www.sevavillage.org',
  facebook_url: 'https://facebook.com/sevavillage',
  linkedin_url: 'https://linkedin.com/company/sevavillage',
  youtube_url: 'https://youtube.com/@sevavillage',
  announcement_banner: 'Applications are currently open for the 2026 Grassroots Technology Support Programme.',
  enable_applications: true,
};

// Initial Impact Counters (Note: as instructed, editable by administrator)
export const INITIAL_IMPACT_STATS: ImpactStatistic[] = [
  {
    id: 'stat-1',
    metric_key: 'years_active',
    label: 'Years of Grassroots Experience',
    value: '2+',
    subtext: 'Dedicated to understanding field operational challenges',
    sort_order: 1,
    is_verified: true,
    last_updated: '2026-10-15',
  },
  {
    id: 'stat-2',
    metric_key: 'districts_reached',
    label: 'Districts Reached',
    value: '14',
    subtext: 'Across Maharashtra and central India development corridors',
    sort_order: 2,
    is_verified: true,
    last_updated: '2026-10-15',
  },
  {
    id: 'stat-3',
    metric_key: 'ngos_supported',
    label: 'Grassroots NGOs Supported',
    value: '38',
    subtext: 'With tailored MIS, websites, and data workflows',
    sort_order: 3,
    is_verified: true,
    last_updated: '2026-10-15',
  },
  {
    id: 'stat-4',
    metric_key: 'field_workers_trained',
    label: 'Field Coordinators Trained',
    value: '260+',
    subtext: 'Equipped with digital survey & reporting skills',
    sort_order: 4,
    is_verified: true,
    last_updated: '2026-10-15',
  },
];

// Initial 10 Standard Email Templates (Part 9.2)
export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-1',
    name: '1. Application Received Acknowledgement',
    category: 'Application Received',
    subject: 'Application Received: SEVA Technology Support Programme [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nThank you for submitting your application on behalf of {{organisation_name}} to SEVA's Technology Support Programme for Grassroots Organisations.\n\nYour Application Reference ID is: {{application_id}}.\n\nOur programme review committee is currently reviewing your submission to evaluate organisational readiness and technology feasibility. Please note that submission does not guarantee selection, and we prioritize organisations where practical digital systems can significantly reduce manual paperwork and improve community impact.\n\nWe will contact you within 7 to 10 working days regarding the next steps.\n\nWarm regards,\nTechnology Support Secretariat\nSustainable Ecology & Rural Advancement (SEVA)\n31 B, Jalka, Ralegaon, Dist. Yavatmal, Maharashtra – 445402\nContact: +91 8999469974 | Email: seva.ecology@gmail.com`,
  },
  {
    id: 'tpl-2',
    name: '2. Application Under Initial Review',
    category: 'Application Under Review',
    subject: 'Update: Your Application [{{application_id}}] is Under Initial Review',
    body: `Dear {{contact_person}},\n\nThis is to notify you that your application for {{organisation_name}} [{{application_id}}] has moved to the detailed review stage by SEVA's technical appraisal team.\n\nWe are examining your proposed technology focus area ({{support_areas}}) and assessing alignment with SEVA's 70-30 cost-sharing programme guidelines.\n\nNo immediate action is needed from your end at this moment. We will update you if any clarifications or supporting documents are needed.\n\nWarm regards,\nProgramme Review Committee\nSEVA – Sustainable Ecology & Rural Advancement`,
  },
  {
    id: 'tpl-3',
    name: '3. Additional Information Required',
    category: 'Additional Information Required',
    subject: 'Clarification Needed: SEVA Application [{{application_id}}] - {{organisation_name}}',
    body: `Dear {{contact_person}},\n\nDuring the initial evaluation of {{organisation_name}}'s application for technology support, our team noted that we require additional details before we can complete our assessment.\n\nPlease share the following information:\n- Current data formats or samples of Excel sheets your team uses for beneficiary records.\n- Brief clarification on the field team structure who will use the system.\n\nYou can reply directly to this email with the requested information or attachments.\n\nWarm regards,\nProgramme Coordinator\nSEVA – Sustainable Ecology & Rural Advancement`,
  },
  {
    id: 'tpl-4',
    name: '4. Shortlisted for Discussion',
    category: 'Shortlisted',
    subject: 'Congratulations: {{organisation_name}} Shortlisted for SEVA Technology Support [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nWe are pleased to inform you that {{organisation_name}} has been shortlisted for the next phase of SEVA's Technology Support Programme.\n\nYour application demonstrated a clear need to transition away from fragmented manual records towards structured digital systems.\n\nOur programme team will follow up shortly to schedule an interactive discussion with your leadership and field team to understand your workflows in detail.\n\nWarm regards,\nSEVA Review Committee`,
  },
  {
    id: 'tpl-5',
    name: '5. Meeting Invitation',
    category: 'Meeting Invitation',
    subject: 'Meeting Invitation: Technology Support Discussion - {{organisation_name}} [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nWe would like to invite you and your core team members for a formal virtual/in-person discussion regarding your technology requirements and the scope of collaboration under SEVA's Technology Support Programme.\n\nMeeting Details:\n- Date: {{meeting_date}}\n- Time: {{meeting_time}}\n- Mode: {{meeting_mode}}\n- Link / Venue: {{meeting_link}}\n\nAgenda:\n1. Detailed understanding of your current community data collection & reporting workflow.\n2. Proposed technology scope (MIS, Website, Mobile collection).\n3. Timeline (3-6 months) and 70-30 cost-sharing model overview.\n4. Questions from your team.\n\nPlease confirm your availability by replying to this email.\n\nWarm regards,\nSEVA Programme Desk\nPhone: +91 8999469974`,
  },
  {
    id: 'tpl-6',
    name: '6. Meeting Reminder',
    category: 'Meeting Reminder',
    subject: 'Reminder: Upcoming Discussion with SEVA Tomorrow [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nThis is a friendly reminder for our scheduled meeting regarding {{organisation_name}}'s Technology Support application tomorrow.\n\n- Meeting Date: {{meeting_date}}\n- Time: {{meeting_time}}\n- Platform/Link: {{meeting_link}}\n\nWe look forward to an insightful discussion.\n\nWarm regards,\nSEVA Secretariat`,
  },
  {
    id: 'tpl-7',
    name: '7. Application Approved & Scope Finalisation',
    category: 'Application Approved',
    subject: 'Official Approval: SEVA Technology Support Programme for {{organisation_name}}',
    body: `Dear {{contact_person}},\n\nWe are delighted to formally convey that {{organisation_name}}'s application [{{application_id}}] has been APPROVED under SEVA's Technology Support Programme.\n\nKey Parameters Approved:\n- Approved Support Areas: {{support_areas}}\n- Estimated Duration: {{project_duration}}\n- Cost-Sharing Model: SEVA supports 70% of the approved programme cost; {{organisation_name}} will contribute 30%.\n\nOur team is drafting the Memorandum of Understanding (MoU) and detailed project milestone schedule. We will share it shortly for your review and sign-off.\n\nCongratulations and we look forward to building robust, sustainable digital systems together!\n\nWarm regards,\nDirector / Programme Head\nSustainable Ecology & Rural Advancement (SEVA)`,
  },
  {
    id: 'tpl-8',
    name: '8. Application Decision Notice',
    category: 'Application Rejected',
    subject: 'Update Regarding Your Application to SEVA Technology Support Programme [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nThank you for the time and thought your team invested in applying for SEVA's Technology Support Programme on behalf of {{organisation_name}}.\n\nAfter comprehensive evaluation, we regret to inform you that we are unable to select your application for the current implementation cohort.\n\nReason / Feedback:\n{{rejection_reason}}\n\nThis decision is based strictly on our current capacity and cohort focus areas, and does not reflect on the immense value of your grassroots development work in {{district}}, {{state}}.\n\nYou are welcome to utilize our open-access Knowledge Centre guides and re-apply in subsequent cohorts.\n\nWith respect and best wishes,\nSEVA Appraisal Committee`,
  },
  {
    id: 'tpl-9',
    name: '9. Programme Onboarding & Inception',
    category: 'Programme Onboarding',
    subject: 'Welcome to Inception Stage: Project Kick-off with SEVA [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nWelcome to the active implementation phase of SEVA's Technology Support Programme!\n\nYour assigned Technical Lead is: {{assigned_lead}}.\n\nDuring this initial 2-week Needs Assessment and Wireframing stage, our team will conduct participatory interviews with your field workers to map out every register, report format, and indicator required.\n\nLet us know if you have any questions.\n\nWarm regards,\nSEVA Technical Operations Team`,
  },
  {
    id: 'tpl-10',
    name: '10. Implementation & Milestone Update',
    category: 'Implementation Update',
    subject: 'Implementation Progress Report: Milestone Update for {{organisation_name}}',
    body: `Dear {{contact_person}},\n\nWe are writing to share a progress update regarding the technology development for {{organisation_name}}.\n\nCurrent Milestone Status:\n- Stage: {{milestone_title}}\n- Status: {{milestone_status}}\n- Progress Summary: {{milestone_notes}}\n\nPlease review and let us know if any adjustments are needed.\n\nWarm regards,\nTechnical Operations Desk\nSEVA – Sustainable Ecology & Rural Advancement`,
  },
];

// Initial Case Studies (Authentic Grassroots Development context)
export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    organisation_name: 'Gramin Vikas Sahayog Sanstha',
    state: 'Maharashtra',
    district: 'Yavatmal',
    organisation_background: 'A grassroots society working for 8 years with 42 tribal and smallholder farmer villages on watershed management and regenerative agriculture.',
    challenge_before_support: 'Field animators tracked farm interventions, check dam water levels, and sapling survival across 28 physical paper registers. Monthly reports for CSR partners took up to 14 days to assemble, with high risk of lost survey sheets.',
    technology_support_provided: 'Custom Android & Web field monitoring MIS with offline sync capabilities, standardized beneficiary registry, and automated visual dashboards for block coordinators.',
    implementation_process: '4-month collaborative deployment: 2 weeks participatory needs mapping, 6 weeks iterative development, 3 on-site village training workshops for 24 animators in Marathi and Hindi, followed by 3 months post-handover mentoring.',
    results_and_improvements: [
      'Eliminated 28 physical paper registers, saving an estimated 35 hours per month per field animator',
      'Real-time water table and soil health tracking across 42 villages',
      'Donor progress reports generated automatically in 1 click instead of 14 days',
      'Full institutional ownership with in-house coordinator trained to manage user logins and data backups',
    ],
    image_url: '/assets/images/digital_training_rural.webp',
    testimonial_quote: 'Earlier our field workers were buried under paper files and tally sheets. Now they carry tablets into the fields, and our community meetings have real numbers to discuss. SEVA understood our ground realities and never gave us complicated software we could not maintain.',
    testimonial_author: 'Sunita Patil',
    testimonial_designation: 'Project Director',
    date_published: '2026-08-14',
    is_published: true,
    is_sample: false,
  },
  {
    id: 'cs-2',
    organisation_name: 'Shramik Mahila Adhikar Trust',
    state: 'Maharashtra',
    district: 'Amravati',
    organisation_background: 'Women-led grassroots trust federating 85 rural Self-Help Groups (SHGs) engaged in minor forest produce processing, micro-credit, and nutrition support.',
    challenge_before_support: 'Lack of an institutional web presence and digital documentation made it nearly impossible to showcase verified women-led enterprises to potential buyers, CSR partners, and government schemes. Loan repayment records were kept on paper notebooks.',
    technology_support_provided: 'Development of an institutional profile website, digital documentation repository, and simple cloud-backed SHG loan repayment tracker.',
    implementation_process: 'Participatory storytelling sessions with SHG federation leaders, professional photo documentation, bilingual website creation, and digital communication training for young community mobilizers.',
    results_and_improvements: [
      'Established transparent online profile displaying audited accounts and audited annual returns',
      'Increased external credibility leading to two new sustainable institutional partnerships',
      'Digital ledger for 85 SHGs reducing financial reconciliation discrepancies to zero',
      'Trained 6 young rural women to manage social media stories and update product catalogs',
    ],
    image_url: '/assets/images/hero_grassroots_technology.webp',
    testimonial_quote: 'SEVA showed us that technology is not just for big companies in Mumbai or Pune. It can give a voice to grassroots women living in remote forest hamlets.',
    testimonial_author: 'Rekhabai Meshram',
    testimonial_designation: 'Federation Secretary',
    date_published: '2026-05-20',
    is_published: true,
    is_sample: false,
  },
  {
    id: 'cs-3',
    organisation_name: 'Jal-Dharitri Foundation',
    state: 'Madhya Pradesh',
    district: 'Chhindwara',
    organisation_background: 'Community foundation working on indigenous seed preservation and traditional water harvesting systems across central tribal belt.',
    challenge_before_support: 'Seed conservation data collected across 18 remote panchayats was scattered on random pen-drives and duplicate Excel files, with no version control or spatial mapping.',
    technology_support_provided: 'Centralised biodiversity seed database, field mobile application with offline seed photo cataloging, and standard annual reporting module.',
    implementation_process: 'Co-design workshops with traditional seed keepers and village youth; bilingual Marathi-Hindi user interface; rigorous field testing in zero-connectivity forested villages.',
    results_and_improvements: [
      'Cataloged 140+ indigenous millet and paddy varieties with GPS-tagged farmer plots',
      'Zero data loss during monsoon season when paper files previously got damaged',
      'Standardized annual reporting ready for State Biodiversity Board submissions',
      'Organisational data autonomy achieved without dependence on external software vendors',
    ],
    image_url: '/assets/images/field_data_collection.webp',
    testimonial_quote: 'The cost-sharing model allowed our small trust to invest with dignity and pride. Because we contributed 30%, our board and field staff felt complete ownership of the system from day one.',
    testimonial_author: 'Dr. Anand Joshi',
    testimonial_designation: 'Managing Trustee',
    date_published: '2026-02-10',
    is_published: true,
    is_sample: true,
  },
];

// Initial Knowledge Centre Resources (Part 11)
export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Designing Practical Beneficiary MIS for Rural Development Projects',
    category: 'MIS and Data Management',
    summary: 'A step-by-step framework for grassroots organisations to structure beneficiary databases without bloated software or expensive licenses.',
    content: `Many grassroots NGOs make the mistake of either collecting too little information or trying to collect 100 questions per family that nobody ever reads or analyzes.\n\nA practical rural MIS focuses on four core principles:\n1. Unit of Record: Define whether your primary entity is the individual, the household, or the self-help group.\n2. Indicator Discipline: Only collect data points that directly inform project decisions or donor compliance.\n3. Offline-First Architecture: Assume your field animators will encounter zero cellular connectivity in remote villages.\n4. Local Language Support: Ensure the data entry labels and confirmation screens match the vernacular language spoken by the community mobilizers.\n\nSEVA recommends beginning with a paper-to-digital matrix where every field column is mapped to a specific operational outcome.`,
    format: 'Guide',
    download_name: 'SEVA_Rural_MIS_Framework_2026.pdf',
    read_time: '7 min read',
    published_date: '2026-09-10',
  },
  {
    id: 'res-2',
    title: 'Essential Digital Security Guidelines for Small NGOs and Trusts',
    category: 'Digital Security',
    summary: 'Practical measures to protect community beneficiary data, prevent ransomware, and securely manage email accounts on shared office computers.',
    content: `Rural development organizations often handle sensitive demographic, health, and economic data of vulnerable communities. Yet, many organizations use shared laptops with no passwords or share generic email passwords on sticky notes.\n\nImmediate security checklist for NGOs:\n- Enable Two-Factor Authentication (2FA) on all organizational Google and banking accounts.\n- Segregate beneficiary identifiable data (Aadhaar, bank account details) with role-based access.\n- Establish an automated weekly backup policy to external encrypted drives or secure cloud storage.\n- Train field staff never to click suspicious links or download unverified APK files onto field survey tablets.`,
    format: 'Guide',
    download_name: 'NGO_Digital_Security_Checklist.pdf',
    read_time: '5 min read',
    published_date: '2026-08-01',
  },
  {
    id: 'res-3',
    title: 'Monthly Project Activity & Output Reporting Template',
    category: 'Documentation and Reporting',
    summary: 'A standardized, plug-and-play spreadsheet and document template structured for CSR partners and statutory reporting.',
    content: `This template helps program managers organize physical and financial progress across multiple blocks and thematic clusters. It features automatic variance calculations between planned versus actual milestones, narrative impact highlights, and photo documentation placeholders.`,
    format: 'Template',
    download_name: 'SEVA_Standard_Reporting_Template.xlsx',
    read_time: '3 min read',
    published_date: '2026-07-15',
  },
  {
    id: 'res-4',
    title: 'Building an Institutional NGO Website That Communicates Ground Impact',
    category: 'NGO Website Development',
    summary: 'How small organizations can design clean, credible websites that showcase genuine community work without looking like generic corporate agencies.',
    content: `A credible grassroots website should never look like an IT agency or a glossy marketing brochure. Donors and community partners look for four things:\n1. Legal Transparency: Clear display of 12A, 80G, CSR-1, audited balance sheets, and annual reports.\n2. Clear Geographical Scope: Exact map and list of blocks, talukas, and villages covered.\n3. Human-Centred Stories: Real community voices and field photographs showing real people in dignified settings.\n4. Clean Contact Information: Physical office address, landline/mobile numbers, and official institutional email address.`,
    format: 'Guide',
    download_name: 'NGO_Website_Best_Practices_Guide.pdf',
    read_time: '8 min read',
    published_date: '2026-06-11',
  },
  {
    id: 'res-5',
    title: 'Choosing Between Mobile Apps and Web Forms for Village Data Collection',
    category: 'Digital Tools for NGOs',
    summary: 'Comparative analysis of mobile-based survey tools (Kobo, ODK, custom PWA) vs. centralized spreadsheets based on budget and staff capacity.',
    content: `Choosing the right data collection method depends on your team's geography, device availability, and frequency of data submission. This guide walks you through the trade-offs between open-source tools like KoboToolbox, ODK, Google Forms, and custom offline-first web apps.`,
    format: 'Toolkit',
    download_name: 'Field_Data_Collection_Decision_Matrix.pdf',
    read_time: '6 min read',
    published_date: '2026-04-18',
  },
];

// Initial Realistic Applications (Pre-loaded with all 32 fields)
export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'SEVA-2026-0001',
    created_at: '2026-10-18T10:30:00.000Z',
    updated_at: '2026-10-22T14:15:00.000Z',
    status: 'Meeting Scheduled',
    priority: 'High',
    assigned_reviewer_id: 'user-1',
    assigned_reviewer_name: 'SEVA Technical Secretariat',

    name_of_organization: 'Savitribai Phule Mahila Vikas Mandal',
    type_of_organization: 'Society',
    year_of_establishment: 2014,
    registration_number: 'MAH/842/2014/YTL',
    state: 'Maharashtra',
    district: 'Yavatmal',
    organisation_address: 'Plot No. 12, Shivaji Nagar, Post Ner, Taluka Ner, Yavatmal, Maharashtra - 445102',
    organisation_website: '',
    organisation_email: 'spmvm.yavatmal@gmail.com',

    contact_person_name: 'Kavita Arvind Gawande',
    designation: 'Secretary & Lead Coordinator',
    contact_number: '9822451098',

    brief_description: 'We are a grassroots women-led organisation working for the past 12 years with 65 rural Self-Help Groups and women smallholder farmers on natural farming, millets value addition, and nutritional awareness.',
    key_areas_of_work: ['Women Empowerment', 'Agriculture', 'Livelihoods', 'Health'],
    villages_covered: 34,
    geographical_area_of_operation: 'Ner and Babhulgaon Talukas, Yavatmal District',
    annual_beneficiaries_reached: 4200,
    primary_beneficiaries: 'Women farmers, landless agricultural labourers, and adolescent girls from tribal communities',

    has_website: false,
    has_mis_system: false,
    current_digital_tools: ['WhatsApp', 'Excel/Spreadsheets'],

    major_technology_challenges: 'Our entire SHG loan savings records and farm training logs are maintained in 30 hand-written notebooks. When preparing monthly reports or applying for CSR grants, our coordinators spend 2 to 3 full weeks cross-checking registers. Often data gets duplicated or lost.',
    support_type_seeking: ['MIS and Digital Data Management', 'Website Development and Support', 'Digital Capacity Building and Technical Support'],
    description_of_solution_needed: 'A simple, bilingual (Marathi & English) mobile/web MIS for tracking SHG meetings, loan disbursements, repayments, and training logs, plus a clean official website to showcase our women-led millet products and annual reports.',
    main_problem_to_solve: 'Eliminate duplicate paperwork and give our board real-time visibility into financial repayments and agricultural training outputs.',
    intended_users: 'Field animators (12 women coordinators), Programme Manager, and Board of Trustees.',
    estimated_users_count: 15,

    has_previous_digital_project: false,
    previous_digital_project_details: '',

    requirement_urgency: 'Immediate (Within 1 month)',
    preferred_timeline: '3 to 4 months implementation with on-site staff training',
    first_priority_support: 'Bilingual SHG & Farmer MIS Database',

    documents: [
      {
        id: 'doc-1',
        application_id: 'SEVA-2026-0001',
        document_name: 'Registration_Certificate_Society.pdf',
        document_type: 'Organisation Registration',
        file_url: '#',
        file_size: '1.4 MB',
        uploaded_at: '2026-10-18T10:30:00.000Z',
      },
      {
        id: 'doc-2',
        application_id: 'SEVA-2026-0001',
        document_name: 'Annual_Activity_Report_2025.pdf',
        document_type: 'Annual Report',
        file_url: '#',
        file_size: '2.8 MB',
        uploaded_at: '2026-10-18T10:30:00.000Z',
      },
    ],
    reviews: {
      id: 'rev-1',
      application_id: 'SEVA-2026-0001',
      reviewer_id: 'user-1',
      reviewer_name: 'SEVA Review Committee',
      review_date: '2026-10-20T11:00:00.000Z',
      internal_notes: 'Strong grassroots presence in Ner taluka. Field team is enthusiastic. They have 12 animators who already use WhatsApp on smartphones, so adopting a clean mobile form will have high uptake. 30% contribution discussed in preliminary call and confirmed.',
      assessment_summary: 'Highly recommended for selection. Clear transition path from paper to digital. High impact on women-led rural enterprises.',
      technical_feasibility: 'High',
      organisational_readiness: 'High',
      expected_impact: 'High',
      estimated_complexity: 'Medium',
      estimated_programme_cost: 60000,
      organisation_contribution_estimate: 18000,
      seva_contribution_estimate: 42000,
      score_relevance: 19,
      score_impact: 19,
      score_reach: 14,
      score_urgency: 15,
      score_readiness: 9,
      score_feasibility: 9,
      score_sustainability: 9,
      total_score: 94,
    },
    status_history: [
      {
        id: 'sh-1',
        application_id: 'SEVA-2026-0001',
        previous_status: 'None',
        new_status: 'New Application',
        changed_by: 'Online Applicant',
        changed_at: '2026-10-18T10:30:00.000Z',
        internal_remarks: 'Application submitted through public portal.',
      },
      {
        id: 'sh-2',
        application_id: 'SEVA-2026-0001',
        previous_status: 'New Application',
        new_status: 'Under Initial Review',
        changed_by: 'SEVA Secretariat',
        changed_at: '2026-10-19T09:00:00.000Z',
        internal_remarks: 'Assigned to technical desk for ground assessment.',
      },
      {
        id: 'sh-3',
        application_id: 'SEVA-2026-0001',
        previous_status: 'Under Initial Review',
        new_status: 'Shortlisted',
        changed_by: 'SEVA Secretariat',
        changed_at: '2026-10-20T16:30:00.000Z',
        internal_remarks: 'Shortlisted with score 94/100.',
      },
      {
        id: 'sh-4',
        application_id: 'SEVA-2026-0001',
        previous_status: 'Shortlisted',
        new_status: 'Meeting Scheduled',
        changed_by: 'SEVA Secretariat',
        changed_at: '2026-10-22T14:15:00.000Z',
        internal_remarks: 'Virtual scoping discussion scheduled for upcoming Thursday.',
      },
    ],
  },
  {
    id: 'SEVA-2026-0002',
    created_at: '2026-10-22T08:45:00.000Z',
    updated_at: '2026-10-25T11:20:00.000Z',
    status: 'Approved',
    priority: 'High',
    assigned_reviewer_id: 'user-1',
    assigned_reviewer_name: 'SEVA Technical Secretariat',

    name_of_organization: 'Lok-Chetna Gramin Vikas Sanstha',
    type_of_organization: 'Trust',
    year_of_establishment: 2011,
    registration_number: 'E-1940/Wardha',
    state: 'Maharashtra',
    district: 'Wardha',
    organisation_address: 'At Post Seloo, Wardha District, Maharashtra - 442104',
    organisation_website: '',
    organisation_email: 'lokchetna.wardha@gmail.com',

    contact_person_name: 'Rameshwar B. Deshmukh',
    designation: 'Managing Trustee',
    contact_number: '9423187654',

    brief_description: 'Working across 48 drought-prone villages in Wardha and Yavatmal borders on watershed rejuvenation, farmer producer group aggregation, and rural drinking water safety.',
    key_areas_of_work: ['Water', 'Agriculture', 'Institutional Capacity Building'],
    villages_covered: 48,
    geographical_area_of_operation: 'Seloo and Deoli Talukas, Wardha District',
    annual_beneficiaries_reached: 6800,
    primary_beneficiaries: 'Dryland farmers, cotton cultivators, and village water committees (Pani Samitis)',

    has_website: false,
    has_mis_system: false,
    current_digital_tools: ['Excel/Spreadsheets', 'WhatsApp'],

    major_technology_challenges: 'Water recharge data, check-dam desilting records, and soil testing parameters are scattered across disconnected Excel sheets maintained on 3 different personal laptops. Difficult to produce unified district-level maps or track farmer yields.',
    support_type_seeking: ['MIS and Digital Data Management', 'Mobile or Web-Based Application Development', 'Website Development and Support'],
    description_of_solution_needed: 'A web portal for Pani Samitis with water level logs, water audit dashboards, and an organizational website showcasing our 15 years of watershed impact.',
    main_problem_to_solve: 'Consolidate 10 years of scattered watershed data into one secure, searchable database.',
    intended_users: '4 Block Coordinators, 24 Village Jal-Dutas, and Executive Secretary.',
    estimated_users_count: 30,

    has_previous_digital_project: true,
    previous_digital_project_details: 'Tried using a basic free Google Form in 2023, but it was difficult for villagers without Marathi support and duplicate entries were common.',

    requirement_urgency: 'Moderate (1-3 months)',
    preferred_timeline: '4 months before next monsoon planning cycle',
    first_priority_support: 'Water Audit & Watershed MIS System',

    documents: [
      {
        id: 'doc-3',
        application_id: 'SEVA-2026-0002',
        document_name: 'Trust_Deed_and_12A_80G.pdf',
        document_type: 'Legal Compliance',
        file_url: '#',
        file_size: '3.1 MB',
        uploaded_at: '2026-10-22T08:45:00.000Z',
      },
    ],
    reviews: {
      id: 'rev-2',
      application_id: 'SEVA-2026-0002',
      reviewer_id: 'user-1',
      reviewer_name: 'SEVA Review Committee',
      review_date: '2026-10-24T15:00:00.000Z',
      internal_notes: 'Exceptional track record in rural water conservation. Clear governance structure. Meeting conducted; board approved 30% financial contribution.',
      assessment_summary: 'Approved for active project deployment. Scope finalized.',
      technical_feasibility: 'High',
      organisational_readiness: 'High',
      expected_impact: 'High',
      estimated_complexity: 'Medium',
      estimated_programme_cost: 75000,
      organisation_contribution_estimate: 22500,
      seva_contribution_estimate: 52500,
      score_relevance: 19,
      score_impact: 19,
      score_reach: 15,
      score_urgency: 13,
      score_readiness: 10,
      score_feasibility: 9,
      score_sustainability: 10,
      total_score: 95,
    },
    status_history: [
      {
        id: 'sh-5',
        application_id: 'SEVA-2026-0002',
        previous_status: 'None',
        new_status: 'New Application',
        changed_by: 'Online Applicant',
        changed_at: '2026-10-22T08:45:00.000Z',
        internal_remarks: 'Application submitted.',
      },
      {
        id: 'sh-6',
        application_id: 'SEVA-2026-0002',
        previous_status: 'New Application',
        new_status: 'Approved',
        changed_by: 'SEVA Committee',
        changed_at: '2026-10-25T11:20:00.000Z',
        internal_remarks: 'Approved following scope agreement and contribution confirmation.',
      },
    ],
  },
  {
    id: 'SEVA-2026-0003',
    created_at: '2026-10-27T14:10:00.000Z',
    updated_at: '2026-10-28T09:30:00.000Z',
    status: 'Under Initial Review',
    priority: 'Medium',
    assigned_reviewer_id: 'user-1',
    assigned_reviewer_name: 'SEVA Technical Secretariat',

    name_of_organization: 'Panchayati Raj Vikas Manch',
    type_of_organization: 'Section 8 Company',
    year_of_establishment: 2019,
    registration_number: 'U85300MH2019NPL321456',
    state: 'Maharashtra',
    district: 'Amravati',
    organisation_address: 'Near Old Bus Stand, Morshi, Amravati, Maharashtra - 444905',
    organisation_website: '',
    organisation_email: 'prvm.amravati@org.in',

    contact_person_name: 'Aniket Sudhakarrao Kale',
    designation: 'Executive Director',
    contact_number: '9860341299',

    brief_description: 'Capacity building organisation supporting Gram Panchayats and elected women sarpanches with village development planning and social audits.',
    key_areas_of_work: ['Institutional Capacity Building', 'Education', 'Social Impact and Visibility'],
    villages_covered: 25,
    geographical_area_of_operation: 'Morshi and Warud Talukas',
    annual_beneficiaries_reached: 3100,
    primary_beneficiaries: 'Gram Panchayat members, Village Development Committee representatives',

    has_website: false,
    has_mis_system: false,
    current_digital_tools: ['WhatsApp', 'Google Drive'],

    major_technology_challenges: 'We need to document and showcase the best practices of 25 model Panchayats so other villages can replicate them. Currently we have zero online presence and no proper repository for case studies.',
    support_type_seeking: ['Website Development and Support', 'Social Media and Digital Communication Training'],
    description_of_solution_needed: 'A dynamic, mobile-friendly institutional website with a knowledge bank of Gram Panchayat resolutions and village schemes.',
    main_problem_to_solve: 'Lack of organisational visibility and no digital showcase for our grassroots governance research.',
    intended_users: 'Research team and sarpanches.',
    estimated_users_count: 8,

    has_previous_digital_project: false,
    previous_digital_project_details: '',

    requirement_urgency: 'Moderate (1-3 months)',
    preferred_timeline: '3 months',
    first_priority_support: 'Institutional Website & Knowledge Bank',

    documents: [],
    status_history: [
      {
        id: 'sh-7',
        application_id: 'SEVA-2026-0003',
        previous_status: 'None',
        new_status: 'New Application',
        changed_by: 'Online Applicant',
        changed_at: '2026-10-27T14:10:00.000Z',
        internal_remarks: 'Application submitted.',
      },
      {
        id: 'sh-8',
        application_id: 'SEVA-2026-0003',
        previous_status: 'New Application',
        new_status: 'Under Initial Review',
        changed_by: 'SEVA Secretariat',
        changed_at: '2026-10-28T09:30:00.000Z',
        internal_remarks: 'Assessing requirement alignment.',
      },
    ],
  },
  {
    id: 'SEVA-2026-0004',
    created_at: '2026-10-30T16:20:00.000Z',
    updated_at: '2026-10-30T16:20:00.000Z',
    status: 'New Application',
    priority: 'Medium',

    name_of_organization: 'Bhoomi Sanrakshan Samiti',
    type_of_organization: 'Community-Based Organisation (CBO)',
    year_of_establishment: 2021,
    registration_number: 'MH/1102/2021',
    state: 'Maharashtra',
    district: 'Yavatmal',
    organisation_address: 'At Post Jalka, Taluka Ralegaon, Yavatmal, Maharashtra - 445402',
    organisation_website: '',
    organisation_email: 'bhoomi.ralegaon@gmail.com',

    contact_person_name: 'Dnyaneshwar M. Wankhede',
    designation: 'President',
    contact_number: '8999469974',

    brief_description: 'Village-level collective of organic cotton growers focusing on bio-inputs, traditional seed banks, and local farmers market linkages in Ralegaon block.',
    key_areas_of_work: ['Agriculture', 'Livelihoods'],
    villages_covered: 12,
    geographical_area_of_operation: 'Ralegaon Block, Yavatmal District',
    annual_beneficiaries_reached: 850,
    primary_beneficiaries: 'Small and marginal organic farmers',

    has_website: false,
    has_mis_system: false,
    current_digital_tools: ['WhatsApp'],

    major_technology_challenges: 'Tracking organic certification batch numbers and member farmer harvest quantities on paper receipts causes frequent errors during buyer inspections.',
    support_type_seeking: ['MIS and Digital Data Management', 'Data Management, Documentation and Reporting Systems'],
    description_of_solution_needed: 'Simple digital batch registration and harvest tracking tool for cotton procurement.',
    main_problem_to_solve: 'Accurate batch traceability for organic produce.',
    intended_users: '6 Village collection agents and accountant.',
    estimated_users_count: 7,

    has_previous_digital_project: false,
    previous_digital_project_details: '',

    requirement_urgency: 'Immediate (Within 1 month)',
    preferred_timeline: 'Within 2 months before winter harvest peak',
    first_priority_support: 'Harvest & Batch Traceability Tool',

    documents: [],
    status_history: [
      {
        id: 'sh-9',
        application_id: 'SEVA-2026-0004',
        previous_status: 'None',
        new_status: 'New Application',
        changed_by: 'Online Applicant',
        changed_at: '2026-10-30T16:20:00.000Z',
        internal_remarks: 'Application received from local Ralegaon collective.',
      },
    ],
  },
];

// Initial Active Projects (Part 10)
export const INITIAL_PROJECTS: ProgrammeProject[] = [
  {
    id: 'proj-1',
    application_id: 'SEVA-2026-0002',
    organisation_name: 'Lok-Chetna Gramin Vikas Sanstha',
    state: 'Maharashtra',
    district: 'Wardha',
    approved_support_areas: [
      'MIS and Digital Data Management',
      'Mobile or Web-Based Application Development',
      'Website Development and Support',
    ],
    start_date: '2026-11-01',
    expected_completion_date: '2027-02-28',
    project_duration_months: 4,
    agreed_programme_cost: 75000,
    seva_support_contribution: 52500, // 70%
    organisation_contribution: 22500, // 30%
    assigned_technical_lead: 'Pravin R. (SEVA Lead Technologist)',
    assigned_team_members: ['Pravin R.', 'Neha K. (UX & Training)', 'Gajanan P. (Field Deployment)'],
    implementation_status: 'Needs Assessment',
    review_meetings_count: 2,
    deliverables_summary: 'Centralized water audit MIS, mobile field app for 24 Jal-Dutas, bilingual institutional website, and on-site staff capacity workshop.',
    milestones: [
      {
        id: 'm-1',
        stage_number: 1,
        title: '1. Needs Assessment & Field Workflow Mapping',
        description: 'On-site interviews with Wardha field animators to map all check-dam and water meter paper registers.',
        status: 'In Progress',
        target_date: '2026-11-15',
        notes: 'Field forms cataloged; draft schema prepared.',
      },
      {
        id: 'm-2',
        stage_number: 2,
        title: '2. Requirement Finalisation & Architecture',
        description: 'Sign-off on database fields, bilingual Marathi terms, and role-based permissions.',
        status: 'Not Started',
        target_date: '2026-11-30',
      },
      {
        id: 'm-3',
        stage_number: 3,
        title: '3. Planning & UI/UX Design',
        description: 'Interactive wireframes designed for high-contrast sunlight readability on low-cost Android phones.',
        status: 'Not Started',
        target_date: '2026-12-15',
      },
      {
        id: 'm-4',
        stage_number: 4,
        title: '4. Development & Implementation',
        description: 'Core web portal, offline sync storage, and automated Excel export engines.',
        status: 'Not Started',
        target_date: '2027-01-10',
      },
      {
        id: 'm-5',
        stage_number: 5,
        title: '5. Field Testing & Data Verification',
        description: 'Simulated survey across 5 pilot villages in Seloo taluka to stress test sync.',
        status: 'Not Started',
        target_date: '2027-01-25',
      },
      {
        id: 'm-6',
        stage_number: 6,
        title: '6. Staff Training & Capacity Building',
        description: '2-day intensive practical workshop for 24 Jal-Dutas in Wardha.',
        status: 'Not Started',
        target_date: '2027-02-10',
      },
      {
        id: 'm-7',
        stage_number: 7,
        title: '7. Deployment & Live Launch',
        description: 'Official transition to live system with historical data migration.',
        status: 'Not Started',
        target_date: '2027-02-20',
      },
      {
        id: 'm-8',
        stage_number: 8,
        title: '8. Handover & Admin Credentials',
        description: 'Full handover of source code, hosting credentials, and administrator guide.',
        status: 'Not Started',
        target_date: '2027-02-28',
      },
      {
        id: 'm-9',
        stage_number: 9,
        title: '9. Follow-up & Evaluation',
        description: '3-month post-handover quarterly check-in to monitor system usage and data health.',
        status: 'Not Started',
        target_date: '2027-05-30',
      },
    ],
  },
];

// Initial Meetings (Part 9.1)
export const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'meet-1',
    application_id: 'SEVA-2026-0001',
    organisation_name: 'Savitribai Phule Mahila Vikas Mandal',
    contact_email: 'spmvm.yavatmal@gmail.com',
    contact_person: 'Kavita Arvind Gawande',
    title: 'Technology Scope & Field Workflow Discussion',
    meeting_date: '2026-11-05',
    start_time: '11:00',
    end_time: '12:00',
    mode: 'Online',
    platform: 'Google Meet',
    meeting_link: 'https://meet.google.com/sev-spmv-yav',
    agenda: '1. Review current paper registers of 65 SHGs.\n2. Discuss mobile app needs for 12 animators in Ner.\n3. Explain 70-30 cost sharing model and agree on implementation timeline.',
    internal_remarks: 'Applicant requested Marathi presentation.',
    status: 'Scheduled',
    created_at: '2026-10-22T14:15:00.000Z',
    created_by: 'SEVA Secretariat',
    email_sent: true,
  },
];

// Initial Email Logs
export const INITIAL_EMAIL_LOGS: EmailLog[] = [
  {
    id: 'elog-1',
    application_id: 'SEVA-2026-0001',
    recipient_email: 'spmvm.yavatmal@gmail.com',
    recipient_name: 'Kavita Arvind Gawande',
    subject: 'Meeting Invitation: Technology Support Discussion - Savitribai Phule Mahila Vikas Mandal [SEVA-2026-0001]',
    body: 'Official invitation for scoping discussion on 5 Nov 2026.',
    sent_at: '2026-10-22T14:18:00.000Z',
    sent_by: 'SEVA Secretariat',
    status: 'Delivered',
    template_used: 'Meeting Invitation',
  },
  {
    id: 'elog-2',
    application_id: 'SEVA-2026-0002',
    recipient_email: 'lokchetna.wardha@gmail.com',
    recipient_name: 'Rameshwar B. Deshmukh',
    subject: 'Official Approval: SEVA Technology Support Programme for Lok-Chetna Gramin Vikas Sanstha',
    body: 'Official approval notification and MoU instructions.',
    sent_at: '2026-10-25T11:25:00.000Z',
    sent_by: 'SEVA Secretariat',
    status: 'Delivered',
    template_used: 'Application Approved',
  },
];

// Initial Contact Messages
export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'cm-1',
    name: 'Santosh Rao',
    email: 'santosh.rao@ruraltrust.org',
    phone: '9822334455',
    organisation: 'Vidarbha Farmer Development Trust',
    subject: 'Inquiry regarding MIS support for organic farmer producer groups',
    message: 'We work with 18 FPOs in Akola district. We want to know if our groups are eligible to apply under SEVA cost-sharing programme.',
    submitted_at: '2026-10-29T10:15:00.000Z',
    status: 'Unread',
  },
];

// Storage Keys
const STORAGE_KEYS = {
  APPLICATIONS: 'seva_applications_v1',
  SETTINGS: 'seva_settings_v1',
  IMPACT_STATS: 'seva_impact_stats_v1',
  CASE_STUDIES: 'seva_case_studies_v1',
  RESOURCES: 'seva_resources_v1',
  MEETINGS: 'seva_meetings_v1',
  EMAIL_LOGS: 'seva_email_logs_v1',
  EMAIL_TEMPLATES: 'seva_email_templates_v1',
  PROJECTS: 'seva_projects_v1',
  CONTACT_MESSAGES: 'seva_contact_messages_v1',
  CURRENT_USER: 'seva_current_user_v1',
};

// Available Admin Users for role-based testing
export const ADMIN_USERS: UserProfile[] = [
  {
    id: 'usr-super',
    name: 'SEVA Director (Super Admin)',
    email: 'seva.ecology@gmail.com',
    role: 'super_admin',
    designation: 'Director, SEVA',
  },
  {
    id: 'usr-prog',
    name: 'Programme Administrator',
    email: 'programmes@sevavillage.org',
    role: 'programme_admin',
    designation: 'Lead Programme Manager',
  },
  {
    id: 'usr-rev',
    name: 'Technical Reviewer',
    email: 'evaluations@sevavillage.org',
    role: 'reviewer',
    designation: 'Senior Technical Evaluator',
  },
];

// Store Helper Functions
export class SevaStore {
  // Load helper
  private static load<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn(`Failed reading ${key} from storage:`, e);
    }
    return fallback;
  }

  // Save helper
  private static save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed writing ${key} to storage:`, e);
    }
  }

  // Applications
  static getApplications(): Application[] {
    return this.load<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }

  static getApplicationById(id: string): Application | undefined {
    const list = this.getApplications();
    return list.find((a) => a.id === id);
  }

  static submitApplication(newAppData: Omit<Application, 'id' | 'created_at' | 'updated_at' | 'status' | 'priority' | 'status_history' | 'documents'> & { documents?: any[] }): Application {
    const list = this.getApplications();
    const count = list.length + 1;
    const formattedId = `SEVA-2026-${String(count).padStart(4, '0')}`;
    const now = new Date().toISOString();

    const application: Application = {
      ...newAppData,
      id: formattedId,
      created_at: now,
      updated_at: now,
      status: 'New Application',
      priority: 'Medium',
      documents: newAppData.documents || [],
      status_history: [
        {
          id: `sh-${Date.now()}`,
          application_id: formattedId,
          previous_status: 'None',
          new_status: 'New Application',
          changed_by: 'Public Applicant Portal',
          changed_at: now,
          internal_remarks: 'Application submitted successfully via online portal.',
        },
      ],
    };

    const updatedList = [application, ...list];
    this.save(STORAGE_KEYS.APPLICATIONS, updatedList);

    // Also log automatic acknowledgement email
    this.sendEmail({
      application_id: application.id,
      recipient_email: application.organisation_email,
      recipient_name: application.contact_person_name,
      subject: `Application Received: SEVA Technology Support Programme [${application.id}]`,
      body: `Dear ${application.contact_person_name},\n\nThank you for submitting your application on behalf of ${application.name_of_organization} to SEVA's Technology Support Programme. Your Application ID is ${application.id}.\n\nOur team will review your application and contact you regarding next steps.`,
      template_used: 'Application Received',
      sent_by: 'System Automated Workflow',
    });

    return application;
  }

  static updateApplicationStatus(
    appId: string,
    newStatus: Application['status'],
    internalRemarks: string,
    changedBy: string
  ): Application | null {
    const list = this.getApplications();
    const index = list.findIndex((a) => a.id === appId);
    if (index === -1) return null;

    const current = list[index];
    const now = new Date().toISOString();

    const historyEntry = {
      id: `sh-${Date.now()}`,
      application_id: appId,
      previous_status: current.status,
      new_status: newStatus,
      changed_by: changedBy,
      changed_at: now,
      internal_remarks: internalRemarks || `Status changed from ${current.status} to ${newStatus}`,
    };

    const updatedApp: Application = {
      ...current,
      status: newStatus,
      updated_at: now,
      status_history: [historyEntry, ...(current.status_history || [])],
    };

    list[index] = updatedApp;
    this.save(STORAGE_KEYS.APPLICATIONS, list);
    return updatedApp;
  }

  static saveApplicationReview(appId: string, review: ApplicationReview, updatedPriority?: Application['priority']): Application | null {
    const list = this.getApplications();
    const index = list.findIndex((a) => a.id === appId);
    if (index === -1) return null;

    const current = list[index];
    const now = new Date().toISOString();

    const updatedApp: Application = {
      ...current,
      reviews: review,
      priority: updatedPriority || current.priority,
      updated_at: now,
    };

    list[index] = updatedApp;
    this.save(STORAGE_KEYS.APPLICATIONS, list);
    return updatedApp;
  }

  // Priority Auto-Calculator based on weights (Part 8.4)
  static calculateScore(scores: {
    relevance: number; // 0-20
    impact: number; // 0-20
    reach: number; // 0-15
    urgency: number; // 0-15
    readiness: number; // 0-10
    feasibility: number; // 0-10
    sustainability: number; // 0-10
  }): number {
    return (
      (scores.relevance || 0) +
      (scores.impact || 0) +
      (scores.reach || 0) +
      (scores.urgency || 0) +
      (scores.readiness || 0) +
      (scores.feasibility || 0) +
      (scores.sustainability || 0)
    );
  }

  // Meetings
  static getMeetings(): Meeting[] {
    return this.load<Meeting[]>(STORAGE_KEYS.MEETINGS, INITIAL_MEETINGS);
  }

  static scheduleMeeting(meetingData: Omit<Meeting, 'id' | 'created_at'>): Meeting {
    const list = this.getMeetings();
    const newMeeting: Meeting = {
      ...meetingData,
      id: `meet-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newMeeting, ...list];
    this.save(STORAGE_KEYS.MEETINGS, updated);

    // Update application status to 'Meeting Scheduled' if not already
    this.updateApplicationStatus(
      meetingData.application_id,
      'Meeting Scheduled',
      `Meeting scheduled for ${meetingData.meeting_date} at ${meetingData.start_time} (${meetingData.mode}).`,
      meetingData.created_by
    );

    // Send meeting invitation email log
    this.sendEmail({
      application_id: meetingData.application_id,
      recipient_email: meetingData.contact_email,
      recipient_name: meetingData.contact_person,
      subject: `Meeting Invitation: Technology Support Discussion - ${meetingData.organisation_name} [${meetingData.application_id}]`,
      body: `Dear ${meetingData.contact_person},\n\nWe have scheduled a meeting regarding your application.\n\nDate: ${meetingData.meeting_date}\nTime: ${meetingData.start_time} - ${meetingData.end_time}\nMode: ${meetingData.mode}\n${meetingData.meeting_link ? `Link: ${meetingData.meeting_link}\n` : ''}${meetingData.venue ? `Venue: ${meetingData.venue}\n` : ''}\nAgenda:\n${meetingData.agenda}\n\nWarm regards,\nSEVA Secretariat`,
      template_used: 'Meeting Invitation',
      sent_by: meetingData.created_by,
    });

    return newMeeting;
  }

  static updateMeetingStatus(meetingId: string, status: Meeting['status']): void {
    const list = this.getMeetings();
    const updated = list.map((m) => (m.id === meetingId ? { ...m, status } : m));
    this.save(STORAGE_KEYS.MEETINGS, updated);
  }

  // Email Templates & Logs
  static getEmailTemplates(): EmailTemplate[] {
    return this.load<EmailTemplate[]>(STORAGE_KEYS.EMAIL_TEMPLATES, INITIAL_EMAIL_TEMPLATES);
  }

  static getEmailLogs(): EmailLog[] {
    return this.load<EmailLog[]>(STORAGE_KEYS.EMAIL_LOGS, INITIAL_EMAIL_LOGS);
  }

  static sendEmail(payload: {
    application_id?: string;
    recipient_email: string;
    recipient_name: string;
    subject: string;
    body: string;
    template_used?: string;
    sent_by: string;
  }): EmailLog {
    const list = this.getEmailLogs();
    const log: EmailLog = {
      id: `elog-${Date.now()}`,
      application_id: payload.application_id || '',
      recipient_email: payload.recipient_email,
      recipient_name: payload.recipient_name,
      subject: payload.subject,
      body: payload.body,
      sent_at: new Date().toISOString(),
      sent_by: payload.sent_by,
      status: 'Delivered',
      template_used: payload.template_used,
    };
    const updated = [log, ...list];
    this.save(STORAGE_KEYS.EMAIL_LOGS, updated);
    return log;
  }

  // Active Projects (Part 10)
  static getProjects(): ProgrammeProject[] {
    return this.load<ProgrammeProject[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  }

  static convertApplicationToProject(app: Application, projectDetails: {
    agreed_cost: number;
    assigned_lead: string;
    duration_months: number;
    start_date: string;
  }): ProgrammeProject {
    const list = this.getProjects();
    const agreedCost = projectDetails.agreed_cost || 60000;
    const duration = projectDetails.duration_months || 4;
    const start = new Date(projectDetails.start_date || new Date().toISOString());
    const completionDate = new Date(start);
    completionDate.setMonth(completionDate.getMonth() + duration);

    const standardMilestones = [
      'Needs Assessment & Field Workflow Mapping',
      'Requirement Finalisation & Database Architecture',
      'Planning & High-Contrast Wireframing',
      'Development & System Implementation',
      'Field Testing & Data Stress Verification',
      'Staff Training & Capacity Building Workshops',
      'Live Deployment & Data Migration',
      'Handover & Full Source Credentials',
      'Follow-up, Monitoring & Quarterly Health Check',
    ];

    const milestones = standardMilestones.map((title, i) => {
      const target = new Date(start);
      target.setDate(target.getDate() + (i + 1) * 14);
      return {
        id: `m-${Date.now()}-${i}`,
        stage_number: i + 1,
        title: `${i + 1}. ${title}`,
        description: `Implementation stage ${i + 1} for ${app.name_of_organization}`,
        status: (i === 0 ? 'In Progress' : 'Not Started') as any,
        target_date: target.toISOString().split('T')[0],
      };
    });

    const newProject: ProgrammeProject = {
      id: `proj-${Date.now()}`,
      application_id: app.id,
      organisation_name: app.name_of_organization,
      state: app.state,
      district: app.district,
      approved_support_areas: app.support_type_seeking,
      start_date: start.toISOString().split('T')[0],
      expected_completion_date: completionDate.toISOString().split('T')[0],
      project_duration_months: duration,
      agreed_programme_cost: agreedCost,
      seva_support_contribution: Math.round(agreedCost * 0.7), // 70%
      organisation_contribution: Math.round(agreedCost * 0.3), // 30%
      assigned_technical_lead: projectDetails.assigned_lead || 'SEVA Technical Operations Desk',
      assigned_team_members: [projectDetails.assigned_lead || 'SEVA Technical Lead', 'Capacity Building Trainer'],
      implementation_status: 'Needs Assessment',
      milestones,
      review_meetings_count: 1,
      deliverables_summary: `Custom technology support for ${app.name_of_organization} covering ${app.support_type_seeking.join(', ')}.`,
    };

    const updated = [newProject, ...list];
    this.save(STORAGE_KEYS.PROJECTS, updated);

    // Update application status to Implementation Started
    this.updateApplicationStatus(
      app.id,
      'Implementation Started',
      `Converted to active project record. Total agreed cost: ₹${agreedCost.toLocaleString('en-IN')}. SEVA contribution 70%: ₹${newProject.seva_support_contribution.toLocaleString('en-IN')}, NGO contribution 30%: ₹${newProject.organisation_contribution.toLocaleString('en-IN')}.`,
      projectDetails.assigned_lead
    );

    return newProject;
  }

  static updateProjectMilestone(
    projectId: string,
    milestoneId: string,
    status: 'Not Started' | 'In Progress' | 'Completed',
    notes?: string
  ): void {
    const list = this.getProjects();
    const updated = list.map((proj) => {
      if (proj.id === projectId) {
        const updatedMilestones = proj.milestones.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status,
                notes: notes !== undefined ? notes : m.notes,
                completed_date: status === 'Completed' ? new Date().toISOString().split('T')[0] : undefined,
              }
            : m
        );
        return { ...proj, milestones: updatedMilestones };
      }
      return proj;
    });
    this.save(STORAGE_KEYS.PROJECTS, updated);
  }

  // Impact Statistics (Part 14 CMS)
  static getImpactStats(): ImpactStatistic[] {
    return this.load<ImpactStatistic[]>(STORAGE_KEYS.IMPACT_STATS, INITIAL_IMPACT_STATS);
  }

  static updateImpactStat(id: string, updates: Partial<ImpactStatistic>): void {
    const list = this.getImpactStats();
    const updated = list.map((s) => (s.id === id ? { ...s, ...updates, last_updated: new Date().toISOString() } : s));
    this.save(STORAGE_KEYS.IMPACT_STATS, updated);
  }

  // Case Studies (Part 6 & Part 14 CMS)
  static getCaseStudies(): CaseStudy[] {
    const raw = this.load<CaseStudy[]>(STORAGE_KEYS.CASE_STUDIES, INITIAL_CASE_STUDIES);
    // Sanitize any legacy /src/assets/images/ paths that might be cached in user localStorage
    return raw.map((cs) => ({
      ...cs,
      image_url: cs.image_url ? cs.image_url.replace('/src/assets/images/', '/assets/images/') : cs.image_url,
    }));
  }

  static saveCaseStudy(caseStudy: CaseStudy): void {
    const list = this.getCaseStudies();
    const index = list.findIndex((cs) => cs.id === caseStudy.id);
    let updated: CaseStudy[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = caseStudy;
    } else {
      updated = [caseStudy, ...list];
    }
    this.save(STORAGE_KEYS.CASE_STUDIES, updated);
  }

  // Knowledge Resources (Part 11 & Part 14 CMS)
  static getResources(): ResourceItem[] {
    return this.load<ResourceItem[]>(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
  }

  static saveResource(resource: ResourceItem): void {
    const list = this.getResources();
    const index = list.findIndex((r) => r.id === resource.id);
    let updated: ResourceItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = resource;
    } else {
      updated = [resource, ...list];
    }
    this.save(STORAGE_KEYS.RESOURCES, updated);
  }

  // Contact Messages (Part 12)
  static getContactMessages(): ContactMessage[] {
    return this.load<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES, INITIAL_CONTACT_MESSAGES);
  }

  static submitContactMessage(data: Omit<ContactMessage, 'id' | 'submitted_at' | 'status'>): ContactMessage {
    const list = this.getContactMessages();
    const newMsg: ContactMessage = {
      ...data,
      id: `cm-${Date.now()}`,
      submitted_at: new Date().toISOString(),
      status: 'Unread',
    };
    const updated = [newMsg, ...list];
    this.save(STORAGE_KEYS.CONTACT_MESSAGES, updated);
    return newMsg;
  }

  // Organisation Settings (Part 14)
  static getSettings(): OrganisationSettings {
    return this.load<OrganisationSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_ORG_SETTINGS);
  }

  static saveSettings(settings: OrganisationSettings): void {
    this.save(STORAGE_KEYS.SETTINGS, settings);
  }

  // Current Logged-in Admin User
  static getCurrentUser(): UserProfile {
    return this.load<UserProfile>(STORAGE_KEYS.CURRENT_USER, ADMIN_USERS[0]);
  }

  static setCurrentUser(user: UserProfile): void {
    this.save(STORAGE_KEYS.CURRENT_USER, user);
  }
}
