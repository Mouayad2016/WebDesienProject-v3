var express = require('express');
var router = express.Router();
const bidController = require('../controllers/bids')
const authToken = require('../jwt/jwtToken')


/* GET users listing. */
router.post('/', authToken, bidController.createBid);
router.get('/', bidController.getAllbidss);
router.get('/:id', bidController.getbidsById);
router.delete('/user/:id', authToken, bidController.deletbidsById);




module.exports = router;