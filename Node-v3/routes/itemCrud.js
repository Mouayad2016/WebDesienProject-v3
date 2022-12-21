var express = require('express');
var router = express.Router();
const itemControler = require('../controllers/item');
const authToken = require('../jwt/jwtToken')

/* GET home page. */
router.post('/' , authToken,itemControler.createItem);
router.get('/', itemControler.getAllItems);
router.get('/:id',itemControler.getItemById);
router.put('/:id/edit',authToken,itemControler.updateItemById);
router.delete('/delet/:id', authToken,itemControler.deletItemById)
    // router.delete('/user/:id', userController.deletUserById);

module.exports = router;