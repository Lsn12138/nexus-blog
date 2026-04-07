const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'data.db');
let db = null;

// ======================
// 初始化数据库
// ======================
async function initDb() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
    console.log('[DB] 已加载已有数据库:', DB_PATH);
  } else {
    db = new SQL.Database();
    console.log('[DB] 创建新数据库:', DB_PATH);
  }

  createTables();
  saveDb();
  return db;
}

// ======================
// 创建所有表
// ======================
function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      username   TEXT    NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT    NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS quiz_questions (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      quiz_id        INTEGER NOT NULL,
      question       TEXT    NOT NULL,
      correct_answer TEXT    NOT NULL,
      created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
    )
  `);

  console.log('[DB] 表初始化完成');
}

// ======================
// 持久化保存到文件
// ======================
function saveDb() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// ======================
// 工具：将 sql.js 结果转数组
// ======================
function toObjects(result) {
  if (!result || !result.length) return [];
  const cols = result[0].columns;
  return result[0].values.map(row => {
    const obj = {};
    cols.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });
}

// ======================
// 用户 DAO
// ======================
const userDao = {
  create(username) {
    db.run('INSERT INTO users (username) VALUES (?)', [username]);
    const id = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    saveDb();
    return { id, username };
  },

  findAll() {
    return toObjects(db.exec('SELECT id, username, created_at FROM users ORDER BY created_at DESC'));
  },

  findById(id) {
    const rows = toObjects(db.exec(`SELECT id, username, created_at FROM users WHERE id = ${id}`));
    return rows[0] || null;
  },

  delete(id) {
    db.run('DELETE FROM users WHERE id = ?', [id]);
    saveDb();
    return { changes: db.getRowsModified() };
  }
};

// ======================
// 测验 DAO
// ======================
const quizDao = {
  create(title) {
    db.run('INSERT INTO quizzes (title) VALUES (?)', [title]);
    const id = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    saveDb();
    return { id, title };
  },

  findAll() {
    return toObjects(db.exec('SELECT id, title, created_at FROM quizzes ORDER BY created_at DESC'));
  },

  findById(id) {
    const rows = toObjects(db.exec(`SELECT id, title, created_at FROM quizzes WHERE id = ${id}`));
    return rows[0] || null;
  },

  delete(id) {
    db.run('DELETE FROM quizzes WHERE id = ?', [id]);
    saveDb();
    return { changes: db.getRowsModified() };
  }
};

// ======================
// 题目 DAO
// ======================
const questionDao = {
  create(quizId, question, correctAnswer) {
    db.run(
      'INSERT INTO quiz_questions (quiz_id, question, correct_answer) VALUES (?, ?, ?)',
      [quizId, question, correctAnswer]
    );
    const id = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    saveDb();
    return { id, quiz_id: quizId, question, correct_answer: correctAnswer };
  },

  findByQuizId(quizId) {
    return toObjects(db.exec(`SELECT id, quiz_id, question, correct_answer, created_at FROM quiz_questions WHERE quiz_id = ${quizId}`));
  },

  delete(id) {
    db.run('DELETE FROM quiz_questions WHERE id = ?', [id]);
    saveDb();
    return { changes: db.getRowsModified() };
  }
};

module.exports = { initDb, userDao, quizDao, questionDao };
