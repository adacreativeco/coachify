import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Sparkles,
  Zap,
  Layers,
  Code2,
  Cpu,
  Palette,
  Layout as LayoutIcon,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  ChevronRight,
  Terminal,
  Play,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Gauge,
  Github,
  MessageSquare,
  BookOpen,
  Share2,
  Monitor,
  Heart,
  Flame,
  Boxes,
  ArrowUpRight,
  Sparkle
} from 'lucide-react';

export default function Guide() {
  // State for interactive features
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);
  const [toolCategory, setToolCategory] = useState<'all' | 'core' | 'style' | 'animation'>('all');
  
  // Interactive Playground Demo State
  const [demoScale, setDemoScale] = useState(1);
  const [demoRotate, setDemoRotate] = useState(0);
  const [demoSpring, setDemoSpring] = useState(300);
  const [demoActiveTab, setDemoActiveTab] = useState<'card' | 'button' | 'badge'>('card');
  const [demoGlowColor, setDemoGlowColor] = useState<'indigo' | 'emerald' | 'amber' | 'rose'>('indigo');

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Komut panoya kopyalandı!', {
      description: text,
      icon: <Check className="w-4 h-4 text-emerald-400" />,
    });
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleStepComplete = (index: number) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  // Learning Objectives (Neler Öğreneceksiniz?)
  const learningItems = [
    {
      id: 1,
      icon: Palette,
      badge: 'Görsel Mükemmellik',
      title: 'Temiz & Modern Tasarım Mimarisi',
      desc: 'Glassmorphism, uyumlu renk paletleri, tipografi hiyerarşisi ve modern tasarım tokenları ile ilk bakışta etkileyici arayüzler tasarlayın.',
      color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400',
      features: ['Özelleştirilmiş HSL Renk Paleti', 'Mikro Cam Efektleri (Backdrop Blur)', 'Responsive Grid & Flexbox Mimarisi'],
    },
    {
      id: 2,
      icon: Sparkles,
      badge: '60 FPS Deneyim',
      title: 'Framer Motion ile Akıcı Animasyonlar',
      desc: 'Fizik tabanlı yay animasyonları (spring physics), sayfa geçişleri, scroll tetiklemeli girişler ve mikro-etkileşimler oluşturun.',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      features: ['AnimatePresence Sayfa Geçişleri', 'Viewport Scroll Trigger Animasyonları', 'Hover, Tap & Gesture Reaksiyonları'],
    },
    {
      id: 3,
      icon: Boxes,
      badge: 'Mimari Standart',
      title: 'Düzgün & Modüler Proje Yapısı',
      desc: 'Genişletilebilir bileşen yapısı, temiz dizin hiyerarşisi ve sorumlulukların net ayrıldığı sürdürülebilir mimari kurun.',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
      features: ['Feature-First Dizin Düzeni', 'Yeniden Kullanılabilir UI Kütüphanesi', 'Zustand & Context API Durum Yönetimi'],
    },
    {
      id: 4,
      icon: Code2,
      badge: 'Tip Güvenliği',
      title: 'TypeScript & Katı Tip Doğrulaması',
      desc: 'Kodlama esnasında oluşabilecek hataları sıfıra indiren güçlü tip tanımlamaları, generic yapılar ve interface standardı.',
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
      features: ['Strict TypeScript Konfigürasyonu', 'Otomatik Kod Tamamlama (IntelliSense)', 'Bileşen Prop Doğrulama Kontrolleri'],
    },
    {
      id: 5,
      icon: LayoutIcon,
      badge: 'Kullanıcı Deneyimi',
      title: 'Hızlı Rotalama & Reaktif Gezinme',
      desc: 'React Router ile sıfır sayfa yenileme gecikmesi, dinamik breadcrumbs ve akıllı scroll koruma mekanizması.',
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
      features: ['React Router v7 Entegrasyonu', 'Dinamik Parametreler & Korumalı Rotalar', 'Anında Yüklenen Lazy Loaded Sayfalar'],
    },
    {
      id: 6,
      icon: Gauge,
      badge: 'SEO & Hız',
      title: 'Lighthouse 100 & Üretim Optimizasyonu',
      desc: 'Semantic HTML5, doğru başlık hiyerarşisi, meta etiketleri ve Vite bundle sıkıştırmasıyla maksimum hız ve SEO.',
      color: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400',
      features: ['%100 Semantic HTML5 Yapısı', 'Meta & OpenGraph Sosyal Paylaşım', 'Optimize Edilmiş JS/CSS Bundle Çıktısı'],
    },
  ];

  // Tools Section (Gerekli Araçlar)
  const tools = [
    {
      name: 'Vite 6',
      category: 'core',
      version: 'v6.2.0',
      badge: 'Derleyici & HMR',
      desc: 'Yeni nesil frontend derleyici; anlık Hot Module Replacement (HMR) ve yıldırım hızında build süreleri sağlar.',
      link: 'https://vite.dev',
      code: 'npm create vite@latest my-app -- --template react-ts',
      icon: '⚡',
      color: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
    },
    {
      name: 'React 18',
      category: 'core',
      version: 'v18.3.1',
      badge: 'Arayüz Motoru',
      desc: 'Bileşen tabanlı, bildirimsel (declarative) ve modern hook ekosistemine sahip lider JavaScript UI kütüphanesi.',
      link: 'https://react.dev',
      code: 'npm install react react-dom',
      icon: '⚛️',
      color: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
    },
    {
      name: 'Framer Motion',
      category: 'animation',
      version: 'v13.1.1',
      badge: 'Animasyon Motoru',
      desc: 'React için prodüksiyon kalitesinde, fizik tabanlı yaylanma ve sayfa geçiş animasyonları sağlayan güçlü kütüphane.',
      link: 'https://motion.dev',
      code: 'npm install framer-motion',
      icon: '🌊',
      color: 'hover:border-pink-500/50 hover:shadow-pink-500/10',
    },
    {
      name: 'Tailwind CSS',
      category: 'style',
      version: 'v3.4.17',
      badge: 'Tasarım Sistemi',
      desc: 'Utility-first CSS mimarisi; doğrudan JSX içerisinde hızlı, esnek ve tutarlı stillendirme imkanı verir.',
      link: 'https://tailwindcss.com',
      code: 'npm install -D tailwindcss postcss autoprefixer',
      icon: '🎨',
      color: 'hover:border-teal-500/50 hover:shadow-teal-500/10',
    },
    {
      name: 'TypeScript',
      category: 'core',
      version: 'v5.8.2',
      badge: 'Tip Güvenliği',
      desc: 'JavaScript için statik tip desteği sunarak runtime hatalarını önler ve büyük projelerde güvenli refactoring sağlar.',
      link: 'https://www.typescriptlang.org',
      code: 'npm install -D typescript @types/react',
      icon: '🔷',
      color: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
    },
    {
      name: 'Lucide Icons',
      category: 'style',
      version: 'v0.511.0',
      badge: 'İkon Seti',
      desc: 'Hafif, temiz ve tutarlı 500+ SVG vektör ikon kütüphanesi. Tree-shaking desteğiyle sıfır fazlalık yaratır.',
      link: 'https://lucide.dev',
      code: 'npm install lucide-react',
      icon: '✨',
      color: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
    },
    {
      name: 'Sonner & CLSX',
      category: 'style',
      version: 'v1.5.0',
      badge: 'Toast & Yardımcılar',
      desc: 'Akıcı ve şık bildirimler (Sonner) ile dinamik sınıf birleştirme (clsx, tailwind-merge) araçları.',
      link: 'https://sonner.emilkowal.ski',
      code: 'npm install sonner clsx tailwind-merge',
      icon: '🔔',
      color: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    },
  ];

  // Installation Steps (Adım Adım Kurulum)
  const steps = [
    {
      number: '01',
      title: 'Proje Başlatma & Çatı Kurulumu',
      subtitle: 'Vite + React + TypeScript şablonunu oluşturun',
      command: 'npm create vite@latest modern-app -- --template react-ts\ncd modern-app\nnpm install',
      details: 'Vite ile en güncel React 18 ve TypeScript ortamını saniyeler içinde ayağa kaldırın.',
      files: ['package.json', 'vite.config.ts', 'tsconfig.json'],
    },
    {
      number: '02',
      title: 'Tailwind CSS & Tasarım Sistemi',
      subtitle: 'Modern yardımcı sınıf altyapısını yapılandırın',
      command: 'npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p',
      details: 'Tailwind CSS konfigürasyonunu oluşturun ve index.css içine modern font ve renk değişkenlerinizi tanımlayın.',
      files: ['tailwind.config.js', 'postcss.config.js', 'src/index.css'],
    },
    {
      number: '03',
      title: 'Animasyon Motoru & İkonlar',
      subtitle: 'Framer Motion, Lucide ve Sonner paketlerini ekleyin',
      command: 'npm install framer-motion lucide-react clsx tailwind-merge sonner',
      details: 'Akıcı 60 FPS animasyonlar ve modern SVG ikon seti için gerekli tüm kütüphaneleri projeye bağlayın.',
      files: ['package.json (dependencies güncellendi)'],
    },
    {
      number: '04',
      title: 'Modüler Dizin Mimarisi',
      subtitle: 'Temiz ve ölçeklenebilir klasör düzenini oluşturun',
      command: 'mkdir src/components src/pages src/hooks src/contexts src/types src/utils',
      details: 'Bileşenleri, sayfaları ve yardımcı fonksiyonları sorumluluklarına göre birbirinden ayırarak temiz bir mimari kurun.',
      files: ['src/components/', 'src/pages/', 'src/types/', 'src/hooks/'],
    },
    {
      number: '05',
      title: 'Canlı Sunucu & Geliştirme',
      subtitle: 'Hızlı yerel sunucuyu başlatıp sonucu test edin',
      command: 'npm run dev',
      details: 'Vite HMR sayesinde tarayıcınızı yenilemeden anlık kod değişikliklerinizi 127.0.0.1:5173 adresinde canlı izleyin.',
      files: ['http://localhost:5173'],
    },
  ];

  // Filtered tools
  const filteredTools = toolCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category === toolCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                MODERN<span className="text-indigo-400">WEB</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Rehber
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Temiz Tasarım & Akıcı Animasyonlar</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <a href="#ogrenilecekler" className="hover:text-indigo-400 transition-colors">Neler Öğreneceksiniz?</a>
            <a href="#araclar" className="hover:text-indigo-400 transition-colors">Gerekli Araçlar</a>
            <a href="#kurulum" className="hover:text-indigo-400 transition-colors">Kurulum Adımları</a>
            <a href="#demo" className="hover:text-indigo-400 transition-colors">Canlı Playground</a>
            <a href="#sonuc" className="hover:text-indigo-400 transition-colors">Sonuç & Kazanımlar</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/dashboard"
              className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-colors hidden sm:block"
            >
              Uygulamaya Git
            </Link>
            <a
              href="#kurulum"
              className="text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 flex items-center space-x-1.5 transition-all hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Hemen Başla</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: Hero + Kısa Değer Önerisi + CTA */}
        {/* ========================================================================= */}
        <section id="hero" className="pt-16 pb-24 px-6 max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-8 shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
            <span>Framer Motion & React 18 ile Kusursuz Mimari</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1] sm:leading-[1.15]"
          >
            Temiz Tasarım, Akıcı Animasyonlar ve{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Kusursuz Bir Web Sitesi.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mt-6 leading-relaxed font-normal"
          >
            Sıfırdan başlayarak modern tasarım prensipleri, 60 FPS Framer Motion geçişleri ve modüler mimari ile üretime hazır, yüksek performanslı bir web sitesi inşa edin.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center items-center gap-4"
          >
            <a
              href="#kurulum"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Adım Adım Kuruluma Başla</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>

            <a
              href="#demo"
              className="px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-bold text-sm backdrop-blur-md flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>İnteraktif Demoyu İncele</span>
            </a>
          </motion.div>

          {/* Quick Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
              <div className="text-2xl font-black text-white">60 FPS</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Akıcı Animasyonlar</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
              <div className="text-2xl font-black text-emerald-400">100 / 100</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Lighthouse Performans</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
              <div className="text-2xl font-black text-indigo-400">5 Adımda</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Eksiksiz Kurulum</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
              <div className="text-2xl font-black text-purple-400">Tam Modüler</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">React 18 & Vite 6</div>
            </div>
          </motion.div>
        </section>


        {/* ========================================================================= */}
        {/* 2. NELER ÖĞRENECEKSİNİZ? (3–6 Madde) */}
        {/* ========================================================================= */}
        <section id="ogrenilecekler" className="py-20 px-6 max-w-7xl mx-auto relative border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Öğrenim Müfredatı</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Bu Rehberle Neler Öğreneceksiniz?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              Modern web geliştirme standartlarına uygun, temiz kodlama pratikleri ve akıcı arayüz teknikleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div>
                    {/* Header Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center border shadow-inner group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs text-slate-300 space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 3. GEREKLİ ARAÇLAR (Linkli & İnteraktif Filtreli) */}
        {/* ========================================================================= */}
        <section id="araclar" className="py-20 px-6 max-w-7xl mx-auto relative border-t border-white/10 bg-slate-900/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-3">
                <Cpu className="w-3.5 h-3.5" />
                <span>Teknoloji Yığını (Tech Stack)</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Gerekli Araçlar & Kütüphaneler
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Projeyi oluştururken kullanacağımız optimize edilmiş, modern ve resmi bağlantılı araç seti.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 self-start md:self-auto">
              {[
                { key: 'all', label: 'Tümü' },
                { key: 'core', label: 'Temel & Çatı' },
                { key: 'animation', label: 'Animasyon' },
                { key: 'style', label: 'Stil & İkon' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setToolCategory(tab.key as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    toolCategory === tab.key
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group ${tool.color}`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-black text-lg text-white group-hover:text-indigo-400 transition-colors">
                            {tool.name}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            {tool.version}
                          </span>
                        </div>
                        <span className="text-xs text-indigo-400 font-semibold">{tool.badge}</span>
                      </div>
                    </div>

                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-indigo-500 hover:text-white text-slate-400 border border-white/10 transition-all"
                      title="Resmi Dokümantasyon"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                </div>

                {/* Quick install snippet */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                  <code className="text-[11px] text-emerald-400 truncate mr-2 font-mono">
                    {tool.code}
                  </code>
                  <button
                    onClick={() => copyToClipboard(tool.code, 100 + idx)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Kopyala"
                  >
                    {copiedIndex === 100 + idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 4. ADIM ADIM KURULUM (Net & Kısa, Kod Kopyalama & Terminal Simülasyonu) */}
        {/* ========================================================================= */}
        <section id="kurulum" className="py-20 px-6 max-w-7xl mx-auto relative border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>Uygulamalı Rehber</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Adım Adım Kurulum Kılavuzu
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              Aşağıdaki 5 kısa ve net adımı takip ederek projenizi anında çalışır hale getirin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step Selection List (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = completedSteps.includes(idx);

                return (
                  <motion.button
                    key={step.number}
                    onClick={() => {
                      setActiveStep(idx);
                      handleStepComplete(idx);
                    }}
                    whileHover={{ x: 4 }}
                    className={`w-full p-5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-950/40 border-indigo-500/60 shadow-xl shadow-indigo-950/50'
                        : 'bg-slate-900/40 hover:bg-slate-900/70 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-xl font-mono font-bold text-sm flex items-center justify-center ${
                          isActive
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-slate-400 border border-white/10'
                        }`}
                      >
                        {isCompleted && !isActive ? <Check className="w-4 h-4" /> : step.number}
                      </div>

                      <div>
                        <div className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-indigo-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Interactive Terminal / Code Display (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-slate-950 border border-white/15 overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="px-6 py-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs text-slate-400 font-mono ml-2">
                      terminal ~ {steps[activeStep].title}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(steps[activeStep].command, activeStep)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition-all"
                  >
                    {copiedIndex === activeStep ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kodu Kopyala</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Terminal Code Body */}
                <div className="p-6 font-mono text-sm space-y-4">
                  <div className="text-xs text-slate-400 flex items-center space-x-2">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-cyan-400">~/projects/modern-app</span>
                    <span className="text-slate-600">git:(main)</span>
                  </div>

                  {/* Code Area */}
                  <pre className="p-4 rounded-xl bg-slate-900 border border-white/5 text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                    {steps[activeStep].command}
                  </pre>

                  {/* Explanation Note */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-white block mb-1">💡 Adım Detayı:</span>
                    {steps[activeStep].details}
                  </div>

                  {/* Affected Files */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-[11px] text-slate-500">İlgili Dosyalar:</span>
                    {steps[activeStep].files.map((file, fIndex) => (
                      <span
                        key={fIndex}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-indigo-300"
                      >
                        {file}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Step Nav Bar */}
                <div className="px-6 py-4 bg-slate-900/60 border-t border-white/10 flex items-center justify-between">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    className="text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    ← Önceki Adım
                  </button>

                  <div className="text-xs font-mono text-slate-500">
                    Adım {activeStep + 1} / {steps.length}
                  </div>

                  <button
                    disabled={activeStep === steps.length - 1}
                    onClick={() => {
                      const next = Math.min(steps.length - 1, activeStep + 1);
                      setActiveStep(next);
                      handleStepComplete(next);
                    }}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center space-x-1"
                  >
                    <span>Sonraki Adım</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* INTERACTIVE FRAMER MOTION PLAYGROUND DEMO */}
        {/* ========================================================================= */}
        <section id="demo" className="py-20 px-6 max-w-7xl mx-auto relative border-t border-white/10 bg-slate-900/20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold mb-3">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Canlı Animasyon Laboratuvarı</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Framer Motion Akıcılığını Canlı Deneyimleyin
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              Aşağıdaki kontrolleri değiştirerek reaktif yay (spring) fiziğini, ölçeklemeyi ve renk geçişlerini test edin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Control Sliders (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-md">
              <h3 className="font-bold text-base text-white flex items-center justify-between">
                <span>Animasyon Parametreleri</span>
                <button
                  onClick={() => {
                    setDemoScale(1);
                    setDemoRotate(0);
                    setDemoSpring(300);
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Sıfırla</span>
                </button>
              </h3>

              {/* Scale Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Ölçekleme (Scale)</span>
                  <span className="font-mono text-indigo-400">{demoScale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  value={demoScale}
                  onChange={(e) => setDemoScale(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Rotation Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Döndürme Açısı (Rotate)</span>
                  <span className="font-mono text-indigo-400">{demoRotate}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  step="5"
                  value={demoRotate}
                  onChange={(e) => setDemoRotate(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Spring Stiffness */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Yay Sertliği (Spring Stiffness)</span>
                  <span className="font-mono text-indigo-400">{demoSpring}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="50"
                  value={demoSpring}
                  onChange={(e) => setDemoSpring(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Color Selector */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs text-slate-300 block mb-2">Işıma Rengi (Glow Theme)</span>
                <div className="flex space-x-3">
                  {(['indigo', 'emerald', 'amber', 'rose'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setDemoGlowColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        demoGlowColor === color ? 'scale-110 border-white' : 'border-transparent opacity-60'
                      } ${
                        color === 'indigo' ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' :
                        color === 'emerald' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' :
                        color === 'amber' ? 'bg-amber-500 shadow-lg shadow-amber-500/50' :
                        'bg-rose-500 shadow-lg shadow-rose-500/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Live Animated Canvas (7 Cols) */}
            <div className="lg:col-span-7 flex items-center justify-center p-12 rounded-3xl bg-slate-950/80 border border-white/10 min-h-[420px] relative overflow-hidden">
              
              {/* Dynamic Glow backdrop */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute w-80 h-80 rounded-full blur-[100px] pointer-events-none ${
                  demoGlowColor === 'indigo' ? 'bg-indigo-600/40' :
                  demoGlowColor === 'emerald' ? 'bg-emerald-600/40' :
                  demoGlowColor === 'amber' ? 'bg-amber-600/40' :
                  'bg-rose-600/40'
                }`}
              />

              {/* Animated Interactive Card */}
              <motion.div
                animate={{
                  scale: demoScale,
                  rotate: demoRotate,
                }}
                transition={{
                  type: 'spring',
                  stiffness: demoSpring,
                  damping: 20,
                }}
                whileHover={{ scale: demoScale * 1.05 }}
                whileTap={{ scale: demoScale * 0.95 }}
                className="w-full max-w-sm p-8 rounded-3xl bg-slate-900/90 border border-white/20 shadow-2xl backdrop-blur-xl relative z-10 cursor-pointer select-none group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
                    ✨
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    60 FPS Reaktif
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  Akıcı Motion Kartı
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Üzerime gelin, tıklayın ya da sol taraftaki sürgüleri hareket ettirerek yay fiziğini test edin!
                </p>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-semibold text-slate-200">
                  <span>Durum: Aktif & Optimize</span>
                  <span className="text-emerald-400 font-mono">OK ✓</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 5. SONUÇ / KAZANIMLAR (Doğrulanmış Çıktılar) */}
        {/* ========================================================================= */}
        <section id="sonuc" className="py-20 px-6 max-w-7xl mx-auto relative border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nihai Çıktılar</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Sonuç: Neler Elde Edeceksiniz?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              Tüm adımlar tamamlandığında modern standartları eksiksiz karşılayan, çalışan bir web sitesi sizin olur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Outcome 1: Temiz & Modern Tasarım */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-slate-900/60 border border-indigo-500/30 backdrop-blur-md relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/30">
                <Palette className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">
                1. Temiz & Modern Tasarım
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Göz yormayan karanlık mod paleti, keskin tipografi, mikro cam paneller ve premium estetik hissiyat.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Özel HSL renk ve gölge değişkenleri</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kusursuz mobil ve masaüstü uyumu</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Piksel hassasiyetinde ikon ve boşluklama</span>
                </li>
              </ul>
            </motion.div>

            {/* Outcome 2: Akıcı Animasyonlar */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 backdrop-blur-md relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">
                2. Akıcı 60 FPS Animasyonlar
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Donma ve takılma yapmayan donanım hızlandırmalı GPU geçişleri, mikro-etkileşimler ve viewport reveal efektleri.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Spring physics tabanlı yumuşak yaylanmalar</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AnimatePresence ile pürüzsüz sayfa geçişi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Staggered list ve kart belirme efektleri</span>
                </li>
              </ul>
            </motion.div>

            {/* Outcome 3: Doğru Yapılandırılmış Mimari */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-slate-900/60 border border-amber-500/30 backdrop-blur-md relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 border border-amber-500/30">
                <Boxes className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">
                3. Doğru & Ölçeklenebilir Yapı
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Katı TypeScript tip güvenliği, temiz klasör hiyerarşisi, kolay genişletilebilir modüller ve SEO uyumluluğu.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Modüler bileşen & sayfa ayrımı</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tip korumalı router ve state mimarisi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Üretime hazır %100 temiz build ve test altyapısı</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 6. TEKRAR CTA + TOPLULUK LİNKİ */}
        {/* ========================================================================= */}
        <section id="cta" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10">
          <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 bg-gradient-to-b from-indigo-950/60 via-slate-900/80 to-slate-950 border border-indigo-500/30 shadow-2xl text-center">
            
            {/* Ambient background glow inside CTA box */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Hemen Kendi Web Sitenizi Oluşturun</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Modern, Akıcı ve Kusursuz Web Sitenizi Bugün Yayına Alın.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Tüm adımları uyguladınız mı? Kodları projenize ekleyin, topluluğumuza katılın ve sorularınızı geliştirici ekibimizle paylaşın.
              </p>

              {/* Primary & Community Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
                <a
                  href="#hero"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Rehberin Başına Dön</span>
                </a>

                <a
                  href="https://github.com/adacreativeco"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm flex items-center space-x-2.5 transition-all hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Topluluğu</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <Link
                  to="/dashboard"
                  className="px-8 py-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-sm flex items-center space-x-2 transition-all hover:scale-105"
                >
                  <span>Canlı Paneli Aç</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Community Badges */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> %100 Açık Kaynak
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> TypeScript & Vite Uyumlu
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Framer Motion 13
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-slate-950 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-extrabold text-white text-sm mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              MODERN<span className="text-indigo-400">WEB</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Temiz tasarım, akıcı animasyonlar ve düzgün mimariye sahip modern web sitesi geliştirme rehberi.
            </p>
          </div>

          <div>
            <div className="font-bold text-white mb-3">Bölümler</div>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-indigo-400">1. Hero & Değer Önerisi</a></li>
              <li><a href="#ogrenilecekler" className="hover:text-indigo-400">2. Neler Öğreneceksiniz?</a></li>
              <li><a href="#araclar" className="hover:text-indigo-400">3. Gerekli Araçlar</a></li>
              <li><a href="#kurulum" className="hover:text-indigo-400">4. Adım Adım Kurulum</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3">Kaynaklar</div>
            <ul className="space-y-2">
              <li><a href="#demo" className="hover:text-indigo-400">Canlı Demo Laboratuvarı</a></li>
              <li><a href="#sonuc" className="hover:text-indigo-400">Sonuç & Kazanımlar</a></li>
              <li><a href="#cta" className="hover:text-indigo-400">Topluluk & İletişim</a></li>
              <li><Link to="/dashboard" className="hover:text-indigo-400">Yönetim Paneli</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3">Topluluk & Kod</div>
            <p className="text-xs text-slate-500 mb-2">Modern Web Standartları & Rehber</p>
            <a
              href="https://github.com/adacreativeco"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 font-bold hover:underline flex items-center gap-1"
            >
              ADA Creative Co. GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/5 text-center text-slate-600">
          © 2026 Modern Web Geliştirme Rehberi • Framer Motion, React & Tailwind CSS ile Güçlendirildi.
        </div>
      </footer>
    </div>
  );
}
