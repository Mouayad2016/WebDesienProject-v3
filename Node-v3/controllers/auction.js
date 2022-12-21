const db = require('../models/')
const { registerValidation, logInValidation } = require('../validation/validation');


module.exports = auctionController = {

    async createAuction(req, res) {
        const uid = {
            id: req.user.id
        }
        /// den får vi från token 
        const Item_Param_Id = req.params.id;

        userItem = await db.item.findOne({
            where: {
                id: Item_Param_Id

            }
        });
        if (!userItem) return res.send('there is no item for the given id')
        if (userItem.user_id != uid.id) return res.send(`you cant create an auction if you dont owne the item `)

        const auction = {
            start_price: req.body.start_price,
            sale_end: req.body.sale_end,
            item_id: req.params.id,
        }
        if(!auction) res.sned("no data ")

        // if(!item_id) res.send('no item id')

        try {
            // console.log(userItem.id);
            const saveauction = await db.auction.create(auction);
            return res.send(saveauction)

        } catch (error) {
            return res.status(400).send(error)
                // .errors[0].message)
        }
    },
    async getauctionById(req, res) {
        const requestId = req.params.id;
        try {
            const auction = await db.auction.findOne({
                where: {
                    item_id: requestId
                },
                 include:[ 
                    db.bids,
                    // db.bids
                    {
                        model: db.bids,
                        include: [db.user]
                      }
                    ]
                
            });
            if (!auction) return res.send(`there is no auction for item with id: ${requestId}`)
            return res.send(auction);
        } catch (error) {
            return res.send(error);
        }
    },
    async getAllauctions(req, res) {
        try {
            const auctions = await db.auction.findAll()
            if (!auctions) return res.send("there is no auctions in DB")
            return res.send(auctions);
        } catch (error) {
            return res.send(error)
        }
    },
    async deletauctionById(req, res) {
        const uid = {
            id: req.user.id
        }
        const requestId = req.params.id;
        const auction = await db.auction.findOne({
            where: {
                id: requestId
            }
        })

        if (!auction) return res.send(`there is no auction with id: ${requestId}`)
        const userItem = await db.item.findOne({
            where: {
                id: req.body.item_id

            }
        });
        if (userItem.user_id != uid.id) return res.send('Your are not allowed to edit somone eles auction , we will call th polise');
        try {
            await auction.destroy({ where: { id: requestId } });
            return res.send(`auction with id: ${requestId} deleted`);

        } catch (error) {
            res.send(error)

        }
    }
}