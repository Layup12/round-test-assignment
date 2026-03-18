import { selectCurrentUserId } from '@entities';
import { lazy, type PropsWithChildren, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AUTH_ROUTE, FEED_ROUTE, FOLLOWERS_ROUTE, FOLLOWING_ROUTE, PROFILE_ROUTE, ROOT_ROUTE } from './paths';

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
    return <Navigate to={AUTH_ROUTE} replace state={{ from: location }} />;
  }

  return children;
}

function RedirectIfAuthenticated({ children }: PropsWithChildren) {
  const currentUserId = useCurrentUserId();

  if (currentUserId) {
    return <Navigate to={FEED_ROUTE} replace />;
  }

  return children;
}

function RootRedirect() {
  const currentUserId = useCurrentUserId();
  const target = currentUserId ? FEED_ROUTE : AUTH_ROUTE;

  return <Navigate to={target} replace />;
}

export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={ROOT_ROUTE} element={<RootRedirect />} />

        <Route
          path={AUTH_ROUTE}
          element={
            <RedirectIfAuthenticated>
              <AuthPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path={FEED_ROUTE}
          element={
            <RequireAuth>
              <FeedPage />
            </RequireAuth>
          }
        />
        <Route
          path={PROFILE_ROUTE}
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path={FOLLOWERS_ROUTE}
          element={
            <RequireAuth>
              <FollowListPage type="followers" />
            </RequireAuth>
          }
        />
        <Route
          path={FOLLOWING_ROUTE}
          element={
            <RequireAuth>
              <FollowListPage type="following" />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to={ROOT_ROUTE} replace />} />
      </Routes>
    </Suspense>
  );
}
