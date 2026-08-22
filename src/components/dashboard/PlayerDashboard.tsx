import { useCoachifyStore } from '../../stores/coachifyStore';
import { Award, Zap, Activity, Calendar, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlayerDashboard() {
  const { players, matches, trainings } = useCoachifyStore();

  // Find player profile (default to Osimhen)
  const player = players.find((p) => p.name.includes('Osimhen')) || players[0];
  const nextMatch = matches.find((m) => m.status === 'scheduled');
  const nextTraining = trainings.find((t) => t.status === 'scheduled');

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-2xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-black font-black text-2xl flex items-center justify-center shadow-lg border-2 border-white">
            #{player.jerseyNumber}
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold mb-1">
              ⚽ Futbolcu Portali
            </div>
            <h1 className="text-2xl font-black">{player.name}</h1>
            <p className="text-blue-100 text-xs">
              {player.positionDetail} • {player.age} Yaş • Piyasa Değeri: €{(player.marketValue / 1000000).toFixed(0)}M
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs text-blue-200 font-bold">OVR Puanı</div>
            <div className="text-3xl font-black text-amber-300">{player.rating}</div>
          </div>
        </div>
      </div>

      {/* Individual Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xs font-bold text-gray-400">Atılan Goller</div>
          <div className="text-3xl font-black text-emerald-600 mt-2">{player.goals}</div>
          <div className="text-[11px] text-gray-500 mt-1">{player.matchesPlayed} Maçta</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xs font-bold text-gray-400">Asistler</div>
          <div className="text-3xl font-black text-blue-600 mt-2">{player.assists}</div>
          <div className="text-[11px] text-gray-500 mt-1">Kilit Pas Başarısı</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xs font-bold text-gray-400">Kondisyon Seviyesi</div>
          <div className="text-3xl font-black text-amber-500 mt-2">%{player.fitness}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">Maça Hazır</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xs font-bold text-gray-400">Süre</div>
          <div className="text-3xl font-black text-purple-600 mt-2">{player.minutesPlayed}'</div>
          <div className="text-[11px] text-gray-500 mt-1">Sahada Kalınan Dk</div>
        </div>
      </div>

      {/* Upcoming Schedule Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-emerald-600" /> Sıradaki Antrenmanın
          </h3>
          {nextTraining ? (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-xs space-y-1.5">
              <div className="font-bold text-sm text-gray-900 dark:text-white">{nextTraining.title}</div>
              <div className="text-gray-500">{nextTraining.date} • {nextTraining.time} • {nextTraining.location}</div>
              <div className="text-emerald-600 font-bold">Odak: {nextTraining.focus.toUpperCase()}</div>
            </div>
          ) : (
            <div className="text-xs text-gray-400">Antrenman takvimi boş.</div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
            <Trophy className="w-4 h-4 mr-2 text-amber-500" /> Sıradaki Karşılaşma
          </h3>
          {nextMatch ? (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-xs space-y-1.5">
              <div className="font-bold text-sm text-gray-900 dark:text-white">vs {nextMatch.opponent}</div>
              <div className="text-gray-500">{nextMatch.venue} • {nextMatch.date} ({nextMatch.time})</div>
              <div className="text-blue-600 font-bold">İlk 11 Planı Hazırlandı</div>
            </div>
          ) : (
            <div className="text-xs text-gray-400">Maç takvimi boş.</div>
          )}
        </div>
      </div>
    </div>
  );
}
