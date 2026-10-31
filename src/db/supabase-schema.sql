-- =====================================================================
-- SEVA - Sustainable Ecology & Rural Advancement
-- Master Supabase / PostgreSQL Schema & RLS Policies (18 Tables)
-- Official Website: https://www.sevavillage.org
-- Generated for Production Deployment
-- =====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------
-- 1. profiles & 2. user_roles
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    designation TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'programme_admin', 'reviewer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, role)
);

-- ---------------------------------------------------------------------
-- 3. applications (Contains dedicated columns for ALL 32 fields)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.applications (
    id TEXT PRIMARY KEY, -- e.g. 'SEVA-2026-0001'
    status TEXT NOT NULL DEFAULT 'New Application' CHECK (status IN (
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
        'Implementation Completed'
    )),
    priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
    assigned_reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

    -- SECTION A: ORGANISATIONAL INFORMATION
    name_of_organization TEXT NOT NULL,
    type_of_organization TEXT NOT NULL,
    year_of_establishment INTEGER NOT NULL,
    registration_number TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    organisation_address TEXT NOT NULL,
    organisation_website TEXT,
    organisation_email TEXT NOT NULL,

    -- SECTION B: CONTACT INFORMATION
    contact_person_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    contact_number TEXT NOT NULL,

    -- SECTION C: ORGANISATIONAL PROFILE
    brief_description TEXT NOT NULL,
    key_areas_of_work TEXT[] NOT NULL DEFAULT '{}',
    villages_covered INTEGER NOT NULL DEFAULT 0,
    geographical_area_of_operation TEXT NOT NULL,
    annual_beneficiaries_reached INTEGER NOT NULL DEFAULT 0,
    primary_beneficiaries TEXT NOT NULL,

    -- SECTION D: EXISTING DIGITAL INFRASTRUCTURE
    has_website BOOLEAN NOT NULL DEFAULT false,
    has_mis_system BOOLEAN NOT NULL DEFAULT false,
    current_digital_tools TEXT[] NOT NULL DEFAULT '{}',

    -- SECTION E: TECHNOLOGY CHALLENGES AND SUPPORT REQUIREMENTS
    major_technology_challenges TEXT NOT NULL,
    support_type_seeking TEXT[] NOT NULL DEFAULT '{}',
    description_of_solution_needed TEXT NOT NULL,
    main_problem_to_solve TEXT NOT NULL,
    intended_users TEXT NOT NULL,
    estimated_users_count INTEGER NOT NULL DEFAULT 1,

    -- SECTION F: PREVIOUS EXPERIENCE
    has_previous_digital_project BOOLEAN NOT NULL DEFAULT false,
    previous_digital_project_details TEXT,

    -- SECTION G: PRIORITY AND TIMELINE
    requirement_urgency TEXT NOT NULL,
    preferred_timeline TEXT NOT NULL,
    first_priority_support TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexing for fast queries
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_priority ON public.applications(priority);
CREATE INDEX IF NOT EXISTS idx_applications_state ON public.applications(state);
CREATE INDEX IF NOT EXISTS idx_applications_created ON public.applications(created_at DESC);

-- ---------------------------------------------------------------------
-- 4. application_documents
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.application_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size TEXT,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------
-- 5. application_reviews
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.application_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL UNIQUE REFERENCES public.applications(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewer_name TEXT NOT NULL,
    review_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    internal_notes TEXT,
    assessment_summary TEXT,
    technical_feasibility TEXT CHECK (technical_feasibility IN ('High', 'Medium', 'Low')),
    organisational_readiness TEXT CHECK (organisational_readiness IN ('High', 'Medium', 'Low')),
    expected_impact TEXT CHECK (expected_impact IN ('High', 'Medium', 'Low')),
    estimated_complexity TEXT CHECK (estimated_complexity IN ('Low', 'Medium', 'High')),
    estimated_programme_cost NUMERIC(12, 2) DEFAULT 0.00,
    organisation_contribution_estimate NUMERIC(12, 2) DEFAULT 0.00, -- 30%
    seva_contribution_estimate NUMERIC(12, 2) DEFAULT 0.00, -- 70%
    score_relevance NUMERIC(5,2) DEFAULT 0,
    score_impact NUMERIC(5,2) DEFAULT 0,
    score_reach NUMERIC(5,2) DEFAULT 0,
    score_urgency NUMERIC(5,2) DEFAULT 0,
    score_readiness NUMERIC(5,2) DEFAULT 0,
    score_feasibility NUMERIC(5,2) DEFAULT 0,
    score_sustainability NUMERIC(5,2) DEFAULT 0,
    total_score NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------
-- 6. application_status_history
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.application_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    previous_status TEXT NOT NULL,
    new_status TEXT NOT NULL,
    changed_by TEXT NOT NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    internal_remarks TEXT
);

-- ---------------------------------------------------------------------
-- 7. meetings
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    organisation_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    title TEXT NOT NULL,
    meeting_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('Online', 'Offline')),
    platform TEXT,
    meeting_link TEXT,
    venue TEXT,
    agenda TEXT NOT NULL,
    internal_remarks TEXT,
    status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Rescheduled', 'Cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_by TEXT NOT NULL,
    email_sent BOOLEAN DEFAULT false
);

