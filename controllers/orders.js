const Orders = require('../models/order')
const Carts = require('../models/cart')
const Users = require('../models/user')

const { verifyPayment } = require('../utils/util');


const transporter = require('./nodemailer');


exports.createOrder = (req,res,next) => {

        // ORDERS FLOW -   GET ITEMS FROM CART -> PAYMENT -> CREATE ORDER -> EMPTY CART

        const userId = req.body.userId;
        const delivery_details = req.body.delivery_details;

        const payment_response = req.body.response;

        const amount_paid = req.body.amount_paid;

        if(verifyPayment(payment_response)) {

            Carts.findOne({_id : userId}).populate({ 
                path: 'items',
                populate: {
                  path: 'product_id',
                  model: 'Product'
                } 
             }).then((result) => {

                

                console.log(result)
                if(result.items.length>0){
                    const items = result.items;

                    // console.log(items);
    
                    const order = new Orders({
                        user_id: userId,
                        items,
                        delivery_details,
                        payment_details : {
                            amount : amount_paid,
                            payment_id : payment_response.razorpay_payment_id
                        }
                    })
    
                    //order save
                
                    order.save().then((order) => {
    
                        const orderId = order._id;
    
                        // deleting cart item
    
                        Carts.findOneAndUpdate({_id: userId},{items: []}).then(()=>{
    
                            // sending mail

                            // const delivery_email = delivery_details.email

                            const emailItems = [];

                            for(let item in items) {
                                
                                if(items[item].weight){
                                    emailItems.push(

                                        `<div> 
                                            <div style ={{width : "100px" ,height: "100px"}}>
                                            <img style={{ width : "100%" , height: "100%"}} src="https://pieceofcakebucket.s3.ap-south-1.amazonaws.com/${items[item].product_id.cimage.path}" />
                                            </div>
                                            <div>
                                               Title: ${items[item].product_id.title}
                                            </div>
                                            <div>
                                               Qty: ${items[item].qty}
                                            </div>
                                            <div>
                                               Weight: ${items[item].weight} lbs
                                            </div>
                                            <div>
                                               Message: ${items[item].message} 
                                            </div>
                                            <div> 
                                              Cost: Rs ${items[item].cost}
                                            </div>
                                        </div>`
                                    )

                                }

                                else {
                                    emailItems.push(

                                        `<div> 
                                            <div style ={{width : "100px" ,height: "100px"}}>
                                            <img style={{ width : "100%" , height: "100%"}} src="https://pieceofcakebucket.s3.ap-south-1.amazonaws.com/${items[item].product_id.cimage.path}" />
                                            </div>
                                            <div>
                                               Title: ${items[item].product_id.title}
                                            </div>
                                            <div>
                                               Qty: ${items[item].qty}
                                            </div>
                                            <div>
                                               Box_of : ${items[item].box_of}
                                            </div>
                                            <div> 
                                              Cost: Rs ${items[item].cost}
                                            </div>
                                        </div>`
                                    )

                                }

                            }
    
                            const options = {
                                from: "pieceofcake23@outlook.com",
                                to : "shubhammittal175@gmail.com",
                                subject :  `You have received a new order!`,
                                text: "New order received",
                                html : `<div>
                                    <div>Order details</div>
                                    <div>
                                        ${emailItems}
                                    </div>
                                    <div>
                                        <div>Delivery Details</div>
                                        <div>
                                            Name : ${delivery_details.name}
                                        </div>
                                        <div>
                                            Mobile :${delivery_details.mobile}
                                        </div>
                                        <div>
                                            Email : ${delivery_details.email}
                                        </div>
                                        <div>
                                            Delivery Date : ${delivery_details.delivery_date}
                                        </div>
                                        <div>
                                            Delivery Address: ${delivery_details.address}
                                        </div>

                                    </div>
                                    <div>
                                        <div>
                                            Total Amount Paid Rs ${amount_paid}
                                        </div>
                                    </div>
                                </div>`
                            }
    
                            transporter.sendMail(options,(err,info) => {
                                if(err) {
                                    console.log(err);
                                }
                            })
                        }).then(()=>{
                            
                            Users.findOne({_id: userId}).then((result) => {
    
                                // console.log(result);
                        
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
    
                        }).catch(err=> {
                            res.status(400).json({
                                error: err
                            })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                error: err
                            })
                        })
                    }).catch((err)=> {
                        res.status(400).json({
                            error: err
                        })
                    })
                }
                else {
                    res.status(200).json({
                        message : "Please add product"
                    })
                }
            }).catch((err)=> {
                res.status(400).json({
                    error: err
                 })
            }) 

        }

        else {
            res.status(400).json({
                message: "Hello imposter"
             })
        }


        // INTEGRATE PAYMENT HERE 
    
}

exports.getAllOrders = (req,res,next) => {


    Orders.find().then((result) => {
        res.status(200).json({
           orders: result
        })
      }).catch((err) => {
    
        res.status(400).json({
           error: err
        })
      })
}
