import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import useAuthStore from './store/authStore';
import { loadLocal } from './utils/localStorage';

/// Pages and components
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Players from './pages/Players';
import Player from './pages/Player';
import Rules from './pages/Rules';
import Blog from './pages/Blog';

function App() {
  const user = useAuthStore((state) => state.user) || loadLocal('user');

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: user ? <Home /> : <Navigate to="/login" /> },
          { path: 'signup', element: <Signup /> },
          { path: 'login', element: <Login /> },
          // { path: 'players', element: <Players /> },
          // { path: 'players/:playerId', element: <Player /> },
          // { path: 'rules', element: <Rules /> },
          // { path: 'blog', element: <Blog /> },
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
