'use client';

const AdminLink = () => {
  const isAdminPage = typeof window !== 'undefined' && 
    (window.location.pathname === '/admin' || window.location.search.includes('admin=true'));

  if (isAdminPage) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a
        href="?admin=true"
        className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors shadow-lg"
        title="Admin Panel"
      >
        Admin
      </a>
    </div>
  );
};

export default AdminLink;
