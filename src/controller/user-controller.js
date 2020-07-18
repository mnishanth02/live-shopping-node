const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../models/userModel");
const UserProduct = require("../models/UserProduct");


exports.register = async (req, res, next) => {
    console.log(req.body);
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).existingUserson({ msg: 'You need to send a valid email and Password' })
        }

        const existingUser = await User.findOne({ email: req.body.email, role: req.body.role }).catch(e => { console.log('Error: ', e.message) })

        if (existingUser) {
            return res.status(400).json({ code: 'USER_EXIST', msg: 'The user already exist' })
        }

        const newUser = new User(req.body);

        await newUser.save().catch(e => { console.log('Error: ', e.message) })
        //await sendWelcomeEmail(user.email, user.name);
        const token = await newUser.generateAuthToken()
        res.status(201).send({ user: newUser, token });
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ msg: 'You need to send a valid email and Password' })
        }

        const user = await User.findByCredentials(req.body.email, req.body.password)
            .catch(e => { console.log('Error: ', e.message) })
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ code: 'ERROR', msg: 'Try with Valid Credentials' });
        console.log(error);
    }
}


exports.addProduct = async (req, res, next) => {
    try {
        const url = req.protocol + "://" + req.get("host");
        const newProduct = new UserProduct({
            ...req.body,
            productImage: url + "/src/images/" + req.file.filename,
            owner: req.user._id
        })
        await newProduct.save()

        res.status(200).send({ newProduct });
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while Adding Product', error });
        console.log(error);
    }
}

exports.getUserProducts = async (req, res, next) => {
    try {


        await req.user.populate({
            'path': 'allUserProducts',
        }).execPopulate()


        res.status(200).send(req.user.allUserProducts);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while fetching Products', error });
        console.log(error);
    }

}
