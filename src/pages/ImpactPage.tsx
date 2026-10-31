import React from 'react';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
  Quote,
  ShieldCheck,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { SevaStore } from '../services/store';

interface ImpactPageProps {
  onNavigate: (view: string) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate }) => {
  const caseStudies = SevaStore.getCaseStudies();
  const impactStats = SevaStore.getImpactStats();

  const coreImprovements = [
    'Substantial reduction in manual, repetitive administrative paperwork',
    'Structured, auditable beneficiary databases with zero data loss',
    'Real-time project monitoring and automated progress tracking',
    'Increased digital confidence and technical literacy among rural animators',
    'Enhanced institutional visibility and credibility with institutional donors',
    'Transparent, timely compliance reporting for CSR and statutory bodies',
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Field Evidence
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B24]">
            Building Stronger Grassroots Institutions Through Technology
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Over the past two years, SEVA has been working with grassroots organisations to understand their challenges, strengthen their systems and make technology more accessible and practical for their everyday development work.
          </p>
        </div>
      </section>

      {/* Verified Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 text-center space-y-2 shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0B6643] font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-stone-900">
                {stat.label}
              </div>
              <div className="text-xs text-stone-500 leading-snug">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Improvements Showcase */}
      <section className="bg-white py-14 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-8">
            <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
              Transformational Outcomes
            </span>
            <h2 className="text-2xl font-bold text-[#172B24]">
              What Practical Technology Support Creates on the Ground
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreImprovements.map((imp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0B6643] shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700 font-medium leading-relaxed">
                  {imp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Case Studies Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
              Verified Case Studies
            </span>
            <span className="text-xs bg-emerald-50 text-[#0B6643] px-2 py-0.5 rounded-full font-medium border border-emerald-100">
              Field Verified
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172B24]">
            Ground Realities &amp; Documented Transitions
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl">
            Detailed case studies from non-profit institutions that transitioned from manual registers to structured digital workflows.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-all grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image & Location metadata */}
              <div className="lg:col-span-5 relative bg-stone-100 min-h-[280px]">
                <img
                  src={
                    study.image_url
                      ? study.image_url.replace('/src/assets/images/', '/assets/images/')
                      : '/assets/images/hero_grassroots_technology.webp'
                  }
                  alt={study.organisation_name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('hero_grassroots_technology.jpg')) {
                      target.src = '/assets/images/hero_grassroots_technology.jpg';
                    }
                  }}
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{study.district}, {study.state}</span>
                  </span>
                  {study.is_sample && (
                    <span className="px-2 py-1 rounded-md bg-amber-900/80 text-amber-200 text-[11px] font-medium">
                      Preview Template
                    </span>
                  )}
                </div>
              </div>

              {/* Case Details */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#172B24]">
                      {study.organisation_name}
                    </h3>
                    <p className="text-xs text-stone-500 pt-1">
                      {study.organisation_background}
                    </p>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-lg bg-red-50/60 border border-red-100 space-y-1">
                      <span className="font-bold text-red-900 text-xs uppercase tracking-wide block">
                        Challenge Before Support
                      </span>
                      <p className="text-stone-700 leading-relaxed">
                        {study.challenge_before_support}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-100 space-y-1">
                      <span className="font-bold text-emerald-900 text-xs uppercase tracking-wide block">
                        Technology Support Provided
                      </span>
                      <p className="text-stone-700 leading-relaxed">
                        {study.technology_support_provided}
                      </p>
                    </div>
                  </div>

                  {/* Results list */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Results &amp; Documented Improvements
                    </span>
                    <ul className="space-y-1 text-xs sm:text-sm text-stone-600">
                      {study.results_and_improvements.map((res, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0B6643] shrink-0 mt-0.5" />
                          <span className="leading-snug">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testimonial Quote if available */}
                  {study.testimonial_quote && (
                    <div className="p-4 rounded-xl bg-stone-50 border-l-2 border-[#0B6643] italic text-xs sm:text-sm text-stone-700 space-y-2">
                      <Quote className="w-4 h-4 text-[#0B6643] inline mr-2" />
                      <span>"{study.testimonial_quote}"</span>
                      {study.testimonial_author && (
                        <p className="not-italic text-xs font-semibold text-stone-900 pt-1">
                          — {study.testimonial_author}, {study.testimonial_designation}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Published: {study.date_published}</span>
                  </span>
                  <span className="text-[#0B6643] font-medium">Verified by SEVA Secretariat</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#064E36] text-white p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">
              Ready to Document and Digitize Your Organisation's Work?
            </h3>
            <p className="text-sm text-emerald-100">
              Apply to the next technology support cohort and build lasting capacity.
            </p>
          </div>
          <button
            onClick={() => onNavigate('apply')}
            className="px-6 py-3.5 text-sm font-bold text-[#064E36] bg-white hover:bg-emerald-50 rounded-lg transition-all shrink-0 cursor-pointer"
          >
            Apply for Support
          </button>
        </div>
      </section>
    </div>
  );
};
