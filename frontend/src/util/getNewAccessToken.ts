import { sendRefreshToken, RefreshTokenResponse } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

/**
 * 사용자의 정보 및 AcessToken 새로 받아 전역 상태에 저장
 */
const getNewAccessToken = async () => {
  const { setAccessToken, setUser } = useAuthStore.getState();

  const { userData, accessToken } =
    (await sendRefreshToken()) as RefreshTokenResponse;
  setUser(userData);
  setAccessToken(accessToken);
};

export default getNewAccessToken;
