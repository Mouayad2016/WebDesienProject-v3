const db = require('../models/')
const bcrypt = require('bcryptjs')
const verifytoken = require('../jwt/jwtToken');
const { registerValidation, logInValidation } = require('../validation/validation');
// const { itemValidation } = require('../validation/itemValidation.js')

module.exports = ItemsController = {

    async createItem(req, res) {
        const uid = {
            id: req.user.id
        }
        if(!uid)
        res.send("there is no user")
        // const { error } = itemValidation(req.body);
        // if (error) return res.status(400).send(error.details[0].message)
        const item = {
            title: req.body.title,
            descripion: req.body.descripion,
            image_url:req.body.image_url,
            user_id: uid.id

        }

        try {
            const saveItem = await db.item.create(item)
            return res.send(item)

        } 
        catch (error) {
            return res.status(400).send(error)
                // .errors[0].message )
        }
    },



    async getItemById(req, res) {
        const requestId = req.params.id;
        try {
            const Item = await db.item.findOne({
                
                where: {
                    id: requestId, 
                },
                order:[
                    [ 
                        {model: db.auction},  {model: db.bids}, 'timestamp', 'desc'  ],
                   ],
                 include:[
                        db.user , 
                        db.auction,
                        {
                            model: db.auction,
                            include: [db.bids]
                          }
                    
                    ]
            });
            if (!Item) return res.send(`there is no Item with id: ${requestId}`)
            return res.send(Item);
        } catch (error) {
            return res.send(error);
        }
    },
    async getAllItems(req, res) {
        try {
            const Items = await db.item.findAll({
                order:[
                    [ 
                        {model: db.auction},  {model: db.bids}, 'timestamp', 'desc'  ],
                   ],
                include:[
                    db.user , 
                    db.auction,
                    // db.bids
                    {
                        model: db.auction,
                        include: [
 
                            db.bids,
                            // {order: [['timestamp', 'DESC']],}
                        ]
                      }
                    ]
                }
                
                )
            if (!Items) return res.send("there is no Items in DB")
            return res.send(Items);
        } catch (error) {
            return res.send(error)
        }
    },
    async updateItemById(req, res) {
        const uid = {
            id: req.user.id
        }
        const requestId = req.params.id;
        const Item = await db.item.findOne({
            where: {
                id: requestId
            }
        })
        if (!Item) return res.send(`there is no Item with id: ${requestId}`)
        if (Item.user_id != uid.id) return res.send('Your are not allowed to edit somone eles item , we will call th polise');
        // const { error } = itemValidation(req.body);
        // if (error) return res.status(400).send(error.details[0].message)
        try {
            await Item.update({
                title: req.body.title,
                descripion: req.body.descripion,
                image_url:req.body.image_url
            }, {
                where: {
                    id: Item.id
                }
            });
            return res.send(Item);
        } catch (error) {
            return (error)
        }
    },
    async deletItemById(req, res) {
        const uid = {
            id: req.user.id
        }
        const requestId = req.params.id;
        const Item = await db.item.findOne({
            where: {
                id: requestId
            }
        })
        if (!Item) return res.send(`there is no Item with id: ${requestId}`)
        if (Item.user_id != uid.id) return res.send('Your are not allowed to edit somone eles item , we will call th polise');
        try {
            await Item.destroy({ where: { id: requestId } });
            return res.send(`Item with id: ${requestId} deleted`);

        } catch (error) {
            res.send(error)

        }
    }
}