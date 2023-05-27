const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const schema = mongoose.Schema;

const orderSchema = new schema({

    user_id : {
        type: String,
        ref: 'User',
        required: true
    },

    items: [{
        product_id : {
            type: schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        message: {
            type: String
        },
        weight: {
            type: Number,
            required: true
        },
        box_of: {
            type: Number,
            required: true
        },
        cost: {
            type: Float,
            required: true
        }
    }],

    delivery_details : {
        name: {
            type: String,
            required: true
        },
        address : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true
        },
        mobile : {
            type: Number,
            required: true
        },
        delivery_date : {
            type: Date,
            required: true
        }
    },

    payment_details : {
        amount: {
            type: Float,
            required: true
        },
        payment_id : {
            type: String,
            required: true
        }
    },

    status : {
        type: String,
        enum: ['confirmed', 'delivered']
    }

},

{timestamps: true})


module.exports = mongoose.model('Order', orderSchema);