const mysql = require ('mysql');

// Constructeur
const Post = function(post) {
    this.title = post.title,
    this.content = post.content,
    this.image = post.image,
    this.user_id = post.user_id
    this.likes_id=post.likes
};

//Création d'un article 
Post.create = (newPost, result) => {
    db.query(
        "INSERT INTO groupomania.post SET ?",
        newArticle,
        (err, res) => {
            if (err) {
                console.log("error: " + err);
                result(err, null);
                return;
            }
            console.log("article créé" + {id: res.id, ...newPost });
            result(null, {id: res.id, ...newPost});
        }
    );
};

// Effacer un article par son Id 
Article.deleteOne = (postId) => {
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
            `UPDATE groupomania.post SET title="${article.title}", body="${article.body}", image="${article.image}" WHERE id="${articleId}"`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log("error :" + error);
                } else {
                    resolve (result);
                    console.log("post " + {id: articleId, ...article} + "modifié avec succès");
                }
            }
        )
    })
};

// Chercher tous les articles OK
Article.findAll = (result) => {
    db.query(
        "SELECT * FROM groupomania.post", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {articles: res});
            }
        }
    )
};

// Chercher tous les articles par date de creation OK
Article.findAllByCreatedAt = (result) => {
    db.query(
        "SELECT * FROM groupomania.post ORDER BY createdAt DESC", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {articles: res});
            }
        })
    }