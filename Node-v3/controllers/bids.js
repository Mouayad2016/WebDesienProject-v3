const { request } = require('express');
const db = require('../models/');
let date_ob = new Date();

const { registerValidation, logInValidation } = require('../validation/validation');


module.exports = BidsController = {
    async createBid(req, res) {
        const uid = {
                id: req.user.id
            }
            // const { error } = bidsValidation(req.body);
            // if (error) return res.status(400).send(error.details[0].message)
        const bid = {
            timestamp: Date.now(),
            amount: req.body.amount,
            auction_id: req.body.auction_id,
            user_id: uid.id,
        }
        try {
            const savebids = await db.bids.create(bid)
            return res.send(savebids)

        } catch (error) {
            return res.status(400).send(error)
                // .errors[0].message)
        }
    },



    async getbidsById(req, res) {
        const requestId = req.params.id;
        try {
            const bids = await db.bids.findOne({
                where: {
                    id: requestId
                }
            });
            if (!bids) return res.send(`there is no bids with id: ${requestId}`)
            return res.send(bids);
        } catch (error) {
            return res.send(error);
        }
    },
    async getAllbidss(req, res) {
        try {
            const bidss = await db.bids.findAll({
                // order: [['timestamp', 'DESC']],
                include:[
                    db.user , 
                    db.auction,
                    // db.bids
                    {
                        model: db.auction,
                        include: [db.bids]
                      }
                    ]
            })
            if (!bidss) return res.send("there is no bidss in DB")
            return res.send(bidss);
        } catch (error) {
            return res.send(error)
        }
    },
    async updatebidsById(req, res) {
        const uid = {
            id: req.user.id
        }
        const requestId = req.params.id;
        const bids = await db.bids.findOne({
            where: {
                id: requestId
            }
        })
        if (!bids) return res.send(`there is no bids with id: ${requestId}`)
        if (bids.user_id != uid.id) return res.send('Your are not allowed to edit somone eles bids , we will call th polise');
        const { error } = bidsValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)
        try {
            awaitbids.update({
                title: req.body.title,
                descripion: req.body.descripion,
            }, {
                where: {
                    id: bids.id
                }
            });
            return res.send(bids);
        } catch (error) {
            return (error)
        }
    },
    async deletbidsById(req, res) {
        const uid = {
            id: req.user.id
        }
        const requestId = req.params.id;
        constbids = await db.bids.findOne({
            where: {
                id: requestId
            }
        })
        if (!bids) return res.send(`there is no bids with id: ${requestId}`)
        if (bids.user_id != uid.id) return res.send('Your are not allowed to edit somone eles bids , we will call th polise');
        try {
            awaitbids.destroy({ where: { id: requestId } });
            return res.send(`bids with id: ${requestId} deleted`);

        } catch (error) {
            res.send(error)

        }

    }
}