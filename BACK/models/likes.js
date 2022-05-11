const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const Like=function(like){ 
this.article=like.article,
this.comment=like.comment

// Like un article
like.create = (newLike, result) => {
    console.log(newLike);
     let sql = `INSERT INTO groupomania.like (article,content)Values('${newLike.article}','(${newLike.comment};`;
      console.log(sql);
      var query= db.query (
        sql
        ,function
            (err, res){ 
                if (err) {
                    console.log("error: " +err);
                    result(err, null);
                    return;
                }
                console.log("Like créé " + {id: res.id, ...newLike });
                result(null, {id: res.id, ...newLike});
            }
        )
    }
};



