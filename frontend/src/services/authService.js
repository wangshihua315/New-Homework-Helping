import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

// 创建一个axios实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加token到请求头
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 登录服务
export const login = async (username, password, role) => {
  try {
    const response = await api.post('/login', { username, password, role });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 注册服务
export const register = async (username, password, role) => {
  try {
    const response = await api.post('/register', { username, password, role });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 登出服务 - 只清除本地存储，不再处理导航
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  // 导航由调用者处理
};

// 获取当前登录用户角色
export const getCurrentUserRole = () => {
  return localStorage.getItem('role');
};

// 判断用户是否已登录
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
}; 