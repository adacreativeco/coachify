import React, { useState } from 'react';
import { useCoachifyStore } from '../../stores/coachifyStore';
import { DollarSign, TrendingUp, Users, Building2, Plus, X, Crown, ArrowUpRight, ArrowDownRight, Wallet, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PresidentDashboard() {
  const { players, financials, addFinancialEntry } = useCoachifyStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'income' as const,
    category: 'sponsorship' as const,
    amount: 1000000,
    date: new Date().toISOString().split('T')[0],
    status: 'completed' as const,
  });

  const totalSquadValue = players.reduce((acc, p) => acc + p.marketValue, 0);
  const totalIncome = financials.filter((f) => f.type === 'income').reduce((acc, f) => acc + f.amount, 0);
  const totalExpense = financials.filter((f) => f.type === 'expense').reduce((acc, f) => acc + f.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const handleAddFinancial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Lütfen işlem başlığını girin.');
      return;
    }
    addFinancialEntry(formData);
    toast.success('Finansal işlem başarıyla kaydedildi.');
    setShowAddModal(false);
  };

  const formatEuro = (val: number) => `€${(val / 1000000).toFixed(1)}M`;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border border-amber-500/20 p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Crown className="w-3.5 h-3.5" />
            <span>Kulüp Başkanı Finans & Transfer Masası</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Sayın Başkan, Hoş Geldiniz</h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Kulüp toplam kadro değeri <strong className="text-white font-mono">{formatEuro(totalSquadValue)}</strong>, net kasa dengesi <strong className="text-emerald-400 font-mono">+{formatEuro(netBalance)}</strong>.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="relative z-10 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Gelir / Gider Ekle</span>
        </button>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-white/[0.15]">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Toplam Kadro Değeri</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{formatEuro(totalSquadValue)}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">{players.length} Sözleşmeli Oyuncu</div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-white/[0.15]">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Dönem Gelirleri</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{formatEuro(totalIncome)}</div>
          <div className="text-[11px] text-blue-400 font-medium mt-1">Sponsorluk & Maç Geliri</div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-white/[0.15]">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Dönem Giderleri</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{formatEuro(totalExpense)}</div>
          <div className="text-[11px] text-rose-400 font-medium mt-1">Maaş & Tesis Bütçesi</div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-white/[0.15]">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Net Kasa Dengesi</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">+{formatEuro(netBalance)}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Pozitif Likidite
          </div>
        </div>
      </div>

      {/* Financial Transactions Log */}
      <div className="bg-slate-900/80 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>Kulüp Finansal Defteri</span>
        </h3>

        <div className="divide-y divide-white/[0.06]">
          {financials.map((f) => (
            <div key={f.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${f.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                  {f.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{f.title}</div>
                  <div className="text-neutral-500 text-[11px] mt-0.5">{f.date} • Kategori: {f.category}</div>
                </div>
              </div>
              <div className={`font-mono font-bold text-sm ${f.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {f.type === 'income' ? '+' : '-'}{formatEuro(f.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Financial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/[0.1] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-sm text-white">Yeni Finansal İşlem Kaydet</h3>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFinancial} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">İşlem Açıklaması</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: Yeni Sponsorluk Anlaşması"
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Tür</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="income">Gelir (+)</option>
                    <option value="expense">Gider (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Tutar (EUR)</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2.5 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
