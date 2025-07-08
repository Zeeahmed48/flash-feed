import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { PATHS } from '@/constants';

const AppShell = lazy(() => import('@/components/layout/app-shell'));
const ErrorFallback = lazy(() => import('@/components/shared/error-fallback'));

const Home = lazy(() => import('@/pages/home'));
const Feed = lazy(() => import('@/pages/feed'));

const router = createBrowserRouter([
    {
        path: PATHS.HOME,
        element: (
            <AppShell />
        ),
        errorElement: <ErrorFallback />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: PATHS.FEED,
                element: <Feed />
            }
        ]
    }
]);

export default router;