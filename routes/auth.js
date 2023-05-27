const express = require('express');
const passport = require('passport');
const { ensureGuest,ensureAuth } = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router(); 

router.get('/login',ensureAuth ,passport.authenticate('google' , { scope : ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    keepSessionInfo: true
}),(req,res) => {
    console.log(req.session.original);
    res.redirect(req.session.original);
})

router.get('/logout', (req,res,next) => {
    req.logout((error)=>{
        if (error) {return next(error)}
    }); 
    res.redirect('http://localhost:3001');
})

router.get('/getuser',(req,res,next) => {
    User.findOne({_id : req?.user?._id}).then((result) => {
        console.log(result);
        res.status(200).send(result);
    } ).catch(err => {
        res.status(400).send(err);
    })

})


module.exports = router;