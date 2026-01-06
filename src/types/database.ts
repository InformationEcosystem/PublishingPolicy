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
      facets: {
        Row: {
          id: string
          name: string
          description: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          sort_order: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      standard_items: {
        Row: {
          id: string
          facet_id: string
          text: string
          category: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          facet_id: string
          text: string
          category: string
          sort_order: number
          created_at?: string
        }
        Update: {
          id?: string
          facet_id?: string
          text?: string
          category?: string
          sort_order?: number
          created_at?: string
        }
      }
      prevention_guidelines: {
        Row: {
          id: string
          text: string
          description: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          description?: string | null
          sort_order: number
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          description?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      sector_templates: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          default_items: string[]
          default_guidelines: string[]
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          default_items?: string[]
          default_guidelines?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          default_items?: string[]
          default_guidelines?: string[]
          created_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          sector: string
          website: string | null
          logo_url: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sector: string
          website?: string | null
          logo_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sector?: string
          website?: string | null
          logo_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      policies: {
        Row: {
          id: string
          org_id: string | null
          owner_id: string | null
          edit_token: string
          view_token: string
          name: string
          description: string | null
          sector: string
          is_public: boolean
          is_claimed: boolean
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          org_id?: string | null
          owner_id?: string | null
          edit_token?: string
          view_token?: string
          name?: string
          description?: string | null
          sector: string
          is_public?: boolean
          is_claimed?: boolean
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          org_id?: string | null
          owner_id?: string | null
          edit_token?: string
          view_token?: string
          name?: string
          description?: string | null
          sector?: string
          is_public?: boolean
          is_claimed?: boolean
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      policy_items: {
        Row: {
          id: string
          policy_id: string
          standard_item_id: string | null
          custom_text: string | null
          is_selected: boolean
          notes: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          policy_id: string
          standard_item_id?: string | null
          custom_text?: string | null
          is_selected?: boolean
          notes?: string | null
          sort_order: number
          created_at?: string
        }
        Update: {
          id?: string
          policy_id?: string
          standard_item_id?: string | null
          custom_text?: string | null
          is_selected?: boolean
          notes?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      policy_guidelines: {
        Row: {
          id: string
          policy_id: string
          guideline_id: string | null
          custom_text: string | null
          is_selected: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          policy_id: string
          guideline_id?: string | null
          custom_text?: string | null
          is_selected?: boolean
          sort_order: number
          created_at?: string
        }
        Update: {
          id?: string
          policy_id?: string
          guideline_id?: string | null
          custom_text?: string | null
          is_selected?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          org_id: string | null
          role: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          org_id?: string | null
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          org_id?: string | null
          role?: string
          created_at?: string
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
  }
}

// Convenience types
export type Facet = Database['public']['Tables']['facets']['Row']
export type StandardItem = Database['public']['Tables']['standard_items']['Row']
export type PreventionGuideline = Database['public']['Tables']['prevention_guidelines']['Row']
export type SectorTemplate = Database['public']['Tables']['sector_templates']['Row']
export type Organization = Database['public']['Tables']['organizations']['Row']
export type Policy = Database['public']['Tables']['policies']['Row']
export type PolicyItem = Database['public']['Tables']['policy_items']['Row']
export type PolicyGuideline = Database['public']['Tables']['policy_guidelines']['Row']
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']

export type Sector = 'journalism' | 'academia' | 'corporate' | 'platform' | 'freelance'
