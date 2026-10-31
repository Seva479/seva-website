import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Laptop,
  Database,
  Users,
  FileSpreadsheet,
  BookOpen,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { SevaStore } from '../services/store';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const impactStats = SevaStore.getImpactStats();
  const [activeTab, setActiveTab] = useState<'comparison' | 'focus'>('comparison');

  const focusAreas = [
    {
      id: 'focus-1',
      title: 'Digital Empowerment',
      desc: 'Demystifying technology for rural development workers, building digital confidence, and eliminating tech anxieties.',
      icon: Users,
    },
    {
      id: 'focus-2',
      title: 'Technology Solutions',
      desc: 'Developing affordable, lightweight websites, field data tools, and applications designed for low-connectivity environments.',
      icon: Laptop,
    },
    {
      id: 'focus-3',
      title: 'Institutional Capacity Building',
      desc: 'Equipping leadership and grassroots field coordinators with practical skills, governance tools, and long-term tech autonomy.',
      icon: Layers,
    },
    {
      id: 'focus-4',
      title: 'Data Management & MIS',
      desc: 'Replacing chaotic paper registers and scattered Excel sheets with structured, centralized beneficiary databases and monitoring systems.',
      icon: Database,
    },
    {
      id: 'focus-5',
      title: 'Knowledge & Documentation',
      desc: 'Standardizing reporting formats, creating digital archives, and publishing participatory research from community initiatives.',
      icon: BookOpen,
    },
    {
      id: 'focus-6',
      title: 'Social Impact & Visibility',
      desc: 'Helping grassroots organisations tell authentic stories, showcase audited achievements, and build credibility with stakeholders.',
      icon: Share2,
    },
  ];

  const beforeAfterList = [
    {
      before: 'Paper-based registers prone to physical damage and loss during monsoon',
      after: 'Centralised, secure digital records accessible across authorized team members',
    },
    {
      before: 'Manual beneficiary records scattered across fragmented notebooks',
      after: 'Organised beneficiary databases with unique records and verification history',
    },
    {
      before: 'Multiple conflicting Excel sheets with version mismatches on personal laptops',
      after: 'Automated dashboards with live program indicators and aggregated statistics',
    },
    {
      before: 'Repetitive, exhausting data entry taking staff away from community field visits',
      after: 'Simplified digital data collection via intuitive mobile forms with offline sync',
    },
    {
      before: 'Time-consuming reporting taking up to two weeks to compile for donors',
      after: 'Faster 1-click standardized report generation for CSR partners and trustees',
    },
    {
      before: 'Limited project monitoring and difficulty verifying distant village interventions',
      after: 'Real-time project monitoring with geographic activity mapping where appropriate',
    },
    {
      before: 'Difficulty tracking field activities and comparing planned vs. actual outputs',
      after: 'Improved decision-making supported by reliable, auditable community evidence',
    },
    {
      before: 'Limited organisational visibility, no professional website, and low credibility',
      after: 'Better institutional communication, transparent online profile, and verified impact',
    },
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B6643] uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100">
                <span>Sustainable Ecology &amp; Rural Advancement</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B24] leading-[1.18] text-balance">
                Strengthening Grassroots Organisations Through Digital Transformation
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Technology should not be a barrier to development. SEVA works with grassroots organisations to simplify their systems, strengthen their capacities, improve data management and amplify their social impact.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('apply')}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>Discover Technology Support</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3.5 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-all cursor-pointer"
                >
                  Explore Our Work
                </button>
              </div>

              {/* Sub-note */}
              <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-[#0B6643]">Shared Contribution Model:</span>
                <span>70% supported by SEVA · 30% grassroots contribution</span>
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100 group">
                <picture>
                  <source srcSet="/assets/images/hero_grassroots_technology.webp" type="image/webp" />
                  <source srcSet="/assets/images/hero_grassroots_technology.jpg" type="image/jpeg" />
                  <img
                    src="/assets/images/hero_grassroots_technology.jpg"
                    alt="SEVA coordinator collaborating with village community women in rural Maharashtra"
                    className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('hero_grassroots_technology_1793458679895.jpg')) {
                        target.src = '/assets/images/hero_grassroots_technology_1793458679895.jpg';
                      }
                    }}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <p className="text-xs font-semibold tracking-wider uppercase text-emerald-300 mb-1">
                    Ground Reality · Ralegaon, Yavatmal
                  </p>
                  <p className="text-sm font-medium text-stone-100 leading-snug">
                    Participatory community data mapping and digital literacy with grassroots women coordinators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
              Grassroots Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172B24]">
              Strong Communities Need Strong Organisations
            </h2>
            <div className="w-12 h-0.5 bg-[#0B6643] mx-auto my-3" />
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed text-balance">
              Thousands of grassroots organisations across India are working tirelessly to improve lives, strengthen communities and address critical development challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-sm text-stone-600 leading-relaxed">
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
              <h3 className="font-bold text-stone-900 text-base">The Paperwork Burden</h3>
              <p>
                Many organisations continue to work with limited digital infrastructure, manual records and fragmented information systems. Staff spend weeks compiling reports instead of working with communities.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
              <h3 className="font-bold text-stone-900 text-base">The Digital Divide</h3>
              <p>
                Grassroots NGOs often face high costs, complex commercial software, and vendors who do not understand rural field realities or local languages like Marathi and Hindi.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
              <h3 className="font-bold text-stone-900 text-base">SEVA's Mission</h3>
              <p>
                We bridge this gap through practical, need-based technology solutions, institutional strengthening, and 70-30 cost-sharing to foster genuine long-term ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR FOCUS AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172B24]">
              Our Focus Areas
            </h2>
            <p className="text-stone-600 text-sm max-w-xl">
              Practical pillars designed specifically for grassroots societies, trusts, and rural community-based organisations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('programme')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B6643] hover:text-[#064E36] transition-colors cursor-pointer"
          >
            <span>Explore All 6 Support Areas</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id}
                className="bg-white p-7 rounded-xl border border-stone-200 hover:border-emerald-200 hover:shadow-md transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#0B6643] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-stone-400">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#172B24] tracking-tight">
                    {area.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. DIGITAL TRANSFORMATION: BEFORE & AFTER COMPARISON */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              Systemic Transition
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              From Manual Processes to Smarter Organisations
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              How practical digital systems transform everyday operations, reduce paperwork, and empower field workers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BEFORE */}
            <div className="bg-stone-800/80 rounded-2xl p-6 sm:p-8 border border-red-900/30 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-700">
                <div className="w-8 h-8 rounded-full bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400 font-bold text-sm">
                  ✕
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-100">Before Digital Transformation</h3>
                  <p className="text-xs text-stone-400">Traditional manual &amp; fragmented systems</p>
                </div>
              </div>

              <div className="space-y-4">
                {beforeAfterList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-stone-300">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item.before}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-[#064E36]/80 rounded-2xl p-6 sm:p-8 border border-emerald-600/40 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-emerald-800">
                <div className="w-8 h-8 rounded-full bg-emerald-900/90 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">After Digital Transformation</h3>
                  <p className="text-xs text-emerald-200">With SEVA's practical, need-based technology support</p>
                </div>
              </div>

              <div className="space-y-4">
                {beforeAfterList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR IMPACT & EDITABLE COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Two Years of Dedicated Field Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172B24]">
            Building Stronger Grassroots Institutions
          </h2>
          <div className="w-12 h-0.5 bg-[#0B6643] mx-auto my-2" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            "Over the past two years, SEVA has been working with grassroots organisations to understand their challenges, strengthen their systems and make technology more accessible and practical for their everyday development work."
          </p>
        </div>

        {/* Dynamic Verified Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 text-center space-y-2 hover:border-emerald-300 transition-all shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0B6643] tracking-tight font-mono tabular-nums">
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

        {/* Impact Sub-Card with Office Systems Image */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-xs">
          <div className="md:col-span-5 relative h-64 md:h-auto">
            <picture>
              <source srcSet="/assets/images/ngo_office_systems.webp" type="image/webp" />
              <source srcSet="/assets/images/ngo_office_systems.jpg" type="image/jpeg" />
              <img
                src="/assets/images/ngo_office_systems.jpg"
                alt="Grassroots NGO office with team reviewing village dashboards"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('ngo_office_systems_1793458681536.jpg')) {
                    target.src = '/assets/images/ngo_office_systems_1793458681536.jpg';
                  }
                }}
              />
            </picture>
          </div>
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0B6643]">
              Authentic Experience
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172B24]">
              Real Ground Understanding, Not Commercial IT Selling
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              We never parachute complex enterprise software into a village office. Every technology intervention begins with sitting down with your animators, examining paper registers, understanding power backup and cellular realities, and training your team until they have complete confidence.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('impact')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6643] hover:text-[#064E36] transition-colors cursor-pointer"
              >
                <span>Read Verified Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLOSING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B6643] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <p className="text-emerald-200 text-sm font-medium uppercase tracking-widest">
              A Development Initiative for Grassroots India
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              "Technology should empower development, not complicate it."
            </h2>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              Let's make grassroots organisations stronger, smarter and more effective.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('apply')}
                className="px-8 py-4 text-sm font-bold text-[#064E36] bg-white hover:bg-emerald-50 rounded-lg transition-all shadow-md cursor-pointer active:scale-[0.98]"
              >
                Apply for Technology Support
              </button>
              <button
                onClick={() => onNavigate('why-digital')}
                className="px-6 py-4 text-sm font-semibold text-white bg-[#064E36]/60 hover:bg-[#064E36] rounded-lg transition-all border border-emerald-400/30 cursor-pointer"
              >
                Understand Digital Challenges
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
