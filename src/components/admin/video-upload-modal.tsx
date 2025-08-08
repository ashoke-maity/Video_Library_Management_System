"use client";

import { useState, useRef } from "react";
import { 
  X, 
  Upload, 
  FileVideo, 
  Image, 
  Calendar, 
  Clock, 
  Star,
  Tag,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoUploadModal({ isOpen, onClose }: VideoUploadModalProps) {
  const [uploadStep, setUploadStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    year: "",
    duration: "",
    rating: "",
    coverColor: "#6366f1"
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Simulate file processing
    console.log("Selected file:", file);
    setUploadStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          setTimeout(() => {
            onClose();
            setUploadStep(1);
            setUploadProgress(0);
            setUploadComplete(false);
            setFormData({
              title: "",
              description: "",
              genre: "",
              year: "",
              duration: "",
              rating: "",
              coverColor: "#6366f1"
            });
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Upload New Video</h2>
              <p className="text-gray-400 text-sm">Add a new video to your library</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {uploadStep === 1 && (
            <div className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  isDragging
                    ? "border-red-500 bg-red-500/10"
                    : "border-white/20 hover:border-white/40"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileVideo className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isDragging ? "Drop your video here" : "Upload Video File"}
                </h3>
                <p className="text-gray-400 mb-6">
                  Drag and drop your video file here, or click to browse
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* Supported Formats */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-2">Supported Formats</h4>
                <div className="flex flex-wrap gap-2">
                  {["MP4", "AVI", "MOV", "MKV", "WMV"].map((format) => (
                    <Badge key={format} variant="secondary" className="text-xs">
                      {format}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {uploadStep === 2 && (
            <div className="space-y-6">
              {/* Video Preview */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <FileVideo className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">video_file.mp4</p>
                    <p className="text-gray-400 text-sm">2.5 GB • Ready to upload</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Video Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter video title"
                    className="bg-black/20 border-white/10 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Genre</label>
                  <select
                    value={formData.genre}
                    onChange={(e) => handleInputChange("genre", e.target.value)}
                    className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-3 py-2 focus:border-red-500/50 focus:ring-red-500/20"
                  >
                    <option value="">Select genre</option>
                    <option value="action">Action</option>
                    <option value="comedy">Comedy</option>
                    <option value="drama">Drama</option>
                    <option value="horror">Horror</option>
                    <option value="sci-fi">Sci-Fi</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Release Year</label>
                  <Input
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    placeholder="2024"
                    className="bg-black/20 border-white/10 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Duration</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="2h 15m"
                    className="bg-black/20 border-white/10 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Rating</label>
                  <Input
                    value={formData.rating}
                    onChange={(e) => handleInputChange("rating", e.target.value)}
                    placeholder="8.5"
                    className="bg-black/20 border-white/10 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Cover Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.coverColor}
                      onChange={(e) => handleInputChange("coverColor", e.target.value)}
                      className="w-12 h-12 rounded-lg border border-white/10 cursor-pointer"
                    />
                    <span className="text-gray-400 text-sm">Choose cover color</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter video description..."
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:border-red-500/50 focus:ring-red-500/20 resize-none"
                />
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Uploading video...</span>
                    <span className="text-white font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Complete */}
              {uploadComplete && (
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Video uploaded successfully!</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <Button
                  onClick={handleUpload}
                  disabled={isUploading || !formData.title}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:opacity-50"
                >
                  {isUploading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Video
                    </div>
                  )}
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
