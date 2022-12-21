const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, logInValidation } = require('../validation/validation');
const db = require('../models/');
const dotenv = require('dotenv');
dotenv.config();

module.exports = authController = {
    async UserRegistration(req, res) {
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error
            .details[0].message)
        const emailExist = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        if (emailExist) return res.status(400).send("Email alrady Exists ")
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            image_url: req.body.image_url,
            password: hashPassword,
            roll: 'Private'
        }
        try {
            const savedUser = await db.user.create(user)
            return res.send(`User ${user.fname} created`)

        } catch (error) {
            return res.status(400).send(error
                .errors[0].message)
        }
    },
    async UserLogin(req, res) {
        const { error } = logInValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const user = await db.user.findOne({
                where: {
                    email: req.body.email
                }
            })
            // check if the email exist 
        if (!user) return res.status(400).send("Email or password is wrong ")
            // if pass is correct withe compare
        const validpass = await bcrypt.compare(req.body.password, user.password)
        if (!validpass) return res.status(400).send('Invalid password')

        //Create Token 
        const token = jwt.sign({ id: user.id , email:user.email,fname:user.fname, username:user.username}, process.env.TOKEN_SECRET)
            // res.setHeader('auth-token', token);
        res.header('token', token).json({token});

    }
}