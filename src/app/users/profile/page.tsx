"use client";

import { useState, useRef } from "react";
import { User, Camera, Save, Key } from "lucide-react";

export default function UserProfilePage() {
  // Demo user state (replace with real API integration)
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string }>(() => {
    const userData = localStorage.getItem("user");
    return userData ? { ...JSON.parse(userData), avatar: undefined } : { name: "", email: "", avatar: undefined };
  });
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user.avatar);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");
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
    setUser((prev) => ({ ...prev, name: newName, email: newEmail, avatar: avatarPreview }));
    localStorage.setItem("user", JSON.stringify({ name: newName, email: newEmail }));
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

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-4 py-12">
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-xl flex flex-col items-center mb-10">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user.email[0]?.toUpperCase() || <User className="w-10 h-10" />
            )}
          </div>
          <button
            className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-700 hover:bg-gray-700"
            onClick={() => fileInputRef.current?.click()}
            title="Change profile picture"
          >
            <Camera className="w-5 h-5 text-white" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Profile Info */}
        <div className="w-full mb-8">
          {editing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
                placeholder="Full Name"
              />
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
                placeholder="Email"
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold flex items-center justify-center gap-2"
                  onClick={handleSaveProfile}
                >
                  <Save className="w-4 h-4" /> Save
                </button>
                <button
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
                  onClick={() => setEditing(false)}
                >Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{user.name}</div>
              <div className="text-gray-400">{user.email}</div>
              <button
                className="mt-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold"
                onClick={() => setEditing(true)}
              >Edit Profile</button>
            </div>
          )}
        </div>

        {/* Change Password */}
        <form className="w-full space-y-4" onSubmit={handlePasswordChange}>
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-5 h-5 text-gray-400" />
            <span className="text-lg text-white font-semibold">Change Password</span>
          </div>
          <input
            type="password"
            value={passwords.current}
            onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
            placeholder="Current Password"
          />
          <input
            type="password"
            value={passwords.new}
            onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
            placeholder="New Password"
          />
          <input
            type="password"
            value={passwords.confirm}
            onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
            placeholder="Confirm New Password"
          />
          {passwordMsg && <div className="text-sm text-red-400">{passwordMsg}</div>}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold mt-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}