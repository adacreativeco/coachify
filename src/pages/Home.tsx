import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { TopBannerCTA } from '../components/TopBannerCTA';
import { StickyCTA } from '../components/StickyCTA';
import {
  Shield,
  Activity,
  Users,
  Trophy,
  BarChart3,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Zap,
  Star,
  HelpCircle,
  MapPin,
  Mail,
  Phone,
  Building,
  ChevronDown,
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleQuickLaunch = (role: UserRole) => {
    switchRole(role);
    navigate('/dashboard');
  };

  const faqs = [
    {
      q: 'COACHIFY.OS hangi futbol kulüpleri ve yaş kategorileri için uygundur?',
      a: 'COACHIFY.OS, Süper Lig A takımları ve altyapı akademilerinden amatör kulüplere, futbol okullarına ve üniversite takımlarına kadar her ölçekteki organizasyon için modüler olarak tasarlanmıştır.',
    },
    {
      q: 'Taktik tahtasında hangi diziliş ve formasyonlar destekleniyor?',
      a: '4-3-3, 4-4-2, 4-2-3-1 ve 3-5-2 başta olmak üzere tüm temel ve modern formasyonlar yeşil saha üzerinde desteklenir. Oyuncuları mevkilerine atayabilir, kaptan, penaltıcı ve hücum/savunma anlayışını belirleyebilirsiniz.',
    },
    {
      q: 'Antrenman yoklaması ve oyuncu sakatlık takibi nasıl çalışır?',
      a: 'Teknik heyet her antrenman için tek tıkla tüm kadronun yoklamasını (Katıldı, İzinli, Sakat, Gelmedi) sisteme işler. Sakatlanan oyuncular anında taktik tahtasından çekilir ve rehabilitasyon süreci grafiklerle takip edilir.',
    },
    {
      q: 'Kulüp Başkanı, Teknik Direktör ve Futbolcu rolleri arasında veri güvenliği nasıl sağlanır?',
      a: 'Her kullanıcı rolü kendi yetki alanına özel paneli görür. Başkan finansal gelir/gider ve bütçeyi yönetirken, teknik direktör sahadaki taktiği ve antrenmanı; futbolcu ise kişisel gelişim karnesini takip eder.',
    },
    {
      q: 'Yapay Zeka Taktik Danışmanı maç analizini nasıl üretiyor?',
      a: 'Sistem, kadronuzun güncel kondisyon puanlarını, sakatlık listesini, seçtiğiniz formasyonu ve sıradaki rakip takımın taktiksel yapısını harmanlayarak anlık stratejik öneriler ve oyuncu değişikliği tavsiyeleri üretir.',
    },
  ];

  const testimonials = [
    {
      name: 'Okan B.',
      role: 'Süper Lig Teknik Direktörü',
      club: 'Galatasaray SK',
      rating: 5,
      comment: 'Taktik tahtası ve haftalık yoklama sistemi maç hazırlık sürecimizi inanılmaz hızlandırdı. Kadronun kondisyon dengesini tek bakışta görmek büyük avantaj.',
    },
    {
      name: 'Dr. Mehmet K.',
      role: 'Altyapı & Akademi Direktörü',
      club: 'İstanbul Gelişim Akademisi',
      rating: 5,
      comment: '24 genç futbolcumuzun antrenman devamlılığını ve OVR reyting gelişimini velilere ve yönetime raporlamak artık sadece tek tık sürüyor.',
    },
    {
      name: 'Ahmet Y.',
      role: 'Kulüp Başkanı',
      club: 'Anadolu Kartalları FK',
      rating: 5,
      comment: 'Transfer bütçesi, sponsorluk gelirleri ve maaş ödemelerini sahadaki performansla tek ekranda bağlayan ilk profesyonel işletim sistemi.',
    },
    {
      name: 'Victor O.',
      role: 'Profesyonel Futbolcu',
      club: 'A Takım Santrafor',
      rating: 5,
      comment: 'Kişisel maç sürelerimi, gol katkılarımı ve hocanın bana özel bıraktığı taktiksel notları kendi futbolcu portalımdan anında takip edebiliyorum.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Banner Announcement CTA */}
      <TopBannerCTA />

      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-600 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
      </div>

      {/* Top Navbar */}
      <nav className="relative border-b border-white/10 backdrop-blur-xl bg-slate-950/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-black text-black text-xl">
              ⚽
            </div>
            <span className="text-xl font-black tracking-tight text-white">COACHIFY<span className="text-emerald-400">.OS</span></span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-bold text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Özellikler</a>
            <Link to="/guide" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-extrabold">
              ✨ Web Rehberi
            </Link>
            <Link to="/case-studies" className="hover:text-emerald-400 transition-colors">Vaka Analizleri</Link>
            <a href="#testimonials" className="hover:text-emerald-400 transition-colors">Kulüp Yorumları</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">SSS</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">İletişim</a>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              Giriş Yap
            </Link>
            <button
              onClick={() => handleQuickLaunch(UserRole.COACH)}
              className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center"
            >
              Paneli Başlat <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold mb-8">
          <Zap className="w-3.5 h-3.5" />
          <span>Profesyonel Futbol Kulübü & Akademi Yönetim İşletim Sistemi</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Sahadaki Taktikten, Kulüp Finansına <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200">Tek Platform.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
          Kulüp Başkanları, Teknik Direktörler ve Futbolcular için tasarlanmış reaktif taktik tahtası, canlı antrenman yoklaması, maç fikstürü ve yapay zeka destekli performans analitiği.
        </p>

        {/* 3 Quick Role Demo Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleQuickLaunch(UserRole.PRESIDENT)}
            className="group px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-left transition-all w-72"
          >
            <div className="text-2xl mb-2">👑</div>
            <div className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">Kulüp Başkanı Olarak Gir</div>
            <div className="text-xs text-slate-400 mt-1">Bütçe, sponsorluklar, transfer fonu ve finansal raporlar.</div>
          </button>

          <button
            onClick={() => handleQuickLaunch(UserRole.COACH)}
            className="group px-6 py-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all w-72 shadow-xl shadow-emerald-950/50"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">Teknik Direktör Olarak Gir</div>
            <div className="text-xs text-emerald-200/80 mt-1">Taktik tahtası, 4-3-3 ilk 11, antrenman yoklaması ve sakatlıklar.</div>
          </button>

          <button
            onClick={() => handleQuickLaunch(UserRole.PLAYER)}
            className="group px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 text-left transition-all w-72"
          >
            <div className="text-2xl mb-2">⚽</div>
            <div className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">Futbolcu Olarak Gir</div>
            <div className="text-xs text-slate-400 mt-1">Kişisel OVR puanı, maç karnesi, kondisyon radarı ve hoca notları.</div>
          </button>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative py-20 border-t border-white/10 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-white">Kulübünüz İçin Güçlü 6 Temel Modül</h2>
            <p className="text-sm text-slate-400 mt-2">Uçtan uca futbol yönetimi için geliştirilmiş profesyonel araç seti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
                ⚽
              </div>
              <h3 className="text-xl font-bold text-white">İnteraktif Taktik Tahtası</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                4-3-3, 4-4-2, 4-2-3-1 formasyonlarında sahadaki 11'i belirleyin, kaptan ve duran top kullanıcılarını saniyeler içinde atayın.
              </p>
              <Link to="/matches" className="inline-flex items-center text-xs font-bold text-emerald-400 hover:underline">
                Taktik Tahtasını İncele →
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
                📋
              </div>
              <h3 className="text-xl font-bold text-white">Canlı Antrenman & Yoklama</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Haftalık seansları planlayın, tek tıkla tüm kadronun katılım yoklamasını (Katıldı, İzinli, Sakat) alın ve yorgunluğu takip edin.
              </p>
              <Link to="/training" className="inline-flex items-center text-xs font-bold text-amber-400 hover:underline">
                Yoklama Modülünü İncele →
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl">
                📊
              </div>
              <h3 className="text-xl font-bold text-white">Recharts Performans Analitiği</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Takım denge radarı, kondisyon trend grafikleri, gol/asist istatistikleri ve yapay zeka destekli derbi analiz önerileri.
              </p>
              <Link to="/analytics" className="inline-flex items-center text-xs font-bold text-blue-400 hover:underline">
                Analitik Merkezini İncele →
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl">
                👥
              </div>
              <h3 className="text-xl font-bold text-white">Zengin Kadro & Oyuncu Havuzu</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                OVR reytingleri, piyasa değerleri, sözleşme süreleri, sakatlık durumu ve oyuncu ekleme/düzenleme araçları.
              </p>
              <Link to="/players" className="inline-flex items-center text-xs font-bold text-purple-400 hover:underline">
                Kadro Havuzunu İncele →
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
                👑
              </div>
              <h3 className="text-xl font-bold text-white">Finans & Transfer Bütçesi</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Sponsorluk gelirleri, bilet hasılatı, oyuncu maaşları ve transfer bütçesi için çift taraflı şeffaf finansal defter.
              </p>
              <Link to="/dashboard" className="inline-flex items-center text-xs font-bold text-emerald-400 hover:underline">
                Başkan Panosunu İncele →
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xl">
                💬
              </div>
              <h3 className="text-xl font-bold text-white">Takım İçi Mesajlaşma</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Teknik direktör, yönetim ve oyuncular arasında anlık prim duyuruları, taktiksel notlar ve sağlık heyeti raporları.
              </p>
              <Link to="/messages" className="inline-flex items-center text-xs font-bold text-rose-400 hover:underline">
                Mesajlaşmayı İncele →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews / Social Proof */}
      <section id="testimonials" className="relative py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Güvenilir Kulüp Referansları</div>
          <h2 className="text-3xl font-black text-white">Teknik Heyet ve Yöneticiler Ne Diyor?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">"{t.comment}"</p>
              </div>
              <div className="pt-3 border-t border-white/10">
                <div className="font-bold text-sm text-white">{t.name}</div>
                <div className="text-[11px] text-emerald-400 font-semibold">{t.role}</div>
                <div className="text-[10px] text-slate-500">{t.club}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Sıkça Sorulan Sorular (FAQ) */}
      <section id="faq" className="relative py-20 border-t border-white/10 bg-slate-900/40">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Merak Edilenler</div>
            <h2 className="text-3xl font-black text-white">Sıkça Sorulan 5 Soru (SSS)</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-white hover:text-emerald-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Google Maps & Office Contact */}
      <section id="contact" className="relative py-20 px-6 max-w-7xl mx-auto border-t border-white/10 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Bize Ulaşın</div>
          <h2 className="text-3xl font-black text-white">Merkez Ofisimiz ve İletişim</h2>
          <p className="text-xs text-slate-400 mt-1">Kulübünüze özel kurumsal entegrasyon ve danışmanlık talepleriniz için.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Contact Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Building className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">ADA Creative Co. Genel Merkez</div>
                  <div className="text-xs text-slate-400 mt-0.5">Levent Teknoloji Vadisi, Büyükdere Cad. No: 193, Beşiktaş / İstanbul</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-xs text-white">E-Posta Desteği</div>
                  <div className="text-xs text-emerald-400">git@adacreative.co • info@adacreative.co</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-xs text-white">Kurumsal Destek Hattı</div>
                  <div className="text-xs text-slate-300">+90 (212) 800 23 20</div>
                </div>
              </div>
            </div>

            <Link
              to="/thank-you"
              className="block w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-center text-xs rounded-xl shadow-lg transition-all"
            >
              Demo Talebi Bırakın →
            </Link>
          </div>

          {/* Interactive Google Maps Embed (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-80 bg-slate-900">
            <iframe
              title="ADA Creative Co. İstanbul Merkez Ofis"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?width=100%25&height=600&hl=tr&q=Levent,%20B%C3%BCy%C3%BCkdere%20Cad.%20No:193,%20Be%C5%9Fikta%C5%9F,%20%C4%B0stanbul+(ADA%20Creative%20Co.)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              className="grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Sticky Floating CTA */}
      <StickyCTA />

      {/* Footer with Internal Linking */}
      <footer className="py-12 border-t border-white/10 bg-slate-950 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-bold text-white text-sm mb-3">COACHIFY.OS</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Yapay zeka destekli profesyonel futbol kulübü ve akademi yönetim işletim sistemi.
            </p>
          </div>

          <div>
            <div className="font-bold text-white mb-3">Hızlı Bağlantılar</div>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:text-emerald-400">Genel Bakış</Link></li>
              <li><Link to="/players" className="hover:text-emerald-400">Kadro Yönetimi</Link></li>
              <li><Link to="/matches" className="hover:text-emerald-400">Taktik Tahtası & Maçlar</Link></li>
              <li><Link to="/training" className="hover:text-emerald-400">Antrenman & Yoklama</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3">Kurumsal & Kaynaklar</div>
            <ul className="space-y-2">
              <li><Link to="/case-studies" className="hover:text-emerald-400">Vaka Çalışmaları</Link></li>
              <li><Link to="/analytics" className="hover:text-emerald-400">AI Taktik Motoru</Link></li>
              <li><Link to="/thank-you" className="hover:text-emerald-400">Kayıt Onayı</Link></li>
              <li><Link to="/settings" className="hover:text-emerald-400">Kulüp Ayarları</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3">Geliştirici & Lisans</div>
            <p className="text-xs text-slate-500 mb-2">Apache 2.0 Açık Kaynak Standartlarında.</p>
            <a href="https://github.com/adacreativeco" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline">
              ADA Creative Co. GitHub →
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/5 text-center text-slate-600">
          © 2026 COACHIFY.OS • Geliştirici: <span className="text-slate-400 font-semibold">ADA Creative Co. &lt;git@adacreative.co&gt;</span>
        </div>
      </footer>
    </div>
  );
}
