const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '未提供访问令牌' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: '令牌无效或已过期' });
    }
    
    req.user = user;
    next();
  });
};

// 检查是否为特定角色
exports.checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: '未经授权' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '没有访问权限' });
    }
    
    next();
  };
}; 