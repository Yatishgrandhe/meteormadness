'use client';

import { useState, useEffect } from 'react';
import { sponsorSubmissions, SponsorSubmission } from '@/lib/supabase';

const AdminPanel: React.FC = () => {
  const [submissions, setSubmissions] = useState<SponsorSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<SponsorSubmission[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'confirmed'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<SponsorSubmission | null>(null);
  const [editingCell, setEditingCell] = useState<{id: string, field: string} | null>(null);
  const [sortField, setSortField] = useState<keyof SponsorSubmission>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {
    const filtered = statusFilter === 'all' ? submissions : submissions.filter(sub => sub.status === statusFilter);
    
    // Sort submissions
    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (sortField === 'created_at') {
        return sortDirection === 'asc' 
          ? new Date(aVal as string).getTime() - new Date(bVal as string).getTime()
          : new Date(bVal as string).getTime() - new Date(aVal as string).getTime();
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return 0;
    });
    
    setFilteredSubmissions(filtered);
  }, [submissions, statusFilter, sortField, sortDirection]);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await sponsorSubmissions.getAll();
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
      alert('Error loading submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, newStatus: 'new' | 'contacted' | 'confirmed') => {
    try {
      await sponsorSubmissions.update(id, { status: newStatus });
      const updatedSubmissions = submissions.map(sub => 
        sub.id === id ? { ...sub, status: newStatus } : sub
      );
      setSubmissions(updatedSubmissions);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    }
  };

  const updateSubmissionField = async (id: string, field: keyof SponsorSubmission, value: string) => {
    try {
      await sponsorSubmissions.update(id, { [field]: value });
      
      const updatedSubmissions = submissions.map(sub => 
        sub.id === id ? { ...sub, [field]: value } : sub
      );
      setSubmissions(updatedSubmissions);
      setEditingCell(null);
    } catch (error) {
      console.error('Error updating field:', error);
      alert('Error updating field. Please try again.');
    }
  };

  const handleSort = (field: keyof SponsorSubmission) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const deleteSubmission = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await sponsorSubmissions.delete(id);
        const updatedSubmissions = submissions.filter(sub => sub.id !== id);
        setSubmissions(updatedSubmissions);
        setSelectedSubmission(null);
      } catch (error) {
        console.error('Error deleting submission:', error);
        alert('Error deleting submission. Please try again.');
      }
    }
  };

  const exportSubmissions = () => {
    const csvContent = [
      ['Date', 'Company', 'Contact', 'Email', 'Phone', 'Level', 'Status', 'Message'],
      ...submissions.map(sub => [
        new Date(sub.created_at).toLocaleDateString(),
        sub.company_name,
        sub.contact_name,
        sub.email,
        sub.phone || '',
        sub.sponsorship_level,
        sub.status,
        (sub.message || '').replace(/,/g, ';') // Replace commas to avoid CSV issues
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sponsor-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-tsa-navy to-blue-800 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white">
                  Sponsor Submissions Admin
                </h1>
                <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">
                  Manage and track sponsor inquiries
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={exportSubmissions}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export CSV
                </button>
                <button
                  onClick={loadSubmissions}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base border border-white/30"
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {submissions.filter(s => s.status === 'new').length}
                    </div>
                    <div className="text-blue-800 font-medium text-sm sm:text-base">New</div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 sm:p-6 border border-yellow-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                      {submissions.filter(s => s.status === 'contacted').length}
                    </div>
                    <div className="text-yellow-800 font-medium text-sm sm:text-base">Contacted</div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-6 border border-green-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {submissions.filter(s => s.status === 'confirmed').length}
                    </div>
                    <div className="text-green-800 font-medium text-sm sm:text-base">Confirmed</div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-600">
                      {submissions.length}
                    </div>
                    <div className="text-gray-800 font-medium text-sm sm:text-base">Total</div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'new' | 'contacted' | 'confirmed')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tsa-navy focus:border-transparent bg-white shadow-sm min-w-[200px]"
                  >
                    <option value="all">All Submissions</option>
                    <option value="new">New Only</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                </div>
                <div className="text-sm text-gray-500">
                  Showing {filteredSubmissions.length} of {submissions.length} submissions
                </div>
              </div>
            </div>

            {/* Spreadsheet-like Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-tsa-navy"></div>
                  <div className="text-gray-600 mt-2">Loading submissions...</div>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg">No submissions found</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th 
                          className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleSort('created_at')}
                        >
                          <div className="flex items-center gap-2">
                            Date
                            {sortField === 'created_at' && (
                              <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleSort('company_name')}
                        >
                          <div className="flex items-center gap-2">
                            Company
                            {sortField === 'company_name' && (
                              <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleSort('contact_name')}
                        >
                          <div className="flex items-center gap-2">
                            Contact
                            {sortField === 'contact_name' && (
                              <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleSort('email')}
                        >
                          <div className="flex items-center gap-2">
                            Email
                            {sortField === 'email' && (
                              <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleSort('sponsorship_level')}
                        >
                          <div className="flex items-center gap-2">
                            Level
                            {sortField === 'sponsorship_level' && (
                              <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center gap-2">
                            Status
                            {sortField === 'status' && (
                              <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>
                        <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                    </tr>
                  </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-4 py-3 text-sm text-gray-900">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-3 sm:px-4 py-3 text-sm text-gray-900">
                            {editingCell?.id === submission.id && editingCell?.field === 'company_name' ? (
                              <input
                                type="text"
                                defaultValue={submission.company_name}
                                onBlur={(e) => updateSubmissionField(submission.id, 'company_name', e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && updateSubmissionField(submission.id, 'company_name', (e.target as HTMLInputElement).value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent text-sm"
                                autoFocus
                              />
                            ) : (
                              <span 
                                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm"
                                onClick={() => setEditingCell({id: submission.id, field: 'company_name'})}
                              >
                                {submission.company_name}
                              </span>
                            )}
                          </td>
                          <td className="px-3 sm:px-4 py-3 text-sm text-gray-900">
                            {editingCell?.id === submission.id && editingCell?.field === 'contact_name' ? (
                              <input
                                type="text"
                                defaultValue={submission.contact_name}
                                onBlur={(e) => updateSubmissionField(submission.id, 'contact_name', e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && updateSubmissionField(submission.id, 'contact_name', (e.target as HTMLInputElement).value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent text-sm"
                                autoFocus
                              />
                            ) : (
                              <span 
                                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm"
                                onClick={() => setEditingCell({id: submission.id, field: 'contact_name'})}
                              >
                                {submission.contact_name}
                              </span>
                            )}
                          </td>
                          <td className="px-3 sm:px-4 py-3 text-sm text-gray-900">
                            {editingCell?.id === submission.id && editingCell?.field === 'email' ? (
                              <input
                                type="email"
                                defaultValue={submission.email}
                                onBlur={(e) => updateSubmissionField(submission.id, 'email', e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && updateSubmissionField(submission.id, 'email', (e.target as HTMLInputElement).value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent text-sm"
                                autoFocus
                              />
                            ) : (
                              <span 
                                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm"
                                onClick={() => setEditingCell({id: submission.id, field: 'email'})}
                              >
                                {submission.email}
                              </span>
                            )}
                          </td>
                          <td className="px-3 sm:px-4 py-3 text-sm text-gray-900">
                            {editingCell?.id === submission.id && editingCell?.field === 'sponsorship_level' ? (
                              <select
                                defaultValue={submission.sponsorship_level}
                                onBlur={(e) => updateSubmissionField(submission.id, 'sponsorship_level', e.target.value)}
                                onChange={(e) => updateSubmissionField(submission.id, 'sponsorship_level', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent text-sm"
                                autoFocus
                              >
                                <option value="Platinum">Platinum</option>
                                <option value="Gold">Gold</option>
                                <option value="Silver">Silver</option>
                                <option value="Bronze">Bronze</option>
                                <option value="Other">Other</option>
                              </select>
                            ) : (
                              <span 
                                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm"
                                onClick={() => setEditingCell({id: submission.id, field: 'sponsorship_level'})}
                              >
                                {submission.sponsorship_level}
                              </span>
                            )}
                          </td>
                          <td className="px-3 sm:px-4 py-3 text-sm">
                            {editingCell?.id === submission.id && editingCell?.field === 'status' ? (
                              <select
                                defaultValue={submission.status}
                                onBlur={(e) => updateSubmissionField(submission.id, 'status', e.target.value)}
                                onChange={(e) => updateSubmissionField(submission.id, 'status', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent text-sm"
                                autoFocus
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="confirmed">Confirmed</option>
                              </select>
                            ) : (
                              <span 
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${getStatusColor(submission.status)}`}
                                onClick={() => setEditingCell({id: submission.id, field: 'status'})}
                              >
                                {submission.status}
                              </span>
                            )}
                          </td>
                          <td className="px-3 sm:px-4 py-3 text-sm">
                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                              <button
                                onClick={() => setSelectedSubmission(submission)}
                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => deleteSubmission(submission.id)}
                                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">
                  Submission Details
                </h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Company</label>
                  <p className="text-gray-900">{selectedSubmission.company_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Contact</label>
                  <p className="text-gray-900">{selectedSubmission.contact_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedSubmission.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedSubmission.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Sponsorship Level</label>
                  <p className="text-gray-900">{selectedSubmission.sponsorship_level}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSubmission.status)}`}>
                    {selectedSubmission.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Submitted</label>
                  <p className="text-gray-900">{new Date(selectedSubmission.created_at).toLocaleString()}</p>
                </div>
                {selectedSubmission.message && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Message</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={() => {
                    const newStatus = selectedSubmission.status === 'new' ? 'contacted' : 
                                    selectedSubmission.status === 'contacted' ? 'confirmed' : 'new';
                    updateSubmissionStatus(selectedSubmission.id, newStatus);
                    setSelectedSubmission({ ...selectedSubmission, status: newStatus });
                  }}
                  className="flex-1 px-4 py-2 bg-tsa-navy text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                >
                  {selectedSubmission.status === 'new' ? 'Mark Contacted' : 
                   selectedSubmission.status === 'contacted' ? 'Mark Confirmed' : 'Mark New'}
                </button>
                <button
                  onClick={() => {
                    deleteSubmission(selectedSubmission.id);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
