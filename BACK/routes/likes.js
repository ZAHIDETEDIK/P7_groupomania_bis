const express = require('express');
const router = express.Router()

const likeCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');

 //Ajouter un like à un article
router.post('/:articleId/like', auth, likeCtrl.likeArticle);
router.get('/:postId/like', auth, likeCtrl.getAllLike);



module.exports = router;