import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import MypagePage from './pages/mypage/MypagePage';
import getNewAccessToken from './util/getNewAccessToken';

// Lazy Loading 페이지 컴포넌트
const HomePage = lazy(() => import('./pages/home/HomePage'));
const Root = lazy(() => import('./pages/Root'));
const MovieDetailPage = lazy(
  () => import('./pages/movieDetail/MovieDetailPage')
);
const PersonDetailPage = lazy(
  () => import('./pages/personDetail/PersonDetailPage')
);
const SearchPage = lazy(() => import('./pages/search/SearchPage'));

const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/register/RegisterPage'));

const ReviewWritePage = lazy(() => import('./pages/review/ReviewWritePage'));
const ReviewEditPage = lazy(() => import('./pages/review/ReviewEditPage'));

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
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/review/write/:id',
        element: (
          <PrivateRoute>
            <ReviewWritePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/review/edit/:id',
        element: (
          <PrivateRoute>
            <ReviewEditPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/mypage/:name',
        element: (
          <PrivateRoute>
            <MypagePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    getNewAccessToken();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
