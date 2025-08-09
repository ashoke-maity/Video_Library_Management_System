"use client";

import { useRouter } from "next/navigation";
import {
  Search,
  User,
  BookOpen,
  Sparkles,
  Bell,
  Settings,
  LogOut,
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

  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClick(e: MouseEvent) {
      const dropdown = document.getElementById("header-avatar-dropdown");
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isDropdownOpen]);

  useEffect(() => {
    // Try to get user from localStorage (or replace with context if available)
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="px-6 py-4">
        {/* Main Header Row */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => router.push("/")}
            className="group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  ClipShelf
                </h1>
                <p className="text-xs text-foreground-tertiary font-medium">
                  Your Digital Cinema
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Search Bar - Now Bigger and More Prominent */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'scale-105' : 'scale-100'
              }`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search your cinematic library for movies, genres, actors..."
                  className="w-full bg-background-elevated/50 border border-white/10 rounded-2xl px-6 py-4 pl-14 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 backdrop-blur-sm text-lg"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-foreground-muted w-5 h-5" />
                {isSearchFocused && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                )}
              </div>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-3 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-secondary hover:text-foreground-primary hover:bg-white/5 transition-all duration-200">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* User Profile */}
            {user ? (
              <div className="relative">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => setIsDropdownOpen((open) => !open)}
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : user.email?.[0].toUpperCase()}
                </div>
                {/* Dropdown: open on click only */}
                {isDropdownOpen && (
                  <div
                    id="header-avatar-dropdown"
                    className="absolute right-0 mt-3 w-64 bg-background-elevated/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in"
                  >
                    <div className="p-2">
                      <button
                        onClick={() => { setIsDropdownOpen(false); router.push("/users/settings"); }}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-foreground-secondary hover:text-foreground-primary hover:bg-white/5 transition-all duration-200"
                      >
                        <User className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={() => { setIsDropdownOpen(false); router.push("/users/dashboard"); }}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-foreground-secondary hover:text-foreground-primary hover:bg-white/5 transition-all duration-200"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      <div className="border-t border-white/10 my-2"></div>
                      <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/users/login")}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
