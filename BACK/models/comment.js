const mysql = require('mysql');

// Constructeur
const Comment = function(comment) {
    this.content = comment.content,
    this.userId = comment.userId,
    this.articleId = comment.articleId
};
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// Création d'un commentaire 
Comment.create = (newComment, result) => {
    
  let sql= `INSERT INTO groupomania.comment(content,userId,articleId)Values('${newComment.content}','${newComment.userId}','${newComment.article.id}');`;
  var query= db.query (
    sql
    ,function   (err, res) {
            console.log(query);
            if (err) {
                console.log("error: " +err);
                result(err, null);
                return;
            }
            console.log("Commentaire créé " + {id: res.id, ...newComment });
            result(null, {id: res.id, ...newComment});
        }
    );
};

// Chercher tous les commentaires d'un article 
Comment.findAll = (articleId) => {
    return new Promise((resolve, reject) => {
        
          let sql = `SELECT * FROM groupomania.comments WHERE articles =${articleId}`
          var query= db.query (
            sql,
            function (error, result) {
                console.log(query);
                if (error) { 
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

// Modifier un commentaire OK
Comment.updateOne = (commentId, body) => {
    return new Promise((resolve, reject) => {
        
            let sql=`UPDATE groupomania.comments SET content=${content} WHERE id=${commentId}` 
            var query= db.query (
                sql,
            function (error, result) {
                console.log(query);
                if (error) { 
                    reject (error);
                } else {
                    resolve (result);
                    console.log('commentaire modifié !')
                }
            }
        )
    })
};

// Effacer un commentaire avec son id 
Comment.deleteOneComment = (commentId) => {
    return new Promise((resolve, reject) => {
        
           let sql = `DELETE FROM groupomania.comments WHERE id=${commentId}`
           var query= db.query (
            sql,
             function (error, result) {
                if (error) {
                    console.log(query);
                    reject(error);
                    console.log(error + ' pas effacé');
                } else {
                resolve (result);
                console.log("utilisateur supprimé !");
                }
            }
        )
    })
};

// Trouver un article par son Id 
Comment.findById = (commentId) => {
    return new Promise((resolve, reject) => {
       
         let sql =  `SELECT * FROM groupomania.comments WHERE id=${commentId}`
         var query= db.query (
            sql,
            function (error, result) {
                if (error) { 
                    console.log(query);
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

module.exports = Comment;