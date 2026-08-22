// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  PRESIDENT = 'president',
  COACH = 'coach',
  PLAYER = 'player',
  ASSISTANT = 'assistant'
}

// Team types
export interface Team {
  id: string;
  name: string;
  league: string;
  logo?: string;
  coachId: string;
  presidentId: string;
  budget: number;
  createdAt: string;
  updatedAt: string;
}

// Player types
export interface Player {
  id: string;
  userId: string;
  teamId: string;
  jerseyNumber: number;
  position: PlayerPosition;
  height?: number;
  weight?: number;
  dateOfBirth?: string;
  joinedAt: string;
  status: PlayerStatus;
  stats: PlayerStats;
}

export enum PlayerPosition {
  GOALKEEPER = 'goalkeeper',
  DEFENDER = 'defender',
  MIDFIELDER = 'midfielder',
  FORWARD = 'forward'
}

export enum PlayerStatus {
  ACTIVE = 'active',
  INJURED = 'injured',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive'
}

export interface PlayerStats {
  matchesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating: number;
}

// Training types
export interface Training {
  id: string;
  teamId: string;
  date: string;
  duration: number; // in minutes
  focus: TrainingFocus;
  description: string;
  location: string;
  coachId: string;
  players: TrainingPlayer[];
  status: TrainingStatus;
  createdAt: string;
}

export enum TrainingFocus {
  CONDITIONING = 'conditioning',
  TACTICAL = 'tactical',
  TECHNICAL = 'technical',
  SET_PIECES = 'set_pieces',
  MATCH_PREPARATION = 'match_preparation'
}

export enum TrainingStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface TrainingPlayer {
  playerId: string;
  attendance: AttendanceStatus;
  rating?: number;
  notes?: string;
}

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused'
}

// Match types
export interface Match {
  id: string;
  teamId: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
  formation: Formation;
  status: MatchStatus;
  result?: MatchResult;
  players: MatchPlayer[];
  statistics: MatchStatistics;
  createdAt: string;
}

export enum Formation {
  FOUR_FOUR_TWO = '4-4-2',
  FOUR_THREE_THREE = '4-3-3',
  THREE_FIVE_TWO = '3-5-2',
  FOUR_TWO_THREE_ONE = '4-2-3-1',
  THREE_FOUR_THREE = '3-4-3',
  FIVE_THREE_TWO = '5-3-2'
}

export enum MatchStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  POSTPONED = 'postponed',
  CANCELLED = 'cancelled'
}

export interface MatchResult {
  teamScore: number;
  opponentScore: number;
  outcome: MatchOutcome;
}

export enum MatchOutcome {
  WIN = 'win',
  DRAW = 'draw',
  LOSS = 'loss'
}

export interface MatchPlayer {
  playerId: string;
  position: string;
  isStarter: boolean;
  minutesPlayed: number;
  rating: number;
  events: MatchEvent[];
}

export interface MatchEvent {
  type: MatchEventType;
  minute: number;
  description: string;
}

export enum MatchEventType {
  GOAL = 'goal',
  ASSIST = 'assist',
  YELLOW_CARD = 'yellow_card',
  RED_CARD = 'red_card',
  SUBSTITUTION = 'substitution',
  INJURY = 'injury'
}

export interface MatchStatistics {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
}

// Financial types
export interface FinancialRecord {
  id: string;
  teamId: string;
  type: FinancialType;
  category: FinancialCategory;
  amount: number;
  description: string;
  date: string;
  createdBy: string;
  attachments?: string[];
}

export enum FinancialType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export enum FinancialCategory {
  PLAYER_SALARY = 'player_salary',
  COACH_SALARY = 'coach_salary',
  EQUIPMENT = 'equipment',
  FACILITY = 'facility',
  TRAVEL = 'travel',
  REGISTRATION = 'registration',
  SPONSORSHIP = 'sponsorship',
  OTHER = 'other'
}

// Communication types
export interface Message {
  id: string;
  teamId: string;
  senderId: string;
  recipientId?: string; // null for team-wide messages
  subject: string;
  content: string;
  priority: MessagePriority;
  isRead: boolean;
  createdAt: string;
  attachments?: string[];
}

export enum MessagePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export enum NotificationType {
  MATCH_REMINDER = 'match_reminder',
  TRAINING_REMINDER = 'training_reminder',
  MESSAGE = 'message',
  PERFORMANCE_UPDATE = 'performance_update',
  TEAM_ANNOUNCEMENT = 'team_announcement',
  FINANCIAL_ALERT = 'financial_alert'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  teamCode?: string;
}

export interface CreateTeamForm {
  name: string;
  league: string;
  logo?: File;
}

export interface CreatePlayerForm {
  userId: string;
  jerseyNumber: number;
  position: PlayerPosition;
  height?: number;
  weight?: number;
  dateOfBirth?: string;
}

export interface CreateTrainingForm {
  date: string;
  duration: number;
  focus: TrainingFocus;
  description: string;
  location: string;
}

export interface CreateMatchForm {
  opponent: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
}

// Chart data types
export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SearchFilters {
  query?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  teamId?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}