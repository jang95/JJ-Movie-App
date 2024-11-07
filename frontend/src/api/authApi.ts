import axios from 'axios';
import { IUser } from '../store/authStore';

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export interface RefreshTokenResponse {
  message: string;
  success: boolean;
  userData: IUser;
  accessToken: string;
}

// 토근 재발급
export const sendRefreshToken = async (): Promise<
  RefreshTokenResponse | undefined
> => {
  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${BASE_URL}/refreshToken`,
      {},
      {
        withCredentials: true,
      }
    );

    console.log('esponse.data', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response?.status;
        switch (status) {
          case 401:
            console.log('인증되지 않거나 로그인되어 있지 않습니다.');
            break;
          case 404:
            console.log('요청한 리소스를 찾을 수 없습니다.');
            break;
          default:
            console.log(
              '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            );
            break;
        }
      } else {
        console.log(
          '리프레시 토큰 검증 중 문제가 발생했습니다.' + error.message
        );
      }
    } else {
      console.log('당장 알 수 없는 오류가 발생했습니다.');
    }
  }
};
