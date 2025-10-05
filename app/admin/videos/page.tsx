import Link from 'next/link';
import VideosManager from './VideosManager';

export const metadata = { title: 'Manage Videos' };

export default function AdminVideosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#7A0000] to-[#A01010] shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <nav className="flex items-center space-x-2 text-sm text-white/80">
                <Link href="/admin" className="hover:text-white">Admin</Link>
                <span>›</span>
                <span className="text-white">Videos</span>
              </nav>
              <h1 className="text-2xl font-bold text-white mt-2">Video Management</h1>
              <p className="text-white/90 mt-1">Upload and manage your church videos</p>
            </div>
            <Link
              href="/admin"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              Back to Admin
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Video Gallery</h2>
          <p className="text-sm text-gray-600 mb-6">View, delete, and edit captions for uploaded videos stored in the database.</p>
          <VideosManager />
        </div>
      </div>
    </div>
  );
}
