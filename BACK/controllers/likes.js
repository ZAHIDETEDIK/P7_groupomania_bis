const LikeDislike = require('../models/likes');
const mysql = require('mysql');
exports.addLikeDislike = (req,res) => {
    // Définir le constructeur
    const likeDislike = new LikeDislike({
        userId: req.body.userId,
        articleId: req.body.articleId,
        likes: req.body.likes,
        dislikes: req.body.dislikes
    });
    // Récupérer les avis d'un article
    LikeDislike.findByPostId(req.body.postId)
    .then(like => {
        let userId = req.body.userId;
        let userWantsToLike = (req.body.likes === 1);
        let userWantsToDislike = (req.body.dislikes === 1);
        let userCanCancel = (like.includes(userId));
        if (userWantsToLike && userCanLikeDislike) {
            LikeDislike.like(likeDislike, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message || "raté !"
                    });
                    console.log(data)
                    res.send(data);
                }
            })
        }
        if (userWantsToDislike && userCanLikeDislike) {
            LikeDislike.dislike(likeDislike, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message || "raté !"
                    });
                    console.log(data)
                    res.send(data);
                }
            })

        }
        if (userWantsToCancel && userCanCancel) {
            LikeDislike.cancelLikeDislike(req.body.articleId, req.body.userId, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message || "raté !"
                    });
                    console.log(data)
                    res.send(data);
                }
            })
        }
    })
    .catch(error => res.status(404).json({error: error}))
}