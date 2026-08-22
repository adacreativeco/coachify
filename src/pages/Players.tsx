import { useState } from 'react';
import { useCoachifyStore, PlayerData } from '../stores/coachifyStore';
import { Users, UserPlus, Search, Filter, Activity, TrendingUp, Edit, Trash2, X, Check, ShieldAlert } from 'lucide-react';
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
    { value: 'all', label: 'Tüm Pozisyonlar' },
    { value: 'goalkeeper', label: 'Kaleciler' },
    { value: 'defender', label: 'Defanslar' },
    { value: 'midfielder', label: 'Orta Sahalar' },
    { value: 'forward', label: 'Forvetler' },
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
      toast.success(`${formData.name} başarıyla güncellendi.`);
    } else {
      addPlayer(formData);
      toast.success(`${formData.name} kadroya eklendi.`);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Kadro & Oyuncu Yönetimi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Toplam {players.length} lisanslı oyuncu • {players.filter((p) => p.status === 'injured').length} sakat • {players.filter((p) => p.status === 'fit').length} hazır
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center px-4 py-2.5 rounded-lg shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Yeni Oyuncu Ekle
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Oyuncu adı veya forma no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
            />
          </div>

          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-medium"
          >
            {positions.map((pos) => (
              <option key={pos.value} value={pos.value}>
                {pos.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-medium"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="fit">✅ Hazır (Fit)</option>
            <option value="injured">🩹 Sakat</option>
            <option value="suspended">🟥 Cezalı</option>
            <option value="resting">⏱️ Dinlendiriliyor</option>
          </select>
        </div>

        <div className="text-xs font-bold text-gray-500">
          Gösterilen: <span className="text-emerald-600">{filteredPlayers.length}</span> / {players.length}
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredPlayers.map((player) => {
          const isInjured = player.status === 'injured';
          return (
            <div
              key={player.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div className="p-5">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-sm flex items-center justify-center border border-emerald-300 dark:border-emerald-800">
                    #{player.jerseyNumber}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {player.rating} OVR
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isInjured
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {isInjured ? 'Sakat' : 'Hazır'}
                    </span>
                  </div>
                </div>

                {/* Player Name & Detail */}
                <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">{player.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{player.positionDetail} • {player.age} Yaş</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 text-center text-xs">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                    <div className="text-[10px] text-gray-400 font-semibold">Gol / Asist</div>
                    <div className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{player.goals} / {player.assists}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                    <div className="text-[10px] text-gray-400 font-semibold">Maç / Dk</div>
                    <div className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{player.matchesPlayed} ({player.minutesPlayed}')</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                    <div className="text-[10px] text-gray-400 font-semibold">Değer</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{formatCurrency(player.marketValue)}</div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/40 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs">
                <span className="text-gray-400">Kondisyon: <strong className="text-gray-700 dark:text-gray-300">%{player.fitness}</strong></span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(player)}
                    className="p-1.5 rounded text-gray-500 hover:text-emerald-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(player.id, player.name)}
                    className="p-1.5 rounded text-gray-500 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {editingPlayerId ? 'Oyuncu Profilini Düzenle' : 'Yeni Oyuncu Kaydı'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlayer} className="space-y-4 mt-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Forma No</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={formData.jerseyNumber}
                    onChange={(e) => setFormData({ ...formData, jerseyNumber: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Yaş</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 20 })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Mevki Grubu</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option value="goalkeeper">Kaleci</option>
                    <option value="defender">Defans</option>
                    <option value="midfielder">Orta Saha</option>
                    <option value="forward">Forvet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pozisyon Detayı</label>
                  <input
                    type="text"
                    value={formData.positionDetail}
                    onChange={(e) => setFormData({ ...formData, positionDetail: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    placeholder="Örn: Sol Bek"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">OVR Rating (1-99)</label>
                  <input
                    type="number"
                    min="50"
                    max="99"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 75 })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Sağlık Durumu</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option value="fit">Hazır</option>
                    <option value="injured">Sakat</option>
                    <option value="suspended">Cezalı</option>
                    <option value="resting">Dinlendiriliyor</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-lg"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow"
                >
                  {editingPlayerId ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
