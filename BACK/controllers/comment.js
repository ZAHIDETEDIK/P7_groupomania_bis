const Comment = require('../models/comment');
const mysql = require('mysql');


// Créer un nouveau commentaire 
exports.createComment = (req, res) => {
    // Validation de requête
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne doit pas être vide !",
        });
    }
    // Création d'un commentaire
    const comment = new Comment({
        body: req.body.body,
        userId: req.body.userId,
        articleId: req.body.articleId
    });
    // Sauvegarde dans la DB
    Comment.create(comment, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Des erreurs se sont produites !",
            });
        }
        console.log(data);
        res.send(data);
    });
};

// Récupérer les commentaires par l'id de l'article concerné 
exports.getAllComments = (req, res) => {
    Comment.findAll(req.params.articleId)
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(404).json({ error }));
};

// Modifier un commentaire 
//exports.updateComment = (req, res) => {
    //let commentId = req.params.commentId;
    //let body = JSON.stringify(req.body.body);
    //console.log(commentId + body);
    //Comment.updateOne(commentId, body)
    //.then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
    //.catch(error => res.status(404).json({ error }));
//};

// Supprimer un commentaire 
exports.deleteComment = (req, res) => {
    Comment.deleteComment(req.params.commentId)
    .then(() => res.status(200).json({ message: 'Commentaire effacé !'}))
    .catch(error => res.status(404).json({ error }));
}

// Trouver un commentaire par son ID (modification de commentaire) 
//exports.findCommentById = (req, res, next) => {
    //Comment.findById(req.params.commentId)
    //.then(comment => res.status(200).json(comment))
    //.catch(error => res.status(404).json({ error }));
//}