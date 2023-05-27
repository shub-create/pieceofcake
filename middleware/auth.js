module.exports = {
    ensureAuth : (req,res,next) => {
        if(!req.isAuthenticated()) {
            var original = req.originalUrl;
            original = original.split("q=")[1]

            req.session.original = original;
            console.log(original);
            // res.redirect('/auth/login');
            return next();
        }
        else {
            return next();
        }
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