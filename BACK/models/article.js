const express = require('express');
const mysql = require ('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Constructeur
const Article = function(article) {
    
    this.content = article.content,
    this.image = article.image,
    this.userId = article.userId,
    this.user = article.user
    //this.likes_id=article.likes
};

//Création d'un article 
 Article.create=(newArticle, result) =>  {
console.log(newArticle);
        let sql = `INSERT INTO groupomania.article (content,image,userId) Values('${newArticle.content}','${newArticle.image}',${newArticle.userId});`;
        console.log(sql);
        var query= db.query (
            sql
            ,function
        (err, res)  {
            //console.log(query);   
            if (err) {
                console.log('non');
                result(err, null);
                return;
            }else{ 
            
            console.log("article créé" + {id: res.id, ...newArticle });
            result(null, {id: res.id, ...newArticle});
        }
    }
    );
};

// Effacer un article par son Id 
Article.deleteOne = (articleId) => {
    return new Promise((resolve, reject) => {
        
        let sql=`DELETE FROM groupomania.article WHERE id=${articleId}`
        var query= db.query (
            sql,
            function (error, result) {
                console.log(query);
                if (error) {
                    
                } else {
                    resolve (result);
                }
            }
        )
    })
};

// Modification d'un article OK
Article.updateOne = (articleId, article) => {
    return new Promise((resolve, reject) => {
       
        let sql=  `UPDATE groupomania.article content="${article.content}", image="${article.image}" WHERE id="${articleId}"`
        var query= db.query (
            sql,
            function (error, result) {
                console.log(query);
                if (error) {
                    reject (error);
                    
                } else {
                    resolve (result);
                    console.log("article " + {id: articleId, ...article} + "modifié avec succès");
                }
            }
        )
    })
};

// Chercher tous les articles OK
Article.findAll = (result) => {
    
    let sql=`SELECT userId,content,image,(SELECT pseudo FROM groupomania.user where id= article.userId ) as pseudo FROM groupomania.article as article`
        var query= db.query (
            sql,
            function(err,result){ 
                console.log(query);
            if (err) {
                return;
            } else {
                result(null, {article: res});
            }
        }
    )
};
//Article.findAllByCreatedAt = (result) => {
    
     //  let sql= "SELECT * FROM groupomania.article ORDER BY createdAt DESC="(result)
       // var query= db.query (
          //  sql,
          //  function(err,result){  
                //console.log(query);
        //if (err) {
               // return;
            //} else {
              //  result(null, {article: res});
           // }
        //}
    //)
//};

// Chercher tous les articles par date de mise a jour 
//Article.findAllByUpdatedAt = (result) => {
   
   //let sql="SELECT * FROM groupomania.article ORDER BY updatedAt DESC="(result)
   // var query= db.query (
      //  sql,
      //  function(err,result){ 
           // console.log(query);       
    //if (err) {
             //   result(err, null);
             //   return;
            //} else {
             //   result(null, {article: res});
           // }
        //}
    //)
//};

// Chercher un article par son id OK
Article.findOne = (articleId) => {
    return new Promise((resolve, reject)=> {
        
         let sql=`SELECT a.id AS articleId, a.userId AS userId, a.content AS content, a.image AS image,  WHERE a.id=${articleId} AND l.articled = a.id`
         var query= db.query (
            sql, 
         function (error, result, fields) {
            console.log(query);
                if (error) { 
                } else {
                    resolve (result);
                }
            }
        )
    })
};

// Chercher tous les articles d'un auteur en particulier OK
Article.findAllByUser = (userId) => {
    return new Promise ((resolve, reject) => {
        
           let sql= `SELECT * FROM groupomania.article WHERE userId=${userId}`
           var query= db.query (
            sql, 
            function (error, result, fields) {
                console.log(query);
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};



module.exports = Article;

    