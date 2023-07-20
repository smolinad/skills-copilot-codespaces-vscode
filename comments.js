// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
  // generate random id
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // get comments from post id
  const comments = commentsByPostId[req.params.id] || [];

  // add new comment to list
  comments.push({ id: commentId, content });

  // assign list back to post id
  commentsByPostId[req.params.id] = comments;

  // send back new comment
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});