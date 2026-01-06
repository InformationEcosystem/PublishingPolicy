export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      commitment_templates: {
        Row: {
          commitment_type: string
          commitment_value: string
          created_at: string | null
          id: string
          malpublish_template: string | null
          sort_order: number
        }
        Insert: {
          commitment_type: string
          commitment_value: string
          created_at?: string | null
          id?: string
          malpublish_template?: string | null
          sort_order?: number
        }
        Update: {
          commitment_type?: string
          commitment_value?: string
          created_at?: string | null
          id?: string
          malpublish_template?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      facets: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          sort_order: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string | null
          dns_verification_code: string | null
          dns_verified_at: string | null
          domain: string | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          logo_url: string | null
          name: string
          sector: string | null
          slug: string
          transparency_status: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          dns_verification_code?: string | null
          dns_verified_at?: string | null
          domain?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          logo_url?: string | null
          name: string
          sector?: string | null
          slug: string
          transparency_status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          dns_verification_code?: string | null
          dns_verified_at?: string | null
          domain?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          logo_url?: string | null
          name?: string
          sector?: string | null
          slug?: string
          transparency_status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      policies: {
        Row: {
          accountability_framework: Json | null
          certification_date: string | null
          certification_tier: string | null
          created_at: string | null
          description: string | null
          edit_token: string | null
          editorial_commitments: Json | null
          id: string
          is_claimed: boolean | null
          is_public: boolean | null
          malpublish_definitions: Json | null
          name: string
          org_id: string | null
          owner_id: string | null
          policy_url: string | null
          published_at: string | null
          publishing_identity: Json | null
          sector: string
          updated_at: string | null
          view_token: string | null
        }
        Insert: {
          accountability_framework?: Json | null
          certification_date?: string | null
          certification_tier?: string | null
          created_at?: string | null
          description?: string | null
          edit_token?: string | null
          editorial_commitments?: Json | null
          id?: string
          is_claimed?: boolean | null
          is_public?: boolean | null
          malpublish_definitions?: Json | null
          name?: string
          org_id?: string | null
          owner_id?: string | null
          policy_url?: string | null
          published_at?: string | null
          publishing_identity?: Json | null
          sector: string
          updated_at?: string | null
          view_token?: string | null
        }
        Update: {
          accountability_framework?: Json | null
          certification_date?: string | null
          certification_tier?: string | null
          created_at?: string | null
          description?: string | null
          edit_token?: string | null
          editorial_commitments?: Json | null
          id?: string
          is_claimed?: boolean | null
          is_public?: boolean | null
          malpublish_definitions?: Json | null
          name?: string
          org_id?: string | null
          owner_id?: string | null
          policy_url?: string | null
          published_at?: string | null
          publishing_identity?: Json | null
          sector?: string
          updated_at?: string | null
          view_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policies_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_guidelines: {
        Row: {
          created_at: string | null
          custom_text: string | null
          guideline_id: string | null
          id: string
          is_selected: boolean | null
          policy_id: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string | null
          custom_text?: string | null
          guideline_id?: string | null
          id?: string
          is_selected?: boolean | null
          policy_id?: string | null
          sort_order: number
        }
        Update: {
          created_at?: string | null
          custom_text?: string | null
          guideline_id?: string | null
          id?: string
          is_selected?: boolean | null
          policy_id?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "policy_guidelines_guideline_id_fkey"
            columns: ["guideline_id"]
            isOneToOne: false
            referencedRelation: "prevention_guidelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_guidelines_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_items: {
        Row: {
          created_at: string | null
          custom_text: string | null
          id: string
          is_selected: boolean | null
          notes: string | null
          policy_id: string | null
          sort_order: number
          standard_item_id: string | null
        }
        Insert: {
          created_at?: string | null
          custom_text?: string | null
          id?: string
          is_selected?: boolean | null
          notes?: string | null
          policy_id?: string | null
          sort_order: number
          standard_item_id?: string | null
        }
        Update: {
          created_at?: string | null
          custom_text?: string | null
          id?: string
          is_selected?: boolean | null
          notes?: string | null
          policy_id?: string | null
          sort_order?: number
          standard_item_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_items_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_items_standard_item_id_fkey"
            columns: ["standard_item_id"]
            isOneToOne: false
            referencedRelation: "standard_items"
            referencedColumns: ["id"]
          },
        ]
      }
      prevention_guidelines: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          sort_order: number
          text: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          sort_order: number
          text: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          sort_order?: number
          text?: string
        }
        Relationships: []
      }
      sector_templates: {
        Row: {
          category: string | null
          created_at: string | null
          default_guidelines: string[] | null
          default_items: string[] | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          default_guidelines?: string[] | null
          default_items?: string[] | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          default_guidelines?: string[] | null
          default_items?: string[] | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      standard_items: {
        Row: {
          category: string
          created_at: string | null
          facet_id: string | null
          id: string
          sort_order: number
          text: string
        }
        Insert: {
          category: string
          created_at?: string | null
          facet_id?: string | null
          id?: string
          sort_order: number
          text: string
        }
        Update: {
          category?: string
          created_at?: string | null
          facet_id?: string | null
          id?: string
          sort_order?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "standard_items_facet_id_fkey"
            columns: ["facet_id"]
            isOneToOne: false
            referencedRelation: "facets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          org_id: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          org_id?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          org_id?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// Custom TypeScript interfaces for wizard JSONB fields
export interface PublishingIdentity {
  organization_name: string
  sector: string
  primary_audience: string
  publishing_mission: string
}

export interface EditorialCommitments {
  sourcing: 'single_verified' | 'two_independent' | 'three_or_more' | 'varies'
  accuracy: 'formal_process' | 'editor_review' | 'self_verified' | 'no_formal'
  transparency: {
    funding: boolean
    ownership: boolean
    corrections: boolean
    editorial_process: boolean
  }
  independence: 'disclosure_policy' | 'recusal_policy' | 'no_formal'
}

export interface AccountabilityFramework {
  correction_timeframe: '24h' | '48h' | '1_week' | 'no_policy'
  feedback_mechanism: ('email' | 'form' | 'public_comment')[]
  accountability_contact: string
  review_schedule: 'quarterly' | 'annually' | 'as_needed'
}

export interface MalpublishDefinition {
  id: string
  text: string
  source_commitment?: string
  is_auto_generated: boolean
  is_custom: boolean
}

export interface CommitmentTemplate {
  id: string
  commitment_type: string
  commitment_value: string
  malpublish_template: string | null
  sort_order: number
}

export type SectorCategory =
  | 'Media & Journalism'
  | 'Academic & Research'
  | 'Government & Public'
  | 'Corporate & Professional'
  | 'Platform & Technology'
  | 'Nonprofit & Advocacy'
  | 'Individual & Creator'
  | 'Other'

// Using Tables<'sector_templates'> for the full type
export type SectorTemplate = Tables<'sector_templates'>

// Convenience type aliases for table rows
export type Policy = Tables<'policies'>
export type Organization = Tables<'organizations'>
export type Facet = Tables<'facets'>
export type StandardItem = Tables<'standard_items'>
export type PreventionGuideline = Tables<'prevention_guidelines'>
