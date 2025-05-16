const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, checkRole } = require('../middlewares/authMiddleware');

// 注册路由 - 只有管理员和老师可以访问
router.post('/register', authenticateToken, checkRole(['admin', 'teacher']), authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router; 