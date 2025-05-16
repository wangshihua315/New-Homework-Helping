import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'student',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await login(form.username, form.password, form.role);
      
      setLoading(false);
      // 登录成功后的处理
      alert(response.message || '登录成功！');
      
      // 根据角色跳转到不同页面
      if (response.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else if (response.role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || '登录失败，请检查您的凭据');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold mb-4 text-center">用户登录</h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">用户名</label>
          <input
            type="text"
            name="username"
            className="w-full border rounded-lg p-2"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">密码</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded-lg p-2"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">角色</label>
          <select
            name="role"
            className="w-full border rounded-lg p-2"
            value={form.role}
            onChange={handleChange}
          >
            <option value="student">学生</option>
            <option value="teacher">老师</option>
            <option value="admin">管理员</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? '登录中...' : '登录'}
        </button>
        
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-600 text-sm hover:underline">
            没有账号？注册一个
          </Link>
        </div>
        
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">测试账号：</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p>管理员: admin / 123456</p>
            <p>教师: teacher / 123456</p>
            <p>学生: student / 123456</p>
          </div>
        </div>
      </form>
    </div>
  );
} 