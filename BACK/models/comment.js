const mysql = require('mysql');

// Constructeur
const Comment = function(comment) {
    this.content = comment.content,
    this.userId = comment.userId,
    this.articleId = comment.articleId
    //this.user = comment.user
};
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// Création d'un commentaire 
Comment.create = (newComment, result) => {
    console.log(newComment);
  let sql= `INSERT INTO groupomania.comment(content,userId,articleId)Values('${newComment.content}','${newComment.userId}','${newComment.articleId}');`;
  var query= db.query (
    sql
    ,function   (err, res) {
           // console.log(query);
            if (err) {
                console.log("error: " +err);
                result(err, null);
                return;
            }else{ 
            console.log("Commentaire créé " + {id: res.id, ...newComment });
            result(null, {id: res.id, ...newComment});
        }
    }
    );
};

// Chercher tous les commentaires d'un article 
Comment.findAll = (articleId,result) => {
    //return new Promise((resolve, reject) => {
        
          let sql = `SELECT comment.id,comment.content,comment.articleId
           FROM groupomania.comment as comment  
           WHERE comment.articleId=${articleId}`
          console.log(articleId);
           var query= db.query (
            sql,
            function (err, res) {
                console.log(query);
                if (err) { 
                    return;
                } else {
                    result(null,{comments: res});
                }
            }
        )
        }


// Modifier un commentaire OK
Comment.updateOne = (commentId, body) => {
    return new Promise((resolve, reject) => {
        
            let sql=`UPDATE groupomania.comment content=${content} WHERE id=${commentId}` 
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
        
           let sql = `DELETE FROM groupomania.comment WHERE id=${commentId}`
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