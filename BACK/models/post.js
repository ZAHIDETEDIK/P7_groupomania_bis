const mysql = require ('mysql');

// Constructeur
const Post = function(post) {
    
    this.content = post.content,
    this.image = post.image,
    this.user_id = post.user_id
    this.likes_id=post.likes
};

//Création d'un article 
Post.create = (newPost, result) => {
    db.query(
        "INSERT INTO groupomania.post SET ?",
        newPost,
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
Post.deleteOne = (postId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.post WHERE id=${postId}`,
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
Post.updateOne = (postId, post) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE groupomania.post SET  content="${post.body}", image="${post.image}" WHERE id="${postId}"`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log("error :" + error);
                } else {
                    resolve (result);
                    console.log("post " + {id: postId, ...post} + "modifié avec succès");
                }
            }
        )
    })
};

// Chercher tous les articles OK
Post.getAllPosts = (result) => {
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


    