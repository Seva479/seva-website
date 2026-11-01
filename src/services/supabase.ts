import { createClient } from '@supabase/supabase-js';
import { Application, ContactMessage } from '../types';

export const SUPABASE_PROJECT_ID =
  import.meta.env.VITE_SUPABASE_PROJECT_ID || 'eusqtayzaojdgucpvomg';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://eusqtayzaojdgucpvomg.supabase.co';

export const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'import.meta.env.VITE_SUPABASE_KEY';

// Initialize Supabase Client (Standard Client with persistSession)
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'seva_supabase_auth_token',
  },
});

export interface SupabaseHealthStatus {
  connected: boolean;
  projectId: string;
  url: string;
  hasApplicationsTable: boolean;
  hasContactTable: boolean;
  hasAdminRpc: boolean;
  errorMessage?: string;
  details?: string;
}

/**
 * Checks connection status to the Supabase backend and tests table availability
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealthStatus> {
  const result: SupabaseHealthStatus = {
    connected: false,
    projectId: SUPABASE_PROJECT_ID,
    url: SUPABASE_URL,
    hasApplicationsTable: false,
    hasContactTable: false,
    hasAdminRpc: false,
  };

  try {
    // 1. Test basic connectivity
    const ping = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (ping.status === 200 || ping.status === 204) {
      result.connected = true;
    } else {
      result.errorMessage = `Supabase returned HTTP ${ping.status}`;
      return result;
    }

    // 2. Check if applications table exists
    const appCheck = await supabase.from('applications').select('id').limit(1);
    if (!appCheck.error) {
      result.hasApplicationsTable = true;
    } else if (appCheck.error.code === 'PGRST205') {
      result.hasApplicationsTable = false;
      result.details = 'Table public.applications not yet created in Supabase schema cache.';
    } else {
      result.errorMessage = appCheck.error.message;
    }

    // 3. Check if contact_messages table exists
    const contactCheck = await supabase.from('contact_messages').select('id').limit(1);
    if (!contactCheck.error) {
      result.hasContactTable = true;
    } else {
      result.hasContactTable = false;
    }

    // 4. Test is_seva_admin RPC availability
    try {
      const rpcCheck = await supabase.rpc('is_seva_admin');
      if (!rpcCheck.error || rpcCheck.error.code !== 'PGRST202') {
        result.hasAdminRpc = true;
      }
    } catch {
      result.hasAdminRpc = false;
    }

    return result;
  } catch (err: any) {
    result.connected = false;
    result.errorMessage = err.message || 'Network error connecting to Supabase.';
    return result;
  }
}

/**
 * Authenticates an administrator via Supabase email and password login
 */
export async function loginAdminWithSupabase(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: any }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || 'Login failed.' };
  }
}

/**
 * Verifies if the authenticated user has an authorised SEVA admin role
 * using the Supabase database function public.is_seva_admin()
 */
export async function verifyIsSevaAdmin(
  email?: string
): Promise<{ isAuthorised: boolean; role?: string; source: string; error?: string }> {
  try {
    // 1. First attempt to call the official database function public.is_seva_admin()
    const { data: rpcResult, error: rpcError } = await supabase.rpc('is_seva_admin');

    if (!rpcError && typeof rpcResult === 'boolean') {
      return {
        isAuthorised: rpcResult,
        role: rpcResult ? 'super_admin' : undefined,
        source: 'Supabase RPC public.is_seva_admin()',
      };
    }

    // 2. If RPC is not created yet or user has not run migration, query user_roles table
    const { data: userSession } = await supabase.auth.getSession();
    const currentEmail = email || userSession.session?.user?.email;

    if (userSession.session?.user) {
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userSession.session.user.id)
        .limit(1);

      if (!rolesError && rolesData && rolesData.length > 0) {
        return {
          isAuthorised: true,
          role: rolesData[0].role,
          source: 'Supabase Table public.user_roles',
        };
      }
    }

    // 3. Fallback verification for the designated official admin email
    if (currentEmail && currentEmail.toLowerCase() === 'seva.ecology@gmail.com') {
      return {
        isAuthorised: true,
        role: 'super_admin',
        source: 'Designated SEVA Super Admin Account',
      };
    }

    return {
      isAuthorised: false,
      source: 'Role Verification Failed',
      error: 'User account does not possess authorized administrator privileges.',
    };
  } catch (err: any) {
    return {
      isAuthorised: false,
      source: 'Verification Exception',
      error: err.message,
    };
  }
}

/**
 * Signs out the administrator from Supabase Auth
 */
export async function logoutAdminFromSupabase(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Error signing out of Supabase:', err);
  }
}

/**
 * Saves a completed 32-field application record into the Supabase database
 */
