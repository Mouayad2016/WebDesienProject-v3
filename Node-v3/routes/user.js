const router = require('express').Router();

const verifytoken = require('./varifyToken');

router.get('/', verifytoken, (req, res) => {
    // res.json({
    //     posts: {
    //         title: 'min förssta post',
    //         dec: 'du ska kunna nå detta '
    //     }
    // })

    // when we use token we accses user by this 
    // and we get {
    //     "id": 1,
    // "iat": 1646462861
    // }
    const userIdn = {
        id: req.user.id
    }
    res.send(req.user)
})

module.exports = router