const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Create table for storing notes
db.run(
  'CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT NOT NULL)'
);

app.use(express.json());

// Get all notes
app.get('/getNotes', (req, res) => {
  db.all('SELECT * FROM notes', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch notes' });
    }
    res.json(rows);
  });
});

// Create a new note
app.post('/createNote', (req, res) => {
  const task = req.body.task;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  db.run(
    'INSERT INTO notes (task) VALUES (?)',
    task,
    function (err) {
      if (err) {
        res.status(500).json({ error: 'Failed to create note' });
      }
      res.json({ id: this.lastID, task });
    }
  );
});

// Edit a note
app.post('/editNote', (req, res) => {
  const id = req.body.id;
  const task = req.body.task;
  if (!id || !task) {
    return res
      .status(400)
      .json({ error: 'Note ID and task are both required' });
  }
  db.run(
    'UPDATE notes SET task = ? WHERE id = ?',
    task,
    id,
    function (err) {
      if (err) {
        res.status(500).json({ error: 'Failed to edit note' });
      }
      res.json({ id, task });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});