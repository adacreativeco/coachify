import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoachifyStore } from '../stores/coachifyStore';
import { Calendar, Clock, MapPin, Users, Plus, CheckCircle2, AlertCircle, Check, X, ShieldAlert, Sparkles, Activity, Target, Shield, CheckCheck } from 'lucide-react';
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
    tactical: { label: 'Taktik & Diziliş', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    conditioning: { label: 'Kondisyon & Dayanıklılık', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    technical: { label: 'Teknik & Pas', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    shooting: { label: 'Bitiricilik & Şut', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    goalkeeping: { label: 'Kaleci Özel', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Antrenman & Seans Yönetimi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Antrenman & Performans Merkezi
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Haftalık antrenman seansları, odak analizleri ve tek tıkla canlı kadro yoklaması.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Antrenman Planla</span>
        </button>
      </div>

      {/* Tab Navigation with Framer Motion layoutId */}
      <div className="flex space-x-2 p-1 bg-slate-900/80 rounded-xl border border-white/[0.08] w-fit">
        {[
          { id: 'schedule', label: 'Antrenman Takvimi', icon: Calendar },
          { id: 'attendance', label: 'Canlı Yoklama & Devamlılık', icon: CheckCheck },
          { id: 'plans', label: 'Taktik ve Çalışma Planları', icon: Target },
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
                  layoutId="activeTrainingTab"
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

      {/* TAB 1: SCHEDULE */}
      {selectedTab === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((session) => {
            const focus = focusLabels[session.focus] || focusLabels.tactical;
            const attendeesCount = Object.values(session.attendance).filter((s) => s === 'present').length;

            return (
              <motion.div
                key={session.id}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-slate-900/80 border border-white/[0.08] hover:border-emerald-500/30 backdrop-blur-2xl shadow-xl space-y-4 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${focus.color}`}>
                    {focus.label}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {session.date}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{session.title}</h3>
                  <div className="flex items-center space-x-2 text-xs text-neutral-400 mt-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{session.time} • {session.durationMinutes} Dakika</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-neutral-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="truncate">{session.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-neutral-400 text-[11px]">
                    Katılım: <strong className="text-emerald-400 font-mono">{attendeesCount} / {players.length}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setActiveTrainingId(session.id);
                      setSelectedTab('attendance');
                    }}
                    className="text-emerald-400 font-semibold hover:text-emerald-300"
                  >
                    Yoklama Al →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB 2: ATTENDANCE */}
      {selectedTab === 'attendance' && activeTraining && (
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-2xl shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
            <div>
              <h2 className="text-lg font-bold text-white">{activeTraining.title} — Yoklama Çizelgesi</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Tarih: {activeTraining.date} • Saat: {activeTraining.time} • Konum: {activeTraining.location}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-neutral-400">Seans Seçin:</span>
              <select
                value={activeTrainingId}
                onChange={(e) => setActiveTrainingId(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 text-white rounded-xl text-xs font-medium border border-white/[0.08] focus:outline-none"
              >
                {trainings.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.date})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="space-y-2">
            {players.map((p) => {
              const currentStatus = activeTraining.attendance[p.id] || 'present';
              return (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04] flex flex-wrap items-center justify-between gap-3 hover:border-white/[0.08] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                      #{p.jerseyNumber}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{p.name}</div>
                      <div className="text-[10px] text-neutral-500">{p.positionDetail} • Kondisyon %{p.fitness}</div>
                    </div>
                  </div>

                  {/* Attendance Selector Buttons */}
                  <div className="flex space-x-1.5">
                    {[
                      { status: 'present', label: 'Katıldı', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                      { status: 'excused', label: 'İzinli', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                      { status: 'injured', label: 'Sakat', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
                      { status: 'absent', label: 'Gelmedi', color: 'bg-slate-800 text-neutral-400 border-white/[0.06]' },
                    ].map((item) => (
                      <button
                        key={item.status}
                        onClick={() => {
                          setPlayerAttendance(activeTraining.id, p.id, item.status as any);
                          toast.success(`${p.name} yoklama durumu: ${item.label}`);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                          currentStatus === item.status
                            ? `${item.color} shadow-sm`
                            : 'bg-slate-900 border-white/[0.04] text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DRILL PLANS */}
      {selectedTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/[0.08] space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>4-3-3 Kanat Geçiş & Yüksek Pres Çalışması</span>
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Ön alan baskısı kurulduğunda kanat forvetlerin ve beklerin senkronize bindirmesi ve 3. bölgede top kazanma drilleri.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/[0.08] space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>HIIT Kondisyon & Laktat Toparlanma İstasyonu</span>
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Yüksek tempolu maç temposunu simüle eden aralıklı koşular ve sakatlık önleyici toparlanma seansı.
            </p>
          </div>
        </div>
      )}

      {/* Create Training Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/[0.1] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-sm text-white">Yeni Antrenman Planla</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTraining} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Seans Başlığı</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: Taktiksel Maç Öncesi Ter İdmanı"
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
                  <label className="block text-neutral-300 font-medium mb-1">Süre (Dk)</label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 90 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Ana Odak</label>
                  <select
                    value={formData.focus}
                    onChange={(e) => setFormData({ ...formData, focus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="tactical">Taktik & Diziliş</option>
                    <option value="conditioning">Kondisyon</option>
                    <option value="technical">Teknik / Pas</option>
                    <option value="shooting">Bitiricilik</option>
                    <option value="goalkeeping">Kaleci Özel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Saha / Tesis</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
