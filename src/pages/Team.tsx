import React, { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { Users, Shield, Award, Activity, Search, Filter, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Team() {
  const { players, tactic } = useCoachifyStore();
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'goalkeeper' | 'defender' | 'midfielder' | 'forward'>('all');

  const groups = [
    { key: 'all', label: 'Tüm Kadro', count: players.length },
    { key: 'goalkeeper', label: 'Kaleciler', count: players.filter((p) => p.position === 'goalkeeper').length },
    { key: 'defender', label: 'Defans Hattı', count: players.filter((p) => p.position === 'defender').length },
    { key: 'midfielder', label: 'Orta Saha', count: players.filter((p) => p.position === 'midfielder').length },
    { key: 'forward', label: 'Hücum Hattı', count: players.filter((p) => p.position === 'forward').length },
  ];

  const filteredPlayers = players.filter((p) => {
    if (selectedGroup === 'all') return true;
    return p.position === selectedGroup;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Kadro Derinliği & Diziliş ({tactic.formation})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">A Takım Kadro Derinliği</h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Mevki bazlı alternatifler, fiziksel kondisyon durumları ve ilk 11 planlaması.
          </p>
        </div>

        <Link
          to="/matches"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-1.5"
        >
          <Shield className="w-4 h-4" />
          <span>Taktik Tahtasına Git</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Position Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {groups.map((grp) => (
          <button
            key={grp.key}
            onClick={() => setSelectedGroup(grp.key as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedGroup === grp.key
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/80 text-neutral-400 border border-white/[0.08] hover:text-white hover:bg-slate-900'
            }`}
          >
            {grp.label} ({grp.count})
          </button>
        ))}
      </div>

      {/* Roster Table */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-neutral-400 font-semibold border-b border-white/[0.06]">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Futbolcu</th>
                <th className="p-4">Mevki</th>
                <th className="p-4">Yaş</th>
                <th className="p-4">OVR</th>
                <th className="p-4">Kondisyon</th>
                <th className="p-4">Gol / Asist</th>
                <th className="p-4">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-neutral-300">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono font-bold text-emerald-400">#{player.jerseyNumber}</td>
                  <td className="p-4 font-bold text-white text-sm">{player.name}</td>
                  <td className="p-4 text-neutral-400">{player.positionDetail}</td>
                  <td className="p-4 text-neutral-300">{player.age}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {player.rating}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-white/[0.06]">
                        <div
                          className={`h-full ${player.fitness > 80 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                          style={{ width: `${player.fitness}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">%{player.fitness}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">{player.goals} / {player.assists}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                        player.status === 'fit'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {player.status === 'fit' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {player.status === 'fit' ? 'Hazır' : 'Sakat'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
