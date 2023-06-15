const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
    ensureAuth : (req,res,next) => {
        // if(!req.isAuthenticated()) {
        //     var original = req.originalUrl;
        //     original = original.split("q=")[1]

        //     req.session.original = original;
        //     console.log(original);
        //     // res.redirect('/auth/login');
        //     return next();
        // }
        // else {
        //     return next();
        // }
        // very useful code for redirect to initial page NGL

        var token = req.headers['token'];
        let user = {};

        async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        
        console.log(ticket);


        const {sub, name,email } = ticket.getPayload();  

        console.log(sub,"Sub")
        user._id = sub;
        user.name = name;
        user.email = email;

        }
        
        verify().then(() => {
            req.user = user;
            next();
        }).catch((err) => {
            res.status(400).send("Please authenticate first");
        }) 
    },

    ensureGuest: (req,res,next) => {
        console.log(req.originalUrl);
        if(req.isAuthenticated()) {
            res.redirect('http://localhost:3001')
        }
        else {
            return next()
        }
    },
    
    ensureAdmin : (req,res,next) => {
        if(req.isAuthenticated()){
            if(req.user._id === process.env.ADMIN_ID) {
                return next();
            }
            else {
                return res.json({
                    message : "You are not authorized to access this page."
                })
            }

        }
        else{
            return res.json({
                message : "Please authenticate first!"
            })
        }
    }

}