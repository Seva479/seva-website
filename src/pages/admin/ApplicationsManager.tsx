import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronDown,
  ArrowUpDown,
  FileSpreadsheet,
} from 'lucide-react';
import { Application, ApplicationStatus, PriorityLevel } from '../../types';

interface ApplicationsManagerProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
}

export const ApplicationsManager: React.FC<ApplicationsManagerProps> = ({
  applications,
  onSelectApplication,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [supportFilter, setSupportFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'score_desc'>('date_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter options
  const allStatuses: ApplicationStatus[] = [
    'New Application',
    'Under Initial Review',
    'Additional Information Required',
    'Shortlisted',
    'Meeting Scheduled',
    'Approved',
    'Rejected',
    'On Hold',
    'Agreement Pending',
    'Implementation Started',
    'Implementation Completed',
  ];

  const uniqueStates = Array.from(new Set(applications.map((a) => a.state)));
  const supportTypes = [
    'Website Development and Support',
    'MIS and Digital Data Management',
    'Mobile or Web-Based Application Development',
    'Social Media and Digital Communication Training',
    'Digital Capacity Building and Technical Support',
    'Data Management, Documentation and Reporting Systems',
  ];

  // Filtering and sorting logic
  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.name_of_organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.contact_person_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || app.priority === priorityFilter;
    const matchesState = stateFilter === 'All' || app.state === stateFilter;
    const matchesSupport = supportFilter === 'All' || app.support_type_seeking.includes(supportFilter);

    return matchesSearch && matchesStatus && matchesPriority && matchesState && matchesSupport;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date_desc') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === 'date_asc') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    if (sortBy === 'score_desc') {
      const scoreA = a.reviews?.total_score || 0;
      const scoreB = b.reviews?.total_score || 0;
      return scoreB - scoreA;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // CSV Export (Part 8.2 / 15)
  const exportToCSV = () => {
    const headers = [
      'Application ID',
      'Organisation Name',
      'Type',
      'Established',
      'Registration No',
      'State',
      'District',
      'Contact Person',
      'Phone',
      'Email',
      'Status',
      'Priority',
      'Review Score',
      'First Priority',
      'Submission Date (IST)',
    ];

    const rows = sorted.map((a) => [
      a.id,
      `"${a.name_of_organization.replace(/"/g, '""')}"`,
      a.type_of_organization,
      a.year_of_establishment,
      `"${a.registration_number}"`,
      a.state,
      a.district,
      `"${a.contact_person_name}"`,
      a.contact_number,
      a.organisation_email,
      a.status,
      a.priority,
      a.reviews?.total_score || 'Not Scored',
      `"${a.first_priority_support || ''}"`,
      new Date(a.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SEVA_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Master Application Registry
          </h2>
          <p className="text-xs text-stone-500">
            Manage, triage, score, and transition grassroots organisation submissions
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#0B6643]" />
          <span>Export to CSV / Excel</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by organisation name, application ID, district, or contact person..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="All">All Statuses ({applications.length})</option>
              {allStatuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">State</label>
            <select
              value={stateFilter}
              onChange={(e) => {
                setStateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="All">All States</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">Support Type</label>
            <select
              value={supportFilter}
              onChange={(e) => {
                setSupportFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="All">All Support Types</option>
              {supportTypes.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">Sort Order</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="score_desc">Highest Assessment Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Application ID</th>
                <th className="py-3.5 px-4">Organisation</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">First Priority</th>
                <th className="py-3.5 px-4">Priority &amp; Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Submitted (IST)</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-stone-400">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((app) => (
                  <tr key={app.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                      {app.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{app.name_of_organization}</div>
                      <div className="text-[11px] text-stone-400">{app.type_of_organization} (Est. {app.year_of_establishment})</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>{app.district}</div>
                      <div className="text-[11px] text-stone-400">{app.state}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-stone-800">{app.contact_person_name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">+91 {app.contact_number}</div>
                    </td>
                    <td className="py-3 px-4 max-w-[180px] truncate" title={app.first_priority_support}>
                      {app.first_priority_support || 'General Tech Support'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          app.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' :
                          app.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-stone-100 text-stone-600'
                        }`}>
                          {app.priority}
                        </span>
                        {app.reviews?.total_score !== undefined && (
                          <span className="font-mono text-[11px] font-bold text-[#0B6643]">
                            {app.reviews.total_score}/100
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                        app.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        app.status === 'Shortlisted' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        app.status === 'Meeting Scheduled' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                        app.status === 'Rejected' ? 'bg-red-50 text-red-800 border-red-200' :
                        'bg-stone-100 text-stone-700 border-stone-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-stone-500 font-mono text-[11px]">
                      {new Date(app.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectApplication(app)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-md transition-colors cursor-pointer"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div>
            Showing <span className="font-semibold">{paginated.length}</span> of{' '}
            <span className="font-semibold">{sorted.length}</span> applications
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded border border-stone-300 bg-white disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <span className="font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 rounded border border-stone-300 bg-white disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