-- ---------------------------------------------------------------------
-- 8. email_logs
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT REFERENCES public.applications(id) ON DELETE SET NULL,
    recipient_email TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    sent_by TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Sent' CHECK (status IN ('Sent', 'Delivered', 'Failed')),
    template_used TEXT
);

-- ---------------------------------------------------------------------
-- 9. programme_projects & 10. project_milestones & 11. project_team_members
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.programme_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT UNIQUE REFERENCES public.applications(id) ON DELETE SET NULL,
    organisation_name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    approved_support_areas TEXT[] NOT NULL DEFAULT '{}',
    start_date DATE NOT NULL,
    expected_completion_date DATE NOT NULL,
    project_duration_months INTEGER DEFAULT 4,
    agreed_programme_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    seva_support_contribution NUMERIC(12, 2) NOT NULL DEFAULT 0.00, -- 70%
    organisation_contribution NUMERIC(12, 2) NOT NULL DEFAULT 0.00, -- 30%
    assigned_technical_lead TEXT NOT NULL,
    assigned_team_members TEXT[] NOT NULL DEFAULT '{}',
    implementation_status TEXT NOT NULL DEFAULT 'Onboarding' CHECK (implementation_status IN (
        'Onboarding',
        'Needs Assessment',
        'Active Development',
        'Testing & Training',
        'Handover',
        'Completed'
    )),
    review_meetings_count INTEGER DEFAULT 0,
    deliverables_summary TEXT,
    completion_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.programme_projects(id) ON DELETE CASCADE,
    stage_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    target_date DATE NOT NULL,
    completed_date DATE,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS public.project_team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.programme_projects(id) ON DELETE CASCADE,
    member_name TEXT NOT NULL,
    role_in_project TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------
-- 12. case_studies
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    organisation_background TEXT NOT NULL,
    challenge_before_support TEXT NOT NULL,
    technology_support_provided TEXT NOT NULL,
    implementation_process TEXT NOT NULL,
    results_and_improvements TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    testimonial_quote TEXT,
    testimonial_author TEXT,
    testimonial_designation TEXT,
    date_published DATE NOT NULL DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT true,
    is_sample BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------
-- 13. impact_statistics
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.impact_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_key TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    subtext TEXT NOT NULL,
    sort_order INTEGER DEFAULT 1,
    is_verified BOOLEAN DEFAULT true,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------
-- 14. resources
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    format TEXT NOT NULL DEFAULT 'Guide',
    download_name TEXT,
    read_time TEXT DEFAULT '5 min read',
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT true
);

-- ---------------------------------------------------------------------
-- 15. contact_messages
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    organisation TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    status TEXT NOT NULL DEFAULT 'Unread' CHECK (status IN ('Unread', 'Replied', 'Archived'))
);

-- ---------------------------------------------------------------------
-- 16. audit_logs
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    user_email TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------
-- 17. organisation_settings
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organisation_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    org_name TEXT NOT NULL DEFAULT 'Sustainable Ecology & Rural Advancement (SEVA)',
    tagline TEXT NOT NULL DEFAULT 'Empowering Grassroots Organisations Through Technology, Knowledge and Digital Transformation',
    email TEXT NOT NULL DEFAULT 'seva.ecology@gmail.com',
    phone TEXT NOT NULL DEFAULT '+91 8999469974',
    address_line1 TEXT NOT NULL DEFAULT '31 B, Jalka, Ralegaon',
    address_district TEXT NOT NULL DEFAULT 'District Yavatmal',
    address_state TEXT NOT NULL DEFAULT 'Maharashtra',
    address_pin TEXT NOT NULL DEFAULT '445402',
    website_url TEXT NOT NULL DEFAULT 'https://www.sevavillage.org',
    announcement_banner TEXT,
    enable_applications BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------
-- 18. email_templates
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL UNIQUE,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programme_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organisation_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles ur
        WHERE ur.user_id = auth.uid()
        AND ur.role IN ('super_admin', 'programme_admin', 'reviewer')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Public can insert new applications
CREATE POLICY "Public users can insert application"
ON public.applications FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- 2. Only authenticated admins can select/update applications
CREATE POLICY "Admins can view all applications"
ON public.applications FOR SELECT TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can update applications"
ON public.applications FOR UPDATE TO authenticated
USING (public.is_admin());

-- 3. Reviews: Strictly accessible to admins only
CREATE POLICY "Admins manage reviews"
ON public.application_reviews FOR ALL TO authenticated
USING (public.is_admin());

-- 4. Status history: Accessible to admins only
CREATE POLICY "Admins manage status history"
ON public.application_status_history FOR ALL TO authenticated
USING (public.is_admin());

-- 5. Public read for published case studies, impact stats, and resources
CREATE POLICY "Public read published case studies"
ON public.case_studies FOR SELECT TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Public read impact stats"
ON public.impact_statistics FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Public read resources"
ON public.resources FOR SELECT TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Public read org settings"
ON public.organisation_settings FOR SELECT TO anon, authenticated
USING (true);

-- Public can submit contact messages
CREATE POLICY "Public can insert contact messages"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Admins can manage everything in CMS tables
CREATE POLICY "Admins manage case studies"
ON public.case_studies FOR ALL TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins manage impact stats"
ON public.impact_statistics FOR ALL TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins manage resources"
ON public.resources FOR ALL TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins manage contact messages"
ON public.contact_messages FOR ALL TO authenticated
USING (public.is_admin());
