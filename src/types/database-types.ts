export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      level_files: {
        Row: {
          file: Json | null
          id: number
          levelId: number | null
        }
        Insert: {
          file?: Json | null
          id?: number
          levelId?: number | null
        }
        Update: {
          file?: Json | null
          id?: number
          levelId?: number | null
        }
      }
      levels: {
        Row: {
          created_at: string | null
          dislikes: number | null
          id: number
          likes: number | null
          timesPlayed: number
          title: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string | null
          dislikes?: number | null
          id?: number
          likes?: number | null
          timesPlayed?: number
          title?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string | null
          dislikes?: number | null
          id?: number
          likes?: number | null
          timesPlayed?: number
          title?: string | null
          userId?: string | null
        }
      }
      users: {
        Row: {
          avatarURL: string | null
          createdAt: string | null
          email: string | null
          id: number
          nickname: string
          passedLevels: Json | null
          ratedLevels: Json | null
          userId: string
        }
        Insert: {
          avatarURL?: string | null
          createdAt?: string | null
          email?: string | null
          id?: number
          nickname: string
          passedLevels?: Json | null
          ratedLevels?: Json | null
          userId: string
        }
        Update: {
          avatarURL?: string | null
          createdAt?: string | null
          email?: string | null
          id?: number
          nickname?: string
          passedLevels?: Json | null
          ratedLevels?: Json | null
          userId?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_level_times_played: {
        Args: {
          row_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
