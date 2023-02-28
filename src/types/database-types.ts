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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
