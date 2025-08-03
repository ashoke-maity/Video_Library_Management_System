"use client";

import { useState } from "react";
import { Header } from "@/components/ui/header";
import { VideoGrid } from "@/components/ui/video-grid";
import { VideoCarousel } from "@/components/ui/video-carousel";
import { VideoList } from "@/components/ui/video-list";
import { CinematicShelf } from "@/components/ui/cinematic-shelf";
import { GenreSelector } from "@/components/layout/genre-selector";
import { ViewModeSelector } from "@/components/layout/view-mode-selector";
import type { Video, Genre, ViewMode } from "@/lib/video";
import { mockVideos } from "@/lib/mock-videos";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyWatched, setRecentlyWatched] = useState<string[]>([]);

  const filteredVideos = mockVideos.filter((video) => {
    const matchesGenre =
      selectedGenre === "all" || video.genre === selectedGenre;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const toggleFavorite = (videoId: string) => {
    setFavorites((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleVideoSelect = (video: Video) => {
    setRecentlyWatched((prev) => [video.id, ...prev.filter((id) => id !== video.id)].slice(0, 5));
  };

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalVideos={filteredVideos.length}
        totalFavorites={favorites.length}
      />

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-6">
          <GenreSelector
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
          <ViewModeSelector
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Featured Videos Carousel */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Featured Videos</h2>
          <VideoCarousel
            videos={filteredVideos.slice(0, 6)}
            favorites={favorites}
            recentlyWatched={recentlyWatched}
            onVideoSelect={handleVideoSelect}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* Main Video Display */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {selectedGenre === "all" ? "All Videos" : `${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} Collection`}
          </h2>
          
          {viewMode === "grid" && (
            <VideoGrid
              videos={filteredVideos}
              favorites={favorites}
              recentlyWatched={recentlyWatched}
              onVideoSelect={handleVideoSelect}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {viewMode === "list" && (
            <VideoList
              videos={filteredVideos}
              favorites={favorites}
              recentlyWatched={recentlyWatched}
              onVideoSelect={handleVideoSelect}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {viewMode === "carousel" && (
            <VideoCarousel
              videos={filteredVideos}
              favorites={favorites}
              recentlyWatched={recentlyWatched}
              onVideoSelect={handleVideoSelect}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {viewMode === "shelf" && (
            <CinematicShelf
              videos={filteredVideos}
              favorites={favorites}
              recentlyWatched={recentlyWatched}
              onVideoSelect={handleVideoSelect}
              onToggleFavorite={toggleFavorite}
              selectedGenre={selectedGenre}
            />
          )}
        </div>
      </div>
    </div>
  );
}
