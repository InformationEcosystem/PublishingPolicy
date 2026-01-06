export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          id: string
          is_public: boolean | null
          logo_url: string | null
          name: string
          sector: string
          slug: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          logo_url?: string | null
          name: string
          sector: string
          slug: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          logo_url?: string | null
          name?: string
          sector?: string
          slug?: string
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
export type CommitmentTemplate = Database['public']['Tables']['commitment_templates']['Row']

// New wizard section types
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

export type CertificationTier = 'declared' | 'committed' | 'verified' | 'exemplary'

// Expanded sector list
export type Sector =
  // Media & Journalism
  | 'newsroom' | 'local_news' | 'digital_media' | 'newsletter' | 'podcast' | 'documentary'
  // Academic & Research
  | 'academic_journal' | 'university' | 'research_institution' | 'think_tank'
  // Government & Public Sector
  | 'federal_agency' | 'state_government' | 'municipal' | 'school_district' | 'public_library'
  // Corporate & Professional
  | 'corporate_comms' | 'pr_agency' | 'internal_comms' | 'industry_association'
  // Platform & Technology
  | 'social_platform' | 'content_platform' | 'community_forum' | 'ai_content'
  // Nonprofit & Advocacy
  | 'nonprofit' | 'foundation' | 'advocacy_org' | 'religious_org'
  // Individual & Creator
  | 'independent_journalist' | 'blogger' | 'consultant' | 'creator'
  // Legacy compatibility
  | 'journalism' | 'academia' | 'corporate' | 'platform' | 'freelance'

export type SectorCategory =
  | 'Media & Journalism'
  | 'Academic & Research'
  | 'Government & Public'
  | 'Corporate & Professional'
  | 'Platform & Technology'
  | 'Nonprofit & Advocacy'
  | 'Individual & Creator'
