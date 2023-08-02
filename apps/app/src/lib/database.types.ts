export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          deleted_at: string | null
          icon_name: string
          id: string
          is_coming_soon: boolean
          last_modified_at: string
          name: string
          server_created_at: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          icon_name: string
          id?: string
          is_coming_soon?: boolean
          last_modified_at?: string
          name: string
          server_created_at?: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          icon_name?: string
          id?: string
          is_coming_soon?: boolean
          last_modified_at?: string
          name?: string
          server_created_at?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      categorizations: {
        Row: {
          category_id: string | null
          created_at: string
          deleted_at: string | null
          id: string
          last_modified_at: string
          server_created_at: string
          slug: string
          tool_id: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          server_created_at?: string
          slug: string
          tool_id?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          server_created_at?: string
          slug?: string
          tool_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorizations_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorizations_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorizations_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorizations_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["id"]
          }
        ]
      }
      picks: {
        Row: {
          category_id: string | null
          created_at: string
          deleted_at: string | null
          id: string
          is_featured: boolean
          last_modified_at: string
          server_created_at: string
          stack_id: string | null
          tool_id: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_featured?: boolean
          last_modified_at?: string
          server_created_at?: string
          stack_id?: string | null
          tool_id?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_featured?: boolean
          last_modified_at?: string
          server_created_at?: string
          stack_id?: string | null
          tool_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "picks_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "sync_stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          image: string | null
          is_featured: boolean
          last_modified_at: string
          name: string | null
          primary_stack_id: string | null
          server_created_at: string
          slug: string
          twitter: string | null
          twitter_image_url: string | null
          updated_at: string
          user_id: string | null
          website: string | null
          youtube: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          is_featured?: boolean
          last_modified_at?: string
          name?: string | null
          primary_stack_id?: string | null
          server_created_at?: string
          slug: string
          twitter?: string | null
          twitter_image_url?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
          youtube?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          is_featured?: boolean
          last_modified_at?: string
          name?: string | null
          primary_stack_id?: string | null
          server_created_at?: string
          slug?: string
          twitter?: string | null
          twitter_image_url?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
          youtube?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_primary_stack_id_fkey"
            columns: ["primary_stack_id"]
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_primary_stack_id_fkey"
            columns: ["primary_stack_id"]
            referencedRelation: "stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_primary_stack_id_fkey"
            columns: ["primary_stack_id"]
            referencedRelation: "sync_stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      stack_type_categories: {
        Row: {
          category_id: string | null
          created_at: string
          deleted_at: string | null
          id: string
          last_modified_at: string
          server_created_at: string
          slug: string
          stack_type_id: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          server_created_at?: string
          slug: string
          stack_type_id?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          server_created_at?: string
          slug?: string
          stack_type_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stack_type_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_type_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_type_categories_stack_type_id_fkey"
            columns: ["stack_type_id"]
            referencedRelation: "stack_types"
            referencedColumns: ["id"]
          }
        ]
      }
      stack_types: {
        Row: {
          created_at: string
          deleted_at: string | null
          icon_name: string
          id: string
          is_coming_soon: boolean
          last_modified_at: string
          name: string
          server_created_at: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          icon_name: string
          id?: string
          is_coming_soon?: boolean
          last_modified_at?: string
          name: string
          server_created_at?: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          icon_name?: string
          id?: string
          is_coming_soon?: boolean
          last_modified_at?: string
          name?: string
          server_created_at?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      stacks: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          last_modified_at: string
          profile_id: string | null
          server_created_at: string
          stack_type_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          profile_id?: string | null
          server_created_at?: string
          stack_type_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          profile_id?: string | null
          server_created_at?: string
          stack_type_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stacks_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_stack_type_id_fkey"
            columns: ["stack_type_id"]
            referencedRelation: "stack_types"
            referencedColumns: ["id"]
          }
        ]
      }
      stars: {
        Row: {
          category_id: string | null
          created_at: string
          deleted_at: string | null
          id: string
          last_modified_at: string
          profile_id: string | null
          server_created_at: string
          tool_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          profile_id?: string | null
          server_created_at?: string
          tool_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          profile_id?: string | null
          server_created_at?: string
          tool_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stars_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tool_icons: {
        Row: {
          created_at: string
          deleted_at: string | null
          icon_svg: string | null
          id: string
          last_modified_at: string
          name: string
          server_created_at: string
          slug: string
          tool_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          icon_svg?: string | null
          id?: string
          last_modified_at?: string
          name: string
          server_created_at?: string
          slug: string
          tool_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          icon_svg?: string | null
          id?: string
          last_modified_at?: string
          name?: string
          server_created_at?: string
          slug?: string
          tool_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_icons_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_icons_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["id"]
          }
        ]
      }
      tools: {
        Row: {
          affiliate_link: string | null
          app_store: string | null
          color: string | null
          created_at: string
          deleted_at: string | null
          id: string
          last_modified_at: string
          name: string
          server_created_at: string
          slug: string
          twitter: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          affiliate_link?: string | null
          app_store?: string | null
          color?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          name: string
          server_created_at?: string
          slug: string
          twitter?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          affiliate_link?: string | null
          app_store?: string | null
          color?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          last_modified_at?: string
          name?: string
          server_created_at?: string
          slug?: string
          twitter?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      categories_view: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          icon_name: string | null
          id: string | null
          is_coming_soon: boolean | null
          last_modified_at: string | null
          name: string | null
          number_of_tools: number | null
          server_created_at: string | null
          slug: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      picks_view: {
        Row: {
          category_icon_name: string | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          created_at: string | null
          deleted_at: string | null
          id: string | null
          is_featured: boolean | null
          last_modified_at: string | null
          profile_name: string | null
          profile_slug: string | null
          server_created_at: string | null
          stack_id: string | null
          stack_type_icon_name: string | null
          stack_type_name: string | null
          stack_type_slug: string | null
          tool_color: string | null
          tool_id: string | null
          tool_name: string | null
          tool_slug: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "picks_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "sync_stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_view: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string | null
          image: string | null
          is_featured: boolean | null
          is_starred: boolean | null
          last_modified_at: string | null
          name: string | null
          number_of_stacks: number | null
          number_of_stars: number | null
          primary_stack_id: string | null
          server_created_at: string | null
          slug: string | null
          twitter: string | null
          twitter_image_url: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
          youtube: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_primary_stack_id_fkey"
            columns: ["primary_stack_id"]
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_primary_stack_id_fkey"
            columns: ["primary_stack_id"]
            referencedRelation: "stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_primary_stack_id_fkey"
            columns: ["primary_stack_id"]
            referencedRelation: "sync_stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      stacks_view: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string | null
          last_modified_at: string | null
          number_of_picks: number | null
          profile_id: string | null
          profile_name: string | null
          profile_slug: string | null
          stack_type_icon_name: string | null
          stack_type_id: string | null
          stack_type_name: string | null
          stack_type_slug: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stacks_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_stack_type_id_fkey"
            columns: ["stack_type_id"]
            referencedRelation: "stack_types"
            referencedColumns: ["id"]
          }
        ]
      }
      stars_view: {
        Row: {
          category_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string | null
          last_modified_at: string | null
          profile_id: string | null
          server_created_at: string | null
          tool_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string | null
          last_modified_at?: string | null
          profile_id?: string | null
          server_created_at?: string | null
          tool_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string | null
          last_modified_at?: string | null
          profile_id?: string | null
          server_created_at?: string | null
          tool_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stars_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sync_picks_view: {
        Row: {
          category_icon_name: string | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          created_at: string | null
          deleted_at: string | null
          id: string | null
          is_featured: boolean | null
          last_modified_at: string | null
          profile_name: string | null
          profile_slug: string | null
          server_created_at: string | null
          stack_id: string | null
          stack_type_icon_name: string | null
          stack_type_name: string | null
          stack_type_slug: string | null
          tool_color: string | null
          tool_id: string | null
          tool_name: string | null
          tool_slug: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "picks_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "sync_stacks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["id"]
          }
        ]
      }
      sync_profiles_view: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string | null
          image: string | null
          is_featured: boolean | null
          is_starred: boolean | null
          last_modified_at: string | null
          name: string | null
          number_of_stacks: number | null
          number_of_stars: number | null
          primary_stack_id: string | null
          server_created_at: string | null
          slug: string | null
          twitter: string | null
          twitter_image_url: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
          youtube: string | null
        }
        Relationships: []
      }
      sync_stacks_view: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string | null
          last_modified_at: string | null
          number_of_picks: number | null
          profile_id: string | null
          profile_name: string | null
          profile_slug: string | null
          stack_type_icon_name: string | null
          stack_type_id: string | null
          stack_type_name: string | null
          stack_type_slug: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stacks_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_stack_type_id_fkey"
            columns: ["stack_type_id"]
            referencedRelation: "stack_types"
            referencedColumns: ["id"]
          }
        ]
      }
      tools_view: {
        Row: {
          affiliate_link: string | null
          all_picks: number | null
          app_store: string | null
          color: string | null
          created_at: string | null
          deleted_at: string | null
          id: string | null
          last_modified_at: string | null
          name: string | null
          server_created_at: string | null
          slug: string | null
          updated_at: string | null
          website: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_profile: {
        Args: {
          profile_id: string
          profile_name: string
          profile_slug: string
          profile_created_at: string
          profile_updated_at: string
        }
        Returns: string
      }
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      epoch_to_timestamp: {
        Args: {
          epoch: string
        }
        Returns: string
      }
      pull: {
        Args: {
          last_pulled_at?: number
        }
        Returns: Json
      }
      push: {
        Args: {
          changes: Json
        }
        Returns: undefined
      }
      slug_exists: {
        Args: {
          input_slug: string
        }
        Returns: boolean
      }
      timestamp_to_epoch: {
        Args: {
          ts: string
        }
        Returns: number
      }
      update_profile: {
        Args: {
          profile_id: string
          profile_name: string
          profile_slug: string
          profile_primary_stack_id: string
          profile_updated_at: string
        }
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

