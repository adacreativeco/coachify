import { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { Users, Shield, Award, Activity, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">A Takım Kadro Derinliği</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Mevki derinlik analizleri, form durumu ve aktif ilk 11 dizilişi ({tactic.formation}).
          </p>
        </div>

        <Link
          to="/matches"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-sm flex items-center"
        >
          <Shield className="w-4 h-4 mr-2" /> Taktik Tahtasına Git
        </Link>
      </div>

      {/* Position Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {groups.map((grp) => (
          <button
            key={grp.key}
            onClick={() => setSelectedGroup(grp.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedGroup === grp.key
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {grp.label} ({grp.count})
          </button>
        ))}
      </div>

      {/* Roster Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 font-bold border-b border-gray-200 dark:border-gray-700">
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
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 font-medium">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="p-4 font-black text-emerald-600">#{player.jerseyNumber}</td>
                  <td className="p-4 font-bold text-gray-900 dark:text-white text-sm">{player.name}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">{player.positionDetail}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{player.age}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded font-black text-[11px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {player.rating}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full ${player.fitness > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${player.fitness}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">%{player.fitness}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gray-800 dark:text-gray-200">{player.goals} / {player.assists}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        player.status === 'fit'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
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
