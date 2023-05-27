const Carts = require('../models/cart');
const Products = require('../models/product');


exports.getCartItems = (req,res,next) => {
    
    const cartId = req?.user?._id;

    Carts.findOne({_id: cartId}).then((result) => {
        res.status(200).json({
            cartItems: result
        })
    }).catch((err) => {
        res.status(400).json({
            error: err
        })
    })
}

exports.getCartAmount = (req,res,next) => {
     
     const cartId = req?.user?._id;
     
     Carts.findOne({_id: cartId}).then((result) => {

        console.log(result.items)

        const getTotalAmount = (items) => {
    
            let total_amount = 0;

            items.map((item) => {
                total_amount = total_amount + (item.cost * item.qty);
            }) 

            return total_amount;

        }
        const payable_amount = getTotalAmount(result.items);

        res.status(200).json({
            payable_amount: payable_amount
        })
    }).catch((err) => {
    
        res.status(400).json({
           error: err
        })
    })

}


exports.addToCart = (req,res,next) => {
    
    const cartId = req?.user?._id;

    const item = req.body.item;

    const product_id  = item.product_id;
    const qty = item.qty;
    const weight = item.weight;
    const box_of = item.box_of;

    const message = item.message;

    let cost = 0;

    // if item present 

    // Carts.findOne({_id : cartId , "items.product_id" : product_id}).then((result) => {

    //     if(result) {
    //         console.log(result)
    //          Carts.updateOne({_id : cartId , "items.product_id" : product_id},{ $inc: { "items.$.qty": 1 } }).then(() => {
    //             res.status(200).json({
    //                 message: "Item added to cart"
    //             })
    //          }).catch((err) => {
        
    //             res.status(400).json({
    //                error: err
    //             })
    //           })
    //     }

    //     else {


            
    //     }
      
        


    // })


    Products.findById(product_id).then((result) => {
        if(result.category !== 'cupcake') {
            cost = result.weight_price[weight];
            console.log(cost);
        }
        else {
            cost = result.box_price[box_of];
        }
    }).then(() => {

        Carts.findOne({_id: cartId}).then((result) => {

            const items = {
                product_id,
                qty,
                weight,
                cost,
                message,
                box_of
            }

            result.updateOne({$push : {items : items}}).then(()=> {
                res.status(200).json({
                    message: "Item added to cart"
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

    }).catch((err) => {
        
        res.status(400).json({
           error: err
        })
    }) 


}

exports.removeItemFromCart = (req,res,next) => {

    const cartId = req?.user?._id;

    const itemId  = req.body.itemId;


    Carts.findOneAndUpdate(
        {_id: cartId},
        { $pull: { items: { _id : itemId } } },
        { safe: true, multi: false }
        ).then(() => {
            res.status(200).json({
                message: "Item removed from cart"
            })
        }).catch((err) => {
    
            res.status(400).json({
               error: err
            })
          })

}

exports.emptyCart = (req,res,next) => {

    const cartId = req?.user?._id;

    Carts.findOneAndUpdate({_id: cartId},{items: []}).then(()=>{
        res.status(200)({
            message: "Cart emptied successfully"
        })
    }).catch((err) => {
    
        res.status(400).json({
           error: err
        })
      })
}