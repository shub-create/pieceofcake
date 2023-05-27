const Razorpay = require('razorpay');
var crypto = require("crypto");

module.exports.orders = (req,res) => {

    let instance = new Razorpay({
        key_id : 'rzp_test_X37ofPglIRZkLq',
        key_secret : 'HRQQmxWxYd3Wn85t1KZw6G0N'
    })

    var options = {
        amount : req.body.amount * 100,
        currency : 'INR',  
    }

    instance.orders.create(options, (err,order) => {
        if(err){
            return res.json({
                message: "Something went wrong"
            })
        }
        return res.json({
            message: "order created",
            data : order
        })

    })
}

module.exports.verify = (req,res) => {

    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  
   var expectedSignature = crypto.createHmac('sha256', 'HRQQmxWxYd3Wn85t1KZw6G0N')
                                  .update(body.toString())
                                  .digest('hex');
        
  if(expectedSignature === req.body.response.razorpay_signature)
   {
    res.status(200).json({
        message: "Signature valid"
     })
   }
   else {
    res.status(400).json({
        error: "Signature invalid"
     })
   }
      

}