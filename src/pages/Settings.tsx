import { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { Settings as SettingsIcon, Building, User, Shield, Save, CheckCircle2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { clubInfo, updateClubInfo, resetToDefaults } = useCoachifyStore();
  const [formData, setFormData] = useState({ ...clubInfo });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClubInfo(formData);
    toast.success('Kulüp ve sistem ayarları başarıyla kaydedildi!');
  };

  const handleReset = () => {
    if (confirm('Tüm kulüp verilerini ve kadroyu varsayılan değerlere sıfırlamak istiyor musunuz?')) {
      resetToDefaults();
      setFormData({ ...clubInfo });
      toast.info('Sistem varsayılan kadro ve verilere sıfırlandı.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kulüp & Sistem Ayarları</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Kulüp kimliği, stadyum, lig bilgileri ve yetkili isimlerini yönetin.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Kadroyu Sıfırla
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
              <Building className="w-4 h-4 mr-2 text-emerald-600" /> Kulüp Kimlik Bilgileri
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Kulüp / Akademi Adı</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Lig / Organizasyon</label>
                <input
                  type="text"
                  value={formData.league}
                  onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Stadyum / Tesis</label>
                <input
                  type="text"
                  value={formData.stadium}
                  onChange={(e) => setFormData({ ...formData, stadium: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-700 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
              <User className="w-4 h-4 mr-2 text-blue-600" /> Yetkili & Teknik Heyet
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Teknik Direktör</label>
                <input
                  type="text"
                  value={formData.coachName}
                  onChange={(e) => setFormData({ ...formData, coachName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Kulüp Başkanı</label>
                <input
                  type="text"
                  value={formData.presidentName}
                  onChange={(e) => setFormData({ ...formData, presidentName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
            >
              <Save className="w-4 h-4 mr-2" /> Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
