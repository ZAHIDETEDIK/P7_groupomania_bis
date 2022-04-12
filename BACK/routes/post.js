const express = require('express');
const router = express.Router();
// Routes de l'API pour les messages
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/post');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.put('/:postId', auth, multer, postCtrl.modifyPost);
router.delete('/:postId', auth, postCtrl.deletePost);



// Permet d'exporter le router
module.exports = router;