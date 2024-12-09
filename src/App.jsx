import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import useAuthStore from './store/authStore';

/// Pages and components
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PlayersInsights from './pages/PlayersInsights';
import Team from './pages/Team';
import Player from './pages/Player';
import Rules from './pages/Rules';
import Blog from './pages/Blog';
import BlogPostDetails from './pages/BlogPost';

function App() {
  const user = useAuthStore((state) => state.user);

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { path: 'signup', element: <Signup /> },
          { path: 'login', element: <Login /> },
          { index: true, element: user ? <Home /> : <Navigate to="/login" /> },
          {
            path: 'insights',
            element: user ? <PlayersInsights /> : <Navigate to="/login" />,
          },
          {
            path: 'insights/teams/:teamId',
            element: user ? <Team /> : <Navigate to="/login" />,
          },
          {
            path: 'insights/players/:playerId',
            element: user ? <Player /> : <Navigate to="/login" />,
          },
          {
            path: 'rules',
            element: user ? <Rules /> : <Navigate to="/login" />,
          },
          { path: 'blog', element: user ? <Blog /> : <Navigate to="/login" /> },
          {
            path: 'blog/:postId',
            element: user ? <BlogPostDetails /> : <Navigate to="/login" />,
          },
        ],
      },
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_startTransition: true,
      },
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </QueryClientProvider>
  );
}

export default App;
