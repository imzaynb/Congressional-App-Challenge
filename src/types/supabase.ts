export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          address_id: number | null
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          address_id?: number | null
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          address_id?: number | null
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          }
        ]
      }
      addresses: {
        Row: {
          address: string
          icon_url: string | null
          id: number
          inserted_at: string
          lat: number
          lng: number
        }
        Insert: {
          address: string
          icon_url?: string | null
          id?: number
          inserted_at?: string
          lat: number
          lng: number
        }
        Update: {
          address?: string
          icon_url?: string | null
          id?: number
          inserted_at?: string
          lat?: number
          lng?: number
        }
        Relationships: []
      }
      business: {
        Row: {
          address_id: number | null
          created_at: string
          id: number
          name: string | null
          phone_number: string | null
          picture: string | null
          rating: string | null
          type: string | null
          website: string | null
        }
        Insert: {
          address_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          phone_number?: string | null
          picture?: string | null
          rating?: string | null
          type?: string | null
          website?: string | null
        }
        Update: {
          address_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          phone_number?: string | null
          picture?: string | null
          rating?: string | null
          type?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
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
