const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/Comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Les différentes routes pour chaque fonctionnalité des comments:

router.post('/', auth, multer, stuffCtrl.createComment);
router.put('/:id', auth, multer, stuffCtrl.modifyComment);
router.delete('/:id', auth, stuffCtrl.deleteComment);
router.get('/:id', auth, stuffCtrl.getOneComment);
router.get('/', auth, stuffCtrl.getAllComment);

module.exports = router;