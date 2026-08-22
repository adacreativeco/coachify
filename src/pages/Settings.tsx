import React, { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Building2, User, Shield, Save, CheckCircle2, RotateCcw, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { clubInfo, updateClubInfo, resetToDefaults } = useCoachifyStore();
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...clubInfo });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClubInfo(formData);
    toast.success('Kulüp ve sistem ayarları başarıyla kaydedildi.');
  };

  const handleReset = () => {
    if (confirm('Tüm kulüp verilerini ve kadroyu varsayılan değerlere sıfırlamak istiyor musunuz?')) {
      resetToDefaults();
      setFormData({ ...clubInfo });
      toast.info('Sistem varsayılan kadro ve verilere sıfırlandı.');
    }
  };

  const handleConfirmDeleteAccount = async () => {
    await deleteAccount();
    navigate('/');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Sistem & Yapılandırma</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Kulüp & Sistem Ayarları</h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Kulüp kimliği, stadyum, lig bilgileri, gizlilik ve veri yönetimi.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kadroyu Sıfırla</span>
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hesabımı Sil</span>
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl text-xs">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Kulüp Kimlik Bilgileri</span>
            </h3>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Kulüp / Akademi Adı</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Lig / Organizasyon</label>
                <input
                  type="text"
                  value={formData.league}
                  onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Stadyum / Tesis</label>
                <input
                  type="text"
                  value={formData.stadium}
                  onChange={(e) => setFormData({ ...formData, stadium: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/[0.06] space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Yetkili & Teknik Heyet</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Teknik Direktör</label>
                <input
                  type="text"
                  value={formData.coachName}
                  onChange={(e) => setFormData({ ...formData, coachName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Kulüp Başkanı</label>
                <input
                  type="text"
                  value={formData.presidentName}
                  onChange={(e) => setFormData({ ...formData, presidentName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Değişiklikleri Kaydet</span>
            </button>
          </div>
        </form>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-base text-white">Hesabınızı Silmek İstiyor Musunuz?</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Bu işlem geri alınamaz. KVKK ve GDPR kapsamında tüm kişisel verileriniz, oturumunuz ve yerel kayıtlarınız kalıcı olarak silinecektir.
              </p>
            </div>

            <div className="flex justify-end space-x-2.5 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteAccount}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow"
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
