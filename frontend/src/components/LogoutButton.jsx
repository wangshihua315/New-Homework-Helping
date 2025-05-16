import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 调用authService中的登出逻辑，它只清除本地存储
    logout();
    // 使用navigate跳转到登录页
    navigate('/login');
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      onClick={handleLogout}
    >
      退出登录
    </button>
  );
} 