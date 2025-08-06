"use client";

import { useRouter } from "next/navigation";
import {
  Search,
  Grid3X3,
  List,
  RotateCcw,
  Home,
  User,
  BookOpen,
} from "lucide-react";
import type { ViewMode } from "@/lib/video";
import { useEffect, useState } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalVideos: number;
  totalFavorites: number;
}

export function Header({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalVideos,
  totalFavorites,
}: HeaderProps) {
  const router = useRouter();
  const viewModes = [
    { value: "grid" as const, icon: Grid3X3, label: "Grid" },
    { value: "carousel" as const, icon: RotateCcw, label: "Carousel" },
    { value: "list" as const, icon: List, label: "List" },
  ];

  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  useEffect(() => {
    // Try to get user from localStorage (or replace with context if available)
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-8">
            <h1
              onClick={() => router.push("/")}
              className="text-4xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
            >
              CINEMATIC LIBRARY
            </h1>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Selector */}
            <div className="flex bg-gray-900/50 rounded-lg p-1 border border-gray-700">
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => onViewModeChange(mode.value)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                      ${
                        viewMode === mode.value
                          ? "bg-red-600 text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-gray-700"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {mode.label}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search your library..."
                className="bg-gray-900/50 border border-gray-700 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 w-80 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* User Avatar/Profile */}
            {user ? (
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : user.email?.[0].toUpperCase()}
                </div>
                {/* Dropdown with Profile and Dashboard link, no email shown */}
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 p-4 text-white text-sm flex flex-col gap-2">
                  <button
                    onClick={() => router.push("/users/profile")}
                    className="flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-gray-800"
                  >
                    <User className="w-4 h-4 text-blue-400" />
                    Profile
                  </button>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-gray-800"
                  >
                    <BookOpen className="w-4 h-4 text-green-400" />
                    Dashboard
                  </button>
                  <button className="w-full text-left text-red-400 hover:underline mt-2">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => router.push("/users/login")}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-400">
          <div>
            {totalVideos} movies • {totalFavorites} favorites
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
