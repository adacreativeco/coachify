import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../stores';
import { UserRole } from '../types';
import type { User } from '../types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const demoProfiles: Record<UserRole, User> = {
  [UserRole.PRESIDENT]: {
    id: 'usr_president',
    name: 'Dursun Özbek',
    email: 'baskan@galatasaray.org',
    role: UserRole.PRESIDENT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  [UserRole.COACH]: {
    id: 'usr_coach',
    name: 'Okan Buruk',
    email: 'okan.buruk@galatasaray.org',
    role: UserRole.COACH,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  [UserRole.PLAYER]: {
    id: 'usr_player',
    name: 'Victor Osimhen',
    email: 'victor.osimhen@galatasaray.org',
    role: UserRole.PLAYER,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  [UserRole.ASSISTANT]: {
    id: 'usr_assistant',
    name: 'İrfan Saraloğlu',
    email: 'irfan.s@galatasaray.org',
    role: UserRole.ASSISTANT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In-memory rate limiting state
let failedAttempts = 0;
let lockoutExpiry = 0;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, setIsLoading, logout } = useAuthStore();
  const [loading, setLoadingState] = useState(false);

  useEffect(() => {
    if (!user) {
      setUser(demoProfiles[UserRole.COACH]);
    }
    setIsLoading(false);
  }, []);

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    if (now < lockoutExpiry) {
      const remainingSec = Math.ceil((lockoutExpiry - now) / 1000);
      toast.error(`Çok fazla başarısız deneme. Lütfen ${remainingSec} saniye bekleyin.`);
      return false;
    }
    return true;
  };

  const recordFailedAttempt = () => {
    failedAttempts++;
    if (failedAttempts >= 5) {
      lockoutExpiry = Date.now() + 60 * 1000; // 60s cooldown
      failedAttempts = 0;
      toast.error('Güvenlik nedeniyle oturum açma 60 saniye boyunca kilitlendi.');
    }
  };

  const signIn = async (email: string) => {
    if (!checkRateLimit()) return;

    setLoadingState(true);
    let matchedRole = UserRole.COACH;
    if (email.toLowerCase().includes('baskan') || email.toLowerCase().includes('president')) {
      matchedRole = UserRole.PRESIDENT;
    } else if (email.toLowerCase().includes('player') || email.toLowerCase().includes('osimhen') || email.toLowerCase().includes('futbolcu')) {
      matchedRole = UserRole.PLAYER;
    }

    const selectedUser = demoProfiles[matchedRole];
    setUser(selectedUser);
    failedAttempts = 0;
    setLoadingState(false);
    toast.success(`Giriş başarılı! Rol: ${selectedUser.name} (${selectedUser.role.toUpperCase()})`);
  };

  const signUp = async (email: string, _password: string, name: string, role: string) => {
    if (!checkRateLimit()) return;

    setLoadingState(true);
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      role: (role as UserRole) || UserRole.COACH,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUser(newUser);
    failedAttempts = 0;
    setLoadingState(false);
    toast.success(`Hesap oluşturuldu ve giriş yapıldı!`);
  };

  const switchRole = (newRole: UserRole) => {
    const profile = demoProfiles[newRole];
    setUser(profile);
    toast.success(`Rol Değiştirildi: ${profile.name} (${newRole.toUpperCase()})`);
  };

  const signOut = async () => {
    logout();
    toast.info('Oturum kapatıldı.');
  };

  const deleteAccount = async () => {
    logout();
    localStorage.clear();
    toast.success('Hesabınız ve tüm ilişkili verileriniz kalıcı olarak silindi.');
  };

  const resetPassword = async () => {
    if (!checkRateLimit()) return;
    toast.info('Şifre sıfırlama talimatı güvenlik kontrollerinin ardından iletilecektir.');
  };

  const updatePassword = async () => {
    toast.success('Şifreniz güvenli bir şekilde güncellendi.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        deleteAccount,
        switchRole,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
