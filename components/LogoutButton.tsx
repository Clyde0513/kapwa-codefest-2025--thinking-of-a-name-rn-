'use client';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Redirect to login page after successful logout
        window.location.href = '/admin/login';
      } else {
        console.error('Logout failed');
        // Still redirect to login page even if logout API fails
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect to login page even if there's an error
      window.location.href = '/admin/login';
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      Logout
    </button>
  );
}
