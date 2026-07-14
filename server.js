// server.js — Europa Waters subscriber capture
// Saves emails to SQLite, sends alert to greg@europawaters.xyz
// Run: node server.js
// Requires: npm install express better-sqlite3 nodemailer cors dotenv

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const Database   = require('better-sqlite3');
const nodemailer = require('nodemailer');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Database setup ──────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'subscribers.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    email       TEXT NOT NULL UNIQUE,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ── Email transporter ────────────────────────────────────────────
// Set SMTP_USER and SMTP_PASS in .env (use a Gmail App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ── Middleware ───────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());

// ── POST /subscribe ──────────────────────────────────────────────
app.post('/subscribe', (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();

  // Basic validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Insert — ignore duplicate
  try {
    const insert = db.prepare(
      'INSERT OR IGNORE INTO subscribers (email) VALUES (?)'
    );
    const result = insert.run(email);

    if (result.changes === 0) {
      return res.json({ status: 'already_subscribed' });
    }
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Database error.' });
  }

  // Email alert to greg
  const mailOptions = {
    from: process.env.SMTP_USER,
    to:   'greg@europawaters.xyz',
    subject: 'New Europa Waters Subscriber',
    text: `New subscriber: ${email}\n\nTime: ${new Date().toISOString()}`
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) console.error('Email error:', err.message);
  });

  return res.json({ status: 'subscribed' });
});

// ── GET /subscribers (admin — add auth before exposing publicly) ──
app.get('/subscribers', (req, res) => {
  const rows = db.prepare('SELECT id, email, subscribed_at FROM subscribers ORDER BY subscribed_at DESC').all();
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`Europa Waters subscribe server running on http://localhost:${PORT}`);
});
