const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let posts = [];

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Створити новий пост
app.post('/api/posts', (req, res) => {
    const { title, description, author } = req.body;
    const newPost = { id: Date.now(), title, description, author };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Оновити пост
app.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const post = posts.find(post => post.id == id);
    if (post) {
        post.title = title;
        post.description = description;
        post.author = author;
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
});

// Видалити пост
app.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(post => post.id != id);
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
