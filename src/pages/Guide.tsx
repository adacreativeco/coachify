import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  Sparkle,
  Radio,
  Eye,
  Sliders,
  Maximize2
} from 'lucide-react';

// =========================================================================
// 21st.dev Primitive: Spotlight Card with dynamic cursor glow
// =========================================================================
function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.15)',
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl transition-all duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}

// =========================================================================
// 21st.dev Primitive: Interactive Live Pitch Passing Visualizer
// =========================================================================
function LivePassingSimulator() {
  const [activePass, setActivePass] = useState(0);

  const nodes = [
    { id: 'dm', label: 'Ön Libero #6', x: 50, y: 75, color: '#10b981' },
    { id: 'cm', label: 'Merkez Orta Saha #8', x: 30, y: 48, color: '#38bdf8' },
    { id: 'cam', label: 'Oyun Kurucu #10', x: 70, y: 45, color: '#a855f7' },
    { id: 'lw', label: 'Sol Kanat #7', x: 20, y: 22, color: '#f59e0b' },
    { id: 'rw', label: 'Sağ Kanat #11', x: 80, y: 22, color: '#f59e0b' },
    { id: 'st', label: 'Santrafor #9', x: 50, y: 15, color: '#ef4444' },
  ];

  const passSequence = [0, 1, 2, 4, 5, 3, 0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePass((prev) => (prev + 1) % passSequence.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const currentNode = nodes[passSequence[activePass]];

  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-b from-emerald-950/80 via-slate-950 to-slate-950 shadow-2xl p-4 flex flex-col justify-between">
      {/* Stadium Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      {/* Center Circle & Penalty Lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-16 border-b border-x border-white/10 rounded-b-lg pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-16 border-t border-x border-white/10 rounded-t-lg pointer-events-none" />

      {/* SVG Passing Vectors */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {passSequence.map((nodeIdx, i) => {
          if (i === passSequence.length - 1) return null;
          const from = nodes[nodeIdx];
          const to = nodes[passSequence[i + 1]];
          return (
            <line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="rgba(255,255,255,0.12)"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      {/* Animated Glowing Match Ball */}
      <motion.div
        animate={{
          left: `${currentNode.x}%`,
          top: `${currentNode.y}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 14,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-[0_0_20px_#10b981] border-2 border-emerald-400 flex items-center justify-center z-30 pointer-events-none"
      >
        <span className="text-[10px]">⚽</span>
      </motion.div>

      {/* Formation Nodes */}
      {nodes.map((node, idx) => {
        const isTarget = nodes[passSequence[activePass]].id === node.id;
        return (
          <motion.div
            key={node.id}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-20"
            whileHover={{ scale: 1.15 }}
            onClick={() => setActivePass(idx)}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-[11px] border-2 transition-all shadow-lg ${
                isTarget
                  ? 'bg-amber-400 text-black border-white ring-4 ring-amber-300/60 scale-110 shadow-amber-400/50'
                  : 'bg-slate-900/90 text-white border-white/30 backdrop-blur-md'
              }`}
            >
              {idx + 1}
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-black/80 text-[9px] font-bold text-white border border-white/10 whitespace-nowrap">
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* Status Bar */}
      <div className="relative z-30 flex items-center justify-between p-3 rounded-2xl bg-slate-950/90 border border-white/10 mt-auto">
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-medium">
            Framer Motion Canlı Pas Zinciri: <strong className="text-emerald-400">{currentNode.label}</strong>
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">60 FPS Spring Fiziği</span>
      </div>
    </div>
  );
}

// =========================================================================
// 21st.dev Primitive: Interactive Before / After Comparison Slider
// =========================================================================
function ComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const offset = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(offset, 5), 95));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onTouchMove={handleMove}
      className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize"
    >
      {/* "AFTER" Layer (COACHIFY.OS - 21st.dev Framer Motion) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-900 p-6 sm:p-8 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
            ✨ 21st.dev & Framer Motion Arayüzü
          </span>
          <span className="text-xs text-emerald-400 font-mono">100/100 Lighthouse</span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Yapay Zeka Taktik Motoru
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Aktif</span>
            </div>
            <p className="text-xs text-slate-300">
              4-3-3 Formasyonunda anlık 60 FPS reaktif yaylanma ve dinamik kondisyon radarı.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-[10px] text-slate-400">FPS</div>
              <div className="text-sm font-black text-emerald-400">60 FPS</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-[10px] text-slate-400">Reaktivite</div>
              <div className="text-sm font-black text-indigo-400">Anında</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-[10px] text-slate-400">Estetik</div>
              <div className="text-sm font-black text-amber-400">Ultra VIP</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400">COACHIFY.OS Modern Web Mimarisi</div>
      </div>

      {/* "BEFORE" Layer (Klasik / Eski Tip Standart Tasarım) */}
      <div
        className="absolute inset-0 bg-slate-900 p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-r border-amber-400"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black">
            ❌ Klasik / Statik Web Sitesi
          </span>
          <span className="text-xs text-slate-400">Animasyonsuz & Düz</span>
        </div>

        <div className="space-y-3 opacity-70">
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 space-y-2">
            <div className="font-bold text-slate-300 text-xs">Statik Tablo ve Donuk Menüler</div>
            <p className="text-xs text-slate-400">Sayfa yenilemeleri olmadan geçiş yapılamayan hantal arayüz.</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded bg-slate-800 text-center text-xs text-slate-400">Düz Sayfa</div>
            <div className="p-2 rounded bg-slate-800 text-center text-xs text-slate-400">0 Animasyon</div>
            <div className="p-2 rounded bg-slate-800 text-center text-xs text-slate-400">Hantal</div>
          </div>
        </div>

        <div className="text-xs text-slate-500">Standart Web Şablonu</div>
      </div>

      {/* Slider Draggable Divider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-white to-indigo-400 shadow-[0_0_20px_rgba(255,255,255,0.8)] -translate-x-1/2 z-40 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-8 h-8 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center text-xs shadow-2xl border-2 border-slate-900">
          ↔
        </div>
      </div>
    </div>
  );
}

export default function Guide() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);
  const [toolCategory, setToolCategory] = useState<'all' | 'core' | 'style' | 'animation'>('all');
  
  // Interactive Playground Demo State
  const [demoScale, setDemoScale] = useState(1);
  const [demoRotate, setDemoRotate] = useState(0);
  const [demoSpring, setDemoSpring] = useState(320);
  const [demoDamping, setDemoDamping] = useState(20);
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
      badge: '21st.dev UI',
      title: 'Spotlight & Glassmorphism Mimarisi',
      desc: 'İmleç takipli dinamik ışık efektleri, mikro cam paneller (backdrop-blur-24) ve derinlik katan HSL tasarım tokenları.',
      spotlight: 'rgba(99, 102, 241, 0.25)',
      features: ['Mouse-Tracking Spotlight Efekti', 'Göz Yormayan Koyu Mod Paleti', 'Border Beam Işıma Animasyonları'],
    },
    {
      id: 2,
      icon: Sparkles,
      badge: '60 FPS Motion',
      title: 'Framer Motion ile Reaktif Yay Fiziği',
      desc: 'layoutId ile sekmeler arası pürüzsüz kaymalar, spring tabanlı yaylanmalar ve GPU donanım hızlandırmalı geçişler.',
      spotlight: 'rgba(16, 185, 129, 0.25)',
      features: ['layoutId Sekme & Hap Animasyonu', 'Viewport Scroll Trigger Reveals', 'Spring Physics & Damping Kontrolü'],
    },
    {
      id: 3,
      icon: Boxes,
      badge: 'Bento Grid',
      title: 'Asimetrik Bento Kutu Düzeni',
      desc: 'Canlı verilerle nefes alan mini bileşenler, stadyum simülasyonları ve zengin görsel hiyerarşi kurma stratejileri.',
      spotlight: 'rgba(245, 158, 11, 0.25)',
      features: ['Asimetrik Grid Dağılımı', 'Canlı İnteraktif Mini Widgetlar', 'Zustand & Context API ile Senkron Durum'],
    },
    {
      id: 4,
      icon: Code2,
      badge: 'Strict Types',
      title: 'TypeScript & Katı Tip Güvenliği',
      desc: 'Bileşen propları, model sözleşmeleri ve runtime hatalarını önleyen generics ile endüstri standardı kod kalitesi.',
      spotlight: 'rgba(56, 189, 248, 0.25)',
      features: ['TypeScript 5.8 Strict Modu', 'Otomatik IntelliSense Desteği', 'Zod & Validation Şema Doğrulamaları'],
    },
    {
      id: 5,
      icon: LayoutIcon,
      badge: 'Ultra Fast UX',
      title: 'React Router v7 & Anında Geçiş',
      desc: 'Sıfır gecikmeli reaktif rotalama, dinamik URL parametreleri ve akıllı scroll restoration.',
      spotlight: 'rgba(168, 85, 247, 0.25)',
      features: ['React Router v7 Rotalama', 'Korumalı Sayfalar (Protected Routes)', 'Lazy Loading & Kod Bölümleme'],
    },
    {
      id: 6,
      icon: Gauge,
      badge: '100 / 100 Speed',
      title: 'Lighthouse 100 & Üretim Optimizasyonu',
      desc: 'Semantic HTML5, Vite 6 tree-shaking sıkıştırması, OpenGraph meta etiketleri ve üst düzey SEO skoru.',
      spotlight: 'rgba(244, 63, 94, 0.25)',
      features: ['Semantic HTML5 & Erişilebilirlik', 'Vite 6 HMR & Hızlı Bundle', 'SEO & Sosyal Paylaşım Meta Etiketleri'],
    },
  ];

  // Tools Section
  const tools = [
    {
      name: 'Vite 6',
      category: 'core',
      version: 'v6.2.0',
      badge: 'Yıldırım Derleyici',
      desc: 'Yeni nesil frontend derleyici; anlık Hot Module Replacement (HMR) ve yıldırım hızında build süreleri sağlar.',
      link: 'https://vite.dev',
      code: 'npm create vite@latest my-app -- --template react-ts',
      icon: '⚡',
    },
    {
      name: 'React 18',
      category: 'core',
      version: 'v18.3.1',
      badge: 'Modern UI Motoru',
      desc: 'Bileşen tabanlı, bildirimsel ve hooks ekosistemine sahip lider kullanıcı arayüzü kütüphanesi.',
      link: 'https://react.dev',
      code: 'npm install react react-dom',
      icon: '⚛️',
    },
    {
      name: 'Framer Motion',
      category: 'animation',
      version: 'v13.1.1',
      badge: 'Animasyon Standardı',
      desc: 'React için 21st.dev kalitesinde yay fiziği, layoutId geçişleri ve jest reaksiyonları sağlayan motor.',
      link: 'https://motion.dev',
      code: 'npm install framer-motion',
      icon: '🌊',
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
    },
    {
      name: 'TypeScript',
      category: 'core',
      version: 'v5.8.2',
      badge: 'Tip Güvenliği',
      desc: 'JavaScript için statik tip desteği sunarak derleme esnasında hataları yakalar ve güvenli refactoring sağlar.',
      link: 'https://www.typescriptlang.org',
      code: 'npm install -D typescript @types/react',
      icon: '🔷',
    },
    {
      name: 'Lucide Icons',
      category: 'style',
      version: 'v0.511.0',
      badge: '500+ SVG İkon',
      desc: 'Hafif, temiz ve tutarlı vektör ikon kütüphanesi. Tree-shaking desteğiyle sıfır fazlalık yaratır.',
      link: 'https://lucide.dev',
      code: 'npm install lucide-react',
      icon: '✨',
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
    },
  ];

  // Installation Steps
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

  const filteredTools = toolCategory === 'all' ? tools : tools.filter(t => t.category === toolCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* 21st.dev Ambient Aurora & Glowing Grid Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/3 w-[800px] h-[800px] bg-indigo-600/15 rounded-full blur-[160px] animate-pulse-glow" />
        <div className="absolute top-1/2 -right-40 w-[700px] h-[700px] bg-emerald-600/15 rounded-full blur-[160px] animate-pulse-glow" />
        <div className="absolute -bottom-40 left-1/4 w-[800px] h-[800px] bg-purple-600/15 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Top Floating Glass Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-2">
                21ST<span className="text-indigo-400">.DEV</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse">
                  Ultra VIP
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Temiz Tasarım & Akıcı Animasyonlar</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-slate-300">
            <a href="#ogrenilecekler" className="hover:text-indigo-400 transition-colors">Neler Öğreneceksiniz?</a>
            <a href="#araclar" className="hover:text-indigo-400 transition-colors">Gerekli Araçlar</a>
            <a href="#kurulum" className="hover:text-indigo-400 transition-colors">Kurulum Adımları</a>
            <a href="#karsilastirma" className="hover:text-indigo-400 transition-colors">Öncesi / Sonrası</a>
            <a href="#demo" className="hover:text-indigo-400 transition-colors">Fizik Stüdyosu</a>
            <a href="#sonuc" className="hover:text-indigo-400 transition-colors">Kazanımlar</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/dashboard"
              className="text-xs font-extrabold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-colors hidden sm:block"
            >
              Ana Uygulama
            </Link>
            <a
              href="#kurulum"
              className="text-xs font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95"
            >
              <span>Hemen Başla</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: 21st.dev Style Spotlight, Live Pitch Simulator & Hero CTAs */}
        {/* ========================================================================= */}
        <section id="hero" className="pt-16 pb-24 px-6 max-w-7xl mx-auto text-center relative">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-slate-900/90 border border-indigo-500/40 text-indigo-300 text-xs font-black mb-8 shadow-2xl backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>21st.dev & Framer Motion 13 İle Yeni Nesil Web Standardı</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.05]"
          >
            Temiz Tasarım, Akıcı Animasyonlar ve{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Kusursuz Bir Web Deneyimi.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mt-6 leading-relaxed font-normal"
          >
            Sıfırdan başlayarak 21st.dev seviyesinde tasarım prensipleri, 60 FPS Framer Motion yaylanmaları ve modüler mimari ile üretime hazır bir başyapıt inşa edin.
          </motion.p>

          {/* Hero Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center items-center gap-4"
          >
            <a
              href="#kurulum"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:to-pink-500 text-white font-black text-sm shadow-2xl shadow-indigo-500/30 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Adım Adım Kuruluma Başla</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>

            <a
              href="#demo"
              className="px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/15 hover:border-indigo-400/50 text-white font-bold text-sm backdrop-blur-xl flex items-center space-x-2 transition-all hover:scale-105 shadow-xl"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>Fizik Stüdyosunu Dene</span>
            </a>
          </motion.div>

          {/* Hero Feature Showcase: Live Passing Simulator & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto"
          >
            <div className="lg:col-span-7">
              <LivePassingSimulator />
            </div>

            <div className="lg:col-span-5 space-y-4 text-left">
              <SpotlightCard className="p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">60 FPS Donanım Hızlandırma</h4>
                    <p className="text-xs text-slate-400">GPU destekli transform & opacity animasyonları</p>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                    💎
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">Spotlight & Glassmorphism</h4>
                    <p className="text-xs text-slate-400">İmleç takipli dinamik ışık ve derin cam paneller</p>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    🛡️
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">100 / 100 Lighthouse Standardı</h4>
                    <p className="text-xs text-slate-400">Sıfır hata, tam tip güvenliği ve üst düzey SEO</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </section>


        {/* ========================================================================= */}
        {/* 2. NELER ÖĞRENECEKSİNİZ? (Spotlight Bento Cards) */}
        {/* ========================================================================= */}
        <section id="ogrenilecekler" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Öğrenim Müfredatı</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Bu Rehberle Neler Öğreneceksiniz?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              21st.dev tarzı estetik, temiz mimari ve akıcı animasyon prensiplerini uygulamalı öğrenin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <SpotlightCard
                  key={item.id}
                  spotlightColor={item.spotlight}
                  className="p-8 flex flex-col justify-between group hover:border-white/25 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs text-slate-300 space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* INTERACTIVE BEFORE / AFTER SLIDER */}
        {/* ========================================================================= */}
        <section id="karsilastirma" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10 bg-slate-900/30">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-3">
              <Eye className="w-3.5 h-3.5" />
              <span>İnteraktif Karşılaştırma</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Klasik Tasarım vs 21st.dev & Framer Motion
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              Aşağıdaki sürgüyü sağa ve sola kaydırarak statik web ile modern akıcı işletim sistemi arasındaki farkı görün.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ComparisonSlider />
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 3. GEREKLİ ARAÇLAR (Linkli & Filtreli) */}
        {/* ========================================================================= */}
        <section id="araclar" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-3">
                <Cpu className="w-3.5 h-3.5" />
                <span>Teknoloji Yığını</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Gerekli Araçlar & Kütüphaneler
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Resmi dokümantasyon bağlantıları ve tek tıkla kopyalanabilen kurulum kodları.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10">
              {[
                { key: 'all', label: 'Tümü' },
                { key: 'core', label: 'Temel & Çatı' },
                { key: 'animation', label: 'Animasyon' },
                { key: 'style', label: 'Stil & İkon' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setToolCategory(tab.key as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    toolCategory === tab.key
                      ? 'bg-indigo-600 text-white shadow-lg'
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
              <SpotlightCard
                key={tool.name}
                spotlightColor="rgba(168, 85, 247, 0.2)"
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl p-3 rounded-2xl bg-white/5 border border-white/10">
                        {tool.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-black text-lg text-white">{tool.name}</h3>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            {tool.version}
                          </span>
                        </div>
                        <span className="text-xs text-indigo-400 font-bold">{tool.badge}</span>
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

                <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 flex items-center justify-between">
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
              </SpotlightCard>
            ))}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 4. ADIM ADIM KURULUM (Net & Kısa Terminal) */}
        {/* ========================================================================= */}
        <section id="kurulum" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>Uygulamalı Kurulum</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Adım Adım Kurulum Kılavuzu
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              Aşağıdaki 5 kısa ve net adımı takip ederek projenizi anında çalışır hale getirin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step Selector (5 Cols) */}
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
                        ? 'bg-indigo-950/50 border-indigo-500 shadow-xl shadow-indigo-950/60'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-xl font-mono font-black text-sm flex items-center justify-center ${
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
                        <div className={`font-black text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
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

            {/* Interactive Terminal (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-slate-950 border border-white/15 overflow-hidden shadow-2xl">
                <div className="px-6 py-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs text-slate-400 font-mono ml-2">
                      bash ~ {steps[activeStep].title}
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

                <div className="p-6 font-mono text-sm space-y-4">
                  <div className="text-xs text-slate-400 flex items-center space-x-2">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-cyan-400">~/projects/modern-app</span>
                    <span className="text-slate-600">git:(main)</span>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-900 border border-white/5 text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                    {steps[activeStep].command}
                  </pre>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed font-sans">
                    <span className="font-bold text-white block mb-1">💡 Adım Özeti:</span>
                    {steps[activeStep].details}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-[11px] text-slate-500">İlgili Dosyalar:</span>
                    {steps[activeStep].files.map((file, fIndex) => (
                      <span
                        key={fIndex}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-indigo-300 font-mono"
                      >
                        {file}
                      </span>
                    ))}
                  </div>
                </div>

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
        {/* 5. INTERACTIVE FRAMER MOTION PHYSICS STUDIO */}
        {/* ========================================================================= */}
        <section id="demo" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10 bg-slate-900/30">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold mb-3">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Canlı Animasyon Laboratuvarı</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Framer Motion Akıcılığını Canlı Test Edin
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              Yay sertliği (stiffness), sönümleme (damping), açı ve ışıma renklerini değiştirerek gerçek zamanlı fizik tepkisini izleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Control Sliders (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-black text-sm text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>Fizik Parametreleri</span>
                </h3>
                <button
                  onClick={() => {
                    setDemoScale(1);
                    setDemoRotate(0);
                    setDemoSpring(320);
                    setDemoDamping(20);
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Sıfırla</span>
                </button>
              </div>

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
                  <span>Yay Sertliği (Stiffness)</span>
                  <span className="font-mono text-indigo-400">{demoSpring}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="20"
                  value={demoSpring}
                  onChange={(e) => setDemoSpring(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Spring Damping */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Sönümleme (Damping)</span>
                  <span className="font-mono text-indigo-400">{demoDamping}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="2"
                  value={demoDamping}
                  onChange={(e) => setDemoDamping(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Color Themes */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs text-slate-300 block mb-2 font-bold">Glow Işıma Rengi</span>
                <div className="flex space-x-3">
                  {(['indigo', 'emerald', 'amber', 'rose'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setDemoGlowColor(color)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
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

            {/* Live Interactive Physics Stage (7 Cols) */}
            <div className="lg:col-span-7 flex items-center justify-center p-12 rounded-3xl bg-slate-950/90 border border-white/10 min-h-[460px] relative overflow-hidden">
              
              {/* Dynamic Glow backdrop */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute w-96 h-96 rounded-full blur-[120px] pointer-events-none ${
                  demoGlowColor === 'indigo' ? 'bg-indigo-600/40' :
                  demoGlowColor === 'emerald' ? 'bg-emerald-600/40' :
                  demoGlowColor === 'amber' ? 'bg-amber-600/40' :
                  'bg-rose-600/40'
                }`}
              />

              {/* Draggable & Tiltable 3D Card */}
              <motion.div
                drag
                dragConstraints={{ left: -100, right: 100, top: -60, bottom: 60 }}
                animate={{
                  scale: demoScale,
                  rotate: demoRotate,
                }}
                transition={{
                  type: 'spring',
                  stiffness: demoSpring,
                  damping: demoDamping,
                }}
                whileHover={{ scale: demoScale * 1.05 }}
                whileTap={{ scale: demoScale * 0.95 }}
                className="w-full max-w-sm p-8 rounded-3xl bg-slate-900/90 border-2 border-white/20 shadow-2xl backdrop-blur-2xl relative z-10 cursor-grab active:cursor-grabbing select-none group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white shadow-lg">
                    ✨
                  </div>
                  <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Sürükle / Bırak (Draggable)
                  </span>
                </div>

                <h4 className="text-xl font-black text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  Framer Motion Reaktif Kart
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Beni farenizle tutup sürükleyin, üzerine gelin veya sol taraftaki sürgülerle yay sertliğini test edin!
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Yay: {demoSpring}k / {demoDamping}d</span>
                  <span className="text-emerald-400 font-bold">60 FPS ✓</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 6. SONUÇ / KAZANIMLAR (Doğrulanmış Çıktılar) */}
        {/* ========================================================================= */}
        <section id="sonuc" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10">
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
            <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.25)" className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/30">
                <Palette className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">1. Temiz & Modern Tasarım</h3>
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
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.25)" className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">2. Akıcı 60 FPS Animasyonlar</h3>
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
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.25)" className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 border border-amber-500/30">
                <Boxes className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">3. Doğru & Ölçeklenebilir Yapı</h3>
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
            </SpotlightCard>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 7. TEKRAR CTA + TOPLULUK LİNKİ */}
        {/* ========================================================================= */}
        <section id="cta" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10">
          <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 bg-gradient-to-b from-indigo-950/80 via-slate-900/90 to-slate-950 border border-indigo-500/40 shadow-2xl text-center">
            
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-black">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Hemen Kendi Web Sitenizi Oluşturun</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Modern, Akıcı ve Kusursuz Web Sitenizi Bugün Yayına Alın.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Tüm adımları uyguladınız mı? Kodları projenize ekleyin, topluluğumuza katılın ve sorularınızı geliştirici ekibimizle paylaşın.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
                <a
                  href="#hero"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
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
              21ST<span className="text-indigo-400">.DEV</span> GUIDE
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Temiz tasarım, akıcı animasyonlar ve düzgün mimariye sahip modern web geliştirme rehberi.
            </p>
          </div>

          <div>
            <div className="font-bold text-white mb-3">Bölümler</div>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-indigo-400">1. Hero & Canlı Saha</a></li>
              <li><a href="#ogrenilecekler" className="hover:text-indigo-400">2. Neler Öğreneceksiniz?</a></li>
              <li><a href="#karsilastirma" className="hover:text-indigo-400">3. Öncesi / Sonrası</a></li>
              <li><a href="#araclar" className="hover:text-indigo-400">4. Gerekli Araçlar</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3">Kaynaklar</div>
            <ul className="space-y-2">
              <li><a href="#demo" className="hover:text-indigo-400">Canlı Fizik Stüdyosu</a></li>
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
          © 2026 Modern Web Geliştirme Rehberi • 21st.dev Tasarım Standartları & Framer Motion.
        </div>
      </footer>
    </div>
  );
}
