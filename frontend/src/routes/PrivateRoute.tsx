import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseJwt } from '../api/api';
import { attemptTokenRefresh } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { accessToken } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        // 토큰이 있으면 만료 시간을 확인
        const decodedToken = parseJwt(accessToken);
        const tokenExpirationTime = new Date(decodedToken.exp * 1000);
        const currentTime = new Date();

        if (tokenExpirationTime < currentTime) {
          try {
            await attemptTokenRefresh();
          } catch (error) {
            console.error('토큰 갱신 실패:', error);
            const moveLoginPage = confirm(
              '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?'
            );
            if (moveLoginPage) {
              navigate('/login', {
                state: { ...location.state, from: location },
              });
            } else {
              navigate(-1);
            }
          }
        }
      } else {
        const moveLoginPage = confirm(
          '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?'
        );
        if (moveLoginPage) {
          navigate('/login', {
            state: { ...location.state, from: location },
          });
        } else {
          navigate(-1);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [accessToken, location, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
