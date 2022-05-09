const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création d'un article OK
router.post('/createArticle/',multer,  articleCtrl.createArticle);

// Suppression d'un article OK
router.delete('/delete/:articleId', articleCtrl.deleteArticle);

// Modification d'un article OK
router.put('/update/:articleId',multer, articleCtrl.modifyArticle);

// Récupérer TOUS les articles OK
router.get('/', articleCtrl.getArticle);

// Récupérer tous les articles par date de création
//router.get('/article/createdAt/',  articleCtrl.getArticleByCreatedDate);

// Récupérer tous les articles par date de mise a jour
//router.get('/article/updatedAt/', auth, articleCtrl.getArticlesByUpdatedDate);

// Récupérer un article par son id OK
router.get('/article/:id',  articleCtrl.getOneArticle);

// Récupérer TOUS les articles d'UN utilisateur OK
router.get('/article/user/:user.id', articleCtrl.getArticlesOfOneUser);



module.exports = router;