# API
This server uses the Express framework to handle incoming HTTP requests and provide RESTful API endpoints for interacting with the SQLite database. The /getNotes endpoint returns all notes stored in the database, the /createNote endpoint creates a new note, and the /editNote endpoint edits an existing note.

# NodeJS

Endpoints:

>/getNotes
>/createNote
>/editNote


# SQL

To set up the SQLite database used in the backend, you need to run the following commands in the terminal:

Install the sqlite3 module using npm:

>npm install sqlite3

Create a database file with the name notes.db:

>sqlite3 notes.db

Connect to the database file:

python

>.open notes.db

Create a table for storing notes, with columns for the ID and task:

sql

>CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT NOT NULL);

Insert some data into the notes table:

sql

>INSERT INTO notes (task) VALUES ('Write code');
>INSERT INTO notes (task) VALUES ('Go for a run');

Query the data in the notes table:

sql

>SELECT * FROM notes;

This should output the data that you have inserted into the table.

Note: In the code example provided earlier, the database is in-memory, meaning that it only exists while the server is running and all data will be lost when the server stops. To persist data, you would need to replace the database connection URL in the code with a file path to an actual database file.
