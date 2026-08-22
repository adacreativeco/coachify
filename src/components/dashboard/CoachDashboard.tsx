import { useCoachifyStore } from '../../stores/coachifyStore';
import { Users, Calendar, Trophy, AlertTriangle, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoachDashboard() {
  const { players, matches, trainings } = useCoachifyStore();

  const nextMatch = matches.find((m) => m.status === 'scheduled');
  const upcomingTrainings = trainings.filter((t) => t.status === 'scheduled');
  const injuredPlayers = players.filter((p) => p.status === 'injured');
  const avgFitness = Math.round(players.reduce((acc, p) => acc + p.fitness, 0) / players.length);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold mb-2">
              📋 Teknik Heyet Yönetim Paneli
            </div>
            <h1 className="text-2xl font-black">Hoş Geldin, Hocam!</h1>
            <p className="text-emerald-100 text-sm mt-1">
              Takımın genel kondisyon ortalaması <strong className="text-amber-300">%{avgFitness}</strong> seviyesinde. Haftalık antrenman programı plana uygun ilerliyor.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/matches"
              className="px-4 py-2 bg-white text-emerald-900 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-colors shadow"
            >
              İlk 11 & Taktik Tahtası →
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Toplam Kadro</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">{players.length} Oyuncu</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">
            {players.filter((p) => p.status === 'fit').length} Maça Hazır
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Sakatlık Durumu</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">{injuredPlayers.length} Oyuncu</div>
          <div className="text-[11px] text-red-500 font-bold mt-1">Tedavileri Sürüyor</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Planlanan Antrenman</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">{upcomingTrainings.length} Seans</div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">Bu Hafta İçi</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Kondisyon Ortalaması</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">%{avgFitness}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">Optimum Seviye</div>
        </div>
      </div>

      {/* Next Match & Injuries Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Match Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-amber-500" /> Bir Sonraki Karşılaşma
            </h3>
            <Link to="/matches" className="text-xs font-bold text-emerald-600 hover:underline">
              Fikstür →
            </Link>
          </div>

          {nextMatch ? (
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-5 text-center space-y-3">
              <div className="text-xs text-gray-400 font-bold">{nextMatch.venue} • {nextMatch.date} ({nextMatch.time})</div>
              <div className="text-xl font-black text-gray-900 dark:text-white">
                Galatasaray <span className="text-emerald-600">vs</span> {nextMatch.opponent}
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                Taktik Diziliş: {nextMatch.formation}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-400 text-center py-6">Planlanmış maç bulunmuyor.</div>
          )}
        </div>

        {/* Injured Players Radar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-red-500" /> Sakatlık & Tedavi Raporu
            </h3>
            <span className="text-xs font-bold text-red-600">{injuredPlayers.length} Oyuncu</span>
          </div>

          <div className="space-y-2">
            {injuredPlayers.map((player) => (
              <div key={player.id} className="p-3 bg-red-50 dark:bg-red-950/30 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{player.name}</div>
                  <div className="text-gray-500">{player.positionDetail} • Kondisyon: %{player.fitness}</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-red-200 text-red-800 font-bold text-[10px]">
                  Tedavide
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
