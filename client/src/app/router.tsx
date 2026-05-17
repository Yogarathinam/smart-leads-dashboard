import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import LeadDetailsPage from '../pages/LeadDetailsPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
import { AppLayout } from '../components/layout/AppLayout';
import { Spinner } from '../components/ui/Spinner';
import { useAuthStore } from '../features/auth/auth.store';
import type { UserRole } from '../features/auth/auth.types';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: UserRole[] }) => {
  const { isAuthenticated, isLoading, hasHydrated, user, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) {
      void checkAuth();
    }
  }, [checkAuth, hasHydrated]);

  if (isLoading || !hasHydrated) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const PublicOnlyRoute = () => {
  const { isAuthenticated, hasHydrated, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) {
      void checkAuth();
    }
  }, [checkAuth, hasHydrated]);

  if (isLoading || !hasHydrated) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/leads/:id', element: <LeadDetailsPage /> },
        ],
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);