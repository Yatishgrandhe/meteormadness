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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-max">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900">
                Sponsor Submissions Admin
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and track sponsor inquiries
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={exportSubmissions}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
              <button
                onClick={loadSubmissions}
                className="px-4 py-2 bg-tsa-navy text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-blue-600">
                {submissions.filter(s => s.status === 'new').length}
              </div>
              <div className="text-blue-800 font-medium">New</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {submissions.filter(s => s.status === 'contacted').length}
              </div>
              <div className="text-yellow-800 font-medium">Contacted</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-green-600">
                {submissions.filter(s => s.status === 'confirmed').length}
              </div>
              <div className="text-green-800 font-medium">Confirmed</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-gray-600">
                {submissions.length}
              </div>
              <div className="text-gray-800 font-medium">Total</div>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'new' | 'contacted' | 'confirmed')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tsa-navy focus:border-transparent"
            >
              <option value="all">All Submissions</option>
              <option value="new">New Only</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
            </select>
          </div>

          {/* Spreadsheet-like Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th 
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
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
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {editingCell?.id === submission.id && editingCell?.field === 'company_name' ? (
                            <input
                              type="text"
                              defaultValue={submission.company_name}
                              onBlur={(e) => updateSubmissionField(submission.id, 'company_name', e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && updateSubmissionField(submission.id, 'company_name', (e.target as HTMLInputElement).value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent"
                              autoFocus
                            />
                          ) : (
                            <span 
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => setEditingCell({id: submission.id, field: 'company_name'})}
                            >
                              {submission.company_name}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {editingCell?.id === submission.id && editingCell?.field === 'contact_name' ? (
                            <input
                              type="text"
                              defaultValue={submission.contact_name}
                              onBlur={(e) => updateSubmissionField(submission.id, 'contact_name', e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && updateSubmissionField(submission.id, 'contact_name', (e.target as HTMLInputElement).value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent"
                              autoFocus
                            />
                          ) : (
                            <span 
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => setEditingCell({id: submission.id, field: 'contact_name'})}
                            >
                              {submission.contact_name}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {editingCell?.id === submission.id && editingCell?.field === 'email' ? (
                            <input
                              type="email"
                              defaultValue={submission.email}
                              onBlur={(e) => updateSubmissionField(submission.id, 'email', e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && updateSubmissionField(submission.id, 'email', (e.target as HTMLInputElement).value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent"
                              autoFocus
                            />
                          ) : (
                            <span 
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => setEditingCell({id: submission.id, field: 'email'})}
                            >
                              {submission.email}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {editingCell?.id === submission.id && editingCell?.field === 'sponsorship_level' ? (
                            <select
                              defaultValue={submission.sponsorship_level}
                              onBlur={(e) => updateSubmissionField(submission.id, 'sponsorship_level', e.target.value)}
                              onChange={(e) => updateSubmissionField(submission.id, 'sponsorship_level', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent"
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
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => setEditingCell({id: submission.id, field: 'sponsorship_level'})}
                            >
                              {submission.sponsorship_level}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {editingCell?.id === submission.id && editingCell?.field === 'status' ? (
                            <select
                              defaultValue={submission.status}
                              onBlur={(e) => updateSubmissionField(submission.id, 'status', e.target.value)}
                              onChange={(e) => updateSubmissionField(submission.id, 'status', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-tsa-navy focus:border-transparent"
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
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
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

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900">
                  Submission Details
                </h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              <div className="flex gap-4 mt-8">
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
