const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors=require('cors');



const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();
const mysql = require('mysql');
require('dotenv').config();
const { connect } = require('http2');
const db = mysql.createConnection({ 
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
});
db.connect(error => {
    if (error) throw error;
    console.log('Connexion à la base de données réussie !')
});
module.exports=connect;


app.use(helmet());
app.use (cors);
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

app.use('/api/auth', userRoutes);
app.use('/api/auth', postRoutes);
app.use('/api/auth', commentRoutes);
module.exports = app;