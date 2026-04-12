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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          client_email: string
          client_name: string
          client_phone: string
          created_at: string
          id: string
          message: string | null
          package: string
          status: string
          venue: string | null
          wedding_date: string
        }
        Insert: {
          client_email: string
          client_name: string
          client_phone: string
          created_at?: string
          id?: string
          message?: string | null
          package: string
          status?: string
          venue?: string | null
          wedding_date: string
        }
        Update: {
          client_email?: string
          client_name?: string
          client_phone?: string
          created_at?: string
          id?: string
          message?: string | null
          package?: string
          status?: string
          venue?: string | null
          wedding_date?: string
        }
        Relationships: []
      }
      generated_designs: {
        Row: {
          created_at: string
          custom_message: string | null
          event_date: string | null
          event_type: string
          generated_image_url: string | null
          id: string
          location: string | null
          names: string | null
          prompt_used: string | null
          style: string
          uploaded_images: string[]
          user_identifier: string
        }
        Insert: {
          created_at?: string
          custom_message?: string | null
          event_date?: string | null
          event_type: string
          generated_image_url?: string | null
          id?: string
          location?: string | null
          names?: string | null
          prompt_used?: string | null
          style: string
          uploaded_images?: string[]
          user_identifier: string
        }
        Update: {
          created_at?: string
          custom_message?: string | null
          event_date?: string | null
          event_type?: string
          generated_image_url?: string | null
          id?: string
          location?: string | null
          names?: string | null
          prompt_used?: string | null
          style?: string
          uploaded_images?: string[]
          user_identifier?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          category: string
          created_at: string
          file_path: string
          folder_id: string | null
          id: string
          title: string
          type: string
        }
        Insert: {
          category?: string
          created_at?: string
          file_path: string
          folder_id?: string | null
          id?: string
          title: string
          type: string
        }
        Update: {
          category?: string
          created_at?: string
          file_path?: string
          folder_id?: string | null
          id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "wedding_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          created_at: string
          credits: number
          id: string
          updated_at: string
          user_identifier: string
        }
        Insert: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_identifier: string
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_identifier?: string
        }
        Relationships: []
      }
      wedding_folders: {
        Row: {
          access_code: string | null
          cover_image: string | null
          created_at: string
          id: string
          is_public: boolean
          name: string
          slug: string
        }
        Insert: {
          access_code?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_public?: boolean
          name: string
          slug: string
        }
        Update: {
          access_code?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_public?: boolean
          name?: string
          slug?: string
        }
        Relationships: []
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
