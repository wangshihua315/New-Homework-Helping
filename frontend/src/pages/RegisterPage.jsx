import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student', // 默认为学生注册
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // 验证两次密码是否一致
    if (form.password !== form.confirmPassword) {
      setError('两次输入的密码不一致');
      setLoading(false);
      return;
    }

    try {
      const response = await register(form.username, form.password, form.role);

      setLoading(false);
      setSuccess(response.message || '注册成功！');
      
      // 清空表单
      setForm({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'student'
      });

      // 可以选择自动跳转到登录页
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || '注册失败，请稍后再试');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-md" onSubmit={handleRegister}>
        <h2 className="text-2xl font-semibold mb-4 text-center">用户注册</h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-500 text-sm">{success}</div>}

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
          <label className="block mb-1 text-sm font-medium">确认密码</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border rounded-lg p-2"
            value={form.confirmPassword}
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
          <p className="mt-1 text-xs text-gray-500">
            注意：教师和管理员账号通常需要管理员审核
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? '注册中...' : '注册'}
        </button>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 text-sm hover:underline">
            已有账号？返回登录
          </Link>
        </div>
      </form>
    </div>
  );
} 