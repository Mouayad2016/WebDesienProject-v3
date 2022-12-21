const { error } = require('@hapi/joi/lib/base');
var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')


/* GET users listing. */
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.deletUserById);


module.exports = router;