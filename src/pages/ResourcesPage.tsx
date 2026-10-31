import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Download,
  Calendar,
  Clock,
  Filter,
  X,
  FileText,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { SevaStore } from '../services/store';
import { ResourceItem } from '../types';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>(SevaStore.getResources());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<ResourceItem | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const categories = [
    'All',
    'MIS and Data Management',
    'Digital Security',
    'Documentation and Reporting',
    'NGO Website Development',
    'Digital Tools for NGOs',
    'Digital Communication',
    'Project Monitoring',
    'Capacity Building',
    'Technology for Rural Development',
  ];

  const filteredResources = resources.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (res: ResourceItem) => {
    const filename = res.download_name || `${res.title.replace(/\s+/g, '_')}.pdf`;
    // Trigger synthetic download
    const element = document.createElement('a');
    const fileContent = `SEVA KNOWLEDGE CENTRE - RESOURCE DOWNLOAD\n\nTitle: ${res.title}\nCategory: ${res.category}\nFormat: ${res.format}\nDate: ${res.published_date}\n\nSummary:\n${res.summary}\n\nFull Guide:\n${res.content}\n\nSustainable Ecology & Rural Advancement (SEVA)\nRalegaon, Yavatmal, Maharashtra - www.sevavillage.org`;
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadNotification(`Downloaded: ${filename}`);
    setTimeout(() => setDownloadNotification(null), 4000);
  };

  return (
    <div className="space-y-12 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
            Open Access Repository
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B24]">
            Resources &amp; Knowledge Centre
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Practical guides, downloadable MIS templates, digital security checklists, and documentation frameworks created specifically for grassroots development organisations in India.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search guides, templates, and methodologies (e.g. MIS, Security, Reporting)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
            />
          </div>

          {/* Categories Tab Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0B6643] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Alert Toast */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064E36] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-400">
          <CheckCircle className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-medium">{downloadNotification}</span>
        </div>
      )}

      {/* Resources Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <p className="text-stone-500 text-sm">No resources found matching your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-[#0B6643] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0B6643] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      {item.format}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.read_time}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-stone-500 uppercase tracking-tight block">
                      {item.category}
                    </span>
                    <h2 className="text-lg font-bold text-[#172B24] tracking-tight mt-1 line-clamp-2">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveArticle(item)}
                    className="text-xs font-semibold text-[#0B6643] hover:text-[#064E36] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDownload(item)}
                    className="p-2 rounded-lg text-stone-600 hover:text-[#0B6643] hover:bg-emerald-50 transition-colors cursor-pointer"
                    title={`Download ${item.download_name || 'Resource'}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6 border border-stone-200">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-md"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#0B6643] uppercase tracking-wider">
                {activeArticle.category} · {activeArticle.format}
              </span>
              <h2 className="text-2xl font-bold text-[#172B24]">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-stone-400 pt-1">
                <span>Published: {activeArticle.published_date}</span>
                <span>·</span>
                <span>{activeArticle.read_time}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
              {activeArticle.summary}
            </div>

            <div className="prose prose-sm max-w-none text-stone-800 leading-relaxed whitespace-pre-line text-sm border-t border-stone-100 pt-4">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                Provided by SEVA Rural Digital Empowerment Desk
              </div>
              <button
                onClick={() => handleDownload(activeArticle)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resource File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
