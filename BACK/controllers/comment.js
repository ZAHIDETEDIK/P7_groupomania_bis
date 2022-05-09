const Comment = require('../models/comment');
const mysql = require('mysql');


// Créer un nouveau commentaire 
exports.createComment = (req, res) => {
    
    // Sauvegarde dans la DB
    Comment.create({
     
         content: req.body.content,
         userId: req.body.userId,
         articleId: req.body.articleId,
        },(err, data) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(401).json({ error: err });
                }
        }
        res.send(data);
        console.log(data+'commentaire créé!')
    });
};

// Récupérer les commentaires par l'id de l'article concerné 
exports.getAllComments = (req, res) => {

    Comment.findAll(req.params.articleId,(err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })
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