import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { accessToken, user } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken && !user) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (loading) {
    return <div>잠시만 기다려주세요. 로그인 중입니다.</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
