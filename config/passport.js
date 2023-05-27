const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const Users = require('../models/user');
const Carts = require('../models/cart');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID:   process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (request, accessToken, refreshToken, profile, done) => {
        
        const newUser = {
            _id : profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.email
        }

        const newCart = {
            _id: profile.id
        }

        try {
            let user = await Users.findOne({_id : profile.id})

            if(user){
                done(null,user)
            }
            else{
                user = await Users.create(newUser)
                try{
                    let cart = await Carts.create(newCart);
                    done(null,user)
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
    ));
    
    passport.serializeUser((user,done) => done(null,user));

    passport.deserializeUser((user,done) => done(null,user));
    
}