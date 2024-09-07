import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { parseJwt } from '../api/api';
import { attemptTokenRefresh } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { useParams } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { accessToken } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        const decodedToken = parseJwt(accessToken);
        const tokenExpirationTime = new Date(decodedToken.exp * 1000);
        const currentTime = new Date();

        if (tokenExpirationTime < currentTime) {
          try {
            await attemptTokenRefresh();
            setIsAuthenticated(true);
          } catch (error) {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(true);
        }
      }
    };

    checkAuth();
  }, [accessToken]);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    const moveLoginPage = confirm(
      '인증된 사용자가 아닙니다. 로그인 페이지로 이동하시겠습니까?'
    );
    if (moveLoginPage) {
      return <Navigate to='/login' replace />;
    } else {
      return <Navigate to={`/movie/${id}`} replace />;
    }
  }
};

export default PrivateRoute;
