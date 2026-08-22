import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore, useUIStore, useNotificationStore } from '../stores';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '../types';
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
    { name: 'Genel Bakış', href: '/dashboard', icon: Home },
    { name: 'Kadro & Oyuncular', href: '/players', icon: Users },
    { name: 'Taktik & Takım', href: '/team', icon: Shield },
    { name: 'Maçlar & Fikstür', href: '/matches', icon: Trophy },
    { name: 'Antrenman & Yoklama', href: '/training', icon: Calendar },
    { name: 'Performans Analitiği', href: '/analytics', icon: BarChart3 },
    { name: 'Mesajlar', href: '/messages', icon: MessageSquare, badge: unreadCount },
    { name: 'Ayarlar', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-black text-lg">
                ⚽
              </div>
              <span className="font-black text-lg tracking-tight text-white">COACHIFY<span className="text-emerald-400">.OS</span></span>
            </Link>
            <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge ? (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-white/10 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{user?.name || 'Kullanıcı'}</div>
                <div className="text-[10px] text-emerald-400 font-semibold uppercase">{user?.role || 'COACH'}</div>
              </div>
            </div>
            <button
              onClick={() => {
                signOut();
                navigate('/login');
              }}
              title="Çıkış Yap"
              className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Bar with Role Switcher */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-300">
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Live Role Switcher */}
            <div className="flex items-center space-x-1.5 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 px-2">Görünüm:</span>
              <button
                onClick={() => switchRole(UserRole.PRESIDENT)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  user?.role === UserRole.PRESIDENT
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                👑 Başkan
              </button>
              <button
                onClick={() => switchRole(UserRole.COACH)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  user?.role === UserRole.COACH
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                📋 Teknik Direktör
              </button>
              <button
                onClick={() => switchRole(UserRole.PLAYER)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  user?.role === UserRole.PLAYER
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                ⚽ Futbolcu
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/messages"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>
          </div>
        </header>

        {/* Page Container */}
        <main className="p-6 flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
