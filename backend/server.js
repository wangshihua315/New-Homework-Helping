// backend/server.js
const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 