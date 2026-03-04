import { selectCurrentUserId } from '@entities';
import { lazy, type PropsWithChildren, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

const AuthPage = lazy(() => import('@pages/auth').then((module) => ({ default: module.AuthPage })));
const FeedPage = lazy(() => import('@pages/feed').then((module) => ({ default: module.FeedPage })));
const ProfilePage = lazy(() => import('@pages/profile').then((module) => ({ default: module.ProfilePage })));
const FollowListPage = lazy(() =>
  import('@pages/follow-list').then((module) => ({ default: module.FollowListPage })),
);

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
    <Suspense fallback={null}>
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
        <Route
          path="/profile/:userId"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:userId/followers"
          element={
            <RequireAuth>
              <FollowListPage type="followers" />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:userId/following"
          element={
            <RequireAuth>
              <FollowListPage type="following" />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
