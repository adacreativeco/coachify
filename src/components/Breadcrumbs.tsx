import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  dashboard: 'Genel Bakış',
  players: 'Kadro & Oyuncular',
  team: 'Taktik & Takım',
  matches: 'Maçlar & Fikstür',
  training: 'Antrenman & Yoklama',
  analytics: 'Performans Analitiği',
  messages: 'Mesajlar',
  settings: 'Ayarlar',
  'thank-you': 'Kayıt Onayı',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0 || location.pathname === '/' || location.pathname === '/home') {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center space-x-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
      <Link to="/" className="flex items-center hover:text-emerald-600 transition-colors">
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Ana Sayfa</span>
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = routeLabels[value] || value;

        return (
          <div key={to} className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-bold">{label}</span>
            ) : (
              <Link to={to} className="hover:text-emerald-600 transition-colors">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
