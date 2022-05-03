require('dotenv').config();
const mysql = require('mysql');
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