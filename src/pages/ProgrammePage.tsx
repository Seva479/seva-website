import React from 'react';
import {
  Globe,
  Database,
  Smartphone,
  Share2,
  GraduationCap,
  FileCheck,
  PlusCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface ProgrammePageProps {
  onNavigate: (view: string) => void;
}

export const ProgrammePage: React.FC<ProgrammePageProps> = ({ onNavigate }) => {
  const supportAreas = [
    {
      id: 'sa1',
      title: '1. Website Development and Support',
      icon: Globe,
      features: [
        'Professional organisational website development',
        'Website redesign, modernization and ongoing maintenance',
        'Organisational profile, leadership and programme presentation',
        'Success stories, audited reports and community impact showcase',
        'Intuitive content management for non-technical team members',
        'Search engine visibility (SEO) to help donors find your work',
      ],
    },
    {
      id: 'sa2',
      title: '2. MIS and Digital Data Management',
      icon: Database,
      features: [
        'Organisation-specific MIS development tailored to your sector',
        'Beneficiary databases with de-duplication and ID tracking',
        'Project monitoring systems comparing planned vs. actual achievements',
        'Digital data collection forms built for vernacular field animators',
        'Automated executive dashboards for trustees and managers',
        'Data analysis, trend visualization and export engines',
      ],
    },
    {
      id: 'sa3',
      title: '3. Mobile or Web-Based Application Development',
      icon: Smartphone,
      features: [
        'Custom lightweight Android applications for field staff',
        'Web-based data collection portals with offline synchronization',
        'Field monitoring applications with geotagged photo capture',
        'Beneficiary registration and entitlement tracking systems',
        'Multi-panchayat project tracking tools',
        'Sector-specific solutions (watershed, SHG finance, agriculture, health)',
      ],
    },
    {
      id: 'sa4',
      title: '4. Social Media and Digital Communication Training',
      icon: Share2,
      features: [
        'Organisational social media strategy for grassroots non-profits',
        'Facebook, Instagram and WhatsApp community group management',
        'LinkedIn organisational presence and CSR networking',
        'Authentic digital storytelling without sensationalizing poverty',
        'Graphic design and content creation using affordable tools',
        'Mobile photography and respectful field documentation skills',
      ],
    },
    {
      id: 'sa5',
      title: '5. Digital Capacity Building & Technical Support',
      icon: GraduationCap,
      features: [
        'Staff digital literacy training conducted in Marathi, Hindi, and English',
        'Google Workspace and cloud storage orientation for teams',
        'Training on secure communication and password managers',
        'Software usage guidance with step-by-step printed visual manuals',
        'Troubleshooting and remote technical helpdesk support',
        'Ongoing technical assistance to maintain digital independence',
      ],
    },
    {
      id: 'sa6',
      title: '6. Data Management, Documentation & Reporting Systems',
      icon: FileCheck,
      features: [
        'Digital documentation archives for project photographs and case notes',
        'Standardised reporting formats aligned with CSR and FCRA requirements',
        'Programme activity databases tracking outputs across blocks',
        'Automated 1-click reporting reducing manual compilation time',
        'Data visualization and infographic generation for annual reports',
        'Qualitative impact documentation and community testimonials archive',
      ],
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-8 pb-20">
      {/* Programme Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Flagship Initiative
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B24]">
            Technology Support Programme for Grassroots Organisations
          </h1>
          <p className="text-xl font-medium text-[#0B6643]">
            "Making Technology Accessible, Practical and Meaningful for Social Impact."
          </p>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            SEVA implements this initiative to strengthen the digital capabilities of grassroots NGOs, trusts, societies and community-based organisations across India. We identify your actual operational challenges and provide tailored digital solutions, hands-on training, and ongoing technical assistance.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('apply')}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Submit an Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 font-medium">
              <Clock className="w-4 h-4 text-[#D97706]" />
              <span>Duration: 3 to 6 Months depending on scope</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Support Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Service Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172B24]">
            Comprehensive Support Areas
          </h2>
          <p className="text-stone-600 text-sm max-w-xl">
            Organisations may apply for one or multiple integrated support areas based on their immediate developmental priorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id}
                className="bg-white rounded-2xl border border-stone-200 p-7 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0B6643] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B24]">
                    {area.title}
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                    {area.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6643] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Support Callout */}
        <div className="mt-8 p-6 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-4">
          <PlusCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-stone-900 text-sm">
              Other Technology-Related Support
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              SEVA may explore additional technology solutions based on the specific requirements, organisational context, and ground feasibility of the proposed intervention. Mention any unique requirement directly in your application form.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Sharing & Responsibility */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-mono font-bold tracking-widest text-[#D97706] uppercase">
              Financial Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B24]">
              Cost-Sharing Framework
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              This programme is not an unconditional grant, nor is it a commercial contract. We believe true transformation occurs when both institutions share the commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-[#0B6643] uppercase tracking-wider">
                70% Program Subsidy
              </span>
              <h3 className="text-xl font-bold text-stone-900">Covered by SEVA</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                SEVA subsidizes 70% of the approved technical architecture, custom software programming, design, server configuration, on-site capacity workshops, and post-launch mentoring.
              </p>
            </div>

            <div className="bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                30% Institutional Contribution
              </span>
              <h3 className="text-xl font-bold text-stone-900">Contributed by Your Organisation</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                The participating organisation contributes 30% of the approved programme cost in milestone tranches. This fosters genuine organizational ownership and prevents software abandonment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B6643] text-white p-8 sm:p-12 rounded-2xl text-center space-y-4 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Interested in Strengthening Your Organisation's Digital Capacity?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
            Take the first step by filling out our detailed 32-field application form. Our review committee will evaluate your requirements and reach out within 7-10 working days.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('apply')}
              className="px-8 py-3.5 text-sm font-bold text-[#064E36] bg-white hover:bg-emerald-50 rounded-lg transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              <span>Submit an Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
