const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/Post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Les différentes routes pour chaque fonctionnalité des posts:

router.post('/', auth, multer, stuffCtrl.createPost);
router.put('/:id', auth, multer, stuffCtrl.modifyPost);
router.delete('/:id', auth, stuffCtrl.deletePost);
router.get('/:id', auth, stuffCtrl.getOnePost);
router.get('/', auth, stuffCtrl.getAllPost);

module.exports = router;