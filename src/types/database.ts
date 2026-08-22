export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'coach' | 'player' | 'president'
          first_name: string
          last_name: string
          phone?: string
          avatar_url?: string
          team_id?: string
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      teams: {
        Row: {
          id: string
          name: string
          logo_url?: string
          founded_year?: number
          city: string
          stadium?: string
          president_id: string
          coach_id?: string
          league?: string
          division?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['teams']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['teams']['Insert']>
      }
      players: {
        Row: {
          id: string
          user_id: string
          team_id: string
          jersey_number: number
          position: 'goalkeeper' | 'defender' | 'midfielder' | 'forward'
          height?: number
          weight?: number
          preferred_foot: 'left' | 'right' | 'both'
          date_of_birth: string
          nationality: string
          joined_date: string
          contract_until?: string
          market_value?: number
          salary?: number
          is_injured: boolean
          injury_details?: string
          performance_rating: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['players']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['players']['Insert']>
      }
      trainings: {
        Row: {
          id: string
          team_id: string
          title: string
          description?: string
          type: 'tactical' | 'technical' | 'physical' | 'mental' | 'mixed'
          duration_minutes: number
          scheduled_date: string
          scheduled_time: string
          location: string
          coach_id: string
          max_participants?: number
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          focus_areas: string[]
          equipment_needed: string[]
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          weather_notes?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['trainings']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['trainings']['Insert']>
      }
      matches: {
        Row: {
          id: string
          team_id: string
          opponent_name: string
          match_date: string
          match_time: string
          location: string
          is_home: boolean
          competition_type: 'league' | 'cup' | 'friendly' | 'tournament'
          competition_name?: string
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'postponed'
          formation?: string
          weather?: string
          referee?: string
          final_score?: string
          team_goals?: number
          opponent_goals?: number
          result?: 'win' | 'draw' | 'loss'
          notes?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['matches']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['matches']['Insert']>
      }
      financial_records: {
        Row: {
          id: string
          team_id: string
          type: 'income' | 'expense'
          category: 'player_salary' | 'coaching_fee' | 'equipment' | 'facility_rental' | 'travel' | 'medical' | 'registration' | 'sponsorship' | 'merchandise' | 'other'
          amount: number
          currency: string
          description: string
          date: string
          payment_method?: 'cash' | 'bank_transfer' | 'credit_card' | 'check' | 'other'
          reference?: string
          attachment_url?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['financial_records']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['financial_records']['Insert']>
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id?: string
          team_id?: string
          subject?: string
          content: string
          message_type: 'direct' | 'team' | 'announcement' | 'training' | 'match'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          is_read: boolean
          read_at?: string
          reply_to_id?: string
          attachment_urls?: string[]
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'] 
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']