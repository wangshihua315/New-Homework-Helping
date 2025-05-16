import { isAuthenticated, getCurrentUserRole } from '../services/authService';

export function requireAuth(allowedRoles = []) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (!isAuthenticated() || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
    // 如果没有认证或者角色不符合要求，重定向到登录页
    window.location.href = '/login'; // 或者使用 navigate('/login') 在React组件中
  }
} 