export async function insertApplicationToSupabase(
  app: Application
): Promise<{ success: boolean; error?: string; code?: string; data?: any }> {
  try {
    const payload = {
      id: app.id,
      status: app.status,
      priority: app.priority,

      // Section A
      name_of_organization: app.name_of_organization,
      type_of_organization: app.type_of_organization,
      year_of_establishment: app.year_of_establishment,
      registration_number: app.registration_number,
      state: app.state,
      district: app.district,
      organisation_address: app.organisation_address,
      organisation_website: app.organisation_website || null,
      organisation_email: app.organisation_email,

      // Section B
      contact_person_name: app.contact_person_name,
      designation: app.designation,
      contact_number: app.contact_number,

      // Section C
      brief_description: app.brief_description,
      key_areas_of_work: app.key_areas_of_work || [],
      villages_covered: app.villages_covered,
      geographical_area_of_operation: app.geographical_area_of_operation,
      annual_beneficiaries_reached: app.annual_beneficiaries_reached,
      primary_beneficiaries: app.primary_beneficiaries,

      // Section D
      has_website: app.has_website,
      has_mis_system: app.has_mis_system,
      current_digital_tools: app.current_digital_tools || [],

      // Section E
      major_technology_challenges: app.major_technology_challenges,
      support_type_seeking: app.support_type_seeking || [],
      description_of_solution_needed: app.description_of_solution_needed,
      main_problem_to_solve: app.main_problem_to_solve,
      intended_users: app.intended_users,
      estimated_users_count: app.estimated_users_count,

      // Section F
      has_previous_digital_project: app.has_previous_digital_project,
      previous_digital_project_details: app.previous_digital_project_details || null,

      // Section G
      requirement_urgency: app.requirement_urgency,
      preferred_timeline: app.preferred_timeline,
      first_priority_support: app.first_priority_support,

      created_at: app.created_at,
      updated_at: app.updated_at,
    };

    const { data, error } = await supabase.from('applications').insert([payload]);

    if (error) {
      console.warn('Supabase insert application returned error:', error);
      return { success: false, error: error.message, code: error.code };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Exception sending application to Supabase:', err);
    return { success: false, error: err.message || 'Unexpected network error' };
  }
}

/**
 * Saves an inquiry form message to the Supabase contact_messages table
 */
export async function insertContactMessageToSupabase(
  msg: ContactMessage
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      id: msg.id,
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      organisation: msg.organisation || null,
      subject: msg.subject,
      message: msg.message,
      submitted_at: msg.submitted_at,
      status: msg.status,
    };

    const { error } = await supabase.from('contact_messages').insert([payload]);

    if (error) {
      console.warn('Supabase insert contact message error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch remote applications from Supabase database
 */
export async function fetchRemoteApplications(): Promise<Application[] | null> {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Failed to fetch from Supabase:', error);
      return null;
    }

    return data as Application[];
  } catch (err) {
    console.error('Network error fetching applications:', err);
    return null;
  }
}

/**
 * Production SQL setup script with public.is_seva_admin() function and hardened RLS
 */
export const QUICK_SETUP_SQL = `-- =====================================================================
-- SEVA - Supabase Security & DDL Script for Project: ${SUPABASE_PROJECT_ID}
-- Run in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new
-- =====================================================================

-- 1. Create applications table with dedicated columns for all 32 fields
CREATE TABLE IF NOT EXISTS public.applications (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'New Application',
    priority TEXT NOT NULL DEFAULT 'Medium',
    name_of_organization TEXT NOT NULL,
    type_of_organization TEXT NOT NULL,
    year_of_establishment INTEGER NOT NULL,
    registration_number TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    organisation_address TEXT NOT NULL,
    organisation_website TEXT,
    organisation_email TEXT NOT NULL,
    contact_person_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    brief_description TEXT NOT NULL,
    key_areas_of_work TEXT[] NOT NULL DEFAULT '{}',
    villages_covered INTEGER NOT NULL DEFAULT 0,
    geographical_area_of_operation TEXT NOT NULL,
    annual_beneficiaries_reached INTEGER NOT NULL DEFAULT 0,
    primary_beneficiaries TEXT NOT NULL,
    has_website BOOLEAN NOT NULL DEFAULT false,
    has_mis_system BOOLEAN NOT NULL DEFAULT false,
    current_digital_tools TEXT[] NOT NULL DEFAULT '{}',
    major_technology_challenges TEXT NOT NULL,
    support_type_seeking TEXT[] NOT NULL DEFAULT '{}',
    description_of_solution_needed TEXT NOT NULL,
    main_problem_to_solve TEXT NOT NULL,
    intended_users TEXT NOT NULL,
    estimated_users_count INTEGER NOT NULL DEFAULT 1,
    has_previous_digital_project BOOLEAN NOT NULL DEFAULT false,
    previous_digital_project_details TEXT,
    requirement_urgency TEXT NOT NULL,
    preferred_timeline TEXT NOT NULL,
    first_priority_support TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create contact messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    organisation TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    status TEXT NOT NULL DEFAULT 'Unread'
);

-- 3. Create profiles & user_roles tables
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    designation TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'programme_admin', 'reviewer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, role)
);

-- 4. Create the required public.is_seva_admin() security function
CREATE OR REPLACE FUNCTION public.is_seva_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles ur
        WHERE ur.user_id = auth.uid()
        AND ur.role IN ('super_admin', 'programme_admin', 'reviewer')
    ) OR (
        auth.jwt() ->> 'email' = 'seva.ecology@gmail.com'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Enable Row Level Security (RLS) on sensitive tables
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for applications
-- Public users can ONLY insert their application
DROP POLICY IF EXISTS "Public can insert applications" ON public.applications;
CREATE POLICY "Public can insert applications"
ON public.applications FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Only authorised administrators can view, update, or delete applications
DROP POLICY IF EXISTS "Admins can view applications" ON public.applications;
CREATE POLICY "Admins can view applications"
ON public.applications FOR SELECT TO authenticated
USING (public.is_seva_admin());

DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;
CREATE POLICY "Admins can update applications"
ON public.applications FOR UPDATE TO authenticated
USING (public.is_seva_admin());

DROP POLICY IF EXISTS "Admins can delete applications" ON public.applications;
CREATE POLICY "Admins can delete applications"
ON public.applications FOR DELETE TO authenticated
USING (public.is_seva_admin());

-- 7. RLS Policies for contact_messages
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
CREATE POLICY "Public can insert contact messages"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (public.is_seva_admin());
`;
