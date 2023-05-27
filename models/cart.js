const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const schema = mongoose.Schema;

const cartSchema = new schema({

    _id: {
        type: String,
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
        },
        message : {
            type: String
        }
    }],

})

module.exports = mongoose.model('Cart',cartSchema);

