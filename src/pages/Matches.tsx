import React, { useState } from 'react';
import { useCoachifyStore, MatchData } from '../stores/coachifyStore';
import TacticBoard from '../components/tactic/TacticBoard';
import { Trophy, Calendar, MapPin, Users, Plus, Award, Activity, X, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Fikstür & Taktik Yönetimi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Maç Merkezi & Fikstür</h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Gelecek karşılaşmalar, lig takvimi, biten maç skorları ve interaktif taktik tahtası.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Fikstüre Maç Ekle</span>
        </button>
      </div>

      {/* Tabs with layoutId */}
      <div className="flex space-x-2 p-1 bg-slate-900/80 rounded-xl border border-white/[0.08] w-fit">
        {[
          { id: 'upcoming', label: `Gelecek Maçlar (${upcomingMatches.length})`, icon: Calendar },
          { id: 'results', label: `Biten Maçlar (${finishedMatches.length})`, icon: Trophy },
          { id: 'tactic', label: `Taktik Tahtası & İlk 11`, icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1.5 ${
                isActive ? 'text-slate-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMatchTab"
                  className="absolute inset-0 rounded-lg bg-emerald-400 shadow"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: UPCOMING MATCHES */}
      {selectedTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcomingMatches.map((match) => (
            <div
              key={match.id}
              className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 space-y-4 hover:border-emerald-500/30 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {match.isHome ? 'İç Saha' : 'Deplasman'}
                </span>
                <span className="text-xs font-mono text-neutral-400">{match.date} • {match.time}</span>
              </div>

              <div className="text-center py-4 bg-slate-950/80 border border-white/[0.06] rounded-xl">
                <div className="text-[11px] text-neutral-500">Rakip Takım</div>
                <div className="text-xl font-bold text-white mt-1">{match.opponent}</div>
                <div className="text-xs text-emerald-400 font-mono font-medium mt-1">Diziliş: {match.formation}</div>
              </div>

              <div className="text-xs text-neutral-400 flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <span className="flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" /> {match.venue}
                </span>
                <button
                  onClick={() => setSelectedTab('tactic')}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>İlk 11'i Belirle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
              className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 space-y-4 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Bitti
                  </span>
                  <span className="text-xs text-neutral-500">{match.date} • {match.venue}</span>
                </div>
                <div className="text-xl font-bold text-white">
                  Galatasaray SK <span className="text-emerald-400 font-mono font-bold mx-2">{match.homeScore} - {match.awayScore}</span> {match.opponent}
                </div>
              </div>

              {match.events && match.events.length > 0 && (
                <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-semibold text-neutral-400 mb-1">Maç Olayları:</div>
                  {match.events.map((ev, idx) => (
                    <div key={idx} className="text-xs text-neutral-300 flex items-center space-x-2">
                      <span className="font-mono font-bold text-emerald-400">{ev.minute}'</span>
                      <span>{ev.description}</span>
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/[0.1] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-sm text-white">Fikstüre Yeni Maç Ekle</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMatch} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Rakip Takım</label>
                <input
                  type="text"
                  required
                  value={formData.opponent}
                  onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                  placeholder="Örn: Beşiktaş U21"
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Tarih</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Saat</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Saha Türü</label>
                  <select
                    value={formData.isHome ? 'home' : 'away'}
                    onChange={(e) => setFormData({ ...formData, isHome: e.target.value === 'home' })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="home">İç Saha (Ev Sahibi)</option>
                    <option value="away">Deplasman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Varsayılan Diziliş</label>
                  <select
                    value={formData.formation}
                    onChange={(e) => setFormData({ ...formData, formation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="4-3-3">4-3-3</option>
                    <option value="4-4-2">4-4-2</option>
                    <option value="4-2-3-1">4-2-3-1</option>
                    <option value="3-5-2">3-5-2</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Stadyum / Tesis</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2.5 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow"
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
