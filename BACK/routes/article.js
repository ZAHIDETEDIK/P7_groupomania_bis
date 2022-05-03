const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');

// Création d'un article OK
router.post('/createArticle/',  articleCtrl.createArticle);

// Suppression d'un article OK
router.delete('/article/delete/:articleId', auth, articleCtrl.deleteArticle);

// Modification d'un article OK
router.put('/article/update/:articleId', auth, articleCtrl.modifyArticle);

// Récupérer TOUS les articles OK
router.get('/article/', articleCtrl.getArticle);

// Récupérer tous les articles par date de création
//router.get('/article/createdAt/', auth, articleCtrl.getArticleByCreatedDate);

// Récupérer tous les articles par date de mise a jour
//router.get('/article/updatedAt/', auth, articleCtrl.getArticlesByUpdatedDate);

// Récupérer un article par son id OK
router.get('/article/:id', auth, articleCtrl.getOneArticle);

// Récupérer TOUS les articles d'UN utilisateur OK
router.get('/article/user/:user.id', auth, articleCtrl.getArticlesOfOneUser);



module.exports = router;