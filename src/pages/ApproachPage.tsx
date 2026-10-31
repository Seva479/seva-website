import React from 'react';
import { ArrowRight, CheckCircle2, Shield, HeartHandshake, RefreshCw, FileText, Smartphone } from 'lucide-react';

interface ApproachPageProps {
  onNavigate: (view: string) => void;
}

export const ApproachPage: React.FC<ApproachPageProps> = ({ onNavigate }) => {
  const lifecycleSteps = [
    { num: '01', title: 'Online Application', desc: 'Organisation submits detailed requirements, existing tools, and community scale.' },
    { num: '02', title: 'Application Review', desc: 'SEVA appraisal team evaluates ground presence, governance, and operational readiness.' },
    { num: '03', title: 'Organisational Assessment', desc: 'Analysis of existing registers, field data collection points, and reporting bottlenecks.' },
    { num: '04', title: 'Priority & Feasibility Evaluation', desc: 'Scoring against impact, urgency, and technical feasibility in rural constraints.' },
    { num: '05', title: 'Discussion / Online Meeting', desc: 'Direct dialogue with executive trustees, program leads, and field supervisors.' },
    { num: '06', title: 'Selection & Approval', desc: 'Formal approval notice and cohort onboarding confirmation.' },
    { num: '07', title: 'Scope & Cost-Sharing Agreement', desc: 'Clear Memorandum of Understanding formalizing the 70% SEVA / 30% NGO contribution.' },
    { num: '08', title: 'Programme Implementation', desc: 'Iterative, participatory agile development of MIS, website, or mobile tools.' },
    { num: '09', title: 'Training & Handover', desc: 'Multi-lingual on-site staff capacity workshops and full administrative credential transfer.' },
    { num: '10', title: 'Review & Follow-up', desc: 'Quarterly usage check-ins, troubleshooting, and long-term institutional mentoring.' },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Development Methodology
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B24]">
            Our Approach &amp; Model
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Practical, needs-based, participatory and sustainable. We ensure grassroots organisations gain genuine institutional autonomy over their digital systems.
          </p>
        </div>
      </section>

      {/* Cost Sharing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#D97706] uppercase font-bold">
              Transparent Financial Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B24]">
              "Shared Contribution, Shared Responsibility"
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              SEVA does not run this programme as an unconditional free handout, nor as a commercial IT service. We follow a proven cost-sharing framework to foster genuine organisational ownership and long-term sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-8 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-4">
              <div className="text-4xl font-extrabold text-[#0B6643] font-mono">70%</div>
              <h3 className="text-lg font-bold text-stone-900">Supported by SEVA</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                SEVA absorbs 70% of the approved technical architecture, development, infrastructure setup, training workshops, and post-deployment mentoring costs through developmental resources.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-amber-50/70 border border-amber-200 space-y-4">
              <div className="text-4xl font-extrabold text-[#D97706] font-mono">30%</div>
              <h3 className="text-lg font-bold text-stone-900">Grassroots Contribution</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                The participating organisation contributes 30% of the approved programme cost. This ensures the board and staff are invested stakeholders with genuine commitment to adopting the systems.
              </p>
            </div>
          </div>

          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-600 space-y-2">
            <p className="font-semibold text-stone-800">
              Key Policy Principles:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The final contribution depends strictly on the mutually agreed scope and complexity; there are no hidden or arbitrary fixed fees.</li>
              <li>Detailed budget breakdown and milestone payment schedules are communicated openly before signing the agreement.</li>
              <li>Participation is confirmed only after mutual sign-off on the scope of work and cost-sharing arrangement.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10-Step Collaborative Lifecycle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Step-by-Step Pathway
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172B24]">
            10-Step Collaborative Selection &amp; Delivery Process
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl">
            From online submission through field appraisal, training, and quarterly post-deployment mentoring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {lifecycleSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white p-5 rounded-xl border border-stone-200 space-y-2 hover:border-emerald-300 transition-colors shadow-xs"
            >
              <div className="text-xs font-mono font-bold text-[#0B6643]">
                STEP {step.num}
              </div>
              <h3 className="font-bold text-stone-900 text-sm">{step.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 text-center">
          <button
            onClick={() => onNavigate('apply')}
            className="px-6 py-3.5 text-sm font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-lg transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Submit an Application for Your Organisation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
