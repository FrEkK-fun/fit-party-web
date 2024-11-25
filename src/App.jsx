import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import { useAuthContext } from './hooks/useAuthContext';

/// Pages and components
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Players from './pages/Players';
import Player from './pages/Player';
import Rules from './pages/Rules';
import Blog from './pages/Blog';

const { user } = useAuthContext();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: !user ? <Signup /> : <Navigate to="/" /> },
      { path: 'login', element: !user ? <Login /> : <Navigate to="/" /> },
      { path: 'players', element: !user ? <Login /> : <Players /> },
      { path: 'players/:playerId', element: !user ? <Login /> : <Player /> },
      { path: 'rules', element: !user ? <Login /> : <Rules /> },
      { path: 'blog', element: !user ? <Login /> : <Blog /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
