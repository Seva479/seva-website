import React from 'react';
import { Target, Compass, Heart, Users, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 lg:space-y-24 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Organisation Identity
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B24]">
            About SEVA
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Sustainable Ecology &amp; Rural Advancement (SEVA) is dedicated to strengthening grassroots organisations, rural communities and development institutions across India.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0B6643] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase text-stone-400">
              Core Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#172B24]">
              "Empowering Grassroots Organisations Through Technology, Knowledge and Digital Transformation."
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We envision a rural development sector where even the smallest community-based organisation has access to appropriate, reliable digital tools to manage data, measure social impact, and communicate with institutional donors without prohibitive technical or financial barriers.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0B6643] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase text-stone-400">
              Our Mission
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#172B24]">
              "Strengthening Institutions Through Accessible, Need-Based Systems."
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              To strengthen grassroots and community-based organisations by providing accessible, affordable and need-based digital solutions, technology support, institutional capacity building and data management systems.
            </p>
          </div>
        </div>
      </section>

      {/* Positioning & Philosophy */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
                Our Institutional Positioning
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#172B24]">
                A Development Organisation, Not a Commercial Software Agency
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                SEVA is not an IT consulting firm or an agency selling software packages. We are a development organisation rooted in rural Maharashtra that understands the lived realities of field animators, tribal women self-help groups, and grassroots trustees.
              </p>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                We believe that grassroots organisations are the real engines of social transformation. When a local organisation spends 40% of its working hours hand-copying registers and battling corrupted Excel files, community development suffers. By strengthening their digital backbone, we amplify their ground impact.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6643] shrink-0" />
                  <span>Participatory, respectful co-design with rural animators</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6643] shrink-0" />
                  <span>Vernacular language support (Marathi, Hindi, English)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6643] shrink-0" />
                  <span>Transparent 70% SEVA support and 30% NGO cost-sharing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                <picture>
                  <source srcSet="/assets/images/digital_training_rural.webp" type="image/webp" />
                  <source srcSet="/assets/images/digital_training_rural.jpg" type="image/jpeg" />
                  <img
                    src="/assets/images/digital_training_rural.jpg"
                    alt="SEVA participatory workshop with rural community workers"
                    className="w-full h-[380px] object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('digital_training_rural_1793458680305.jpg')) {
                        target.src = '/assets/images/digital_training_rural_1793458680305.jpg';
                      }
                    }}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registered Office Roots */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#064E36] text-white rounded-2xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
              Ground Roots &amp; Headquarters
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Rooted in Ralegaon, Yavatmal, Maharashtra
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Our registered office is located at <strong>31 B, Jalka, Ralegaon, District Yavatmal, Maharashtra – 445402</strong>. Operating directly from Vidarbha allows us to design systems tested under genuine rural conditions—low internet bandwidth, intermittent power supply, and multi-lingual community leadership.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#064E36] bg-white hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            >
              Contact Our Ralegaon Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
