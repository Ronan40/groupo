const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');
const auth = require('../middleware/auth');

// Les différentes routes d'authentification : 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', auth, userCtrl.getOneUser); 
router.delete('/profil/:id', auth, userCtrl.deleteUser); 
router.put('/profil/:id', auth, userCtrl.updateUser); 

module.exports = router;