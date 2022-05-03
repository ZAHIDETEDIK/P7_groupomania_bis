const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const db= require('./config/db')


const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/likes');

const app = express();



app.use(helmet());
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin', '*'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);

module.exports = app;