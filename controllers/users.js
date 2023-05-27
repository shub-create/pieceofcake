const Users = require('../models/user');
const Carts = require('../models/cart');

exports.getAllUsers = (req,res,next) => {
    
    Users.find().then((result) => {
        res.status(200).json({
           users: result
        })
      }).catch((err) => {
       console.log(err);
        res.status(400).json({
           error: err
        })
      })

}

exports.getUserById = (req,res,next) => {
    
    const userId = req.user._id;

    Users.findOne({_id: userId}).then((result) => {
        res.status(200).json({
            user: result
        })
    }).catch((err) => {
        console.log(err);
         res.status(400).json({
            error: err
         })
    })
}

// exports.createUser = (req,res,next) => {
    
//     const userId = req.body.userId;
//     const first_name = req.body.first_name;
//     const last_name = req.body.last_name;
//     const mobile = req.body.mobile;
//     const address = req.body.address;
//     const email = req.body.email;

//     Users.find({_id: userId}).then((result) => {

//        if(result.length !== 0){
//             res.status(201).json({
//                 message: "User already exist"
//             })
//        }

//        else {
        
//         const user = new Users({
//             _id : userId,
//             first_name,
//             last_name,
//             mobile,
//             address,
//             email
//         })
        
//         user.save().then(() => {

//             const cart = new Carts({
//                 _id : userId
//             })

//             cart.save().then(()=> {
//                 res.status(201).json({
//                     message: "User created"
//                 })
//             }).catch((err)=> {
//                 res.send(500).json({
//                     error: err
//                 })
//             })
            
//         }).catch((err)=> {
//             res.send(500).json({
//                 error: err
//             })
//         }) 

//        }

//     }).catch((err)=> {
//         res.send(500).json({
//             error: err
//         })
//     }) 

// }

exports.updateUserInfo = (req,res,next) => {


    const userId = req.user._id;

    console.log(userId)

    const mobile = req.body.mobile;
    const address = req.body.address;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
         
        Users.findOneAndUpdate({_id: userId}, {mobile,address,first_name,last_name}).then(() => {
            res.status(202).json({
                message: "User info successfully updated"
            })
        }).catch((err)=> {
            res.send(500).json({
                error: err
            })
        }) 
}

exports.getUserOrders = (req,res,next) => {

    const userId = req.user._id;
    
    Users.findOne({_id : userId}).populate('orders').then((result) => {
        res.status(200).json({
            orders : result.orders
        })
    }).catch((err)=> {
        res.send(500).json({
            error: err
        })
    })

}

exports.updateUserOrder = (req,res,next) => {

    const userId = req.user._id;
    const orderId = req.body.orderId;
    
    Users.findOne({_id: userId}).then((result) => {

        console.log(result);

        result.updateOne({$push : {orders : orderId}}).then(()=> {
            res.status(200).json({
                message: "User orders updated!"
            })
        }).catch((err) => {
            res.status(400).json({
                error: err
            })
        })
    }).catch((err) => {
        res.status(400).json({
            error: err
        })
    })
    
}
