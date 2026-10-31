// =====================================================================
// Supabase Edge Function: send-transactional-email
// Transactional email dispatch using Resend for SEVA Platform
// Deployment: supabase functions deploy send-email
// =====================================================================

// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailPayload {
  to: string;
  recipientName: string;
  subject: string;
  body: string;
  applicationId?: string;
  templateCategory?: string;
}

serve(async (req: any) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resendApiKey = (globalThis as any).Deno?.env?.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "RESEND_API_KEY secret is not configured in Supabase environment.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const payload: EmailPayload = await req.json();
    const { to, recipientName, subject, body, applicationId } = payload;

    if (!to || !subject || !body) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required email parameters (to, subject, body)." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Format HTML email with official SEVA identity
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #172B24; margin: 0; padding: 0; background-color: #F7FAF8; }
          .container { max-width: 600px; margin: 24px auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
          .header { background-color: #0B6643; color: #ffffff; padding: 24px; text-align: left; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
          .header p { margin: 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 32px 24px; font-size: 15px; color: #2d3748; white-space: pre-wrap; }
          .meta-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px 16px; margin: 20px 0; font-size: 13px; }
          .footer { background-color: #f8fafc; padding: 20px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          .footer p { margin: 4px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sustainable Ecology & Rural Advancement (SEVA)</h1>
            <p>Empowering Grassroots Organisations Through Technology & Knowledge</p>
          </div>
          <div class="content">
            ${applicationId ? `<div class="meta-box"><strong>Application ID:</strong> ${applicationId}</div>` : ""}
            ${body.replace(/\n/g, "<br>")}
          </div>
          <div class="footer">
            <p><strong>Sustainable Ecology & Rural Advancement (SEVA)</strong></p>
            <p>Address: 31 B, Jalka, Ralegaon, District Yavatmal, Maharashtra – 445402, India</p>
            <p>Email: seva.ecology@gmail.com | Phone: +91 8999469974 | Website: www.sevavillage.org</p>
            <p style="margin-top: 12px; font-size: 11px; color: #94a3b8;">This is an official communication from SEVA.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Resend API invocation
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SEVA – Sustainable Ecology & Rural Advancement <notifications@sevavillage.org>",
        to: [to],
        reply_to: "seva.ecology@gmail.com",
        subject: subject,
        html: htmlContent,
      }),
    });

    const resendData = await resendRes.json();

    return new Response(JSON.stringify({ success: true, resendData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to process email dispatch." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
