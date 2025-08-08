"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Video, 
  TrendingUp, 
  Activity, 
  Settings, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  BarChart3,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { VideoUploadModal } from "@/components/admin/video-upload-modal";

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 1247,
  totalVideos: 892,
  totalViews: 45678,
  activeUsers: 342,
  newUsers: 23,
  newVideos: 8,
  viewsGrowth: 12.5,
  userGrowth: -2.3
};

const mockRecentActivity = [
  {
    id: 1,
    type: "user_registered",
    user: "John Doe",
    email: "john@example.com",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: 2,
    type: "video_uploaded",
    user: "Admin",
    video: "The Matrix Reloaded",
    time: "15 minutes ago",
    status: "success"
  },
  {
    id: 3,
    type: "user_login",
    user: "Jane Smith",
    email: "jane@example.com",
    time: "1 hour ago",
    status: "info"
  },
  {
    id: 4,
    type: "video_deleted",
    user: "Admin",
    video: "Old Movie Title",
    time: "2 hours ago",
    status: "warning"
  },
  {
    id: 5,
    type: "system_error",
    user: "System",
    message: "Database connection timeout",
    time: "3 hours ago",
    status: "error"
  }
];

const mockTopVideos = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    views: 15420,
    rating: 9.3,
    genre: "Drama",
    status: "active"
  },
  {
    id: 2,
    title: "Inception",
    views: 12350,
    rating: 8.8,
    genre: "Sci-Fi",
    status: "active"
  },
  {
    id: 3,
    title: "Pulp Fiction",
    views: 9870,
    rating: 8.9,
    genre: "Crime",
    status: "active"
  },
  {
    id: 4,
    title: "The Dark Knight",
    views: 8760,
    rating: 9.0,
    genre: "Action",
    status: "pending"
  },
  {
    id: 5,
    title: "Fight Club",
    views: 7650,
    rating: 8.8,
    genre: "Drama",
    status: "active"
  }
];

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2 hours ago"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-10",
    lastLogin: "1 hour ago"
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
    joinDate: "2024-01-20",
    lastLogin: "3 days ago"
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-01-25",
    lastLogin: "30 minutes ago"
  }
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-400 bg-green-400/10";
      case "error": return "text-red-400 bg-red-400/10";
      case "warning": return "text-yellow-400 bg-yellow-400/10";
      case "info": return "text-blue-400 bg-blue-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4" />;
      case "error": return <XCircle className="w-4 h-4" />;
      case "warning": return <AlertCircle className="w-4 h-4" />;
      case "info": return <Eye className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Manage your video library system</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "videos", label: "Videos", icon: Video },
                { id: "users", label: "Users", icon: Users },
                { id: "analytics", label: "Analytics", icon: TrendingUp },
                { id: "activity", label: "Activity", icon: Activity },
                { id: "settings", label: "Settings", icon: Settings }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    selectedTab === item.id
                      ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-white border border-red-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-400 text-sm font-medium">Total Users</p>
                      <p className="text-2xl font-bold text-white">{mockStats.totalUsers.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {mockStats.userGrowth > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-green-400" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`text-sm ${mockStats.userGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {Math.abs(mockStats.userGrowth)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 text-sm font-medium">Total Videos</p>
                      <p className="text-2xl font-bold text-white">{mockStats.totalVideos.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">+{mockStats.newVideos}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Video className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-2xl p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-sm font-medium">Total Views</p>
                      <p className="text-2xl font-bold text-white">{mockStats.totalViews.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">+{mockStats.viewsGrowth}%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-400 text-sm font-medium">Active Users</p>
                      <p className="text-2xl font-bold text-white">{mockStats.activeUsers.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">+{mockStats.newUsers}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Top Videos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                          {getStatusIcon(activity.status)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">
                            {activity.type === "user_registered" && `${activity.user} registered`}
                            {activity.type === "video_uploaded" && `${activity.video} uploaded`}
                            {activity.type === "user_login" && `${activity.user} logged in`}
                            {activity.type === "video_deleted" && `${activity.video} deleted`}
                            {activity.type === "system_error" && activity.message}
                          </p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Videos */}
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Top Videos</h3>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {mockTopVideos.map((video) => (
                      <div key={video.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{video.title}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {video.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400" />
                              {video.rating}
                            </span>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {video.genre}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "videos" && (
            <div className="space-y-6">
              {/* Video Management Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Video Management</h2>
                  <p className="text-gray-400">Manage and organize your video library</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search videos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
                    />
                  </div>
                                     <Button 
                     onClick={() => setIsUploadModalOpen(true)}
                     className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                   >
                     <Plus className="w-4 h-4 mr-2" />
                     Add Video
                   </Button>
                </div>
              </div>

              {/* Video Filters */}
              <div className="flex items-center gap-4">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("all")}
                  className={selectedFilter === "all" ? "bg-red-500 hover:bg-red-600" : "border-white/20 text-white hover:bg-white/10"}
                >
                  All Videos
                </Button>
                <Button
                  variant={selectedFilter === "active" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("active")}
                  className={selectedFilter === "active" ? "bg-red-500 hover:bg-red-600" : "border-white/20 text-white hover:bg-white/10"}
                >
                  Active
                </Button>
                <Button
                  variant={selectedFilter === "pending" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("pending")}
                  className={selectedFilter === "pending" ? "bg-red-500 hover:bg-red-600" : "border-white/20 text-white hover:bg-white/10"}
                >
                  Pending
                </Button>
                <Button
                  variant={selectedFilter === "archived" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("archived")}
                  className={selectedFilter === "archived" ? "bg-red-500 hover:bg-red-600" : "border-white/20 text-white hover:bg-white/10"}
                >
                  Archived
                </Button>
              </div>

              {/* Video Table */}
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-white font-semibold">Video</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Genre</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Views</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Rating</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {mockTopVideos.map((video) => (
                        <tr key={video.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                <Video className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-medium">{video.title}</p>
                                <p className="text-gray-400 text-sm">ID: {video.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="secondary" className="capitalize">
                              {video.genre}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-white">{video.views.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white">{video.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={video.status === "active" ? "default" : "secondary"}
                              className={video.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                            >
                              {video.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "users" && (
            <div className="space-y-6">
              {/* User Management Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">User Management</h2>
                  <p className="text-gray-400">Manage user accounts and permissions</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
                    />
                  </div>
                                     <Button 
                     onClick={() => setIsUploadModalOpen(true)}
                     className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                   >
                     <Plus className="w-4 h-4 mr-2" />
                     Add User
                   </Button>
                </div>
              </div>

              {/* User Table */}
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-white font-semibold">User</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Role</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Join Date</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Last Login</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-white font-medium">{user.name}</p>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={user.role === "admin" ? "default" : "secondary"}
                              className={user.role === "admin" ? "bg-red-500 hover:bg-red-600" : ""}
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={user.status === "active" ? "default" : "secondary"}
                              className={user.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-white">{user.joinDate}</td>
                          <td className="px-6 py-4 text-gray-400">{user.lastLogin}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h2>
                <p className="text-gray-400">Comprehensive insights and metrics</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">View Trends</h3>
                  <div className="h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                    <p className="text-gray-400">Chart Component Placeholder</p>
                  </div>
                </div>
                
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">User Growth</h3>
                  <div className="h-64 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl flex items-center justify-center">
                    <p className="text-gray-400">Chart Component Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "activity" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">System Activity</h2>
                <p className="text-gray-400">Monitor system events and user actions</p>
              </div>
              
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {activity.type === "user_registered" && `${activity.user} registered`}
                          {activity.type === "video_uploaded" && `${activity.video} uploaded`}
                          {activity.type === "user_login" && `${activity.user} logged in`}
                          {activity.type === "video_deleted" && `${activity.video} deleted`}
                          {activity.type === "system_error" && activity.message}
                        </p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">System Settings</h2>
                <p className="text-gray-400">Configure system preferences and security</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Auto-approve videos</span>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Email notifications</span>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Maintenance mode</span>
                      <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                        Disabled
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Two-factor authentication</span>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Session timeout</span>
                      <span className="text-gray-400">30 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Password policy</span>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
                 </main>
       </div>

       {/* Video Upload Modal */}
       <VideoUploadModal 
         isOpen={isUploadModalOpen}
         onClose={() => setIsUploadModalOpen(false)}
       />
     </div>
   );
 }
