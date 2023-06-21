export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
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
          icon: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      categorizations: {
        Row: {
          category_id: string
          tool_id: string
        }
        Insert: {
          category_id: string
          tool_id: string
        }
        Update: {
          category_id?: string
          tool_id?: string
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
            foreignKeyName: "categorizations_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["category_id"]
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
          category_id: string
          stack_id: string
          tool_id: string
        }
        Insert: {
          category_id: string
          stack_id: string
          tool_id: string
        }
        Update: {
          category_id?: string
          stack_id?: string
          tool_id?: string
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
            foreignKeyName: "picks_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["category_id"]
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
          id: string
        }
        Insert: {
          created_at?: string
          id?: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      stacks: {
        Row: {
          created_at: string
          featured: boolean
          id: string
          name: string | null
          slug: string
          twitter: string | null
          twitter_image_url: string | null
          updated_at: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          featured?: boolean
          id?: string
          name?: string | null
          slug?: string
          twitter?: string | null
          twitter_image_url?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          featured?: boolean
          id?: string
          name?: string | null
          slug?: string
          twitter?: string | null
          twitter_image_url?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stacks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      stars: {
        Row: {
          category_id: string | null
          id: string
          stack_id: string | null
          tool_id: string | null
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          id?: string
          stack_id?: string | null
          tool_id?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          id?: string
          stack_id?: string | null
          tool_id?: string | null
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
            foreignKeyName: "stars_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "tools_view"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "stars_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_stack_id_fkey"
            columns: ["stack_id"]
            referencedRelation: "stacks_view"
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
      tools: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
          slug: string
          twitter: string | null
          website: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          slug: string
          twitter?: string | null
          website?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          twitter?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      categories_view: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string | null
          name: string | null
          slug: string | null
          tools: number | null
        }
        Relationships: []
      }
      picks_view: {
        Row: {
          category_name: string | null
          category_slug: string | null
          stack_id: string | null
          tool_color: string | null
          tool_icon: string | null
          tool_name: string | null
          tool_slug: string | null
          tool_website: string | null
        }
        Relationships: [
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
          }
        ]
      }
      stacks_view: {
        Row: {
          created_at: string | null
          featured: boolean | null
          id: string | null
          name: string | null
          slug: string | null
          starred: boolean | null
          stars: number | null
          twitter: string | null
          twitter_image_url: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stacks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tools_view: {
        Row: {
          all_picks: number | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          color: string | null
          created_at: string | null
          icon: string | null
          id: string | null
          name: string | null
          slug: string | null
          twitter: string | null
          user_picks: number | null
          website: string | null
        }
        Relationships: []
      }
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
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
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

