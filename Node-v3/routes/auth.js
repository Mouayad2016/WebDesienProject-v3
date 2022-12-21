const router = require('express').Router();

const authController = require('../controllers/auth')



router.post('/register', authController.UserRegistration);
router.post("/login", authController.UserLogin);



module.exports = router;