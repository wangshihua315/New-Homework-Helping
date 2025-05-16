import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutButton from './components/LogoutButton';
import { isAuthenticated, getCurrentUserRole } from './services/authService';
import { requireAuth } from './utils/authGuard';

// 简单的仪表板页面组件
const DashboardPage = ({ role, allowedRoles }) => {
  useEffect(() => {
    // 在页面加载时进行权限验证
    requireAuth(allowedRoles);
  }, [allowedRoles]); // 当允许的角色列表变化时重新验证

  // 如果requireAuth重定向了，下面的内容不会渲染
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{role}仪表板</h1>
          <LogoutButton />
        </div>
        <p className="mb-4">欢迎使用教育管理系统！</p>
        <p>您当前的角色是: <span className="font-semibold">{role}</span></p>
        {/* 其他仪表板内容 */}
      </div>
    </div>
  );
};

// 受保护的路由组件
const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = getCurrentUserRole();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // 如果用户未被允许访问此角色路由，重定向到其自己的仪表板
    return <Navigate to={`/${userRole}/dashboard`} />;
  }
  
  // 直接渲染元素，权限验证在DashboardPage内部处理
  return element;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* 学生路由 */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute 
              element={<DashboardPage role="student" allowedRoles={['student']} />} 
              allowedRoles={['student']} 
            />
          } 
        />
        
        {/* 教师路由 */}
        <Route 
          path="/teacher/dashboard" 
          element={
            <ProtectedRoute 
              element={<DashboardPage role="teacher" allowedRoles={['teacher']} />} 
              allowedRoles={['teacher']} 
            />
          } 
        />
        
        {/* 管理员路由 */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute 
              element={<DashboardPage role="admin" allowedRoles={['admin']} />} 
              allowedRoles={['admin']} 
            />
          } 
        />
        
        {/* 404页面 */}
        <Route path="*" element={<div>页面不存在</div>} />
      </Routes>
    </Router>
  );
} 