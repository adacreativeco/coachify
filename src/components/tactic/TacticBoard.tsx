import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoachifyStore } from '../../stores/coachifyStore';
import { Shield, Award, Crosshair, Users, Sparkles, Check, RefreshCw, Zap, Sliders, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export const formationCoordinates: Record<string, Record<string, { top: number; left: number; label: string }>> = {
  '4-3-3': {
    gk: { top: 88, left: 50, label: 'KL' },
    lb: { top: 72, left: 16, label: 'SLB' },
    cb1: { top: 74, left: 38, label: 'STP' },
    cb2: { top: 74, left: 62, label: 'STP' },
    rb: { top: 72, left: 84, label: 'SĞB' },
    dm: { top: 52, left: 50, label: 'ÖNL' },
    cm1: { top: 40, left: 30, label: 'MOS' },
    cm2: { top: 40, left: 70, label: 'OOS' },
    lw: { top: 18, left: 18, label: 'SLK' },
    rw: { top: 18, left: 82, label: 'SĞK' },
    st: { top: 14, left: 50, label: 'SNT' },
  },
  '4-4-2': {
    gk: { top: 88, left: 50, label: 'KL' },
    lb: { top: 72, left: 16, label: 'SLB' },
    cb1: { top: 74, left: 38, label: 'STP' },
    cb2: { top: 74, left: 62, label: 'STP' },
    rb: { top: 72, left: 84, label: 'SĞB' },
    lm: { top: 46, left: 16, label: 'SLO' },
    cm1: { top: 50, left: 38, label: 'MOS' },
    cm2: { top: 50, left: 62, label: 'MOS' },
    rm: { top: 46, left: 84, label: 'SĞO' },
    st1: { top: 16, left: 38, label: 'SNT' },
    st2: { top: 16, left: 62, label: 'SNT' },
  },
  '4-2-3-1': {
    gk: { top: 88, left: 50, label: 'KL' },
    lb: { top: 72, left: 16, label: 'SLB' },
    cb1: { top: 74, left: 38, label: 'STP' },
    cb2: { top: 74, left: 62, label: 'STP' },
    rb: { top: 72, left: 84, label: 'SĞB' },
    dm1: { top: 56, left: 38, label: 'ÖNL' },
    dm2: { top: 56, left: 62, label: 'ÖNL' },
    amc: { top: 34, left: 50, label: 'OOS' },
    lw: { top: 30, left: 18, label: 'SLK' },
    rw: { top: 30, left: 82, label: 'SĞK' },
    st: { top: 14, left: 50, label: 'SNT' },
  },
  '3-5-2': {
    gk: { top: 88, left: 50, label: 'KL' },
    cb1: { top: 74, left: 24, label: 'STP' },
    cb2: { top: 76, left: 50, label: 'STP' },
    cb3: { top: 74, left: 76, label: 'STP' },
    lwb: { top: 48, left: 12, label: 'WNB' },
    dm: { top: 54, left: 50, label: 'ÖNL' },
    cm1: { top: 40, left: 34, label: 'MOS' },
    cm2: { top: 40, left: 66, label: 'MOS' },
    rwb: { top: 48, left: 88, label: 'WNB' },
    st1: { top: 16, left: 38, label: 'SNT' },
    st2: { top: 16, left: 62, label: 'SNT' },
  },
};

export default function TacticBoard() {
  const { players, tactic, setFormation, assignPlayerToPosition, setTacticalRole, setMentality } = useCoachifyStore();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showTacticalLines, setShowTacticalLines] = useState(true);

  const activePositions = formationCoordinates[tactic.formation] || formationCoordinates['4-3-3'];
  const captain = players.find((p) => p.id === tactic.captainId);
  const penaltyTaker = players.find((p) => p.id === tactic.penaltyTakerId);

  const handleSelectPlayerForSlot = (playerId: string) => {
    if (selectedSlot) {
      assignPlayerToPosition(selectedSlot, playerId);
      const p = players.find((pl) => pl.id === playerId);
      toast.success(`${p?.name} mevkiye yerleştirildi.`, {
        icon: <Check className="w-4 h-4 text-emerald-400" />,
      });
      setSelectedSlot(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 21st.dev Style Formation & Mentality Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Diziliş:
          </span>
          <div className="flex space-x-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10">
            {(['4-3-3', '4-4-2', '4-2-3-1', '3-5-2'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormation(fmt)}
                className={`relative px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  tactic.formation === fmt ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tactic.formation === fmt && (
                  <motion.div
                    layoutId="activeFormationPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md border border-emerald-400/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{fmt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowTacticalLines(!showTacticalLines)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
              showTacticalLines
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Taktik Çizgileri</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Oyun Anlayışı:</span>
            <select
              value={tactic.mentality}
              onChange={(e) => setMentality(e.target.value as any)}
              className="text-xs font-bold px-3 py-2 bg-slate-950/90 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="ultra_defensive">🛡️ Katı Savunma (Otobüs)</option>
              <option value="defensive">🧱 Kontrollü Savunma</option>
              <option value="balanced">⚖️ Dengeli & Pozisyonel</option>
              <option value="attacking">⚡ Yüksek Pres & Hücum</option>
              <option value="very_attacking">🔥 Tam Saha Baskı (Total Futbol)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Pitch and Player Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Champions League Animated Football Pitch (7 Cols) */}
        <div className="lg:col-span-7">
          <div
            className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-700/60"
            style={{
              aspectRatio: '3/4',
              background: 'radial-gradient(ellipse at center, #0f5132 0%, #064e3b 50%, #022c22 100%)',
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.08) 2px, transparent 2px),
                linear-gradient(90deg, rgba(255,255,255,0.08) 2px, transparent 2px),
                repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 40px, transparent 40px, transparent 80px)
              `,
              backgroundSize: '100% 12.5%, 100% 100%, 100% 80px',
            }}
          >
            {/* Ambient Floodlight Beams */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

            {/* Stadium Pitch Markings */}
            {/* Outer Boundary */}
            <div className="absolute inset-4 border-2 border-white/40 rounded-sm pointer-events-none" />

            {/* Center Line & Circle */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/40 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border-2 border-white/40 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white/70 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow" />

            {/* Top Penalty Area (Opponent Box) */}
            <div className="absolute top-4 left-1/2 w-3/5 h-28 border-b-2 border-x-2 border-white/40 -translate-x-1/2 rounded-b-sm pointer-events-none" />
            <div className="absolute top-4 left-1/2 w-1/3 h-12 border-b-2 border-x-2 border-white/40 -translate-x-1/2 pointer-events-none" />

            {/* Bottom Penalty Area (Our Box) */}
            <div className="absolute bottom-4 left-1/2 w-3/5 h-28 border-t-2 border-x-2 border-white/40 -translate-x-1/2 rounded-t-sm pointer-events-none" />
            <div className="absolute bottom-4 left-1/2 w-1/3 h-12 border-t-2 border-x-2 border-white/40 -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-16 left-1/2 w-2.5 h-2.5 bg-white/70 rounded-full -translate-x-1/2 pointer-events-none" />

            {/* Render Formation Player Slots with Framer Motion Animated Coordinates */}
            {Object.entries(activePositions).map(([posKey, posInfo]) => {
              const assignedPlayerId = tactic.lineup[posKey];
              const player = players.find((p) => p.id === assignedPlayerId);
              const isSelected = selectedSlot === posKey;

              return (
                <motion.div
                  key={posKey}
                  layout
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 24,
                  }}
                  onClick={() => setSelectedSlot(posKey)}
                  style={{
                    top: `${posInfo.top}%`,
                    left: `${posInfo.left}%`,
                    position: 'absolute',
                  }}
                  className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20 select-none"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xs border-2 shadow-2xl transition-shadow ${
                      isSelected
                        ? 'bg-amber-400 text-black border-white ring-4 ring-amber-300/80 shadow-amber-400/50 scale-110'
                        : player
                        ? 'bg-gradient-to-tr from-rose-600 via-red-500 to-amber-400 text-white border-white shadow-black/80'
                        : 'bg-emerald-950/80 text-emerald-300 border-dashed border-emerald-400/70 hover:bg-emerald-800 backdrop-blur-sm'
                    }`}
                  >
                    {player ? player.jerseyNumber : posInfo.label}
                  </motion.div>

                  <div className={`mt-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold max-w-[90px] truncate text-center shadow-lg backdrop-blur-md border ${
                    isSelected
                      ? 'bg-amber-400 text-black border-amber-300'
                      : 'bg-black/80 text-white border-white/20'
                  }`}>
                    {player ? player.name.split(' ').pop() : posInfo.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tactical Assignments & Roster Replacement Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Slot Selection Prompt Box */}
          <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Kadro & Mevki Seçimi</span>
              </h3>
              {selectedSlot && (
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="text-xs text-rose-400 hover:underline"
                >
                  İptal Et
                </button>
              )}
            </div>

            {selectedSlot ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between">
                <span>Mevki: [{activePositions[selectedSlot]?.label}]</span>
                <span className="text-[11px] font-normal text-amber-200">Aşağıdan oyuncu seçin</span>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-xs">
                Sahadaki pozisyona tıklayıp kadrodan oyuncu atayabilirsiniz.
              </div>
            )}

            {/* Quick Player Replacement List */}
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {players.map((p) => {
                const isInjured = p.status === 'injured';
                return (
                  <motion.div
                    key={p.id}
                    whileHover={!isInjured ? { x: 3 } : {}}
                    whileTap={!isInjured ? { scale: 0.98 } : {}}
                    onClick={() => !isInjured && handleSelectPlayerForSlot(p.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-semibold cursor-pointer border transition-all ${
                      isInjured
                        ? 'opacity-40 cursor-not-allowed bg-slate-950/40 border-white/5'
                        : selectedSlot
                        ? 'bg-emerald-950/40 border-emerald-500/40 hover:bg-emerald-900/50 hover:border-emerald-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-white/10 hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black flex items-center justify-center font-black text-xs shadow">
                        {p.jerseyNumber}
                      </span>
                      <div>
                        <div className="text-white font-bold">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.positionDetail} • Kondisyon %{p.fitness}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-extrabold text-[11px]">
                        {p.rating} OVR
                      </span>
                      {isInjured && (
                        <span className="text-rose-400 font-bold text-[10px] px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
                          Sakat
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Captain & Set Piece Takers */}
          <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Liderlik & Duran Top Görevleri
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="flex items-center text-slate-300 font-bold">
                  <Award className="w-4 h-4 mr-2 text-amber-400" /> Takım Kaptanı:
                </span>
                <select
                  value={tactic.captainId}
                  onChange={(e) => setTacticalRole('captainId', e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs border border-white/15 font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.jerseyNumber} {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="flex items-center text-slate-300 font-bold">
                  <Crosshair className="w-4 h-4 mr-2 text-rose-400" /> Penaltıcı:
                </span>
                <select
                  value={tactic.penaltyTakerId}
                  onChange={(e) => setTacticalRole('penaltyTakerId', e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs border border-white/15 font-bold focus:outline-none focus:ring-1 focus:ring-rose-400"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.jerseyNumber} {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
