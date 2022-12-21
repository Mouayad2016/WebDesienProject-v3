const router = require('express').Router();
const authToken = require('../jwt/jwtToken')

const auctionRoute = require('../controllers/auction')



router.post('/:id/', authToken, auctionRoute.createAuction);
router.get("/", auctionRoute.getAllauctions);
router.get("/:id", auctionRoute.getauctionById);
router.delete("/:id", authToken, auctionRoute.deletauctionById);


module.exports = router;