// jwt 토큰 파싱
export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]; // JWT의 페이로드 부분 추출
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};
