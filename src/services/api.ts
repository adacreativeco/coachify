import { supabase } from '../lib/supabase'
import type { Database, Tables, Inserts, Updates } from '../types/database'

export type User = Tables<'users'>
export type Team = Tables<'teams'>
export type Player = Tables<'players'>
export type Training = Tables<'trainings'>
export type Match = Tables<'matches'>
export type FinancialRecord = Tables<'financial_records'>
export type Message = Tables<'messages'>

// User API functions
export const userApi = {
  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching user:', error)
      return null
    }
    return data
  },

  async getByTeamId(teamId: string): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('team_id', teamId)
    
    if (error) {
      console.error('Error fetching team users:', error)
      return []
    }
    return data || []
  },

  async update(id: string, updates: Updates<'users'>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating user:', error)
      return null
    }
    return data
  }
}

// Team API functions
export const teamApi = {
  async getById(id: string): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching team:', error)
      return null
    }
    return data
  },

  async getByPresidentId(presidentId: string): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('president_id', presidentId)
      .single()
    
    if (error) {
      console.error('Error fetching team by president:', error)
      return null
    }
    return data
  },

  async create(team: Inserts<'teams'>): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .insert(team as any)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating team:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Updates<'teams'>): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating team:', error)
      return null
    }
    return data
  }
}

// Player API functions
export const playerApi = {
  async getById(id: string): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching player:', error)
      return null
    }
    return data
  },

  async getByTeamId(teamId: string): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId)
    
    if (error) {
      console.error('Error fetching team players:', error)
      return []
    }
    return data || []
  },

  async getByUserId(userId: string): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching player by user:', error)
      return null
    }
    return data
  },

  async create(player: Inserts<'players'>): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .insert(player as any)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating player:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Updates<'players'>): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating player:', error)
      return null
    }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting player:', error)
      return false
    }
    return true
  }
}

// Training API functions
export const trainingApi = {
  async getById(id: string): Promise<Training | null> {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching training:', error)
      return null
    }
    return data
  },

  async getByTeamId(teamId: string): Promise<Training[]> {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('team_id', teamId)
      .order('scheduled_date', { ascending: true })
    
    if (error) {
      console.error('Error fetching team trainings:', error)
      return []
    }
    return data || []
  },

  async getUpcoming(teamId: string, limit: number = 5): Promise<Training[]> {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('team_id', teamId)
      .gte('scheduled_date', today)
      .order('scheduled_date', { ascending: true })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching upcoming trainings:', error)
      return []
    }
    return data || []
  },

  async create(training: Inserts<'trainings'>): Promise<Training | null> {
    const { data, error } = await supabase
      .from('trainings')
      .insert(training as any)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating training:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Updates<'trainings'>): Promise<Training | null> {
    const { data, error } = await supabase
      .from('trainings')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating training:', error)
      return null
    }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('trainings')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting training:', error)
      return false
    }
    return true
  }
}

// Match API functions
export const matchApi = {
  async getById(id: string): Promise<Match | null> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching match:', error)
      return null
    }
    return data
  },

  async getByTeamId(teamId: string): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('team_id', teamId)
      .order('match_date', { ascending: true })
    
    if (error) {
      console.error('Error fetching team matches:', error)
      return []
    }
    return data || []
  },

  async getUpcoming(teamId: string, limit: number = 5): Promise<Match[]> {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('team_id', teamId)
      .gte('match_date', today)
      .order('match_date', { ascending: true })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching upcoming matches:', error)
      return []
    }
    return data || []
  },

  async getRecent(teamId: string, limit: number = 5): Promise<Match[]> {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('team_id', teamId)
      .lt('match_date', today)
      .order('match_date', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching recent matches:', error)
      return []
    }
    return data || []
  },

  async create(match: Inserts<'matches'>): Promise<Match | null> {
    const { data, error } = await supabase
      .from('matches')
      .insert(match as any)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating match:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Updates<'matches'>): Promise<Match | null> {
    const { data, error } = await supabase
      .from('matches')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating match:', error)
      return null
    }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting match:', error)
      return false
    }
    return true
  }
}

// Financial API functions
export const financialApi = {
  async getById(id: string): Promise<FinancialRecord | null> {
    const { data, error } = await supabase
      .from('financial_records')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching financial record:', error)
      return null
    }
    return data
  },

  async getByTeamId(teamId: string): Promise<FinancialRecord[]> {
    const { data, error } = await supabase
      .from('financial_records')
      .select('*')
      .eq('team_id', teamId)
      .order('date', { ascending: false })
    
    if (error) {
      console.error('Error fetching team financial records:', error)
      return []
    }
    return data || []
  },

  async getByType(teamId: string, type: 'income' | 'expense'): Promise<FinancialRecord[]> {
    const { data, error } = await supabase
      .from('financial_records')
      .select('*')
      .eq('team_id', teamId)
      .eq('type', type)
      .order('date', { ascending: false })
    
    if (error) {
      console.error('Error fetching financial records by type:', error)
      return []
    }
    return data || []
  },

  async getByCategory(teamId: string, category: string): Promise<FinancialRecord[]> {
    const { data, error } = await supabase
      .from('financial_records')
      .select('*')
      .eq('team_id', teamId)
      .eq('category', category)
      .order('date', { ascending: false })
    
    if (error) {
      console.error('Error fetching financial records by category:', error)
      return []
    }
    return data || []
  },

  async getMonthlySummary(teamId: string, year: number, month: number): Promise<{
    income: number
    expenses: number
    balance: number
  }> {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`
    const endDate = new Date(year, month, 0).toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('financial_records')
      .select('type, amount')
      .eq('team_id', teamId)
      .gte('date', startDate)
      .lte('date', endDate)
    
    if (error) {
      console.error('Error fetching monthly financial summary:', error)
      return { income: 0, expenses: 0, balance: 0 }
    }
    
    type FinancialSummaryRow = Pick<FinancialRecord, 'type' | 'amount'>
    const rows = (data ?? []) as FinancialSummaryRow[]
    const income = rows.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0)
    const expenses = rows.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0)
    
    return {
      income,
      expenses,
      balance: income - expenses
    }
  },

  async create(record: Inserts<'financial_records'>): Promise<FinancialRecord | null> {
    const { data, error } = await supabase
      .from('financial_records')
      .insert(record as any)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating financial record:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Updates<'financial_records'>): Promise<FinancialRecord | null> {
    const { data, error } = await supabase
      .from('financial_records')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating financial record:', error)
      return null
    }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('financial_records')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting financial record:', error)
      return false
    }
    return true
  }
}

// Message API functions
export const messageApi = {
  async getById(id: string): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching message:', error)
      return null
    }
    return data
  },

  async getByUserId(userId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`receiver_id.eq.${userId},receiver_id.is.null`)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching user messages:', error)
      return []
    }
    return data || []
  },

  async getByTeamId(teamId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching team messages:', error)
      return []
    }
    return data || []
  },

  async getUnread(userId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`receiver_id.eq.${userId},receiver_id.is.null`)
      .eq('is_read', false)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching unread messages:', error)
      return []
    }
    return data || []
  },

  async create(message: Inserts<'messages'>): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert(message as any)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating message:', error)
      return null
    }
    return data
  },

  async markAsRead(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true, read_at: new Date().toISOString() } as any)
      .eq('id', id)
    
    if (error) {
      console.error('Error marking message as read:', error)
      return false
    }
    return true
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting message:', error)
      return false
    }
    return true
  }
}