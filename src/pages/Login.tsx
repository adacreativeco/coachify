import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Shield, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }

    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      toast.success('Başarıyla giriş yapıldı!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Kulüp Portalına Giriş Yapın
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Teknik heyet, başkan ve futbolcu yönetim paneline erişin
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl p-8 space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 text-xs focus:border-emerald-500 outline-none pr-10"
                  placeholder="••••••••"
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
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-1.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Giriş Yapılıyor...</span>
                  </>
                ) : (
                  <>
                    <span>Giriş Yap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-white/[0.06] text-center space-y-3">
            <div className="text-xs text-neutral-400">
              Henüz kulübünüz kayıtlı değil mi?{' '}
              <Link to="/register" className="text-emerald-400 font-semibold hover:underline">
                Hesap Oluşturun
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-neutral-500 bg-slate-900/50 p-4 rounded-xl border border-white/[0.04]">
          <div className="font-semibold text-neutral-400 mb-1">Hızlı Demo Girişi:</div>
          <div>coach@demo.com / demo123 (Teknik Direktör)</div>
          <div>president@demo.com / demo123 (Kulüp Başkanı)</div>
          <div>player@demo.com / demo123 (Futbolcu)</div>
        </div>
      </div>
    </div>
  );
}