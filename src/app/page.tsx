"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { CinematicLibrary } from "@/components/layout/cinematic-library";
import { GenreSelector } from "@/components/layout/genre-selector";
import { SearchBar } from "@/components/ui/search-bar";
import { VideoModal } from "@/components/ui/video-modal";
import type { Video, Genre } from "@/lib/video";
import { mockVideos } from "@/lib/mock-videos";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyWatched, setRecentlyWatched] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"shelves" | "carousel" | "wall">(
    "shelves"
  );

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

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-white tracking-wider">
            CINEMATIC LIBRARY
          </h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <GenreSelector
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense
          fallback={
            <Html center>
              <div className="text-white text-xl">Loading Cinema...</div>
            </Html>
          }
        >
          <CinematicLibrary
            videos={filteredVideos}
            selectedGenre={selectedGenre}
            onVideoSelect={setSelectedVideo}
            recentlyWatched={recentlyWatched}
            viewMode={viewMode}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={10}
            maxDistance={25}
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
