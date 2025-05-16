# 教育管理系统

这是一个教育管理后台系统，具有老师、学生/家长和管理员三个用户角色。

## 技术栈

- 前端：React + Tailwind CSS + React Router
- 后端：Node.js (Express) + JWT + Sequelize
- 数据库：SQLite (开发环境)

## 项目结构

```
/edu-portal
  /backend - Express 后端
  /frontend - React 前端
```

## 功能模块

1. 用户认证与授权模块（登录模块）
2. 学生信息管理模块
3. 教师管理模块
4. 课程管理模块
5. 成绩管理模块
6. 考勤管理模块
7. 通知公告模块
8. 教学资料共享模块
9. 家校互动模块
10. 统计分析模块
11. 系统管理模块

## 开始使用

### 安装依赖

**后端:**
```bash
cd backend
npm install
```

**前端:**
```bash
cd frontend
npm install
```

### 启动应用

**后端:**
```bash
cd backend
npm start
```

这将启动Express服务器在 http://localhost:3001，并自动创建SQLite数据库文件和测试用户。

**前端:**
```bash
cd frontend
npm run dev
```

这将启动Vite开发服务器在 http://localhost:5173。

### 测试账号

系统会自动创建以下测试账号，密码统一为 `123456`:

| 用户名 | 角色 | 密码 |
|-------|------|------|
| admin | 管理员 | 123456 |
| teacher | 教师 | 123456 |
| student | 学生 | 123456 |

## 开发注意事项

1. 前端和后端使用不同的端口，确保CORS配置正确
2. 数据库使用SQLite，适合开发环境，在生产环境可替换为MySQL或PostgreSQL
3. 前端使用React Router进行导航，避免直接操作window.location 