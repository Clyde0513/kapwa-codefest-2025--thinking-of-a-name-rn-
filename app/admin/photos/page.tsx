import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PhotosManager from './PhotosManager';

export const metadata = { title: 'Manage Photos' };

export default function AdminPhotosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-semibold mb-4">Manage Photos</h1>
          <p className="text-sm text-gray-600 mb-6">View, delete, and edit captions for uploaded photos stored in the database.</p>
          <PhotosManager />
        </div>
      </div>
      <Footer />
    </main>
  );
}
