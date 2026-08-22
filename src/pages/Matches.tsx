import { useState } from 'react';
import { useCoachifyStore, MatchData } from '../stores/coachifyStore';
import TacticBoard from '../components/tactic/TacticBoard';
import { Trophy, Calendar, MapPin, Users, Plus, Award, Activity, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Matches() {
  const { matches, addMatch, updateMatchScore } = useCoachifyStore();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'results' | 'tactic'>('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formData, setFormData] = useState<Omit<MatchData, 'id'>>({
    opponent: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    venue: 'Ali Sami Yen Spor Kompleksi',
    isHome: true,
    formation: '4-3-3',
    status: 'scheduled',
  });

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.opponent.trim()) {
      toast.error('Lütfen rakip takım adını girin.');
      return;
    }
    addMatch(formData);
    toast.success(`${formData.opponent} maçı fikstüre eklendi.`);
    setShowCreateModal(false);
  };

  const upcomingMatches = matches.filter((m) => m.status === 'scheduled');
  const finishedMatches = matches.filter((m) => m.status === 'finished');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Maç Merkezi & Fikstür</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gelecek maçlar, lig takvimi, biten maç skorları ve interaktif taktik tahtası.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Fikstüre Maç Ekle
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'upcoming', label: `🏆 Gelecek Maçlar (${upcomingMatches.length})` },
          { id: 'results', label: `📊 Biten Maçlar & Skorlar (${finishedMatches.length})` },
          { id: 'tactic', label: `⚽ Taktik Tahtası & İlk 11` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
              selectedTab === tab.id
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: UPCOMING MATCHES */}
      {selectedTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcomingMatches.map((match) => (
            <div
              key={match.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {match.isHome ? '🏠 Ev Sahibi' : '✈️ Deplasman'}
                </span>
                <span className="text-xs font-bold text-gray-400">{match.date} • {match.time}</span>
              </div>

              <div className="text-center py-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <div className="text-xs font-semibold text-gray-400">Rakip</div>
                <div className="text-xl font-black text-gray-900 dark:text-white mt-1">{match.opponent}</div>
                <div className="text-xs text-emerald-600 font-bold mt-1">Diziliş: {match.formation}</div>
              </div>

              <div className="text-xs text-gray-500 flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" /> {match.venue}
                </span>
                <button
                  onClick={() => setSelectedTab('tactic')}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  İlk 11'i Belirle →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: FINISHED RESULTS */}
      {selectedTab === 'results' && (
        <div className="space-y-4">
          {finishedMatches.map((match) => (
            <div
              key={match.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Bitti
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">{match.date} • {match.venue}</span>
                </div>
                <div className="text-xl font-black text-gray-900 dark:text-white tracking-wide">
                  Galatasaray <span className="text-emerald-600">{match.homeScore} - {match.awayScore}</span> {match.opponent}
                </div>
              </div>

              {match.events && match.events.length > 0 && (
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 space-y-1.5">
                  <div className="text-xs font-bold text-gray-500 mb-1">Maç Olayları:</div>
                  {match.events.map((ev, idx) => (
                    <div key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                      <span className="font-bold text-emerald-600">{ev.minute}'</span>
                      <span>{ev.type === 'goal' ? '⚽' : '🟨'} {ev.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: TACTIC BOARD */}
      {selectedTab === 'tactic' && (
        <div>
          <TacticBoard />
        </div>
      )}

      {/* Create Match Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Fikstüre Yeni Maç Ekle</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMatch} className="space-y-4 mt-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Rakip Takım</label>
                <input
                  type="text"
                  required
                  value={formData.opponent}
                  onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                  placeholder="Örn: Beşiktaş U21"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Tarih</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Saat</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Saha Türü</label>
                  <select
                    value={formData.isHome ? 'home' : 'away'}
                    onChange={(e) => setFormData({ ...formData, isHome: e.target.value === 'home' })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option value="home">İç Saha (Ev Sahibi)</option>
                    <option value="away">Deplasman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Varsayılan Diziliş</label>
                  <select
                    value={formData.formation}
                    onChange={(e) => setFormData({ ...formData, formation: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option value="4-3-3">4-3-3</option>
                    <option value="4-4-2">4-4-2</option>
                    <option value="4-2-3-1">4-2-3-1</option>
                    <option value="3-5-2">3-5-2</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Stadyum / Tesis</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-lg"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow"
                >
                  Fikstüre Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
