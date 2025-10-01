'use client';

import React from 'react';

const AdminLink: React.FC = () => {
  const openAdminPanel = () => {
    // Open admin panel in a new window/tab
    const adminUrl = `${window.location.origin}${window.location.pathname}?admin=true`;
    window.open(adminUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={openAdminPanel}
        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg transition-colors text-sm font-medium"
        title="Open Admin Panel"
      >
        Admin
      </button>
    </div>
  );
};

export default AdminLink;
