require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb, userDao, quizDao, questionDao } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// ======================
// 健康检查
// GET /api/health
// ======================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ======================
// 用户 API
// ======================

// POST /api/user  创建用户
app.post('/api/user', (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({ error: 'username 不能为空' });
  }
  try {
    const user = userDao.create(username.trim());
    res.status(201).json({ message: '用户创建成功', user });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(409).json({ error: '用户名已存在' });
    }
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users  获取所有用户
app.get('/api/users', (req, res) => {
  try {
    const users = userDao.findAll();
    res.json({ users, count: users.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/user/:id  获取单个用户
app.get('/api/user/:id', (req, res) => {
  try {
    const user = userDao.findById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: '用户不存在' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/user/:id  删除用户
app.delete('/api/user/:id', (req, res) => {
  try {
    const result = userDao.delete(Number(req.params.id));
    if (result.changes === 0) return res.status(404).json({ error: '用户不存在' });
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// 测验 API
// ======================

// POST /api/quiz  创建测验
app.post('/api/quiz', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title 不能为空' });
  }
  try {
    const quiz = quizDao.create(title.trim());
    res.status(201).json({ message: '测验创建成功', quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/quizzes  获取所有测验
app.get('/api/quizzes', (req, res) => {
  try {
    const quizzes = quizDao.findAll();
    res.json({ quizzes, count: quizzes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/quiz/:id  获取单个测验（含题目）
app.get('/api/quiz/:id', (req, res) => {
  try {
    const quiz = quizDao.findById(Number(req.params.id));
    if (!quiz) return res.status(404).json({ error: '测验不存在' });
    const questions = questionDao.findByQuizId(quiz.id);
    res.json({ quiz, questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// 题目 API
// ======================

// POST /api/question  创建题目
app.post('/api/question', (req, res) => {
  const { quiz_id, question, correct_answer } = req.body;
  if (!quiz_id || !question || !correct_answer) {
    return res.status(400).json({ error: 'quiz_id、question、correct_answer 都不能为空' });
  }
  try {
    const q = questionDao.create(Number(quiz_id), question.trim(), correct_answer.trim());
    res.status(201).json({ message: '题目创建成功', question: q });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// 启动服务
// ======================
async function start() {
  try {
    await initDb();          // 异步初始化数据库
    app.listen(PORT, () => {
      console.log(`\n🚀 Nexus API 服务已启动: http://localhost:${PORT}\n`);
      console.log('📖 API 列表:');
      console.log('   GET  /api/health        - 健康检查');
      console.log('   POST /api/user         - 创建用户');
      console.log('   GET  /api/users         - 获取所有用户');
      console.log('   GET  /api/user/:id      - 获取单个用户');
      console.log('   DELETE /api/user/:id    - 删除用户');
      console.log('   POST /api/quiz         - 创建测验');
      console.log('   GET  /api/quizzes      - 获取所有测验');
      console.log('   GET  /api/quiz/:id     - 获取测验（含题目）');
      console.log('   POST /api/question     - 创建题目\n');
    });
  } catch (err) {
    console.error('❌ 服务启动失败:', err.message);
    process.exit(1);
  }
}

start();
