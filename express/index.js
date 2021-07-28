const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors');
const { parseMD } = require('./utils/parseMd')
const { Post, PostMeta } = require('./models/postsModel')

const port = 3001
const appDir = path.dirname(require.main.filename)
const rootPostDir = '/../assets/posts'

const app = express()
app.use(cors());

/**
 *  Returns the detail of an individual post in json, formatted as:
 * {
 *  post: {
 *    content: <article's markdown content>,
 *    tags: <array of 5 top tags for the post>
 *  }
 * }
 */
app.get('/post/:slug', function (req, res) {
  if(req.params.slug) {
    const fileContents = fs.readFileSync(path.join(appDir, rootPostDir, req.params.slug + '.md'), 'utf8');
    const { ignore, content } = parseMD(fileContents);
    res.json(new Post(content));
  }
});

/**
 * Returns a json array of all posts, formatted as:
 * [
 *  {
 *    title: <article's title>,
 *    slug: <article's slug>
 *  },
 *  ...
 * ]
 */
app.get('/posts', function (req, res) {
  fs.readdir(path.join(appDir, rootPostDir), function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    let posts = new Array();
    //parsing all files using forEach
    files.forEach(file => {
      const fileContents = fs.readFileSync(path.join(appDir, rootPostDir, file), 'utf8');
      const { metadata } = parseMD(fileContents);
      posts.push(new PostMeta(metadata.Title, metadata.Slug));
    });
    res.json(posts);
  });
});

app.listen(port, err => {
  if (err) return console.log(`Cannot Listen on port: ${port}`);
  console.log(`My Blog app is Listening on: http://localhost:${port}/`);
});