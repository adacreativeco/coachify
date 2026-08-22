import { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { Calendar, Clock, MapPin, Users, Plus, CheckCircle2, AlertCircle, Check, X, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export default function Training() {
  const { trainings, players, addTraining, setPlayerAttendance } = useCoachifyStore();
  const [selectedTab, setSelectedTab] = useState<'schedule' | 'attendance' | 'plans'>('schedule');
  const [activeTrainingId, setActiveTrainingId] = useState<string>(trainings[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '17:00',
    durationMinutes: 90,
    focus: 'tactical' as const,
    location: 'Florya Metin Oktay Tesisleri - 1 Nolu Saha',
    coach: 'Okan Buruk',
    status: 'scheduled' as const,
  });

  const handleCreateTraining = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Lütfen antrenman başlığı girin.');
      return;
    }
    addTraining(formData);
    toast.success('Yeni antrenman programı oluşturuldu.');
    setShowCreateModal(false);
  };

  const activeTraining = trainings.find((t) => t.id === activeTrainingId) || trainings[0];

  const focusLabels = {
    tactical: { label: 'Taktik & Diziliş', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
    conditioning: { label: 'Kondisyon & Dayanıklılık', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
    technical: { label: 'Teknik & Pas', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
    shooting: { label: 'Bitiricilik & Şut', color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' },
    goalkeeping: { label: 'Kaleci Özel', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Antrenman & Performans Merkezi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Haftalık antrenman seansları, odak analizleri ve oyuncu devamlılık yoklamaları.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Antrenman Planla
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'schedule', label: '📅 Antrenman Takvimi' },
          { id: 'attendance', label: '📋 Canlı Yoklama & Devamlılık' },
          { id: 'plans', label: '🎯 Taktik ve Çalışma Planları' },
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

      {/* TAB 1: SCHEDULE */}
      {selectedTab === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainings.map((session) => {
            const focus = focusLabels[session.focus] || focusLabels.tactical;
            const attendeesCount = Object.values(session.attendance).filter((s) => s === 'present').length;

            return (
              <div
                key={session.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${focus.color}`}>
                    {focus.label}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {session.durationMinutes} Dakika
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{session.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" /> {session.location}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{session.date} • {session.time}</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTrainingId(session.id);
                      setSelectedTab('attendance');
                    }}
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    Yoklama Al ({attendeesCount}/{players.length}) →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: ATTENDANCE ROLL CALL */}
      {selectedTab === 'attendance' && activeTraining && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Yoklama: {activeTraining.title}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {activeTraining.date} • {activeTraining.time} • {activeTraining.location}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-gray-500">Seans Seçin:</span>
              <select
                value={activeTrainingId}
                onChange={(e) => setActiveTrainingId(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                {trainings.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.date})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Player Roll Call Rows */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[500px] overflow-y-auto pr-2">
            {players.map((player) => {
              const currentStatus = activeTraining.attendance[player.id] || (player.status === 'injured' ? 'injured' : 'present');

              return (
                <div key={player.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 font-bold text-xs flex items-center justify-center text-gray-700 dark:text-gray-200">
                      #{player.jerseyNumber}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{player.name}</div>
                      <div className="text-xs text-gray-400">{player.positionDetail}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {[
                      { key: 'present', label: 'Katıldı', icon: Check, color: 'hover:bg-emerald-500 hover:text-white text-emerald-600 border-emerald-300 active-bg-emerald-600' },
                      { key: 'excused', label: 'İzinli', icon: Clock, color: 'hover:bg-blue-500 hover:text-white text-blue-600 border-blue-300' },
                      { key: 'injured', label: 'Sakat', icon: AlertCircle, color: 'hover:bg-red-500 hover:text-white text-red-600 border-red-300' },
                      { key: 'absent', label: 'Gelmedi', icon: X, color: 'hover:bg-gray-500 hover:text-white text-gray-600 border-gray-300' },
                    ].map((st) => (
                      <button
                        key={st.key}
                        onClick={() => {
                          setPlayerAttendance(activeTraining.id, player.id, st.key as any);
                          toast.success(`${player.name}: ${st.label}`);
                        }}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-all ${
                          currentStatus === st.key
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                            : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Yeni Antrenman Seansı Planla</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTraining} className="space-y-4 mt-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Seans Başlığı</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: Duran Top ve Kontra Atak Çalışması"
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
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Süre (Dk)</label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 90 })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Odak Alanı</label>
                  <select
                    value={formData.focus}
                    onChange={(e) => setFormData({ ...formData, focus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option value="tactical">Taktik & Diziliş</option>
                    <option value="conditioning">Kondisyon</option>
                    <option value="technical">Teknik & Pas</option>
                    <option value="shooting">Şut & Bitiricilik</option>
                    <option value="goalkeeping">Kaleci Özel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Tesis / Saha</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                  Planla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
