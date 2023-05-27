var crypto = require("crypto");

module.exports = {
    verifyPayment : (response) => {

        let body= response.razorpay_order_id + "|" + response.razorpay_payment_id;

        
        var expectedSignature = crypto.createHmac('sha256', 'HRQQmxWxYd3Wn85t1KZw6G0N')
                                        .update(body.toString())
                                        .digest('hex');
                
        if(expectedSignature === response.razorpay_signature)
        {
            return true;
        }
        else {
            return false
        }
    }
}