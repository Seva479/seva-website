import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Clock,
} from 'lucide-react';
import { SevaStore } from '../services/store';

import { insertContactMessageToSupabase } from '../services/supabase';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email address, and message.');
      return;
    }

    setSubmitting(true);
    const msg = SevaStore.submitContactMessage(formData);

    // Also send to Supabase contact_messages table
    try {
      await insertContactMessageToSupabase(msg);
    } catch (err) {
      console.warn('Supabase contact message sync:', err);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Communication
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B24]">
            Contact SEVA
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Have questions about the Technology Support Programme, eligibility, or potential collaboration? Get in touch with our team in Ralegaon, Yavatmal.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Organization Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 space-y-6 shadow-xs">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-[#172B24]">
                  Sustainable Ecology &amp; Rural Advancement
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wider font-mono">
                  Registered Non-Profit Organisation
                </p>
              </div>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0B6643] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-900">Registered Office</span>
                    <span className="leading-relaxed text-stone-600">
                      31 B, Jalka, Ralegaon,<br />
                      District Yavatmal,<br />
                      Maharashtra – 445402, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Phone className="w-5 h-5 text-[#0B6643] shrink-0" />
                  <div>
                    <span className="font-semibold block text-stone-900">Direct Phone / Helpline</span>
                    <a href="tel:+918999469974" className="text-[#0B6643] hover:underline tabular-nums font-medium">
                      +91 8999469974
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#0B6643] shrink-0" />
                  <div>
                    <span className="font-semibold block text-stone-900">Official Email</span>
                    <a href="mailto:seva.ecology@gmail.com" className="text-[#0B6643] hover:underline break-all font-medium">
                      seva.ecology@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#0B6643] shrink-0" />
                  <div>
                    <span className="font-semibold block text-stone-900">Official Website</span>
                    <a href="https://www.sevavillage.org" target="_blank" rel="noreferrer" className="text-[#0B6643] hover:underline">
                      www.sevavillage.org
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
                <Clock className="w-4 h-4 text-[#D97706]" />
                <span>Working Hours: Monday – Saturday, 9:30 AM to 6:00 PM IST</span>
              </div>
            </div>

            {/* Geographical Context Card */}
            <div className="bg-[#064E36] text-white rounded-2xl p-6 space-y-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-300" />
                <span>Field Operations in Vidarbha</span>
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Ralegaon is located in Yavatmal district, Eastern Vidarbha, approximately 65 km from Wardha and 150 km from Nagpur. Our office welcomes grassroots animators and trustees by prior appointment.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0B6643] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#172B24]">Message Received</h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to SEVA. Our team will review your message and respond to <strong>{formData.email}</strong> within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', organisation: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 text-xs font-semibold text-[#0B6643] border border-[#0B6643] rounded-lg hover:bg-emerald-50 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#172B24]">
                      Send Us an Inquiry
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      For formal technology support applications, please use the dedicated <a href="#apply" onClick={(e) => { e.preventDefault(); window.location.hash = 'apply'; }} className="text-[#0B6643] underline font-medium">32-field Application Portal</a>.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Patil"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Email ID *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ramesh@trust.org"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9822000000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Name of Organisation (If applicable)
                      </label>
                      <input
                        type="text"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        placeholder="e.g. Gram Vikas Sanstha"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Inquiry regarding MIS training in Yavatmal"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Message / Question *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details about your inquiry..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to SEVA Team</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
