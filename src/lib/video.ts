export type Genre = "all" | "horror" | "comedy" | "sci-fi" | "action" | "drama"
export type ViewMode = "grid" | "list" | "carousel" | "shelf"

export interface Video {
  id: string
  title: string
  description: string
  genre: Exclude<Genre, "all">
  year: number
  duration: string
  rating: number
  watchCount: number
  dateAdded: string
  coverColor: string
  thumbnailUrl?: string
}
