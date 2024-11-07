import { useAuthStore } from '../store/authStore';

/**
 * 사용자 로그아웃 시 전역 상태 관리에 있는
 * 사용자 정보와 Token 삭제
 */
const clearUserSession = () => {
  const { clearAccessToken, clearUser } = useAuthStore.getState();
  clearAccessToken();
  clearUser();
};

export default clearUserSession;
