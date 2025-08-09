"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Heart, Clock, Play, User } from "lucide-react";
import { VideoGrid } from "@/components/layout/video-grid";
import { mockVideos } from "@/lib/mock-videos";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  // Demo state for video lists (replace with real data if available)
  const [favorites, setFavorites] = useState<string[]>(["1", "3", "5"]);
  const [borrowedVideos, setBorrowedVideos] = useState<string[]>(["2", "4"]);
  const [watchlist, setWatchlist] = useState<string[]>(["6", "8", "10"]);
  const [recentlyWatched, setRecentlyWatched] = useState<string[]>(["1", "3", "7", "9"]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  // Handlers
  const handleVideoClick = (video: { id: string }) => {
    router.push(`/videos/${video.id}`);
  };
  const toggleFavorite = (videoId: string) => {
    setFavorites((prev) => (prev?.includes(videoId) ? prev.filter((id) => id !== videoId) : [...(prev || []), videoId]));
  };

  // Video filters
  const getBorrowedVideos = () => mockVideos.filter((video) => borrowedVideos.includes(video.id));
  const getFavoriteVideos = () => mockVideos.filter((video) => favorites.includes(video.id));
  const getWatchlistVideos = () => mockVideos.filter((video) => watchlist.includes(video.id));
  const getRecentlyWatchedVideos = () => mockVideos.filter((video) => recentlyWatched.includes(video.id));

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-4 py-12">
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-6xl flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
          {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user?.email?.[0].toUpperCase() || <User className="w-10 h-10" />}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome{user?.name ? `, ${user.name}` : ''}!</h1>
        <p className="text-gray-400 mb-6">Here you can see your borrowed, watched, favorite, and watchlist videos at a glance.</p>
      </div>

      <div className="w-full max-w-6xl space-y-12">
        {/* Borrowed Videos */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-green-400" />
              Borrowed Videos
            </h2>
            <span className="text-gray-400">{getBorrowedVideos().length} videos</span>
          </div>
          <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-800">
            {getBorrowedVideos().length > 0 ? (
              <VideoGrid
                videos={getBorrowedVideos()}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8 text-gray-400">No borrowed videos yet.</div>
            )}
          </div>
        </section>

        {/* Watched Videos */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-purple-400" />
              Watched Videos
            </h2>
            <span className="text-gray-400">{getRecentlyWatchedVideos().length} videos</span>
          </div>
          <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-800">
            {getRecentlyWatchedVideos().length > 0 ? (
              <VideoGrid
                videos={getRecentlyWatchedVideos()}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8 text-gray-400">No watched videos yet.</div>
            )}
          </div>
        </section>

        {/* Favorites */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" />
              Favorite Videos
            </h2>
            <span className="text-gray-400">{getFavoriteVideos().length} videos</span>
          </div>
          <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-800">
            {getFavoriteVideos().length > 0 ? (
              <VideoGrid
                videos={getFavoriteVideos()}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8 text-gray-400">No favorite videos yet.</div>
            )}
          </div>
        </section>

        {/* Watchlist */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              Watchlist
            </h2>
            <span className="text-gray-400">{getWatchlistVideos().length} videos</span>
          </div>
          <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-800">
            {getWatchlistVideos().length > 0 ? (
              <VideoGrid
                videos={getWatchlistVideos()}
                favorites={favorites}
                recentlyWatched={recentlyWatched}
                onVideoSelect={handleVideoClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8 text-gray-400">Your watchlist is empty.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}