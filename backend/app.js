const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./utils/database');
const User = require('./models/User');

const app = express();

// 中间件
app.use(cors({
  origin: 'http://localhost:5173', // 前端Vite默认端口
  credentials: true
}));
app.use(express.json());


// 路由
app.use('/api/auth', authRoutes);

// 初始化数据库并创建一个测试用户
sequelize.sync({ alter: true })
  .then(async () => {
    console.log('数据库同步成功');
    
    // 检查是否已有用户，如果没有则创建测试用户
    const count = await User.count();
    if (count === 0) {
      // 创建测试用户
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('123456', salt);
      
      await User.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });
      
      await User.create({
        username: 'teacher',
        password: hashedPassword,
        role: 'teacher'
      });
      
      await User.create({
        username: 'student',
        password: hashedPassword,
        role: 'student'
      });
      
      console.log('创建测试用户成功！');
      console.log('登录信息：');
      console.log('- 管理员: admin/123456');
      console.log('- 教师: teacher/123456');
      console.log('- 学生: student/123456');
    }
  })
  .catch((err) => {
    console.error('数据库连接失败', err);
  });

module.exports = app; 