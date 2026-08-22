import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlayerData {
  id: string;
  name: string;
  jerseyNumber: number;
  position: 'goalkeeper' | 'defender' | 'midfielder' | 'forward';
  positionDetail: string;
  rating: number; // 1-100
  age: number;
  status: 'fit' | 'injured' | 'suspended' | 'resting';
  marketValue: number; // EUR
  goals: number;
  assists: number;
  matchesPlayed: number;
  minutesPlayed: number;
  fitness: number; // 0-100
}

export interface MatchData {
  id: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
  formation: string;
  status: 'scheduled' | 'finished' | 'live';
  homeScore?: number;
  awayScore?: number;
  events?: { minute: number; type: 'goal' | 'yellow_card' | 'red_card' | 'sub'; description: string }[];
}

export interface TrainingSessionData {
  id: string;
  title: string;
  date: string;
  time: string;
  durationMinutes: number;
  focus: 'tactical' | 'conditioning' | 'technical' | 'shooting' | 'goalkeeping';
  location: string;
  coach: string;
  status: 'scheduled' | 'completed';
  attendance: Record<string, 'present' | 'excused' | 'injured' | 'absent'>;
}

export interface MessageData {
  id: string;
  sender: string;
  senderRole: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  category: 'inbox' | 'sent' | 'team';
  isRead: boolean;
}

export interface FinancialEntry {
  id: string;
  title: string;
  type: 'income' | 'expense';
  category: 'sponsorship' | 'tickets' | 'transfer' | 'salary' | 'equipment' | 'facility';
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

export interface TacticState {
  formation: '4-3-3' | '4-4-2' | '4-2-3-1' | '3-5-2';
  lineup: Record<string, string>;
  captainId: string;
  penaltyTakerId: string;
  freeKickTakerId: string;
  cornerTakerId: string;
  mentality: 'ultra_defensive' | 'defensive' | 'balanced' | 'attacking' | 'very_attacking';
}

export interface ClubInfo {
  name: string;
  league: string;
  stadium: string;
  coachName: string;
  presidentName: string;
  primaryColor: string;
}

interface CoachifyState {
  clubInfo: ClubInfo;
  players: PlayerData[];
  matches: MatchData[];
  trainings: TrainingSessionData[];
  messages: MessageData[];
  financials: FinancialEntry[];
  tactic: TacticState;
  
