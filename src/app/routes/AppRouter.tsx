import { selectCurrentUserId } from '@entities';
import { AuthPage, FeedPage } from '@pages';
import type { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

function useCurrentUserId() {
  return useSelector(selectCurrentUserId);
}

function RequireAuth({ children }: PropsWithChildren) {
  const currentUserId = useCurrentUserId();
  const location = useLocation();

  if (!currentUserId) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}

function RedirectIfAuthenticated({ children }: PropsWithChildren) {
  const currentUserId = useCurrentUserId();

  if (currentUserId) {
    return <Navigate to="/feed" replace />;
  }

  return children;
}

function RootRedirect() {
  const currentUserId = useCurrentUserId();
  const target = currentUserId ? '/feed' : '/auth';

  return <Navigate to={target} replace />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route
        path="/auth"
        element={
          <RedirectIfAuthenticated>
            <AuthPage />
          </RedirectIfAuthenticated>
        }
      />

      <Route
        path="/feed"
        element={
          <RequireAuth>
            <FeedPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
