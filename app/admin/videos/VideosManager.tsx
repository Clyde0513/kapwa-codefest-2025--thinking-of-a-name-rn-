"use client";

import { useEffect, useState } from 'react';
import VideoUpload from '../../../components/VideoUpload';

interface Video {
  id: string;
  publicId: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  duration?: number;
  caption?: string | null;
  createdAt?: string;
  post?: { id: string; title?: string } | null;
  uploader?: { id: string; name?: string } | null;
}

export default function VideosManager() {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [captionDrafts, setCaptionDrafts] = useState<Record<string, string>>({});

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/videos');
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed fetching videos');
      setVideos(json.videos || []);
    } catch (err: any) {
      console.error('fetchVideos error', err);
      setError(err?.message || String(err));
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const deleteVideo = async (id: string) => {
    if (!confirm('Delete this video? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/videos/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Delete failed');
      // remove from state
      setVideos((prev) => (prev ? prev.filter((v) => v.id !== id) : prev));
    } catch (err) {
      alert('Failed to delete video');
      console.error(err);
    }
  };

  const startEdit = (id: string, caption: string | null) => {
    setEditingId(id);
    setCaptionDrafts((d) => ({ ...d, [id]: caption || '' }));
  };

  const cancelEdit = (id: string) => {
    setEditingId(null);
    setCaptionDrafts((d) => {
      const copy = { ...d };
      delete copy[id];
      return copy;
    });
  };

  const saveCaption = async (id: string) => {
    const caption = captionDrafts[id] ?? '';
    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Update failed');
      setVideos((prev) => prev?.map((v) => (v.id === id ? json.video : v)) ?? []);
      cancelEdit(id);
    } catch (err) {
      alert('Failed to update caption');
      console.error(err);
    }
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return 'Unknown';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  if (loading && videos === null) return <div className="p-6">Loading videos...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Videos</h2>
        <div className="text-sm text-gray-500">{videos?.length ?? 0} videos</div>
      </div>

      {/* Upload Section */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Videos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload videos to your gallery. They will appear on the public Gallery page and can be used in blog posts.
        </p>
        <VideoUpload 
          onUploadComplete={() => fetchVideos()} 
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">Error: {error}</div>
      )}

      {videos && videos.length === 0 && (
        <div className="p-4 text-gray-600">No videos found.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos?.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="w-full h-48 bg-gray-100 relative">
              <video 
                src={video.url} 
                className="object-cover w-full h-full"
                controls
                preload="metadata"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{video.post?.title ?? 'Unattached'}</p>
                  <p className="text-sm text-gray-500">Uploaded by {video.uploader?.name ?? 'Unknown'}</p>
                  <p className="text-sm text-gray-500">{video.format} • {video.width}x{video.height} • {formatDuration(video.duration)} • {formatFileSize(video.bytes)}</p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-2">
                  <button
                    onClick={() => deleteVideo(video.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-3">
                {editingId === video.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={captionDrafts[video.id] ?? ''}
                      onChange={(e) => setCaptionDrafts((d) => ({ ...d, [video.id]: e.target.value }))}
                      className="w-full border rounded p-2 text-sm"
                      rows={3}
                    />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => cancelEdit(video.id)} className="px-3 py-1 rounded border text-sm">Cancel</button>
                      <button onClick={() => saveCaption(video.id)} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Save</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{video.caption ?? <span className="text-gray-400">No caption</span>}</p>
                    <button onClick={() => startEdit(video.id, video.caption ?? '')} className="text-sm text-blue-600 hover:underline">Edit</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