  // Actions
  updateClubInfo: (updates: Partial<ClubInfo>) => void;
  addPlayer: (player: Omit<PlayerData, 'id'>) => void;
  updatePlayer: (id: string, updates: Partial<PlayerData>) => void;
  deletePlayer: (id: string) => void;
  addMatch: (match: Omit<MatchData, 'id'>) => void;
  updateMatchScore: (id: string, homeScore: number, awayScore: number, events?: MatchData['events']) => void;
  addTraining: (training: Omit<TrainingSessionData, 'id' | 'attendance'>) => void;
  setPlayerAttendance: (trainingId: string, playerId: string, status: 'present' | 'excused' | 'injured' | 'absent') => void;
  sendMessage: (msg: Omit<MessageData, 'id' | 'timestamp' | 'isRead'>) => void;
  addFinancialEntry: (entry: Omit<FinancialEntry, 'id'>) => void;
  setFormation: (formation: TacticState['formation']) => void;
  assignPlayerToPosition: (positionKey: string, playerId: string) => void;
  setTacticalRole: (role: 'captainId' | 'penaltyTakerId' | 'freeKickTakerId' | 'cornerTakerId', playerId: string) => void;
  setMentality: (mentality: TacticState['mentality']) => void;
  resetToDefaults: () => void;
}

const initialClubInfo: ClubInfo = {
  name: 'Galatasaray Spor Kulübü',
  league: 'Süper Lig / UEFA Avrupa Ligi',
  stadium: 'Ali Sami Yen Spor Kompleksi RAMS Park',
  coachName: 'Okan Buruk',
  presidentName: 'Dursun Özbek',
  primaryColor: '#e11d48',
};

const initialPlayers: PlayerData[] = [
  { id: 'p1', name: 'Fernando Muslera', jerseyNumber: 1, position: 'goalkeeper', positionDetail: 'Kaleci (Kaptan)', rating: 86, age: 38, status: 'fit', marketValue: 1200000, goals: 0, assists: 0, matchesPlayed: 14, minutesPlayed: 1260, fitness: 92 },
  { id: 'p2', name: 'Günay Güvenç', jerseyNumber: 19, position: 'goalkeeper', positionDetail: 'Yedek Kaleci', rating: 76, age: 33, status: 'fit', marketValue: 600000, goals: 0, assists: 0, matchesPlayed: 3, minutesPlayed: 270, fitness: 88 },
  { id: 'p3', name: 'Victor Nelsson', jerseyNumber: 25, position: 'defender', positionDetail: 'Stoper (Sağ)', rating: 82, age: 26, status: 'fit', marketValue: 16000000, goals: 1, assists: 0, matchesPlayed: 15, minutesPlayed: 1350, fitness: 94 },
  { id: 'p4', name: 'Davinson Sánchez', jerseyNumber: 6, position: 'defender', positionDetail: 'Stoper (Sol)', rating: 85, age: 28, status: 'fit', marketValue: 18000000, goals: 2, assists: 1, matchesPlayed: 14, minutesPlayed: 1210, fitness: 90 },
  { id: 'p5', name: 'Kaan Ayhan', jerseyNumber: 23, position: 'defender', positionDetail: 'Sağ Bek / Joker', rating: 79, age: 30, status: 'fit', marketValue: 4500000, goals: 1, assists: 3, matchesPlayed: 13, minutesPlayed: 980, fitness: 85 },
  { id: 'p6', name: 'Ismail Jakobs', jerseyNumber: 4, position: 'defender', positionDetail: 'Sol Bek', rating: 80, age: 25, status: 'fit', marketValue: 8000000, goals: 0, assists: 2, matchesPlayed: 11, minutesPlayed: 890, fitness: 89 },
  { id: 'p7', name: 'Abdülkerim Bardakcı', jerseyNumber: 42, position: 'defender', positionDetail: 'Sol Stoper', rating: 83, age: 30, status: 'injured', marketValue: 9000000, goals: 2, assists: 1, matchesPlayed: 12, minutesPlayed: 1050, fitness: 60 },
  { id: 'p8', name: 'Elias Jelert', jerseyNumber: 24, position: 'defender', positionDetail: 'Sağ Bek', rating: 77, age: 21, status: 'fit', marketValue: 7500000, goals: 0, assists: 1, matchesPlayed: 8, minutesPlayed: 540, fitness: 95 },
  { id: 'p9', name: 'Lucas Torreira', jerseyNumber: 34, position: 'midfielder', positionDetail: 'Ön Libero (DMC)', rating: 87, age: 28, status: 'fit', marketValue: 15000000, goals: 1, assists: 4, matchesPlayed: 16, minutesPlayed: 1420, fitness: 96 },
  { id: 'p10', name: 'Gabriel Sara', jerseyNumber: 20, position: 'midfielder', positionDetail: 'Merkez Orta Saha (MC)', rating: 85, age: 25, status: 'fit', marketValue: 20000000, goals: 3, assists: 6, matchesPlayed: 15, minutesPlayed: 1290, fitness: 93 },
  { id: 'p11', name: 'Dries Mertens', jerseyNumber: 10, position: 'midfielder', positionDetail: 'Ofansif Orta Saha (AMC)', rating: 84, age: 37, status: 'fit', marketValue: 1800000, goals: 5, assists: 7, matchesPlayed: 16, minutesPlayed: 1120, fitness: 86 },
  { id: 'p12', name: 'Kerem Demirbay', jerseyNumber: 8, position: 'midfielder', positionDetail: 'Merkez Orta Saha', rating: 79, age: 31, status: 'fit', marketValue: 4200000, goals: 1, assists: 2, matchesPlayed: 10, minutesPlayed: 620, fitness: 84 },
  { id: 'p13', name: 'Berkan Kutlu', jerseyNumber: 22, position: 'midfielder', positionDetail: 'Dinamik Orta Saha', rating: 77, age: 26, status: 'fit', marketValue: 3500000, goals: 0, assists: 1, matchesPlayed: 9, minutesPlayed: 450, fitness: 98 },
  { id: 'p14', name: 'Eyüp Aydın', jerseyNumber: 83, position: 'midfielder', positionDetail: 'Genç Ön Libero', rating: 72, age: 20, status: 'fit', marketValue: 1500000, goals: 0, assists: 0, matchesPlayed: 4, minutesPlayed: 180, fitness: 97 },
  { id: 'p15', name: 'Barış Alper Yılmaz', jerseyNumber: 53, position: 'forward', positionDetail: 'Sağ Kanat (RW)', rating: 86, age: 24, status: 'fit', marketValue: 21000000, goals: 7, assists: 3, matchesPlayed: 16, minutesPlayed: 1380, fitness: 99 },
  { id: 'p16', name: 'Roland Sallai', jerseyNumber: 7, position: 'forward', positionDetail: 'Sol / Sağ Kanat', rating: 81, age: 27, status: 'fit', marketValue: 14000000, goals: 2, assists: 2, matchesPlayed: 9, minutesPlayed: 630, fitness: 90 },
  { id: 'p17', name: 'Mauro Icardi', jerseyNumber: 9, position: 'forward', positionDetail: 'Santrafor (ST)', rating: 88, age: 31, status: 'injured', marketValue: 15000000, goals: 8, assists: 3, matchesPlayed: 11, minutesPlayed: 940, fitness: 40 },
  { id: 'p18', name: 'Victor Osimhen', jerseyNumber: 45, position: 'forward', positionDetail: 'Yıldız Santrafor (ST)', rating: 91, age: 26, status: 'fit', marketValue: 75000000, goals: 11, assists: 4, matchesPlayed: 13, minutesPlayed: 1110, fitness: 95 },
  { id: 'p19', name: 'Michy Batshuayi', jerseyNumber: 44, position: 'forward', positionDetail: 'Nöbetçi Golcü (ST)', rating: 80, age: 31, status: 'fit', marketValue: 7000000, goals: 6, assists: 2, matchesPlayed: 14, minutesPlayed: 560, fitness: 89 },
  { id: 'p20', name: 'Yusuf Demir', jerseyNumber: 30, position: 'forward', positionDetail: 'Ofansif Kanat (LW)', rating: 74, age: 21, status: 'fit', marketValue: 2500000, goals: 1, assists: 1, matchesPlayed: 5, minutesPlayed: 210, fitness: 92 },
  { id: 'p21', name: 'Metehan Baltacı', jerseyNumber: 90, position: 'defender', positionDetail: 'Genç Stoper', rating: 73, age: 22, status: 'fit', marketValue: 1800000, goals: 0, assists: 0, matchesPlayed: 5, minutesPlayed: 320, fitness: 96 },
  { id: 'p22', name: 'Ali Turap Bülbül', jerseyNumber: 72, position: 'defender', positionDetail: 'Altyapı Sağ Bek', rating: 69, age: 19, status: 'fit', marketValue: 800000, goals: 0, assists: 0, matchesPlayed: 2, minutesPlayed: 90, fitness: 98 },
];

const initialMatches: MatchData[] = [
  {
    id: 'm1',
    opponent: 'Fenerbahçe U21',
    date: '2026-08-28',
    time: '20:00',
    venue: 'Ali Sami Yen Spor Kompleksi',
    isHome: true,
    formation: '4-3-3',
    status: 'scheduled',
  },
  {
    id: 'm2',
    opponent: 'Beşiktaş U21',
    date: '2026-09-04',
    time: '19:00',
    venue: 'Tüpraş Stadyumu',
    isHome: false,
    formation: '4-2-3-1',
    status: 'scheduled',
  },
  {
    id: 'm3',
    opponent: 'Trabzonspor U21',
    date: '2026-08-16',
    time: '18:30',
    venue: 'Ali Sami Yen Spor Kompleksi',
    isHome: true,
    formation: '4-3-3',
    status: 'finished',
    homeScore: 3,
    awayScore: 1,
    events: [
      { minute: 18, type: 'goal', description: 'Victor Osimhen (Asist: Gabriel Sara)' },
      { minute: 42, type: 'yellow_card', description: 'Lucas Torreira (Taktik Faul)' },
      { minute: 61, type: 'goal', description: 'Barış Alper Yılmaz (Bireysel Çaba)' },
      { minute: 74, type: 'goal', description: 'Rakip Takım (Köşe Vuruşu)' },
      { minute: 88, type: 'goal', description: 'Michy Batshuayi (Kafa Vuruşu)' },
    ],
  },
  {
    id: 'm4',
    opponent: 'Başakşehir FK',
    date: '2026-08-09',
    time: '19:45',
    venue: 'Fatih Terim Stadyumu',
    isHome: false,
    formation: '4-3-3',
    status: 'finished',
    homeScore: 0,
    awayScore: 2,
    events: [
      { minute: 34, type: 'goal', description: 'Dries Mertens (Frikik)' },
      { minute: 79, type: 'goal', description: 'Victor Osimhen (Asist: Barış Alper)' },
    ],
  },
];

const initialTrainings: TrainingSessionData[] = [
  {
    id: 't1',
    title: 'Haftalık Derbi Taktik Organizasyonu',
    date: '2026-08-25',
    time: '10:30',
    durationMinutes: 90,
    focus: 'tactical',
    location: 'Florya Metin Oktay Tesisleri - 1 Nolu Saha',
    coach: 'Okan Buruk',
    status: 'scheduled',
    attendance: { p1: 'present', p3: 'present', p4: 'present', p9: 'present', p10: 'present', p15: 'present', p18: 'present', p7: 'injured', p17: 'injured' },
  },
  {
    id: 't2',
    title: 'Yüksek Yoğunluklu Kondisyon & Pres Çalışması',
    date: '2026-08-26',
    time: '17:00',
    durationMinutes: 105,
    focus: 'conditioning',
    location: 'Florya Ana Tesis',
    coach: 'Kondisyoner Ekibi',
    status: 'scheduled',
    attendance: {},
  },
  {
    id: 't3',
    title: 'Duran Top & Ceza Sahası İçi Bitiricilik',
    date: '2026-08-23',
    time: '11:00',
    durationMinutes: 75,
    focus: 'shooting',
    location: 'Florya 2 Nolu Saha',
    coach: 'Okan Buruk',
    status: 'completed',
    attendance: { p1: 'present', p3: 'present', p4: 'present', p5: 'present', p9: 'present', p10: 'present', p11: 'present', p15: 'present', p18: 'present', p19: 'present', p7: 'injured', p17: 'injured' },
  },
];

const initialMessages: MessageData[] = [
  {
    id: 'msg1',
    sender: 'Dursun Özbek (Başkan)',
    senderRole: 'president',
    recipient: 'Tüm Takım',
    subject: 'Derbi Öncesi Yönetim Kurulu Mesajı ve Prim Müjdesi',
    content: 'Değerli teknik ekip ve futbolcu kardeşlerim, hafta sonu oynayacağımız kritik derbide tüm camiamızın inancı ve desteği arkanızdadır. Galibiyet halinde prim havuzu iki katına çıkarılacaktır.',
    timestamp: 'Bugün, 14:30',
    category: 'team',
    isRead: false,
  },
  {
    id: 'msg2',
    sender: 'Okan Buruk (Teknik Direktör)',
    senderRole: 'coach',
    recipient: 'Victor Osimhen',
    subject: 'Bireysel Hücum Taktik Analizi',
    content: 'Victor harika bir form yakaladın. Derbide rakip stoperlerin arkasına yapacağın çapraz koşular bizim kilit hücum planımız olacak.',
    timestamp: 'Dün, 18:45',
    category: 'inbox',
    isRead: true,
  },
  {
    id: 'msg3',
    sender: 'Sağlık Heyeti',
    senderRole: 'staff',
    recipient: 'Teknik Heyet',
    subject: 'Haftalık Sakatlık & Rejenerasyon Raporu',
    content: 'Mauro Icardi fizyoterapi sürecinde beklenen ilerlemeyi gösteriyor. Abdülkerim düz koşulara başladı, derbi kadrosu için son test cuma günü yapılacak.',
    timestamp: '22 Ağu, 09:15',
    category: 'inbox',
    isRead: true,
  },
];

const initialFinancials: FinancialEntry[] = [
  { id: 'f1', title: 'Stadyum İsim & Göğüs Sponsorluğu Geliri', type: 'income', category: 'sponsorship', amount: 8500000, date: '2026-08-01', status: 'completed' },
  { id: 'f2', title: 'Kombine & Bilet Satış Hasılatı', type: 'income', category: 'tickets', amount: 3200000, date: '2026-08-10', status: 'completed' },
  { id: 'f3', title: 'A Takım Aylık Maaş & Prim Ödemeleri', type: 'expense', category: 'salary', amount: 4800000, date: '2026-08-15', status: 'completed' },
  { id: 'f4', title: 'Tesis Bakım & Antrenman Ekipmanları Gideri', type: 'expense', category: 'equipment', amount: 450000, date: '2026-08-18', status: 'completed' },
  { id: 'f5', title: 'Yayın Gelirleri Havuz Payı', type: 'income', category: 'sponsorship', amount: 2100000, date: '2026-08-20', status: 'completed' },
];

const initialTactic: TacticState = {
  formation: '4-3-3',
  lineup: {
    gk: 'p1',
    lb: 'p6',
    cb1: 'p4',
    cb2: 'p3',
    rb: 'p5',
    dm: 'p9',
    cm1: 'p10',
    cm2: 'p11',
    lw: 'p16',
    rw: 'p15',
    st: 'p18',
  },
  captainId: 'p1',
  penaltyTakerId: 'p18',
  freeKickTakerId: 'p11',
  cornerTakerId: 'p10',
  mentality: 'attacking',
};

export const useCoachifyStore = create<CoachifyState>()(
  persist(
    (set) => ({
      clubInfo: initialClubInfo,
      players: initialPlayers,
      matches: initialMatches,
      trainings: initialTrainings,
      messages: initialMessages,
      financials: initialFinancials,
      tactic: initialTactic,

      updateClubInfo: (updates) =>
        set((state) => ({
          clubInfo: { ...state.clubInfo, ...updates },
        })),

      addPlayer: (newPlayer) =>
        set((state) => ({
          players: [{ ...newPlayer, id: 'p_' + Date.now() }, ...state.players],
        })),

      updatePlayer: (id, updates) =>
        set((state) => ({
          players: state.players.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deletePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
        })),

      addMatch: (newMatch) =>
        set((state) => ({
          matches: [{ ...newMatch, id: 'm_' + Date.now() }, ...state.matches],
        })),

      updateMatchScore: (id, homeScore, awayScore, events) =>
        set((state) => ({
          matches: state.matches.map((m) =>
            m.id === id ? { ...m, homeScore, awayScore, status: 'finished', events: events || m.events } : m
          ),
        })),

      addTraining: (newTraining) =>
        set((state) => ({
          trainings: [{ ...newTraining, id: 't_' + Date.now(), attendance: {} }, ...state.trainings],
        })),

      setPlayerAttendance: (trainingId, playerId, status) =>
        set((state) => ({
          trainings: state.trainings.map((t) =>
            t.id === trainingId
              ? { ...t, attendance: { ...t.attendance, [playerId]: status } }
              : t
          ),
        })),

      sendMessage: (msg) =>
        set((state) => ({
          messages: [
            {
              ...msg,
              id: 'msg_' + Date.now(),
              timestamp: 'Şimdi',
              isRead: false,
            },
            ...state.messages,
          ],
        })),

      addFinancialEntry: (entry) =>
        set((state) => ({
          financials: [{ ...entry, id: 'f_' + Date.now() }, ...state.financials],
        })),

      setFormation: (formation) =>
        set((state) => ({
          tactic: { ...state.tactic, formation },
        })),

      assignPlayerToPosition: (positionKey, playerId) =>
        set((state) => ({
          tactic: {
            ...state.tactic,
            lineup: { ...state.tactic.lineup, [positionKey]: playerId },
          },
        })),

      setTacticalRole: (role, playerId) =>
        set((state) => ({
          tactic: { ...state.tactic, [role]: playerId },
        })),

      setMentality: (mentality) =>
        set((state) => ({
          tactic: { ...state.tactic, mentality },
        })),

      resetToDefaults: () =>
        set({
          clubInfo: initialClubInfo,
          players: initialPlayers,
          matches: initialMatches,
          trainings: initialTrainings,
          messages: initialMessages,
          financials: initialFinancials,
          tactic: initialTactic,
        }),
    }),
    {
      name: 'coachify-club-store',
    }
  )
);
