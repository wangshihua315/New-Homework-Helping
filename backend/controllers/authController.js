const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/User');

// 注册新用户
exports.register = async (req, res) => {
  const { username, password, role } = req.body; // 注册请求中期望的角色
  const requestingUserRole = req.user.role; // 发起注册请求的用户的角色 (从JWT中获取)

  try {
    // 验证发起注册请求的用户是否有权限创建目标角色
    if (requestingUserRole === 'teacher' && role !== 'student') {
      return res.status(403).json({ message: '老师只能注册学生' });
    }
    if (requestingUserRole === 'student' && role !== 'student') {
        return res.status(403).json({ message: '学生不能注册其他角色' });
    }
    // 管理员可以注册老师和学生，不需要额外检查目标角色

    // 检查用户名是否已存在
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    // 密码加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建新用户
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role
    });

    // 注册成功，返回成功信息 (不返回JWT给注册操作)
    res.status(201).json({
      message: '用户注册成功',
      user: { // 返回部分用户信息
        id: newUser.id,
        username: newUser.username,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ where: { username, role } });
    if (!user) {
      return res.status(401).json({ message: '账号或角色错误' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '密码错误' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ message: '登录成功', token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

exports.logout = async (req, res) => {
  // 前端只需删除本地token，后端这边可以补充黑名单机制（可选）
  res.json({ message: '退出成功' });
}; 