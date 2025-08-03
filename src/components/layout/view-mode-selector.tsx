"use client"

import { Grid3X3, RotateCcw, Layers, List } from "lucide-react"

interface ViewModeSelectorProps {
  viewMode: "grid" | "list" | "carousel" | "shelf"
  onViewModeChange: (mode: "grid" | "list" | "carousel" | "shelf") => void
}

export function ViewModeSelector({ viewMode, onViewModeChange }: ViewModeSelectorProps) {
  const modes = [
    { value: "grid" as const, icon: Grid3X3, label: "Grid" },
    { value: "list" as const, icon: List, label: "List" },
    { value: "carousel" as const, icon: RotateCcw, label: "Carousel" },
    { value: "shelf" as const, icon: Layers, label: "Shelf" },
  ]

  return (
    <div className="flex bg-black/50 rounded-lg p-1 border border-gray-600">
      {modes.map((mode) => {
        const Icon = mode.icon
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
        )
      })}
    </div>
  )
}
