import { useNavigate } from 'react-router-dom';
import { sendLogoutRequest, withdrawalRequest } from '../../api/userApi';
import { useAuthStore } from '../../store/authStore';
import Button from '../../ui/Button';
import clearUserSession from '../../util/clearUserSession';

const DeleteAccountButton = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    // user! 사용 최소화
    if (!user) {
      alert('로그인 정보가 없습니다.');
      return;
    }
    const isConfirmed = window.confirm('정말로 회원 탈퇴를 하시겠습니까?');
    if (isConfirmed) {
      try {
        await withdrawalRequest(user.email);
        await sendLogoutRequest();
        clearUserSession();
        alert('회원탈퇴 되었습니다.');
        navigate(`/`);
      } catch (error) {
        alert('회원탈퇴 중 오류 발생, 다시 시도해주세요');
      }
      withdrawalRequest(user.email);
    }
  };
  return (
    <Button danger={true} type={'button'} onClick={handleDeleteClick}>
      회원 탈퇴
    </Button>
  );
};

export default DeleteAccountButton;
