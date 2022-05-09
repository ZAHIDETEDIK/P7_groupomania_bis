
const fs = require('fs');
const jwt = require("jsonwebtoken");
const Article = require('../models/article');
const mysql = require('mysql');


// Créer et sauver un Article OK !! format de date !!
exports.createArticle = (req, res, next) => {
    
        Article.create({
        
            content: req.body.content,
            image:req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.image,
            userId: req.body.userId,
        },(err, data) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(401).json({ error: err });
                }
            }
            res.send(data);
            console.log(data + 'post créé !');
        }); 
        //.then(() => res.status(201).json({message: 'Post créé !'}))
        //.catch( error => res.status(400).json({error}));
    
    
};
// suppprimer un article OK
exports.deleteArticle = (req, res, next) => {
    Article.findOne(req.params.articleId)
    .then((article) => {
     Article.deleteOne(req.params.articleId) 
     .then(() => res.status(200).json({ message: 'Message supprimé' }))
                .catch(error => res.status(400).json({ error }));
         
     })  
    
    .catch(error => res.status(500).json({ error }));
}

// modifier un Article OK !! format de date !!
exports.modifyArticle = (req, res, next) => {
    let article = req.body;
    let articleId = req.params.articleId;
    console.log(articleId + " " + article);
    Article.updatedOne((err,data)=>{ 
        if(err){
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
      });
    }


// récupérer TOUS les articles de TOUS les utilisateurs OK
exports.getArticle = (req, res, next) => {
    Article.findAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

// récupérer TOUS les articles triés par date de création OK
//exports.getArticleByCreatedDate = (req, res, next) => { 
  //  Article.findAllByCreatedAt((err, data) => {
       // if(err){
          // res.status(500).send({
               // message: err.message || "des erreurs se sont produites",
            //});
        //}
        //res.send(data);
    //})
//};
// récupérer TOUS les articles triés par date de mise ajour OK
//exports.getArticlesByUpdatedDate = (req, res, next) => {
   // Article.findAllByUpdatedAt((err, data) => {
       // if(err){
           // res.status(500).send({
              //  message: err.message || "des erreurs se sont produites",
            //});
        //}
        //res.send(data);
   // })
//};

// Récupérer un article précis à partir de son id OK
exports.getOneArticle = (req, res, next) => {
    Article.findOne(req.params.id)
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error }));
};

// récupérer tous les articles d'UN utilisateur 
exports.getArticlesOfOneUser = (req, res, next) => {
    Article.findAllByUser(req.userId)
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(404).json({ error }));
};




