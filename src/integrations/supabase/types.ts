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
      activity_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          new_value: Json | null
          old_value: Json | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          new_value?: Json | null
          old_value?: Json | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          new_value?: Json | null
          old_value?: Json | null
        }
        Relationships: []
      }
      candidate_activity_log: {
        Row: {
          action: string
          application_id: string
          created_at: string
          details: string | null
          id: string
        }
        Insert: {
          action: string
          application_id: string
          created_at?: string
          details?: string | null
          id?: string
        }
        Update: {
          action?: string
          application_id?: string
          created_at?: string
          details?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_activity_log_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "internship_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_notes: {
        Row: {
          application_id: string
          created_at: string
          created_by: string | null
          id: string
          note: string
        }
        Insert: {
          application_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          note: string
        }
        Update: {
          application_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "internship_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_scores: {
        Row: {
          application_id: string
          communication: number
          created_at: string
          culture_fit: number
          id: string
          learning_ability: number
          portfolio_score: number
          problem_solving: number
          resume_quality: number
          skills: number
          total_score: number
          updated_at: string
        }
        Insert: {
          application_id: string
          communication?: number
          created_at?: string
          culture_fit?: number
          id?: string
          learning_ability?: number
          portfolio_score?: number
          problem_solving?: number
          resume_quality?: number
          skills?: number
          total_score?: number
          updated_at?: string
        }
        Update: {
          application_id?: string
          communication?: number
          created_at?: string
          culture_fit?: number
          id?: string
          learning_ability?: number
          portfolio_score?: number
          problem_solving?: number
          resume_quality?: number
          skills?: number
          total_score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_scores_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "internship_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          acquisition_source: Database["public"]["Enums"]["acquisition_source"]
          business_name: string
          business_type: Database["public"]["Enums"]["business_type"]
          city: string | null
          created_at: string
          district: string | null
          email: string | null
          gst: string | null
          id: string
          notes: string | null
          owner_name: string
          partner_id: string | null
          phone: string
          priority_flag: boolean | null
          risk_tag: string | null
          state: string | null
          status: Database["public"]["Enums"]["customer_status"]
          updated_at: string
        }
        Insert: {
          acquisition_source?: Database["public"]["Enums"]["acquisition_source"]
          business_name: string
          business_type?: Database["public"]["Enums"]["business_type"]
          city?: string | null
          created_at?: string
          district?: string | null
          email?: string | null
          gst?: string | null
          id?: string
          notes?: string | null
          owner_name: string
          partner_id?: string | null
          phone: string
          priority_flag?: boolean | null
          risk_tag?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["customer_status"]
          updated_at?: string
        }
        Update: {
          acquisition_source?: Database["public"]["Enums"]["acquisition_source"]
          business_name?: string
          business_type?: Database["public"]["Enums"]["business_type"]
          city?: string | null
          created_at?: string
          district?: string | null
          email?: string | null
          gst?: string | null
          id?: string
          notes?: string | null
          owner_name?: string
          partner_id?: string | null
          phone?: string
          priority_flag?: boolean | null
          risk_tag?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["customer_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_requests: {
        Row: {
          business_name: string | null
          city: string | null
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          phone: string
          product: string
          request_type: string
          status: string
          updated_at: string
        }
        Insert: {
          business_name?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          phone: string
          product: string
          request_type?: string
          status?: string
          updated_at?: string
        }
        Update: {
          business_name?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string
          product?: string
          request_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string
          date: string
          description: string | null
          id: string
          product_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          product_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          product_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      franchise_applications: {
        Row: {
          city: string
          created_at: string
          district: string | null
          email: string | null
          experience: string | null
          id: string
          investment_ready: boolean | null
          message: string | null
          name: string
          phone: string
          state: string | null
          status: string
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          district?: string | null
          email?: string | null
          experience?: string | null
          id?: string
          investment_ready?: boolean | null
          message?: string | null
          name: string
          phone: string
          state?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          district?: string | null
          email?: string | null
          experience?: string | null
          id?: string
          investment_ready?: boolean | null
          message?: string | null
          name?: string
          phone?: string
          state?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      internship_applications: {
        Row: {
          college: string
          created_at: string
          degree: string
          email: string
          full_name: string
          graduation_year: number
          id: string
          message: string | null
          phone: string
          pipeline_stage: string
          portfolio_url: string | null
          role_applied: string
          status: string
          updated_at: string
        }
        Insert: {
          college: string
          created_at?: string
          degree: string
          email: string
          full_name: string
          graduation_year: number
          id?: string
          message?: string | null
          phone: string
          pipeline_stage?: string
          portfolio_url?: string | null
          role_applied: string
          status?: string
          updated_at?: string
        }
        Update: {
          college?: string
          created_at?: string
          degree?: string
          email?: string
          full_name?: string
          graduation_year?: number
          id?: string
          message?: string | null
          phone?: string
          pipeline_stage?: string
          portfolio_url?: string | null
          role_applied?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      interview_feedback: {
        Row: {
          application_id: string
          communication: number
          confidence: number
          created_at: string
          decision: string
          id: string
          interview_id: string | null
          learning_ability: number
          notes: string | null
          skills: number
          updated_at: string
        }
        Insert: {
          application_id: string
          communication?: number
          confidence?: number
          created_at?: string
          decision?: string
          id?: string
          interview_id?: string | null
          learning_ability?: number
          notes?: string | null
          skills?: number
          updated_at?: string
        }
        Update: {
          application_id?: string
          communication?: number
          confidence?: number
          created_at?: string
          decision?: string
          id?: string
          interview_id?: string | null
          learning_ability?: number
          notes?: string | null
          skills?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_feedback_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "internship_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_feedback_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interview_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_schedules: {
        Row: {
          application_id: string
          created_at: string
          email_sent: boolean
          id: string
          interview_date: string
          interview_time: string
          interview_type: string
          interviewer_name: string
          meeting_link: string | null
          reminder_30_sent: boolean
          reminder_5_sent: boolean
          status: string
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          email_sent?: boolean
          id?: string
          interview_date: string
          interview_time: string
          interview_type?: string
          interviewer_name?: string
          meeting_link?: string | null
          reminder_30_sent?: boolean
          reminder_5_sent?: boolean
          status?: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          email_sent?: boolean
          id?: string
          interview_date?: string
          interview_time?: string
          interview_type?: string
          interviewer_name?: string
          meeting_link?: string | null
          reminder_30_sent?: boolean
          reminder_5_sent?: boolean
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_schedules_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "internship_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          id: string
          language: string | null
          page_path: string
          page_title: string | null
          referrer: string | null
          screen_height: number | null
          screen_width: number | null
          session_id: string | null
          user_agent: string | null
          visitor_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          language?: string | null
          page_path: string
          page_title?: string | null
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          language?: string | null
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      partner_payouts: {
        Row: {
          amount: number
          created_at: string
          id: string
          partner_id: string
          payout_date: string | null
          status: Database["public"]["Enums"]["payout_status"]
          subscription_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          partner_id: string
          payout_date?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
          subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          partner_id?: string
          payout_date?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
          subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_payouts_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_payouts_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          allowed_products: string[] | null
          assigned_cities: string[] | null
          city: string | null
          created_at: string
          district: string | null
          id: string
          name: string
          partner_type: Database["public"]["Enums"]["partner_type"]
          phone: string | null
          revenue_share_percent: number
          status: Database["public"]["Enums"]["partner_status"]
          updated_at: string
        }
        Insert: {
          allowed_products?: string[] | null
          assigned_cities?: string[] | null
          city?: string | null
          created_at?: string
          district?: string | null
          id?: string
          name: string
          partner_type?: Database["public"]["Enums"]["partner_type"]
          phone?: string | null
          revenue_share_percent?: number
          status?: Database["public"]["Enums"]["partner_status"]
          updated_at?: string
        }
        Update: {
          allowed_products?: string[] | null
          assigned_cities?: string[] | null
          city?: string | null
          created_at?: string
          district?: string | null
          id?: string
          name?: string
          partner_type?: Database["public"]["Enums"]["partner_type"]
          phone?: string | null
          revenue_share_percent?: number
          status?: Database["public"]["Enums"]["partner_status"]
          updated_at?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          billing_cycle: Database["public"]["Enums"]["billing_cycle"]
          created_at: string
          features: Json | null
          grace_days: number
          id: string
          name: string
          price: number
          product_id: string
          trial_days: number
          updated_at: string
        }
        Insert: {
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"]
          created_at?: string
          features?: Json | null
          grace_days?: number
          id?: string
          name: string
          price: number
          product_id: string
          trial_days?: number
          updated_at?: string
        }
        Update: {
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"]
          created_at?: string
          features?: Json | null
          grace_days?: number
          id?: string
          name?: string
          price?: number
          product_id?: string
          trial_days?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          id: string
          name: string
          status: Database["public"]["Enums"]["product_status"]
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          name: string
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string
          customer_id: string
          end_date: string
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          plan_id: string
          product_id: string
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          customer_id: string
          end_date: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          plan_id: string
          product_id: string
          start_date: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          customer_id?: string
          end_date?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          plan_id?: string
          product_id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          assigned_partner_id: string | null
          created_at: string
          customer_id: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          subscription_id: string | null
          ticket_type: Database["public"]["Enums"]["ticket_type"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_partner_id?: string | null
          created_at?: string
          customer_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subscription_id?: string | null
          ticket_type?: Database["public"]["Enums"]["ticket_type"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_partner_id?: string | null
          created_at?: string
          customer_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subscription_id?: string | null
          ticket_type?: Database["public"]["Enums"]["ticket_type"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_partner_id_fkey"
            columns: ["assigned_partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      acquisition_source: "direct" | "partner" | "referral"
      app_role: "admin"
      billing_cycle: "monthly" | "quarterly" | "half_yearly" | "yearly"
      business_type: "dealer" | "grocery" | "restaurant" | "clothing" | "other"
      customer_status: "trial" | "active" | "grace" | "suspended" | "churned"
      expense_category:
        | "server_infra"
        | "marketing"
        | "partner_payouts"
        | "salaries"
        | "office_travel"
        | "misc"
      partner_status: "active" | "inactive"
      partner_type: "sales" | "implementor" | "franchise"
      payment_status: "pending" | "paid" | "overdue" | "refunded"
      payout_status: "pending" | "paid"
      product_status: "live" | "beta" | "disabled"
      subscription_status:
        | "trial"
        | "active"
        | "grace_period"
        | "suspended"
        | "cancelled"
        | "expired"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      ticket_type: "support" | "internal" | "payment"
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
    Enums: {
      acquisition_source: ["direct", "partner", "referral"],
      app_role: ["admin"],
      billing_cycle: ["monthly", "quarterly", "half_yearly", "yearly"],
      business_type: ["dealer", "grocery", "restaurant", "clothing", "other"],
      customer_status: ["trial", "active", "grace", "suspended", "churned"],
      expense_category: [
        "server_infra",
        "marketing",
        "partner_payouts",
        "salaries",
        "office_travel",
        "misc",
      ],
      partner_status: ["active", "inactive"],
      partner_type: ["sales", "implementor", "franchise"],
      payment_status: ["pending", "paid", "overdue", "refunded"],
      payout_status: ["pending", "paid"],
      product_status: ["live", "beta", "disabled"],
      subscription_status: [
        "trial",
        "active",
        "grace_period",
        "suspended",
        "cancelled",
        "expired",
      ],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
      ticket_type: ["support", "internal", "payment"],
    },
  },
} as const
