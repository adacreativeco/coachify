import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, useUIStore, useNotificationStore } from '../stores';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '../types';
import { Breadcrumbs } from './Breadcrumbs';
import {
  Home,
  Users,
  Calendar,
  Trophy,
  BarChart3,
  MessageSquare,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  User,
  Shield,
  Activity,
  Award,
  Sparkles,
  Command,
  Search,
  BookOpen,
  ArrowRight,
  Crown,
  ClipboardList,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, switchRole } = useAuth();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { unreadCount } = useNotificationStore();

  const navigation = [
    { name: 'Genel Bakış', href: '/dashboard', icon: Home, badgeColor: 'bg-emerald-500' },
    { name: 'Kadro & Oyuncular', href: '/players', icon: Users },
    { name: 'Taktik & Takım', href: '/team', icon: Shield },
    { name: 'Maçlar & Fikstür', href: '/matches', icon: Trophy },
    { name: 'Antrenman & Yoklama', href: '/training', icon: Calendar },
    { name: 'Performans Analitiği', href: '/analytics', icon: BarChart3 },
    { name: 'Mesajlar', href: '/messages', icon: MessageSquare, badge: unreadCount },
    { name: 'Ayarlar', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      
      {/* Background Ambient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with 21st.dev Glass & Spotlight Styling */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-72 h-screen bg-slate-900/80 backdrop-blur-2xl border-r border-white/10 text-white flex flex-col justify-between transition-transform duration-300 ease-out shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40 transition-colors shadow-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center">
                  COACHIFY<span className="text-emerald-400">.OS</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  Sports Academy OS
                </span>
              </div>
            </Link>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with Framer Motion Active Indicator */}
          <nav className="p-4 space-y-1.5 overflow-y-auto flex-1">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Ana Menü
            </div>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {/* Framer Motion Active Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-600/30 border border-emerald-400/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
                    }`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge ? (
                    <span className="relative z-10 px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Quick Stadium Status Card */}
          <div className="p-4 mx-4 mb-2 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Canlı Taktik Motoru
              </span>
              <span className="text-[10px] font-mono text-emerald-300">v2.4</span>
            </div>
            <div className="text-[11px] text-slate-300">
              4-3-3 Formasyonu & Kondisyon Analizi senkronize çalışıyor.
            </div>
          </div>

          {/* User Profile & Role Card */}
          <div className="p-4 border-t border-white/10 bg-slate-950/60 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black font-extrabold flex items-center justify-center text-sm shadow-md shrink-0">
                  {user?.name?.charAt(0) || 'C'}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">{user?.name || 'Teknik Direktör'}</div>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    {user?.role || 'COACH'}
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  signOut();
                  navigate('/login');
                }}
                title="Çıkış Yap"
                className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        {/* Top App Bar with Role Switcher & Glassmorphism */}
        <header className="h-20 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Live Role Switcher with Framer Motion layoutId */}
            <div className="flex items-center space-x-1 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10">
              <span className="text-[11px] font-bold text-slate-400 px-2 hidden sm:inline">Rol:</span>
              
              <button
                onClick={() => switchRole(UserRole.PRESIDENT)}
                className={`relative px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  user?.role === UserRole.PRESIDENT ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {user?.role === UserRole.PRESIDENT && (
                  <motion.div
                    layoutId="activeRolePill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 shadow-md border border-amber-400/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Başkan</span>
                </span>
              </button>

              <button
                onClick={() => switchRole(UserRole.COACH)}
                className={`relative px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  user?.role === UserRole.COACH ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {user?.role === UserRole.COACH && (
                  <motion.div
                    layoutId="activeRolePill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md border border-emerald-400/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <ClipboardList className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Teknik Direktör</span>
                </span>
              </button>

              <button
                onClick={() => switchRole(UserRole.PLAYER)}
                className={`relative px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  user?.role === UserRole.PLAYER ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {user?.role === UserRole.PLAYER && (
                  <motion.div
                    layoutId="activeRolePill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md border border-blue-400/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Futbolcu</span>
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/messages"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </Link>
          </div>
        </header>

        {/* Page Container with Breadcrumbs */}
        <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
