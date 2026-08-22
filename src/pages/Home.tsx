import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  MapPin,
  Mail,
  Phone,
  Building2,
  ChevronDown,
  Sparkles,
  Calendar,
  DollarSign,
  MessageSquare,
  Check,
  Crown,
  ClipboardList,
  UserCheck,
  Boxes,
  Eye,
  ArrowUpRight,
  Target,
  FileSpreadsheet,
  Clock,
  Layers
} from 'lucide-react';

// =========================================================================
// Spotlight Card with Dynamic Cursor Tracking
// =========================================================================
function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(16, 185, 129, 0.15)',
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
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/70 backdrop-blur-2xl transition-all duration-300 ${className}`}
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
// Live Match Tactics Passing Visualizer
// =========================================================================
function LiveTacticsVisualizer() {
  const [activePass, setActivePass] = useState(0);

  const nodes = [
    { id: 'dm', label: 'Ön Libero', num: '6', x: 50, y: 75, name: 'Torreira' },
    { id: 'cm', label: 'Orta Saha', num: '8', x: 32, y: 48, name: 'Sara' },
    { id: 'cam', label: 'Oyun Kurucu', num: '10', x: 68, y: 45, name: 'Mertens' },
    { id: 'lw', label: 'Sol Kanat', num: '7', x: 20, y: 22, name: 'Barış Alper' },
    { id: 'rw', label: 'Sağ Kanat', num: '11', x: 80, y: 22, name: 'Yunus' },
    { id: 'st', label: 'Santrafor', num: '9', x: 50, y: 15, name: 'Osimhen' },
  ];

  const passSequence = [0, 1, 2, 4, 5, 3, 0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePass((prev) => (prev + 1) % passSequence.length);
    }, 1700);
    return () => clearInterval(timer);
  }, []);

  const currentNode = nodes[passSequence[activePass]];

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-950/90 shadow-2xl p-4 flex flex-col justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(#10b98110_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      {/* Pitch Markings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/[0.08] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 border-b border-x border-white/[0.08] rounded-b-md pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 border-t border-x border-white/[0.08] rounded-t-md pointer-events-none" />

      {/* SVG Passing Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
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

      {/* Animated Match Ball */}
      <motion.div
        animate={{
          left: `${currentNode.x}%`,
          top: `${currentNode.y}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 130,
          damping: 14,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-400 shadow-[0_0_16px_#10b981] border-2 border-slate-950 flex items-center justify-center z-30 pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
      </motion.div>

      {/* Formation Player Tokens */}
      {nodes.map((node, idx) => {
        const isTarget = nodes[passSequence[activePass]].id === node.id;
        return (
          <motion.div
            key={node.id}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-20 select-none"
            whileHover={{ scale: 1.15 }}
            onClick={() => setActivePass(idx)}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-[11px] border transition-all shadow-md ${
                isTarget
                  ? 'bg-emerald-400 text-slate-950 border-emerald-300 ring-4 ring-emerald-500/30 scale-110'
                  : 'bg-slate-900 text-neutral-300 border-white/[0.12] backdrop-blur-md'
              }`}
            >
              {node.num}
            </div>
            <span className="mt-1 px-2 py-0.5 rounded-md bg-slate-950/90 text-[10px] font-semibold text-neutral-300 border border-white/[0.08] whitespace-nowrap">
              {node.name}
            </span>
          </motion.div>
        );
      })}

      {/* Status Bar */}
      <div className="relative z-30 flex items-center justify-between p-3 rounded-xl bg-slate-950/90 border border-white/[0.08] mt-auto">
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-neutral-400">
            4-3-3 Hücum Organizasyonu: <strong className="text-neutral-200">{currentNode.name} ({currentNode.label})</strong>
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Canlı Simülasyon
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// Before / After Comparison Slider
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
      className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl select-none cursor-ew-resize"
    >
      {/* "AFTER" Layer (COACHIFY.OS) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> COACHIFY.OS Akıllı İşletim Sistemi
          </span>
          <span className="text-xs text-neutral-400 font-mono">Uçtan Uca Entegre</span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" /> Taktik Tahtası, Canlı Yoklama & Finans
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">Senkronize</span>
            </div>
            <p className="text-xs text-neutral-400">
              Antrenmanda sakatlanan oyuncu anında taktik tahtasından çekilir, ilk 11 ve sağlık raporu tüm teknik heyete anlık yansır.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-center">
              <div className="text-[10px] text-neutral-500">Operasyon</div>
              <div className="text-xs font-bold text-emerald-400">%100 Dijital</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-center">
              <div className="text-[10px] text-neutral-500">Veri Hızı</div>
              <div className="text-xs font-bold text-emerald-400">Anında</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-center">
              <div className="text-[10px] text-neutral-500">Karar Desteği</div>
              <div className="text-xs font-bold text-amber-400">AI Destekli</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-mono">Modern Kulüp Yönetim Standardı</div>
      </div>

      {/* "BEFORE" Layer (Geleneksel / Manuel Yöntemler) */}
      <div
        className="absolute inset-0 bg-slate-900 p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-r border-amber-400/80"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
            Geleneksel Kağıt Yoklama & WhatsApp Grupları
          </span>
          <span className="text-xs text-neutral-500 font-mono">Veri Kaybı</span>
        </div>

        <div className="space-y-3 opacity-60">
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 space-y-2">
            <div className="font-semibold text-neutral-300 text-xs">Kaybolan Kağıtlar ve Kopuk İletişim</div>
            <p className="text-xs text-neutral-400">Yoklamalar defterlerde kalır, sakatlıklar unutulur, bütçe ve taktik birbirinden kopuk ilerler.</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded bg-slate-800 text-center text-xs text-neutral-400">Manuel Evrak</div>
            <div className="p-2 rounded bg-slate-800 text-center text-xs text-neutral-400">Kopuk Süreç</div>
            <div className="p-2 rounded bg-slate-800 text-center text-xs text-neutral-400">Gecikmeli</div>
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-mono">Eski Tip Amatör Süreçler</div>
      </div>

      {/* Draggable Divider Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-white to-emerald-400 shadow-[0_0_16px_rgba(255,255,255,0.8)] -translate-x-1/2 z-40 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono flex items-center justify-center text-xs shadow-2xl border border-white/20">
          ↔
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSetupStep, setActiveSetupStep] = useState<number>(0);

  const handleQuickLaunch = (role: UserRole) => {
    switchRole(role);
    navigate('/dashboard');
  };

  // Section 2: 6 Core Value Propositions
  const coreValues = [
    {
      id: 1,
      icon: Shield,
      badge: 'Taktik Tahtası',
      title: 'İnteraktif Taktiksel Üstünlük',
      desc: '4-3-3, 4-4-2, 3-5-2 formasyonlarında sahadaki 11’i belirleyin, duran top kullanıcılarını ve oyun anlayışını tek tıkla yönetin.',
      spotlight: 'rgba(16, 185, 129, 0.15)',
      features: ['Yeşil Saha Üzerinde Sürükle-Bırak', 'Kaptan & Penaltıcı Atamaları', 'Gerçek Zamanlı Formasyon Yaylanması'],
    },
    {
      id: 2,
      icon: Calendar,
      badge: 'Yoklama & Sağlık',
      title: 'Canlı Antrenman & Devamlılık',
      desc: 'Tek tıkla tüm kadronun katılım durumunu (Katıldı, İzinli, Sakat) sisteme işleyin; sakat oyuncular taktik tahtasından anında çekilir.',
      spotlight: 'rgba(16, 185, 129, 0.15)',
      features: ['Haftalık Seans & Odak Planlama', 'Devamlılık Oranı Takibi', 'Sakatlık Rehabilitasyon Çizelgesi'],
    },
    {
      id: 3,
      icon: Users,
      badge: 'Oyuncu Havuzu',
      title: 'Zengin Oyuncu Havuzu & OVR',
      desc: 'Her futbolcunun OVR reytingi, piyasa değeri, sözleşme süresi, gol/asist karnesi ve kondisyon durumunu dijital kartlarla takip edin.',
      spotlight: 'rgba(16, 185, 129, 0.15)',
      features: ['Holografik Oyuncu Kartları', 'Mevki ve Yaş Filtreleme', 'Kondisyon & Moral Takibi'],
    },
    {
      id: 4,
      icon: BarChart3,
      badge: 'Güç Radarı',
      title: 'Dinamik Takım Güç Analitiği',
      desc: 'Hücum, savunma, orta saha, kaleci ve kondisyon dengesini anlık hesaplayan radar grafikleri ve skor katkı liderlik tablosu.',
      spotlight: 'rgba(16, 185, 129, 0.15)',
      features: ['Kadro Denge Radarı', 'Gol & Asist Katkı Sıralaması', 'Kondisyon Trend Grafikleri'],
    },
    {
      id: 5,
      icon: DollarSign,
      badge: 'Finans & Bütçe',
      title: 'Şeffaf Bütçe & Transfer Fonu',
      desc: 'Sponsorluk gelirleri, maç hasılatı, oyuncu maaşları ve transfer bütçesini çift taraflı şeffaf finansal defterde yönetin.',
      spotlight: 'rgba(16, 185, 129, 0.15)',
      features: ['Transfer Bütçesi Takibi', 'Gelir / Gider İşlem Defteri', 'Başkan Finansal Özeti'],
    },
    {
      id: 6,
      icon: Sparkles,
      badge: 'Yapay Zeka',
      title: 'Yapay Zeka Taktik Danışmanı',
      desc: 'Kadro kondisyonunu, sakatlıkları ve sıradaki rakibi analiz ederek stratejik ilk 11 tavsiyeleri ve maç reçeteleri üretir.',
      spotlight: 'rgba(16, 185, 129, 0.15)',
      features: ['Derbi & Maç Analiz Raporu', 'Oyuncu Değişikliği Tavsiyeleri', 'Kondisyon İkaz Bildirimleri'],
    },
  ];

  // Section 3: Tools & Integrated Modules (Linkli)
  const moduleTools = [
    {
      name: 'Taktik Tahtası v2.4',
      badge: 'Saha Yönetimi',
      desc: '4 farklı modern diziliş, sahadaki oyuncu atamaları ve dinamik taktik çizgileri.',
      link: '/matches',
      icon: Shield,
      btnText: 'Taktik Tahtasını Aç',
    },
    {
      name: 'Canlı Yoklama Modülü',
      badge: 'Antrenman',
      desc: 'Haftalık çalışma takvimi, oyuncu katılım durumu ve sakatlık takibi.',
      link: '/training',
      icon: Calendar,
      btnText: 'Yoklama Merkezini Aç',
    },
    {
      name: 'Kadro & Oyuncu Havuzu',
      badge: 'Oyuncu Profilleri',
      desc: 'OVR reytingleri, sözleşmeler, piyasa değerleri ve oyuncu ekleme/düzenleme.',
      link: '/players',
      icon: Users,
      btnText: 'Kadro Havuzunu Aç',
    },
    {
      name: 'AI Taktik Motoru',
      badge: 'Yapay Zeka',
      desc: 'Canlı maç teşhisi, takım denge radarı ve performans grafikleri.',
      link: '/analytics',
      icon: Sparkles,
      btnText: 'AI Analitiği Başlat',
    },
    {
      name: 'Başkan Finans Panosu',
      badge: 'Kulüp Bütçesi',
      desc: 'Gelir/gider defteri, sponsorluklar ve transfer fonu yönetimi.',
      link: '/dashboard',
      icon: DollarSign,
      btnText: 'Başkan Panosunu Aç',
    },
    {
      name: 'Takım İçi Mesajlaşma',
      badge: 'İletişim',
      desc: 'Teknik direktör, başkan ve futbolcular arasında anlık duyurular ve taktik notları.',
      link: '/messages',
      icon: MessageSquare,
      btnText: 'Mesajları İncele',
    },
  ];

  // Section 4: 5-Step Club Setup
  const setupSteps = [
    {
      num: '01',
      title: 'Kulüp Profilini Oluşturun',
      desc: 'Kulübünüzün adını, tesis bilgilerini ve lig kategorisini belirleyin.',
      tag: 'Hemen Başlayın',
      preview: 'Kulüp ve tesis bilgileri tanımlandı',
    },
    {
      num: '02',
      title: 'Kadro & OVR Reytinglerini Yükleyin',
      desc: 'Oyuncularınızı formaları, mevkileri, yaşları ve OVR puanlarıyla kadro havuzuna aktarın.',
      tag: 'Kadro Havuzu',
      preview: '22 Sözleşmeli Futbolcu Portalı Aktif',
    },
    {
      num: '03',
      title: 'İlk 11’i ve Taktik Dizilişi Belirleyin',
      desc: '4-3-3 veya 4-4-2 formasyonunu seçin, kaptan ve duran top kullanıcılarını atayın.',
      tag: 'Yeşil Saha',
      preview: 'Diziliş: 4-3-3 • Anlayış: Yüksek Pres',
    },
    {
      num: '04',
      title: 'Haftalık Antrenman & Canlı Yoklama Alın',
      desc: 'Antrenman seanslarını planlayıp tek tıkla katılım yoklamasını (Katıldı, Sakat, İzinli) kaydedin.',
      tag: 'Canlı Takip',
      preview: 'Seans Yoklaması: 22/24 Oyuncu Katıldı',
    },
    {
      num: '05',
      title: 'Canlı Maç Yönetimi & AI Taktik Raporu Alın',
      desc: 'Yapay zeka teşhis motorunu çalıştırarak rakibe özel galibiyet stratejisi ve kondisyon ikazlarını görün.',
      tag: 'AI Teşhis',
      preview: 'AI Analizi: Kanat Geçişleri Üretkenliği %40 Artırıyor',
    },
  ];

  const faqs = [
    {
      category: 'Kadro & Taktik',
      q: 'Taktik tahtasında hangi diziliş ve formasyonlar destekleniyor?',
      a: '4-3-3, 4-4-2, 4-2-3-1 ve 3-5-2 başta olmak üzere tüm temel formasyonlar yeşil saha üzerinde desteklenir. Oyuncuları mevkilerine atayabilir, kaptan, penaltıcı ve hücum/savunma anlayışını belirleyebilirsiniz.',
    },
    {
      category: 'Yoklama & Sağlık',
      q: 'Antrenman yoklaması ve oyuncu sakatlık takibi nasıl çalışır?',
      a: 'Teknik heyet her antrenman için tek tıkla tüm kadronun yoklamasını (Katıldı, İzinli, Sakat, Gelmedi) sisteme işler. Sakatlanan oyuncular anında taktik tahtasından çekilir ve rehabilitasyon süreci grafiklerle takip edilir.',
    },
    {
      category: 'Roller & Güvenlik',
      q: 'Kulüp Başkanı, Teknik Direktör ve Futbolcu rolleri arasında veri güvenliği nasıl sağlanır?',
      a: 'Her kullanıcı rolü kendi yetki alanına özel paneli görür. Başkan finansal gelir/gider ve bütçeyi yönetirken, teknik direktör sahadaki taktiği ve antrenmanı; futbolcu ise kişisel gelişim karnesini takip eder.',
    },
    {
      category: 'Yapay Zeka',
      q: 'Yapay Zeka Taktik Danışmanı maç analizini nasıl üretiyor?',
      a: 'Sistem, kadronuzun güncel kondisyon puanlarını, sakatlık listesini, seçtiğiniz formasyonu ve sıradaki rakip takımın yapısını harmanlayarak anlık stratejik öneriler ve oyuncu değişikliği tavsiyeleri üretir.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      
      {/* Top Announcement Banner */}
      <TopBannerCTA />

      {/* Background Radial Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Top Navbar */}
      <nav className="relative border-b border-white/[0.08] backdrop-blur-2xl bg-black/70 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center">
                COACHIFY<span className="text-emerald-400">.OS</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Football Management
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-neutral-400">
            <a href="#deger-onerisi" className="hover:text-white transition-colors">Neler Kazandırır?</a>
            <a href="#moduller" className="hover:text-white transition-colors">Modüller</a>
            <a href="#kurulum" className="hover:text-white transition-colors">Kurulum Adımları</a>
            <a href="#karsilastirma" className="hover:text-white transition-colors">Karşılaştırma</a>
            <a href="#faq" className="hover:text-white transition-colors">SSS</a>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-xs font-medium text-neutral-400 hover:text-white px-3 py-2 transition-colors"
            >
              Giriş Yap
            </Link>
            <button
              onClick={() => handleQuickLaunch(UserRole.COACH)}
              className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl transition-all shadow-sm flex items-center space-x-1.5"
            >
              <span>Paneli Başlat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <section id="hero" className="pt-20 pb-24 px-6 max-w-7xl mx-auto text-center relative">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Futbol Kulübü & Akademi Yönetim İşletim Sistemi</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]"
          >
            Sahadaki Taktikten, Kulüp Finansına{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-teal-300">
              Tek Akıllı Platform.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mt-6 leading-relaxed font-normal"
          >
            Kulüp Başkanları, Teknik Direktörler ve Futbolcular için tasarlanmış reaktif taktik tahtası, canlı antrenman yoklaması, oyuncu havuzu ve yapay zeka performans analitiği.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center items-center gap-4"
          >
            <button
              onClick={() => handleQuickLaunch(UserRole.COACH)}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all"
            >
              <span>Paneli Başlat (Teknik Direktör)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="#moduller"
              className="px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium text-xs backdrop-blur-md flex items-center space-x-2 transition-all"
            >
              <span>Modülleri İncele</span>
            </a>
          </motion.div>

          {/* Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-6xl mx-auto"
          >
            <div className="lg:col-span-7">
              <LiveTacticsVisualizer />
            </div>

            <div className="lg:col-span-5 space-y-3 text-left">
              <SpotlightCard className="p-5 cursor-pointer hover:border-amber-500/40">
                <div onClick={() => handleQuickLaunch(UserRole.PRESIDENT)}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Kulüp Başkanı Paneli</h4>
                      <p className="text-xs text-neutral-400">Bütçe, sponsorluk gelirleri ve transfer fonu</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-5 cursor-pointer border-emerald-500/30 hover:border-emerald-400">
                <div onClick={() => handleQuickLaunch(UserRole.COACH)}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <ClipboardList className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Teknik Direktör Paneli</h4>
                      <p className="text-xs text-neutral-400">4-3-3 taktik tahtası, yoklama ve sakatlıklar</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-5 cursor-pointer hover:border-emerald-500/40">
                <div onClick={() => handleQuickLaunch(UserRole.PLAYER)}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Futbolcu Portalı</h4>
                      <p className="text-xs text-neutral-400">Kişisel OVR puanı, kondisyon ve maç karnesi</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </section>


        {/* ========================================================================= */}
        {/* 2. NELER KAZANDIRIR? (6 Temel Madde, Spotlight Bento Kartları) */}
        {/* ========================================================================= */}
        <section id="deger-onerisi" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Değer Önerisi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              COACHIFY.OS Kulübünüze Neler Kazandırır?
            </h2>
            <p className="text-neutral-400 text-sm mt-3">
              Modern veri analitiği ve reaktif arayüzlerle futbol operasyonlarınızı profesyonelleştirin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <SpotlightCard
                  key={val.id}
                  spotlightColor={val.spotlight}
                  className="p-7 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-400">
                        {val.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                      {val.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                    {val.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs text-neutral-300 space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
        {/* 3. ENTEGRE MODÜLLER & ARAÇLAR (Linkli) */}
        {/* ========================================================================= */}
        <section id="moduller" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Boxes className="w-3.5 h-3.5" />
              <span>Modüler Mimari</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Entegre Kulüp Modülleri & Araçları
            </h2>
            <p className="text-neutral-400 text-sm mt-3">
              Uçtan uca yönetim için geliştirilmiş ve birbiriyle senkronize çalışan 6 temel araç.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moduleTools.map((mod) => {
              const Icon = mod.icon;
              return (
                <SpotlightCard
                  key={mod.name}
                  spotlightColor="rgba(16, 185, 129, 0.15)"
                  className="p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                          {mod.name}
                        </h3>
                        <span className="text-[11px] text-neutral-500 font-medium">{mod.badge}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                      {mod.desc}
                    </p>
                  </div>

                  <Link
                    to={mod.link}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-emerald-500 hover:text-slate-950 border border-white/[0.08] text-xs font-medium text-neutral-200 flex items-center justify-between transition-all"
                  >
                    <span>{mod.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </SpotlightCard>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 4. ADIM ADIM KULÜP KURULUMU (Net ve Kısa) */}
        {/* ========================================================================= */}
        <section id="kurulum" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Hızlı Başlangıç</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              5 Adımda Kulübünüzü Canlıya Alın
            </h2>
            <p className="text-neutral-400 text-sm mt-3">
              Bulut tabanlı işletim sisteminde dakikalar içinde tüm takımınızı yapılandırın.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Step List */}
            <div className="lg:col-span-5 space-y-2.5">
              {setupSteps.map((step, idx) => {
                const isActive = activeSetupStep === idx;
                return (
                  <button
                    key={step.num}
                    onClick={() => setActiveSetupStep(idx)}
                    className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-slate-900 border-emerald-500/50 shadow-md'
                        : 'bg-slate-950 border-white/[0.06] hover:bg-slate-900 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-8 h-8 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-white/[0.04] text-neutral-500 border border-white/[0.08]'
                        }`}
                      >
                        {step.num}
                      </div>

                      <div>
                        <div className={`font-bold text-xs ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                          {step.title}
                        </div>
                        <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                          {step.desc}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-emerald-400 translate-x-0.5' : 'text-neutral-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Step Live Preview */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-slate-900/90 border border-white/[0.08] p-6 sm:p-7 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs border border-emerald-500/20">
                      #{setupSteps[activeSetupStep].num}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-white">
                        {setupSteps[activeSetupStep].title}
                      </h3>
                      <span className="text-[11px] text-neutral-500">COACHIFY.OS Entegrasyon Adımı</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
                    {setupSteps[activeSetupStep].tag}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {setupSteps[activeSetupStep].desc}
                </p>

                <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.06] text-xs font-mono text-emerald-400 space-y-1">
                  <div className="text-neutral-500 text-[10px]">Sistem Durumu:</div>
                  <div>➜ {setupSteps[activeSetupStep].preview}</div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    disabled={activeSetupStep === 0}
                    onClick={() => setActiveSetupStep(prev => Math.max(0, prev - 1))}
                    className="text-xs font-medium text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    ← Önceki Adım
                  </button>

                  <button
                    onClick={() => {
                      if (activeSetupStep === setupSteps.length - 1) {
                        handleQuickLaunch(UserRole.COACH);
                      } else {
                        setActiveSetupStep(prev => Math.min(setupSteps.length - 1, prev + 1));
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all flex items-center space-x-1.5"
                  >
                    <span>{activeSetupStep === setupSteps.length - 1 ? 'Paneli Başlat' : 'Sonraki Adım'}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 5. SONUÇ / KAZANIMLAR (Kulüp Operasyonel Sonuçları) */}
        {/* ========================================================================= */}
        <section id="karsilastirma" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Eye className="w-3.5 h-3.5" />
              <span>Operasyonel Sonuçlar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kulübünüz İçin Somut Kazanımlar
            </h2>
            <p className="text-neutral-400 text-sm mt-3">
              Dağınık kağıt ve mesajlaşma süreçlerinden akıllı kulüp işletim sistemine geçişin getirileri.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <ComparisonSlider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">1. %100 Dijital Kulüp Operasyonu</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Yoklama kağıtları ve dağınık mesajlaşma grupları yerine tüm antrenman, sakatlık ve kadro verisi tek merkezde toplanır.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Tek tıkla anlık antrenman katılım kaydı</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Sakatlık ve tedavi geçmişi arşivleme</span>
                </li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">2. Anlık Taktiksel & Saha Hakimiyeti</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Maç günü ilk 11 dizilişi, alternatif mevkiler ve oyuncu kondisyonları hocanın elinin altında anında hazır olur.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>4 farklı taktiksel formasyon desteği</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Duran top ve kaptan atamaları</span>
                </li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 text-amber-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">3. Şeffaf Bütçe & Sözleşme Disiplini</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Transfer harcamaları, sporcu maaşları ve sponsorluk gelirleri başkan ve yönetimin tam kontrolünde şeffafça işlenir.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Kadro toplam piyasa değeri takibi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Gelir / gider çift taraflı kayıt defteri</span>
                </li>
              </ul>
            </SpotlightCard>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 6. YENİDEN TASARLANAN MODERN SSS BÖLÜMÜ */}
        {/* ========================================================================= */}
        <section id="faq" className="py-24 border-t border-white/[0.08] bg-slate-950">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span>Merak Edilenler</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Sıkça Sorulan Sorular</h2>
              <p className="text-neutral-400 text-xs sm:text-sm">
                COACHIFY.OS kullanımı, modülleri ve kulüp entegrasyonu hakkında temel bilgiler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-slate-900/80 border border-white/[0.08] rounded-2xl overflow-hidden transition-all hover:border-white/[0.15] p-5 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                        {faq.category}
                      </div>
                      <h3 className="font-bold text-sm text-white leading-snug">
                        {faq.q}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed pt-2 border-t border-white/[0.04]">
                      {faq.a}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 7. BÜYÜLEYİCİ & LÜKS CTA BÖLÜMÜ */}
        {/* ========================================================================= */}
        <section id="cta" className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/[0.08]">
          <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-emerald-500/30 shadow-2xl text-center">
            
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Kulübünüzü Dijital Yönetim Standartlarına Taşıyın</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Kulüp İşletim Sisteminizi Hemen Başlatın.
              </h2>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Taktik tahtası, antrenman devamlılığı, oyuncu kartları ve finansal bütçe tek ekranda.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
                <button
                  onClick={() => handleQuickLaunch(UserRole.COACH)}
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/25 flex items-center space-x-2 transition-all hover:scale-105"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Teknik Direktör Olarak Başlat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleQuickLaunch(UserRole.PRESIDENT)}
                  className="px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold text-xs flex items-center space-x-2 transition-all hover:scale-105"
                >
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Kulüp Başkanı Paneli</span>
                </button>

                <button
                  onClick={() => handleQuickLaunch(UserRole.PLAYER)}
                  className="px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold text-xs flex items-center space-x-2 transition-all hover:scale-105"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Futbolcu Portalı</span>
                </button>
              </div>

              <div className="pt-8 border-t border-white/[0.06] flex flex-wrap justify-center items-center gap-6 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Kurulum Gerektirmez
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Rol Bazlı Yetkilendirme
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Reaktif Saha & Yoklama Motoru
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Office Contact Section */}
        <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08] space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">İletişim</div>
            <h2 className="text-3xl font-extrabold text-white">Merkez Ofis ve Destek</h2>
            <p className="text-xs text-neutral-400 mt-1">Kulübünüze özel kurumsal entegrasyon ve danışmanlık talepleriniz için.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/70 border border-white/[0.08] rounded-2xl p-5 space-y-4 backdrop-blur-md">
                <div className="flex items-start space-x-3">
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-white">ADA Creative Co. Genel Merkez</div>
                    <div className="text-xs text-neutral-400 mt-0.5">Levent Teknoloji Vadisi, Büyükdere Cad. No: 193, Beşiktaş / İstanbul</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-xs text-white">E-Posta Desteği</div>
                    <div className="text-xs text-emerald-400 font-mono">git@adacreative.co • info@adacreative.co</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-xs text-white">Kurumsal Destek Hattı</div>
                    <div className="text-xs text-neutral-300 font-mono">+90 (212) 800 23 20</div>
                  </div>
                </div>
              </div>

              <Link
                to="/thank-you"
                className="block w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Demo Talebi Bırakın →
              </Link>
            </div>

            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/[0.08] shadow-xl h-72 bg-slate-900">
              <iframe
                title="ADA Creative Co. İstanbul Merkez Ofis"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&height=600&hl=tr&q=Levent,%20B%C3%BCy%C3%BCkdere%20Cad.%20No:193,%20Be%C5%9Fikta%C5%9F,%20%C4%B0stanbul+(ADA%20Creative%20Co.)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                className="grayscale contrast-125 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </section>

      </main>

      {/* Sticky Floating CTA */}
      <StickyCTA />

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.08] bg-black text-xs text-neutral-500 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              COACHIFY<span className="text-emerald-400">.OS</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Yapay zeka destekli profesyonel futbol kulübü ve akademi yönetim işletim sistemi.
            </p>
          </div>

          <div>
            <div className="font-semibold text-neutral-300 mb-3">Hızlı Bağlantılar</div>
            <ul className="space-y-2 text-neutral-400">
              <li><Link to="/dashboard" className="hover:text-white">Genel Bakış</Link></li>
              <li><Link to="/players" className="hover:text-white">Kadro Yönetimi</Link></li>
              <li><Link to="/matches" className="hover:text-white">Taktik Tahtası & Maçlar</Link></li>
              <li><Link to="/training" className="hover:text-white">Antrenman & Yoklama</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-neutral-300 mb-3">Kulüp & Modüller</div>
            <ul className="space-y-2 text-neutral-400">
              <li><Link to="/team" className="hover:text-white">Kadro Derinliği</Link></li>
              <li><Link to="/analytics" className="hover:text-white">AI Taktik Motoru</Link></li>
              <li><Link to="/messages" className="hover:text-white">Takım İletişimi</Link></li>
              <li><Link to="/settings" className="hover:text-white">Kulüp Ayarları</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-neutral-300 mb-3">Geliştirici & Lisans</div>
            <p className="text-xs text-neutral-500 mb-2">Apache 2.0 Açık Kaynak Standartlarında.</p>
            <a href="https://github.com/adacreativeco" target="_blank" rel="noreferrer" className="text-emerald-400 font-medium hover:underline inline-flex items-center gap-1">
              <span>ADA Creative Co. GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/[0.06] text-center text-neutral-600">
          © 2026 COACHIFY.OS • Geliştirici: <span className="text-neutral-400 font-medium">ADA Creative Co. &lt;git@adacreative.co&gt;</span>
        </div>
      </footer>
    </div>
  );
}
