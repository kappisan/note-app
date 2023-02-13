const express = require('express'),
      path = require('path');
      route = require('route'),
      sqlite3 = require('sqlite3').verbose(),
      jwt = require('jsonwebtoken'),
      port = 3001,
      frontend = '../Frontend/build';

const app = express();
const secretKey = 'yoursecretkey';

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Create tables for storing users and notes
db.run(
  'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)'
);
db.run(
  'CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, task TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id))'
);

app.use(express.json());

// Create a new user
app.post('/api/createUser', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    username,
    password,
    function (err) {
      if (err) {
        res.status(500).json({ error: 'Failed to create user' });
      }
      res.json({ id: this.lastID, username });
    }
  );
});

// Login a user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  console.log("USERNAME:", username, "PASSWORD: ", password);
  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    username,
    password,
    (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
      if (!row) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const token = jwt.sign({ id: row.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    }
  );
});


// Get all notes for a user
app.get('/api/getNotes', (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Access token is required' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid access token' });
      }
      const userId = decoded.id;
      db.all('SELECT * FROM notes WHERE user_id = ?', userId, (err, rows) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch notes' });
        }
        res.json(rows);
      });
    });
  });
  
// Create a new note
app.post('/api/createNote', (req, res) => {
const token = req.headers.authorization;
if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
}
jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
    return res.status(401).json({ error: 'Invalid access token' });
    }
    const userId = decoded.id;
    const { task } = req.body;
    if (!task) {
    return res.status(400).json({ error: 'Task is required' });
    }
    db.run(
    'INSERT INTO notes (user_id, task) VALUES (?, ?)',
    userId,
    task,
    function (err) {
        if (err) {
        res.status(500).json({ error: 'Failed to create note' });
        }
        res.json({ id: this.lastID, task });
    }
    );
});
});

// Edit a note
app.put('/api/editNote/:id', (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Access token is required' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid access token' });
      }
      const userId = decoded.id;
      const noteId = req.params.id;
      const { task } = req.body;
      if (!task) {
        return res.status(400).json({ error: 'Task is required' });
      }
      db.run(
        'UPDATE notes SET task = ? WHERE id = ? AND user_id = ?',
        task,
        noteId,
        userId,
        function (err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to update note' });
          }
          if (this.changes === 0) {
            return res.status(404).json({ error: 'Note not found' });
          }
          res.json({ id: noteId, task });
        }
      );
    });
});

app.use(express.static(path.resolve(__dirname, frontend)));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});