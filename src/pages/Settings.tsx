import { useState, useRef } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Building, User, Shield, Save, CheckCircle2, RotateCcw, Trash2, AlertTriangle, Download, Upload, FileJson } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const store = useCoachifyStore();
  const { clubInfo, updateClubInfo, resetToDefaults } = store;
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...clubInfo });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExportJSON = () => {
    const backupData = {
      clubInfo: store.clubInfo,
      players: store.players,
      matches: store.matches,
      trainings: store.trainings,
      financials: store.financials,
      tactic: store.tactic,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coachify_backup_${store.clubInfo.name.toLowerCase().replace(/\\s+/g, '_')}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Kulüp verileri başarıyla JSON dosyası olarak indirildi!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.clubInfo && parsed.players) {
          localStorage.setItem('coachify-club-store', JSON.stringify({ state: parsed, version: 0 }));
          window.location.reload();
        } else {
          toast.error('Geçersiz yedek dosyası formatı.');
        }
      } catch (err) {
        toast.error('JSON dosyası okunurken hata oluştu.');
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmDeleteAccount = async () => {
    await deleteAccount();
    navigate('/');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kulüp & Sistem Ayarları</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Kulüp kimliği, stadyum, lig bilgileri, yedekleme ve veri yönetimi.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJSON}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" /> Yedek İndir (JSON)
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" /> Yedekten Yükle
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Sıfırla
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Hesabı Sil
          </button>
        </div>
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

      {/* Delete Account Modal (KVKK/GDPR) */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-500/40 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Hesabınızı Silmek İstediğinize Emin Misiniz?</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Bu işlem geri alınamaz. KVKK ve GDPR kapsamında tüm kişisel verileriniz, oturumunuz ve yerel kayıtlarınız kalıcı olarak silinecektir.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteAccount}
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow"
              >
                Evet, Kalıcı Olarak Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
