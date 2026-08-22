import { useAuthStore } from '../stores';
import { UserRole } from '../types';
import CoachDashboard from '../components/dashboard/CoachDashboard';
import PlayerDashboard from '../components/dashboard/PlayerDashboard';
import PresidentDashboard from '../components/dashboard/PresidentDashboard';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-300">Kullanıcı bilgisi bulunamadı.</p>
      </div>
    );
  }

  // Render role-specific dashboard
  switch (user.role) {
    case UserRole.COACH:
    case UserRole.ASSISTANT:
      return <CoachDashboard />;
    case UserRole.PLAYER:
      return <PlayerDashboard />;
    case UserRole.PRESIDENT:
      return <PresidentDashboard />;
    default:
      return <CoachDashboard />;
  }
}
