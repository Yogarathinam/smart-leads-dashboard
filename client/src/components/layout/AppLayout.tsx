import { Outlet, useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../features/auth/auth.store';
import { useThemeStore } from '../../features/theme/theme.store';

export const AppLayout = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === 'dark';

  const onLogout = () => {
    clearAuth();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-50">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-[#09090B]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-zinc-900 dark:text-white"
            >
              <path d="M12 2L2 22h20L12 2z" />
              <path d="M12 12L2 22" />
              <path d="M12 12l10 10" />
            </svg>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">GigFlow</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {user ? `${user.name} • ${user.role}` : 'Smart Leads Dashboard'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Button onClick={onLogout} variant="secondary" className="inline-flex h-9 items-center gap-2 px-3 text-sm">
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};