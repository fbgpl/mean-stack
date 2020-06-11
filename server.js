const express = require('express');
const http = require('http');
const path = require('path');
const { Datastore } = require('nedb-async-await');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = http.Server(app);

app.use(cors());

const db = {};
db.posts = Datastore({
  filename: path.resolve(path.dirname(''), './database/posts.db'),
  autoload: true,
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api', (req, res) => {
  res.json({ status: 'Server works' });
});

// create
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const status = await db.posts.insert({ title, content });
  res.json(status);
});

// get list
app.get('/api/posts', async (req, res) => {
  const posts = await db.posts.find({});
  res.json({ posts });
});

// get single entry
app.get('/api/posts/:id', async (req, res) => {
  const post = await db.posts.find({ _id: req.params.id });
  res.json({ post });
});

// update
app.put('/api/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  const status = await db.posts.update(
    { _id: req.params.id },
    { title, content }
  );
  res.json(status);
});

// delete
app.delete('/api/posts/:id', async (req, res) => {
  const status = await db.posts.remove({ _id: req.params.id });
  res.json(status);
});

// serve static angular app
app.use(
  '/',
  express.static(path.resolve(path.dirname(''), './client/dist/client'))
);

app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(path.dirname(''), './client/dist/client/index.html')
  );
});

httpServer.listen(PORT, () => console.warn(`Listening on port: ${PORT}`));
