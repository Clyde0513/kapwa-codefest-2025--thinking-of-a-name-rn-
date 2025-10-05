'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Photo {
  id: string;
  url: string;
  caption?: string | null;
  width?: number;
  height?: number;
}

export default function Galleries() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        const data = await response.json();
        if (response.ok) {
          setPhotos(data.photos || []);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Sample videos - you can add actual video URLs here
  const videos = [
    {
      id: 1,
      title: 'Video 1',
      thumbnail: '/images/video_thumbnail_1.jpg', // placeholder
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // placeholder
    },
    // Add more videos as needed
  ];

  return (
    <section id="galleries" className="py-20 px-4" style={{ backgroundColor: '#faecc8' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <h2 className="text-4xl font-poppins font-bold text-gray-900 text-center mb-16">
          Galleries
        </h2>
        
        {/* Photo Gallery Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-8">
            Photo Gallery
          </h3>
          
          {/* Photo Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                    onClick={() => setSelectedPhoto(photo.url)}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption || 'Gallery photo'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    {/* Caption overlay */}
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {photo.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Add more photos message */}
              {photos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">No photos in gallery yet.</p>
                  <p className="text-gray-500 text-sm">
                    Upload photos through the admin panel to see them here.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Video Gallery Section */}
        <div>
          <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-8">
            Video Gallery
          </h3>
          
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-200"
              >
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
          
          {/* Add more videos message */}
          {videos.length === 0 && (
            <p className="text-center text-gray-600 text-lg">
              Videos coming soon...
            </p>
          )}
        </div>
      </div>

      {/* Photo Modal/Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-5xl leading-none z-10"
              aria-label="Close"
            >
              ×
            </button>
            
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={selectedPhoto}
                alt="Enlarged photo"
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
