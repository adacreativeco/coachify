import { useState } from 'react';
import { useCoachifyStore } from '../../stores/coachifyStore';
import { DollarSign, TrendingUp, Users, Building, Plus, X } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-amber-600 to-amber-900 rounded-2xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-amber-400/30 text-amber-100 text-xs font-bold mb-2">
            👑 Kulüp Başkanı Yönetim Paneli
          </div>
          <h1 className="text-2xl font-black">Sayın Başkan, Hoş Geldiniz</h1>
          <p className="text-amber-100 text-sm mt-1">
            Kulüp toplam kadro değeri <strong className="text-white">{formatEuro(totalSquadValue)}</strong>, net kasa dengesi <strong className="text-emerald-300">+{formatEuro(netBalance)}</strong>.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-white text-amber-900 rounded-xl font-bold text-xs hover:bg-amber-50 shadow flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Yeni Gelir / Gider Ekle
        </button>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Toplam Kadro Değeri</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">{formatEuro(totalSquadValue)}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">22 Sözleşmeli Oyuncu</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Dönem Gelirleri</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">{formatEuro(totalIncome)}</div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">Sponsorluk & Bilet</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Dönem Giderleri</span>
            <DollarSign className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">{formatEuro(totalExpense)}</div>
          <div className="text-[11px] text-red-500 font-bold mt-1">Maaş & Operasyon</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Net Kasa Dengesi</span>
            <Building className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">+{formatEuro(netBalance)}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">Pozitif Likidite</div>
        </div>
      </div>

      {/* Financial Transactions Log */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
        <h3 className="font-bold text-base text-gray-900 dark:text-white">Son Finansal İşlemler</h3>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {financials.map((f) => (
            <div key={f.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{f.title}</div>
                <div className="text-gray-400 mt-0.5">{f.date} • Kategori: {f.category}</div>
              </div>
              <div className={`font-black text-sm ${f.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                {f.type === 'income' ? '+' : '-'}{formatEuro(f.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Financial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Yeni Finansal İşlem Kaydet</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFinancial} className="space-y-4 mt-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">İşlem Açıklaması</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: Yeni Sponsorluk Anlaşması"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Tür</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option value="income">Gelir (+)</option>
                    <option value="expense">Gider (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Tutar (EUR)</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-lg"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow"
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
