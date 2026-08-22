import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoachifyStore, PlayerData } from '../stores/coachifyStore';
import { Users, UserPlus, Search, Filter, Activity, TrendingUp, Edit, Trash2, X, Check, ShieldAlert, Sparkles, Heart, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function Players() {
  const { players, addPlayer, updatePlayer, deletePlayer } = useCoachifyStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<PlayerData, 'id'>>({
    name: '',
    jerseyNumber: 10,
    position: 'forward',
    positionDetail: 'Santrafor',
    rating: 80,
    age: 24,
    status: 'fit',
    marketValue: 5000000,
    goals: 0,
    assists: 0,
    matchesPlayed: 0,
    minutesPlayed: 0,
    fitness: 100,
  });

  const positions = [
    { value: 'all', label: 'Tüm Kadro' },
    { value: 'forward', label: 'Forvetler (ST/LW/RW)' },
    { value: 'midfielder', label: 'Orta Sahalar (CM/CAM/CDM)' },
    { value: 'defender', label: 'Defanslar (CB/LB/RB)' },
    { value: 'goalkeeper', label: 'Kaleciler (GK)' },
  ];

  const filteredPlayers = players.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.jerseyNumber.toString().includes(searchTerm);
    const matchesPos = selectedPosition === 'all' || p.position === selectedPosition;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesPos && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingPlayerId(null);
    setFormData({
      name: '',
      jerseyNumber: Math.max(...players.map((p) => p.jerseyNumber), 1) + 1,
      position: 'midfielder',
      positionDetail: 'Merkez Orta Saha',
      rating: 80,
      age: 23,
      status: 'fit',
      marketValue: 3000000,
      goals: 0,
      assists: 0,
      matchesPlayed: 0,
      minutesPlayed: 0,
      fitness: 100,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (player: PlayerData) => {
    setEditingPlayerId(player.id);
    setFormData({ ...player });
    setShowModal(true);
  };

  const handleSavePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Lütfen oyuncu ismini girin.');
      return;
    }

    if (editingPlayerId) {
      updatePlayer(editingPlayerId, formData);
      toast.success(`${formData.name} başarıyla güncellendi.`, {
        icon: <Check className="w-4 h-4 text-emerald-400" />,
      });
    } else {
      addPlayer(formData);
      toast.success(`${formData.name} kadroya eklendi.`, {
        icon: <Check className="w-4 h-4 text-emerald-400" />,
      });
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`${name} isimli oyuncuyu kadrodan silmek istediğinize emin misiniz?`)) {
      deletePlayer(id);
      toast.success(`${name} kadrodan çıkarıldı.`);
    }
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `€${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `€${(val / 1000).toFixed(0)}K`;
    return `€${val}`;
  };

  return (
    <div className="space-y-8">
      {/* 21st.dev Style Header with Action Button */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Futbolcu & Kadro Havuzu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kadro Yönetimi ({players.length} Oyuncu)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Oyuncu OVR puanları, piyasa değerleri, kondisyon durumları ve maç istatistikleri.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenAddModal}
          className="px-5 py-3 rounded-2xl font-black text-xs text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yeni Oyuncu Ekle</span>
        </motion.button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="İsim veya forma numarası ile ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Position Filter Tabs with layoutId */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/10">
          {positions.map((pos) => (
            <button
              key={pos.value}
              onClick={() => setSelectedPosition(pos.value)}
              className={`relative px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedPosition === pos.value ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {selectedPosition === pos.value && (
                <motion.div
                  layoutId="activePlayerTab"
                  className="absolute inset-0 rounded-lg bg-emerald-600 shadow-md border border-emerald-400/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{pos.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 21st.dev Style EA FC / FUT Holographic Player Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredPlayers.map((player) => {
            const isInjured = player.status === 'injured';
            const isSuspended = player.status === 'suspended';

            return (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-3xl p-6 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-white/10 hover:border-emerald-500/40 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
              >
                {/* Holographic metallic shine on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Top Bar: Jersey & Rating */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black flex items-center justify-center font-black text-base shadow-lg shadow-emerald-500/20">
                        #{player.jerseyNumber}
                      </div>
                      <div>
                        <div className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
                          {player.name}
                        </div>
                        <div className="text-xs font-bold text-slate-400">
                          {player.positionDetail} • {player.age} Yaş
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 font-mono">
                        {player.rating}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">OVR</span>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    {isInjured ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Sakat
                      </span>
                    ) : isSuspended ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        Cezalı
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Hazır & Sağlıklı
                      </span>
                    )}

                    <span className="text-[11px] font-mono font-bold text-slate-300 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {formatCurrency(player.marketValue)}
                    </span>
                  </div>

                  {/* Stat Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-white/5 mb-4 text-center">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">Gol</div>
                      <div className="text-sm font-black text-white">{player.goals}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">Asist</div>
                      <div className="text-sm font-black text-white">{player.assists}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">Maç</div>
                      <div className="text-sm font-black text-white">{player.matchesPlayed}</div>
                    </div>
                  </div>

                  {/* Fitness Bar */}
                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400" /> Kondisyon
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">%{player.fitness}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={`h-full transition-all ${
                          player.fitness >= 80 ? 'bg-emerald-500' : player.fitness >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${player.fitness}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenEditModal(player)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors text-xs font-bold flex items-center space-x-1.5"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Düzenle</span>
                  </button>

                  <button
                    onClick={() => handleDelete(player.id, player.name)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Kadro dışı bırak"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add / Edit Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/15 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-black text-white">
                  {editingPlayerId ? 'Oyuncu Profilini Güncelle' : 'Yeni Futbolcu Ekle'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePlayer} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">İsim & Soyisim</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Forma No</label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      required
                      value={formData.jerseyNumber}
                      onChange={(e) => setFormData({ ...formData, jerseyNumber: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Pozisyon Grubu</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="forward">Forvet</option>
                      <option value="midfielder">Orta Saha</option>
                      <option value="defender">Defans</option>
                      <option value="goalkeeper">Kaleci</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Mevki Detayı</label>
                    <input
                      type="text"
                      value={formData.positionDetail}
                      onChange={(e) => setFormData({ ...formData, positionDetail: e.target.value })}
                      placeholder="Örn: Santrafor, Stoper"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">OVR Puanı (50-99)</label>
                    <input
                      type="number"
                      min="50"
                      max="99"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 75 })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Yaş</label>
                    <input
                      type="number"
                      min="15"
                      max="45"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 22 })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Kondisyon (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.fitness}
                      onChange={(e) => setFormData({ ...formData, fitness: parseInt(e.target.value) || 100 })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black text-xs font-black shadow-lg shadow-emerald-500/25 transition-all"
                  >
                    {editingPlayerId ? 'Kaydet & Güncelle' : 'Kadroya Ekle'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
