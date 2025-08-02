"use client"

import { motion } from "framer-motion"
import { Play, Star, Clock, Heart, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Video {
  id: number
  title: string
  genre: string
  duration: string
  rating: number
  views: string
  thumbnail: string
}

interface Shelf {
  id: number
  title: string
  videos: Video[]
  theme: string
}

interface CinematicSceneProps {
  shelves: Shelf[]
  currentShelf: number
  onVideoClick: (video: Video) => void
  moodTheme: {
    background: string
    accent: string
    particles: string
  }
}

export default function CinematicScene({ 
  shelves, 
  currentShelf, 
  onVideoClick, 
  moodTheme 
}: CinematicSceneProps) {
  const currentShelfData = shelves[currentShelf]

  // Genre color mapping
  const genreColors = {
    "Documentary": "#00ffff",
    "Educational": "#ff6b6b", 
    "Science": "#4ecdc4",
    "Art": "#ffe66d",
    "Technology": "#a8e6cf",
    "Comedy": "#ffaaa5",
    "Horror": "#ff3333",
    "Action": "#ff8c42",
    "Drama": "#6c5ce7"
  }

  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      style={{ 
        perspective: '1200px',
        background: `radial-gradient(ellipse at center, ${moodTheme.accent}10 0%, transparent 70%)`
      }}
    >
      {/* 3D Scene Container */}
      <motion.div
        className="w-full h-full relative"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(5deg) translateZ(0px)`
        }}
        initial={{ opacity: 0, rotateX: -20 }}
        animate={{ opacity: 1, rotateX: 5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-40"
              style={{
                backgroundColor: moodTheme.accent,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                transform: `translateZ(${Math.random() * 300 - 150}px)`
              }}
              animate={{
                y: [0, -200, 0],
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Shelf */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          key={currentShelf}
          initial={{ opacity: 0, rotateY: -30, translateZ: -200 }}
          animate={{ opacity: 1, rotateY: 0, translateZ: 0 }}
          exit={{ opacity: 0, rotateY: 30, translateZ: -200 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Shelf Title */}
          <motion.h2 
            className="text-6xl font-bold text-center mb-16"
            style={{ 
              color: moodTheme.accent,
              textShadow: `0 0 30px ${moodTheme.accent}, 0 0 60px ${moodTheme.accent}40`,
              transform: 'translateZ(100px)'
            }}
            animate={{
              textShadow: [
                `0 0 30px ${moodTheme.accent}, 0 0 60px ${moodTheme.accent}40`,
                `0 0 50px ${moodTheme.accent}, 0 0 100px ${moodTheme.accent}60`,
                `0 0 30px ${moodTheme.accent}, 0 0 60px ${moodTheme.accent}40`
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {currentShelfData?.title}
          </motion.h2>

          {/* 3D Shelf Structure */}
          <div className="relative w-full max-w-7xl h-96">
            {/* Shelf Base */}
            <div 
              className="absolute w-full h-8 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 rounded-lg"
              style={{
                bottom: '50px',
                transform: 'rotateX(75deg) translateZ(4px)',
                boxShadow: `0 0 40px ${moodTheme.accent}60, inset 0 0 20px rgba(0,0,0,0.5)`
              }}
            />
            
            {/* Shelf Back Wall */}
            <div 
              className="absolute w-full h-48 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-t-lg"
              style={{
                bottom: '58px',
                transform: 'translateZ(-80px)',
                boxShadow: `inset 0 0 80px ${moodTheme.accent}30`
              }}
            />

            {/* Neon Shelf Lighting */}
            <div 
              className="absolute w-full h-1 rounded-full"
              style={{
                bottom: '46px',
                backgroundColor: moodTheme.accent,
                boxShadow: `0 0 20px ${moodTheme.accent}, 0 0 40px ${moodTheme.accent}80`,
                transform: 'translateZ(10px)'
              }}
            />

            {/* Video Cases */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-end space-x-8">
              {currentShelfData?.videos.map((video, videoIndex) => (
                <motion.div
                  key={video.id}
                  className="relative group cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `translateZ(${videoIndex * 10}px)`
                  }}
                  initial={{ 
                    opacity: 0, 
                    rotateY: -45, 
                    translateZ: -100,
                    translateY: 100 
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0, 
                    translateZ: videoIndex * 10,
                    translateY: 0 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: videoIndex * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    rotateY: 12,
                    translateZ: 50,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onVideoClick(video)}
                >
                  {/* DVD Case */}
                  <div 
                    className="w-40 h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-600 relative overflow-hidden"
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: `
                        0 20px 40px rgba(0,0,0,0.6), 
                        0 0 30px ${genreColors[video.genre as keyof typeof genreColors] || moodTheme.accent}40,
                        inset 0 0 20px rgba(255,255,255,0.1)
                      `
                    }}
                  >
                    {/* Case Front Cover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-xl"
                      style={{ 
                        transform: 'translateZ(12px)',
                        background: `linear-gradient(135deg, ${genreColors[video.genre as keyof typeof genreColors] || moodTheme.accent}40, ${moodTheme.accent}20)`
                      }}
                    >
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all"
                          whileHover={{ scale: 1.1 }}
                          animate={{
                            boxShadow: [
                              `0 0 20px ${moodTheme.accent}40`,
                              `0 0 40px ${moodTheme.accent}60`,
                              `0 0 20px ${moodTheme.accent}40`
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </motion.div>
                      </div>
                      
                      {/* Video Info Overlay */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                        style={{ transform: 'translateZ(1px)' }}
                      >
                        <h4 className="text-white text-sm font-bold truncate mb-2">{video.title}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                          <Badge 
                            variant="outline" 
                            className="text-xs border-current"
                            style={{ color: genreColors[video.genre as keyof typeof genreColors] || moodTheme.accent }}
                          >
                            {video.genre}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {video.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-yellow-400">{video.rating}</span>
                          </div>
                          <span className="text-xs text-gray-400">{video.views} views</span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" className="flex-1 text-xs h-7">
                            <Play className="w-3 h-3 mr-1" />
                            Play
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Heart className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </motion.div>
                    </div>

                    {/* Case Spine */}
                    <div 
                      className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-l-xl"
                      style={{ transform: 'rotateY(-90deg) translateZ(12px)' }}
                    />

                    {/* Holographic Reflection */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                      style={{
                        transform: 'translateZ(13px)',
                        background: `linear-gradient(45deg, transparent, ${genreColors[video.genre as keyof typeof genreColors] || moodTheme.accent}60, transparent)`
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>

                  {/* Floating Genre Badge */}
                  <motion.div
                    className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold z-10"
                    style={{
                      backgroundColor: genreColors[video.genre as keyof typeof genreColors] || moodTheme.accent,
                      color: 'white',
                      transform: 'translateZ(30px)',
                      boxShadow: `0 0 15px ${genreColors[video.genre as keyof typeof genreColors] || moodTheme.accent}`
                    }}
                    animate={{
                      rotateZ: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {video.genre}
                  </motion.div>

                  {/* Rating Stars */}
                  <motion.div
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full"
                    style={{ transform: 'translateX(-50%) translateZ(20px)' }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(video.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                      />
                    ))}
                    <span className="text-xs text-white ml-1">{video.rating}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Ambient Lighting Effects */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 100%, ${moodTheme.accent}15 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 100%, ${moodTheme.accent}10 0%, transparent 50%)
                `,
                transform: 'translateZ(-40px)'
              }}
            />
          </div>
        </motion.div>

        {/* Floor Reflection */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${moodTheme.accent}05 0%, transparent 100%)`,
            transform: 'rotateX(90deg) translateZ(-20px)',
            transformOrigin: 'bottom'
          }}
        />
      </motion.div>
    </div>
  )
}