
const fs = require('fs');

const Post = require('../models/post');
const mysql = require('mysql');


// Créer et sauver un Article OK !! format de date !!
exports.createPost = (req, res, next) => {
    //Validation de requête
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide !",
        });
    }
    // Création d'un article
    const post = new Post({
        content:req.body.content,
        image: req.body.image,
        user_id: req.body.user_id
    });
    // Sauvegarde dans la DB
    Post.create(post, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites !",
            });
        }
        console.log(data);
        res.send(data);
    });
};

// suppprimer un article OK
exports.deletePost = (req, res, next) => {
    Post.deleteOne(req.params.articleId)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json ({ error }));
};

// modifier un Article OK !! format de date !!
exports.modifyPost = (req, res, next) => {
    let post  = req.body;
    let postId = req.params.postId;
    Post.updateOne(postId, post)
    .then(() => res.status(200).json({ message: 'Article modifié !'}))
    .catch(error => res.status(404).json({ error }));
};

// récupérer TOUS les articles de TOUS les utilisateurs OK
exports.getAllPosts = (req, res, next) => {
    Post.findAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

// récupérer TOUS les articles triés par date de création OK
exports.getPostByCreatedDate = (req, res, next) => {
    Post.findAllByCreatedAt((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })

};
