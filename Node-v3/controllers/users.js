const db = require('../models/')
const bcrypt = require('bcryptjs')
const helper = require('../helpers/responseHelper')
const { registerValidation, logInValidation } = require('../validation/validation');

module.exports = usersController = {

    async getUserById(req, res) {
        try {
            const requestId = req.params.id;
            const user = await db.user.findOne({
                where: {
                    id: requestId
                }
            });
            if (!user) return res.send(`there is no user with id: ${requestId}`)
            return res.send(user);
        } catch (error) {
            res.send(error);
        }
    },
    async getAllUsers(req, res) {
        try {
            const users = await db.user.findAll();
            if (users.length == 0) return res.send("there is no users in DB");
            return res.send(users);
        } catch {
            return helper.createResponseError(error.status, error.message)
        }


    },
    async updateUserById(req, res) {
        const requestId = req.params.id;
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)
        const user = await db.user.findOne({
            where: {
                id: requestId
            }
        })
        if (!user) return res.send(`there is no user with id: ${requestId}`)
            //hash pass 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await db.user.update({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: hashPassword,
                imageUrl: req.body.image_url,
                roll: 'PRIVATE'
            }, {
                where: {
                    id: user.id
                }
            });
            return res.send(` User ${req.body.fname} updated`);
        } catch (error) {
            return res.status(400)
                .send(error.errors[0].message)
        }
    },
    async deletUserById(req, res) {
        const requestId = req.params.id;
        const user = await db.user.findOne({
            where: {
                id: requestId
            }
        })
        if (!user) return res.send(`there is no user with id: ${requestId}`);

        await db.user.destroy({ where: { id: requestId } });
        res.send(`user with id: ${requestId} deleted`);

    }
}