// 한국 연령 등급
export const getAgeRatingClass = (rating: string) => {
  switch (rating) {
    case 'ALL':
      return 'bg-green-500 text-white';
    case '12':
      return 'bg-yellow-500 text-white';
    case '15':
      return 'bg-orange-500 text-white';
    case '18':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

// 사용자 선호도
export const getPreferenceColor = (score: number) => {
  if (score === 100) return 'bg-blue-500 text-white';
  if (score >= 80) return 'bg-green-500 text-white';
  if (score >= 60) return 'bg-yellow-500 text-white';
  if (score >= 40) return 'bg-orange-500 text-white';
  return 'bg-red-500 text-white';
};
