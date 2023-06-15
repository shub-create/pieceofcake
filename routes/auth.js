const express = require('express');
// const passport = require('passport');
// const { ensureGuest,ensureAuth } = require('../middleware/auth');
const User = require('../models/user');
const Cart = require('../models/cart');
const { OAuth2Client } = require('google-auth-library');
const { ensureAuth } = require('../middleware/auth');

const router = express.Router(); 

// router.get('/login',ensureAuth ,passport.authenticate('google' , { scope : ['profile', 'email']}));

// router.get('/google/callback', passport.authenticate('google', {
//     failureRedirect: '/login',
//     keepSessionInfo: true
// }),(req,res) => {
//     console.log(req.session.original);
//     res.redirect(req.session.original);
// })

// router.get('/logout', (req,res,next) => {
//     req.logout((error)=>{
//         if (error) {return next(error)}
//     }); 
//     res.redirect('http://localhost:3001');
// })


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.post("/google", (req, res,next) => {
    const { token }  = req.body;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const {  email, sub, given_name, family_name } = ticket.getPayload();    

    const newUser = {
        _id : sub,
        first_name: given_name,
        last_name: family_name,
        email: email
    }

    const newCart = {
        _id: sub
    }
    
    try {
        let user = await User.findOne({_id : sub})

        if(!user){
            user = await User.create(newUser)
            try{
                let cart = await Cart.create(newCart);
            }
            catch{
                console.error(err);
            }  
        }
               
    }
    catch(err){
        console.error(err);
    }

    }

    verify().then(() => {
        res.status(200).send("successfully logged in");
    }).catch((err) => {
        res.status(400).send(err);
    });

})

router.get('/getuser',ensureAuth,(req,res,next) => {
    User.findOne({_id : req?.user?._id}).then((result) => {
        console.log(result);
        res.status(200).send(result);
    } ).catch(err => {
        res.status(400).send(err);
    })
})

module.exports = router;