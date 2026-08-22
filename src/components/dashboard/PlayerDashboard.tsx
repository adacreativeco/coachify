import React from 'react';
import { useCoachifyStore } from '../../stores/coachifyStore';
import { Award, Zap, Activity, Calendar, Trophy, ArrowRight, UserCheck, Shield, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlayerDashboard() {
  const { players, matches, trainings } = useCoachifyStore();

  const player = players.find((p) => p.name.includes('Osimhen')) || players[0];
  const nextMatch = matches.find((m) => m.status === 'scheduled');
  const nextTraining = trainings.find((t) => t.status === 'scheduled');

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-blue-500/20 p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg border border-amber-300">
            #{player.jerseyNumber}
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-1">
              <UserCheck className="w-3 h-3" />
              <span>Futbolcu Portalı</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{player.name}</h1>
            <p className="text-neutral-400 text-xs mt-0.5">
              {player.positionDetail} • {player.age} Yaş • Piyasa Değeri: €{(player.marketValue / 1000000).toFixed(0)}M
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs text-neutral-400 font-medium">EA FC OVR Reytingi</div>
            <div className="text-3xl font-extrabold font-mono text-amber-400">{player.rating}</div>
          </div>
        </div>
      </div>

      {/* Individual Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-5 text-center backdrop-blur-xl">
          <div className="text-xs font-medium text-neutral-400">Atılan Goller</div>
          <div className="text-3xl font-bold font-mono text-emerald-400 mt-2">{player.goals}</div>
          <div className="text-[11px] text-neutral-500 mt-1">{player.matchesPlayed} Resmi Maçta</div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-5 text-center backdrop-blur-xl">
          <div className="text-xs font-medium text-neutral-400">Asistler</div>
          <div className="text-3xl font-bold font-mono text-blue-400 mt-2">{player.assists}</div>
          <div className="text-[11px] text-neutral-500 mt-1">Kilit Pas Katkısı</div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-5 text-center backdrop-blur-xl">
          <div className="text-xs font-medium text-neutral-400">Kondisyon Seviyesi</div>
          <div className="text-3xl font-bold font-mono text-amber-400 mt-2">%{player.fitness}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">İlk 11'e Hazır</div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-5 text-center backdrop-blur-xl">
          <div className="text-xs font-medium text-neutral-400">Sahada Kalınan Süre</div>
          <div className="text-3xl font-bold font-mono text-indigo-400 mt-2">{player.minutesPlayed}'</div>
          <div className="text-[11px] text-neutral-500 mt-1">Toplam Dakika</div>
        </div>
      </div>

      {/* Upcoming Schedule Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Sıradaki Antrenmanın</span>
          </h3>
          {nextTraining ? (
            <div className="p-4 bg-slate-950/80 border border-white/[0.06] rounded-xl text-xs space-y-1.5">
              <div className="font-bold text-sm text-white">{nextTraining.title}</div>
              <div className="text-neutral-400">{nextTraining.date} • {nextTraining.time} • {nextTraining.location}</div>
              <div className="text-emerald-400 font-semibold font-mono">Odak: {nextTraining.focus.toUpperCase()}</div>
            </div>
          ) : (
            <div className="text-xs text-neutral-500 py-6 text-center">Antrenman takvimi boş.</div>
          )}
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Sıradaki Karşılaşma</span>
          </h3>
          {nextMatch ? (
            <div className="p-4 bg-slate-950/80 border border-white/[0.06] rounded-xl text-xs space-y-1.5">
              <div className="font-bold text-sm text-white">vs {nextMatch.opponent}</div>
              <div className="text-neutral-400">{nextMatch.venue} • {nextMatch.date} ({nextMatch.time})</div>
              <div className="text-blue-400 font-semibold font-mono">Maç Planı Aktif</div>
            </div>
          ) : (
            <div className="text-xs text-neutral-500 py-6 text-center">Planlanmış maç bulunmuyor.</div>
          )}
        </div>
      </div>
    </div>
  );
}
