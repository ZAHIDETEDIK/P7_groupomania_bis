const mysql = require ('mysql');

// Constructeur
const Article = function(article) {
    
    this.content = article.content,
    this.image = article.image,
    this.user_id = article.user_id
    this.likes_id=article.likes
};

//Création d'un article 
Article.create = (newArticle, result) => {
    db.query(
        "INSERT INTO groupomania.post SET ?",
        newArticle,
        (err, res) => {
            if (err) {
                console.log("error: " + err);
                result(err, null);
                return;
            }
            console.log("article créé" + {id: res.id, ...newArticle });
            result(null, {id: res.id, ...newPost});
        }
    );
};

// Effacer un article par son Id 
Article.deleteOne = (articleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.post WHERE id=${articleId}`,
            function (error, result) {
                if (error) {
                    reject (error);
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
        db.query(
            `UPDATE groupomania.post SET  content="${article.body}", image="${article.image}" WHERE id="${articleId}"`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log("error :" + error);
                } else {
                    resolve (result);
                    //console.log("article " + {id: articleId, ...article} + "modifié avec succès");
                }
            }
        )
    })
};

// Chercher tous les articles OK
Article.findAll = (result) => {
    db.query(
        "SELECT * FROM groupomania.articles", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {articles: res});
            }
        }
    )
};
Article.findAllByCreatedAt = (result) => {
    db.query(
        "SELECT * FROM groupomania.articles ORDER BY createdAt DESC", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {articles: res});
            }
        }
    )
};

// Chercher tous les articles par date de mise a jour OK
Article.findAllByUpdatedAt = (result) => {
    db.query(
        "SELECT * FROM groupomania.articles ORDER BY updatedAt DESC", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {articles: res});
            }
        }
    )
};

// Chercher un article par son id OK
Article.findOne = (articleId) => {
    return new Promise((resolve, reject)=> {
        db.query(
            `SELECT a.id AS articleId, a.user_id AS user_id, a.title AS title, a.body AS body, a.image AS image, a.createdAt AS createdAt, a.updatedAt AS updatedAT, SUM(l.likes) AS likeCount, SUM(l.dislikes) AS dislikeCount FROM groupomania.articles a, groupomania.likes l WHERE a.id=${articleId} AND l.articles_id = a.id`, 
            function (error, result, fields) {
                if (error) { 
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

// Chercher tous les articles d'un auteur en particulier OK
Article.findAllByUser = (user_id) => {
    return new Promise ((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.articles WHERE user_id=${user_id}`,
            function (error, result, fields) {
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

    