"use client";

import { useState, useRef } from "react";
import { User, Camera, Save, Key, Settings, Shield, Activity, Heart, Eye, Star, Edit3, X, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserStats {
  totalVideos: number;
  favorites: number;
  watchTime: string;
  lastActive: string;
  joinDate: string;
}

interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  notifications: boolean;
  privacy: 'public' | 'private' | 'friends';
  language: string;
}

export default function UserProfilePage() {
  const router = useRouter();
  
  // Demo user state (replace with real API integration)
  const [user, setUser] = useState<{ 
    name: string; 
    email: string; 
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    social?: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      instagram?: string;
    };
  }>(() => {
    const userData = localStorage.getItem("user");
    return userData ? { 
      ...JSON.parse(userData), 
      avatar: undefined,
      bio: "Passionate movie enthusiast and collector of cinematic masterpieces.",
      location: "San Francisco, CA",
      website: "https://example.com",
      social: {
        twitter: "@movielover",
        github: "github.com/movielover",
        linkedin: "linkedin.com/in/movielover",
        instagram: "@cinematiclife"
      }
    } : { 
      name: "", 
      email: "", 
      avatar: undefined,
      bio: "",
      location: "",
      website: "",
      social: {}
    };
  });

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newBio, setNewBio] = useState(user.bio || "");
  const [newLocation, setNewLocation] = useState(user.location || "");
  const [newWebsite, setNewWebsite] = useState(user.website || "");
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user.avatar);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences' | 'activity'>('profile');
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'dark',
    notifications: true,
    privacy: 'public',
    language: 'en'
  });
  const [stats] = useState<UserStats>({
    totalVideos: 247,
    favorites: 89,
    watchTime: "1,234 hours",
    lastActive: "2 hours ago",
    joinDate: "March 2023"
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile save
  const handleSaveProfile = () => {
    setUser((prev) => ({ 
      ...prev, 
      name: newName, 
      email: newEmail, 
      avatar: avatarPreview,
      bio: newBio,
      location: newLocation,
      website: newWebsite
    }));
    localStorage.setItem("user", JSON.stringify({ 
      name: newName, 
      email: newEmail,
      bio: newBio,
      location: newLocation,
      website: newWebsite
    }));
    setEditing(false);
  };

  // Handle password change (demo only)
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPasswordMsg("New passwords do not match.");
      return;
    }
    if (!passwords.current || !passwords.new) {
      setPasswordMsg("Please fill all password fields.");
      return;
    }
    setPasswordMsg("Password changed successfully (demo only).");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background-primary relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground-secondary hover:text-foreground-primary transition-colors duration-200"
          >
            <X className="w-5 h-5 rotate-45" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold gradient-text">Profile Settings</h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden border-4 border-background-elevated shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    {avatarPreview ? (
                      <Image src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" fill />
                    ) : (
                      user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user.email[0]?.toUpperCase() || <User className="w-8 h-8" />
                    )}
                  </div>
                  <button
                    className="absolute -bottom-2 -right-2 bg-background-elevated/80 backdrop-blur-sm p-2 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-200 shadow-lg"
                    onClick={() => fileInputRef.current?.click()}
                    title="Change profile picture"
                  >
                    <Camera className="w-4 h-4 text-foreground-primary" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-foreground-primary">{user.name}</h2>
                  <p className="text-sm text-foreground-secondary">{user.email}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-semibold text-foreground-primary uppercase tracking-wider">Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">Videos</span>
                    <span className="text-sm font-semibold text-foreground-primary">{stats.totalVideos}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">Favorites</span>
                    <span className="text-sm font-semibold text-foreground-primary">{stats.favorites}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">Watch Time</span>
                    <span className="text-sm font-semibold text-foreground-primary">{stats.watchTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">Member Since</span>
                    <span className="text-sm font-semibold text-foreground-primary">{stats.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'profile' | 'security' | 'preferences' | 'activity')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                          : "text-foreground-secondary hover:text-foreground-primary hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass-effect rounded-2xl p-8 border border-white/10">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground-primary">Profile Information</h2>
                    <button
                      onClick={() => setEditing(!editing)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                      {editing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  {editing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Full Name</label>
                          <input
                            type="text"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Email</label>
                          <input
                            type="email"
                            value={newEmail}
                            onChange={e => setNewEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-2">Bio</label>
                        <textarea
                          value={newBio}
                          onChange={e => setNewBio(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Location</label>
                          <input
                            type="text"
                            value={newLocation}
                            onChange={e => setNewLocation(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                            placeholder="Enter your location"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Website</label>
                          <input
                            type="url"
                            value={newWebsite}
                            onChange={e => setNewWebsite(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditing(false)}
                          className="px-6 py-3 bg-background-elevated/50 text-foreground-primary rounded-xl font-medium hover:bg-white/10 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Full Name</label>
                          <div className="px-4 py-3 rounded-xl bg-background-elevated/30 text-foreground-primary">
                            {user.name}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Email</label>
                          <div className="px-4 py-3 rounded-xl bg-background-elevated/30 text-foreground-primary">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-2">Bio</label>
                        <div className="px-4 py-3 rounded-xl bg-background-elevated/30 text-foreground-primary">
                          {user.bio || "No bio added yet."}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Location</label>
                          <div className="px-4 py-3 rounded-xl bg-background-elevated/30 text-foreground-primary">
                            {user.location || "Not specified"}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Website</label>
                          <div className="px-4 py-3 rounded-xl bg-background-elevated/30 text-foreground-primary">
                            {user.website || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-foreground-primary">Security Settings</h2>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground-secondary mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.current ? "text" : "password"}
                          value={passwords.current}
                          onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                          className="w-full px-4 py-3 pr-12 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(p => ({ ...p, current: !p.current }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-foreground-primary transition-colors duration-200"
                        >
                          {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword.new ? "text" : "password"}
                            value={passwords.new}
                            onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(p => ({ ...p, new: !p.new }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-foreground-primary transition-colors duration-200"
                          >
                            {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-2">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword.confirm ? "text" : "password"}
                            value={passwords.confirm}
                            onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary placeholder-foreground-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(p => ({ ...p, confirm: !p.confirm }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-foreground-primary transition-colors duration-200"
                          >
                            {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {passwordMsg && (
                      <div className={`text-sm px-4 py-3 rounded-xl ${
                        passwordMsg.includes('successfully') 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {passwordMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                    >
                      <Key className="w-4 h-4" />
                      Change Password
                    </button>
                  </form>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-foreground-primary">Preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground-secondary mb-2">Theme</label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences(p => ({ ...p, theme: e.target.value as 'dark' | 'light' | 'auto' }))}
                        className="w-full px-4 py-3 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground-secondary mb-2">Privacy</label>
                      <select
                        value={preferences.privacy}
                        onChange={(e) => setPreferences(p => ({ ...p, privacy: e.target.value as 'public' | 'private' | 'friends' }))}
                        className="w-full px-4 py-3 rounded-xl bg-background-elevated/50 border border-white/10 text-foreground-primary focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-foreground-secondary">Notifications</label>
                        <p className="text-xs text-foreground-muted">Receive email notifications</p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, notifications: !p.notifications }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          preferences.notifications ? 'bg-indigo-500' : 'bg-background-elevated'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-foreground-primary">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-background-elevated/30 rounded-xl border border-white/10">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground-primary">Added &quot;The Shawshank Redemption&quot; to favorites</p>
                        <p className="text-xs text-foreground-muted">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-background-elevated/30 rounded-xl border border-white/10">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground-primary">Watched &quot;Inception&quot;</p>
                        <p className="text-xs text-foreground-muted">1 day ago</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-background-elevated/30 rounded-xl border border-white/10">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground-primary">Rated &quot;Pulp Fiction&quot; 5 stars</p>
                        <p className="text-xs text-foreground-muted">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}