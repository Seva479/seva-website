import React from 'react';
import {
  FileText,
  Database,
  Map,
  Clock,
  Eye,
  Globe,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

interface WhyDigitalPageProps {
  onNavigate: (view: string) => void;
}

export const WhyDigitalPage: React.FC<WhyDigitalPageProps> = ({ onNavigate }) => {
  const challenges = [
    {
      id: 'c1',
      num: '4.1',
      title: 'Excessive Dependence on Manual Work',
      icon: FileText,
      problems: [
        'Time-consuming data entry across dozens of physical village registers.',
        'Difficulty locating old beneficiary records or past intervention histories.',
        'High rate of duplicate information and transcription mistakes.',
        'Severe risk of losing critical records due to monsoons, termites, or physical office damage.',
        'Repetitive administrative work keeping field workers in the office instead of the village.',
        'Delays in preparing mandatory statutory returns and donor progress updates.',
      ],
      solution: 'Centralised, secure digital records and lightweight mobile forms that eliminate paper logs while syncing offline.',
    },
    {
      id: 'c2',
      num: '4.2',
      title: 'Weak Data Management Systems',
      icon: Database,
      problems: [
        'Data scattered across dozens of unlinked Excel files on personal staff laptops.',
        'No standardised data collection protocols across different field blocks.',
        'Difficulties verifying whether a beneficiary has already received an intervention.',
        'Inconsistent spelling of village names, phone numbers, and identity references.',
        'Limited ability to analyze program performance over multi-year cycles.',
      ],
      solution: 'Organisation-specific MIS databases, validated digital forms, and consolidated management dashboards.',
    },
    {
      id: 'c3',
      num: '4.3',
      title: 'Difficulties in Monitoring Projects',
      icon: Map,
      problems: [
        'Field teams dispersed across 30 to 100 remote villages with poor road access.',
        'Long delays in receiving weekly or monthly field reports at the head office.',
        'Limited visibility for leadership into real ground progress between site visits.',
        'Difficulties reconciling planned versus actual target completions.',
        'Late identification of implementation bottlenecks until donor audit reviews.',
      ],
      solution: 'Mobile field monitoring apps, GPS-enabled survey tools where appropriate, and real-time activity dashboards.',
    },
    {
      id: 'c4',
      num: '4.4',
      title: 'Time-Consuming Reporting & Documentation',
      icon: Clock,
      problems: [
        'Compiling reports for CSR partners, institutional donors, and FCRA requires 10 to 15 days of manual collation.',
        'Repeated compilation of similar information formatted differently for each stakeholder.',
        'Difficulty organizing supporting receipts, training attendance sheets, and geotagged photos.',
        'Lack of standardized visual charts or graphical representations of outcomes.',
      ],
      solution: 'Automated 1-click report generation, digital documentation repositories, and standardized impact visualizers.',
    },
    {
      id: 'c5',
      num: '4.5',
      title: 'Limited Organisational Visibility',
      icon: Eye,
      problems: [
        'Doing outstanding ground work for 10+ years but having zero institutional website or online presence.',
        'Inability to showcase verified achievements, audited balance sheets, and community testimonials.',
        'Difficulty proving credibility when approached by CSR committees or philanthropic foundations.',
        'Absence of digital storytelling leading to invisibility outside their immediate local taluka.',
      ],
      solution: 'Professional, institutional websites showcasing annual reports, focus areas, and verified grassroots impact stories.',
    },
    {
      id: 'c6',
      num: '4.6',
      title: 'Limited Access to Donors & Opportunities',
      icon: Globe,
      problems: [
        'Small and medium NGOs struggle to present their credentials competitively to CSR foundations.',
        'Lack of auditable data trails makes institutional donors hesitant to commit multi-year grants.',
        'Difficulty responding promptly to RFPs and funding applications with verifiable metrics.',
      ],
      solution: 'Organised documentation, credible digital metrics, and transparent governance profiles that help organisations present their work with dignity (SEVA does not promise funding, but empowers organisations to present their work credibly).',
    },
    {
      id: 'c7',
      num: '4.7',
      title: 'Limited Technical Knowledge',
      icon: HelpCircle,
      problems: [
        'Small rural organisations cannot afford full-time IT engineers or expensive commercial software licenses.',
        'Fear of vendor lock-in or software breaking when external consultants leave.',
        'Concerns over data security, beneficiary privacy, and software upkeep.',
      ],
      solution: 'Practical training in local languages, affordable open-access tools, ongoing technical mentoring, and complete handover.',
    },
    {
      id: 'c8',
      num: '4.8',
      title: 'Staff Time and Productivity',
      icon: TrendingUp,
      problems: [
        'Field workers and animators are passionate about social change but burn out doing clerical paperwork.',
        'Hours wasted travelling to the district town merely to deliver paper forms.',
        'Inefficient internal coordination and delayed decision-making.',
      ],
      solution: 'Freeing up staff hours from manual transcription so they can dedicate their energy to direct community organizing and village empowerment.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Institutional Context
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B24]">
            The Hidden Digital Challenges of Grassroots Organisations
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Understanding why hundreds of dedicated non-profits across rural India struggle not from a lack of passion or community trust, but from broken, manual information systems.
          </p>

          <div className="pt-2">
            <div className="inline-block p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#064E36] font-semibold text-base sm:text-lg">
              "Less paperwork. Better data. Stronger institutions. Greater social impact."
            </div>
          </div>
        </div>
      </section>

      {/* The 8 Challenges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-7 sm:p-8 space-y-5 shadow-xs hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0B6643] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-400">
                    {item.num}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#172B24] tracking-tight">
                    {item.title}
                  </h2>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-red-700 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Key Bottlenecks</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                    {item.problems.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-stone-400 shrink-0 mt-1">·</span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs sm:text-sm text-emerald-900 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-[#0B6643] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong>How Digital Systems Solve This:</strong> {item.solution}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B6643] text-white p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">
              Ready to Address These Challenges in Your Organisation?
            </h3>
            <p className="text-sm text-emerald-100">
              Apply for SEVA's Technology Support Programme and co-create practical digital systems.
            </p>
          </div>
          <button
            onClick={() => onNavigate('apply')}
            className="px-6 py-3.5 text-sm font-bold text-[#064E36] bg-white hover:bg-emerald-50 rounded-lg transition-all shrink-0 cursor-pointer"
          >
            Apply for Support Now
          </button>
        </div>
      </section>
    </div>
  );
};
