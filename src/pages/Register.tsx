import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Shield, Eye, EyeOff, Loader2, User, Crown, ClipboardList, UserCheck, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: UserRole.PLAYER,
    teamCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.name, formData.role);
      toast.success('Hesabınız başarıyla oluşturuldu!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Kayıt olurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const roleOptions = [
    { value: UserRole.COACH, label: 'Teknik Direktör', icon: ClipboardList, description: 'Taktik tahtası, yoklama ve maç yönetimi' },
    { value: UserRole.PRESIDENT, label: 'Kulüp Başkanı', icon: Crown, description: 'Kulüp bütçesi, transfer fonu ve finans' },
    { value: UserRole.PLAYER, label: 'Futbolcu', icon: UserCheck, description: 'Bireysel OVR, kondisyon ve maç karnesi' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-neutral-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-4 group">
            <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-xl flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">COACHIFY<span className="text-emerald-400">.OS</span></span>
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Kulübünüz İçin Hesap Oluşturun
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Dakikalar içinde takımınızı dijital ortama taşıyın
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl p-8 space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-neutral-300 mb-1">
                Ad Soyad
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 text-xs focus:border-emerald-500 outline-none"
                placeholder="Adınız ve soyadınız"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-neutral-300 mb-1">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 text-xs focus:border-emerald-500 outline-none"
                placeholder="ornek@kulup.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-neutral-300 mb-1">
                Şifre
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 text-xs focus:border-emerald-500 outline-none pr-10"
                  placeholder="En az 6 karakter"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Kullanıcı Rolü
              </label>
              <div className="space-y-2">
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = formData.role === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-950 border-emerald-500/50 shadow-md'
                          : 'bg-slate-950/60 border-white/[0.06] hover:border-white/[0.1]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={isSelected}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        isSelected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.04] text-neutral-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-neutral-300'}`}>{option.label}</p>
                        <p className="text-[10px] text-neutral-500">{option.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-1.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Hesap Oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <span>Hesap Oluştur</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-white/[0.06] text-center">
            <div className="text-xs text-neutral-400">
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="text-emerald-400 font-semibold hover:underline">
                Giriş Yapın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}