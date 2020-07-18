const express = require('express');
// const sharp = require('sharp')
const UserController = require('../controller/user-controller')
const auth = require('../middleware/auth')

const { productImage } = require('../middleware/file')
const router = new express.Router();


// sign up
router.post('/register', UserController.register);

//login
router.post('/login', UserController.login);


// User 
router.post('/addProduct',auth, productImage, UserController.addProduct);
router.get('/allUserProducts',auth, UserController.getUserProducts);




// routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
//     return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
// });



// router.post('/logout', auth, async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter(token => {
//             return token.token !== req.token;
//         })
//         await req.user.save();
//         res.send();
//     } catch (error) {
//         res.status(500).send();
//     }
// })

// router.post('/logoutAll', auth, async (req, res) => {
//     try {
//         req.user.tokens = [];
//         await req.user.save();
//         res.send();
//     } catch (error) {
//         res.status(500).send();
//     }
// })

// router.get('/users/me', auth, async (req, res) => {
//     res.send(req.user);
// })

// router.patch('/users/me', auth, async (req, res) => {

//     const updates = Object.keys(req.body);
//     const allowUpdates = ["name", "email", "age", "password"]
//     const isValidOperation = updates.every((updates) => allowUpdates.includes(updates))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: "Invalid Update" })
//     }

//     try {
//         updates.forEach((update) => req.user[update] = req.body[update])
//         await req.user.save();

//         res.send(req.user)
//     } catch (error) {
//         res.status(500).send(error);
//         console.log(error)
//     }
// })

// const updaload = new multer({
//     // dest: 'avatars',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('error'))
//         }
//         cb(undefined, true)
//     }
// })

// router.post('/users/me/avatar', auth, updaload.single('upload'), async (req, res) => {

//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
//     req.user.avatar = buffer;

//     await req.user.save();
//     res.send();
// })

// router.delete('/users/me/avatar', auth, async (req, res) => {
//     req.user.avatar = undefined;

//     await req.user.save();
//     res.send();
// })

// router.get('/users/:id/avatar', async (req, res) => {

//     try {
//         const user = await User.findById(req.params.id);
//         if (!user || !user.avatar) {
//             throw Error("Avatar Not found")
//         }
//         res.set('Content-Type', 'image/png')
//         res.send(user.avatar);
//     } catch (error) {
//         res.status(404).send();

//     }
//     res.send();
// })

// router.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.remove();
//         await sendCancelationEmail(req.user.email, req.user.name);
//         res.send(req.user)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// })



module.exports = router;