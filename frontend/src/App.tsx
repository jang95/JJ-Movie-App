import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Root from './pages/Root';
import MovieDetailPage from './pages/movieDetail/MovieDetailPage';
import PersonDetailPage from './pages/personDetail/PersonDetailPage';
import SearchPage from './pages/search/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: '/person/:id',
        element: <PersonDetailPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
