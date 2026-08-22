import { useState } from 'react';
import { useCoachifyStore } from '../../stores/coachifyStore';
import { Shield, Award, Crosshair, Users, Sparkles, Check, RefreshCw } from 'lucide-react';
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

  const activePositions = formationCoordinates[tactic.formation] || formationCoordinates['4-3-3'];
  const captain = players.find((p) => p.id === tactic.captainId);
  const penaltyTaker = players.find((p) => p.id === tactic.penaltyTakerId);

  const handleSelectPlayerForSlot = (playerId: string) => {
    if (selectedSlot) {
      assignPlayerToPosition(selectedSlot, playerId);
      const p = players.find((pl) => pl.id === playerId);
      toast.success(`${p?.name} mevkiye yerleştirildi.`);
      setSelectedSlot(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Formation & Mentality Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Diziliş:</span>
          <div className="flex space-x-1.5 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {(['4-3-3', '4-4-2', '4-2-3-1', '3-5-2'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormation(fmt)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  tactic.formation === fmt
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Oyun Anlayışı:</span>
          <select
            value={tactic.mentality}
            onChange={(e) => setMentality(e.target.value as any)}
            className="text-xs font-semibold px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ultra_defensive">🛡️ Katı Savunma (Otobüs)</option>
            <option value="defensive">🧱 Kontrollü Savunma</option>
            <option value="balanced">⚖️ Dengeli & Pozisyonel</option>
            <option value="attacking">⚡ Yüksek Pres & Hücum</option>
            <option value="very_attacking">🔥 Tam Saha Baskı (Total Futbol)</option>
          </select>
        </div>
      </div>

      {/* Main Pitch and Player Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pitch Display (7 Cols) */}
        <div className="lg:col-span-7">
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-800"
            style={{
              aspectRatio: '3/4',
              background: 'radial-gradient(ellipse at center, #15803d 0%, #166534 60%, #14532d 100%)',
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.15) 2px, transparent 2px),
                linear-gradient(90deg, rgba(255,255,255,0.15) 2px, transparent 2px)
              `,
              backgroundSize: '100% 12.5%, 100% 100%',
            }}
          >
            {/* Field Lines */}
            {/* Center Line & Circle */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/40 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border-2 border-white/40 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white/60 rounded-full -translate-x-1/2 -translate-y-1/2" />

            {/* Top Penalty Area (Opponent Box) */}
            <div className="absolute top-0 left-1/2 w-3/5 h-24 border-b-2 border-x-2 border-white/40 -translate-x-1/2 rounded-b-sm" />
            <div className="absolute top-0 left-1/2 w-1/3 h-10 border-b-2 border-x-2 border-white/40 -translate-x-1/2" />

            {/* Bottom Penalty Area (Our Box) */}
            <div className="absolute bottom-0 left-1/2 w-3/5 h-24 border-t-2 border-x-2 border-white/40 -translate-x-1/2 rounded-t-sm" />
            <div className="absolute bottom-0 left-1/2 w-1/3 h-10 border-t-2 border-x-2 border-white/40 -translate-x-1/2" />

            {/* Render Formation Player Slots */}
            {Object.entries(activePositions).map(([posKey, posInfo]) => {
              const assignedPlayerId = tactic.lineup[posKey];
              const player = players.find((p) => p.id === assignedPlayerId);
              const isSelected = selectedSlot === posKey;

              return (
                <div
                  key={posKey}
                  onClick={() => setSelectedSlot(posKey)}
                  style={{
                    top: `${posInfo.top}%`,
                    left: `${posInfo.left}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute flex flex-col items-center cursor-pointer transition-all duration-200 group z-10`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-xs border-2 shadow-lg transition-transform ${
                      isSelected
                        ? 'bg-amber-400 text-black border-white ring-4 ring-amber-300 scale-125'
                        : player
                        ? 'bg-gradient-to-br from-red-600 to-amber-500 text-white border-white hover:scale-110'
                        : 'bg-emerald-900/80 text-emerald-300 border-dashed border-emerald-400/60 hover:bg-emerald-700'
                    }`}
                  >
                    {player ? player.jerseyNumber : posInfo.label}
                  </div>
                  <div className="mt-1 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded-md text-[10px] font-bold text-white shadow max-w-[85px] truncate text-center border border-white/20">
                    {player ? player.name.split(' ').pop() : posInfo.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tactical Assignments & Roster Replacement Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Slot Selection Prompt */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2 text-emerald-600" />
              {selectedSlot ? (
                <span>
                  Mevki Seçildi: <strong className="text-emerald-600">[{activePositions[selectedSlot]?.label}]</strong> için Oyuncu Seçin
                </span>
              ) : (
                'Sahadaki bir pozisyona tıklayarak oyuncu atayın'
              )}
            </h3>

            {/* Quick Player Replacement List */}
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 mt-3">
              {players.map((p) => {
                const isInjured = p.status === 'injured';
                return (
                  <div
                    key={p.id}
                    onClick={() => !isInjured && handleSelectPlayerForSlot(p.id)}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs font-semibold cursor-pointer border transition-colors ${
                      isInjured
                        ? 'opacity-40 cursor-not-allowed bg-gray-50 dark:bg-gray-900 border-transparent'
                        : selectedSlot
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                        : 'bg-gray-50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                        {p.jerseyNumber}
                      </span>
                      <div>
                        <div className="text-gray-900 dark:text-white">{p.name}</div>
                        <div className="text-[10px] text-gray-500">{p.positionDetail}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {p.rating} OVR
                      </span>
                      {isInjured && <span className="text-red-500 font-bold text-[10px]">Sakat</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Captain & Set Piece Takers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Duran Top & Liderlik Görevleri
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center text-gray-700 dark:text-gray-300">
                  <Award className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Takım Kaptanı:
                </span>
                <select
                  value={tactic.captainId}
                  onChange={(e) => setTacticalRole('captainId', e.target.value)}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs border-none font-semibold"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.jerseyNumber} {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center text-gray-700 dark:text-gray-300">
                  <Crosshair className="w-3.5 h-3.5 mr-1.5 text-red-500" /> Penaltı Kullanıcısı:
                </span>
                <select
                  value={tactic.penaltyTakerId}
                  onChange={(e) => setTacticalRole('penaltyTakerId', e.target.value)}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs border-none font-semibold"
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
