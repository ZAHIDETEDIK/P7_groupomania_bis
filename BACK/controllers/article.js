const fs = require("fs");
const jwt = require("jsonwebtoken");
const Article = require("../models/article");
const mysql = require("mysql");

// Créer et sauver un Article OK !! format de date !!
exports.createArticle = (req, res, next) => {
  Article.create(
    {
      content: req.body.content,
      image: req.body.image,
      userId: req.body.userId,
    },
    (err, data) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          return res.status(401).json({ error: err });
        }
      }
      res.send(data);
      console.log(data + "post créé !");
    }
  );
};

// suppprimer un article OK
exports.deleteArticle = (req, res) => {
  Article.deleteOne(req.params.articleId, (article) => {
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(400).json({ error: "post suprimmé" });
    }
  });
};

// modifier un Article
exports.modifyArticle = (req, res, next) => {
  Article.updatedOne(req.params.articleId, (article) => {
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(400).json({ error: "post non modifié" });
    }
  });
};

// récupérer TOUS les articles de TOUS les utilisateurs OK
exports.getArticle = (req, res) => {
  Article.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "des erreurs se sont produites",
      });
    }
    res.send(data);
  });
};

// Récupérer un article précis à partir de son id OK
exports.getOneArticle = (req, res, next) => {
  Article.findOne(req.params.id)
    .then((article) => res.status(200).json(article))
    .catch((error) => res.status(404).json({ error }));
};

// récupérer tous les articles d'UN utilisateur
exports.getArticlesOfOneUser = (req, res, next) => {
  Article.findAllByUser(req.userId)
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(404).json({ error }));
};
