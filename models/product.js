const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const schema = mongoose.Schema;

const Image  = new mongoose.Schema({
    path: String,
    type: String,
})

const Multi  = new mongoose.Schema({
    path: [String],
    type: [String]
})


const productSchema = new schema({
   
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ['cake', 'cupcake','brownie','jar cake','pastry','icecream cake'],
        required: true
    },

    cimage : Image,

    weight_price: {
        1 : {
            type: Float,
        },
        2 : {
            type: Float,
        },
        3 : {
            type: Float,
        },
        4 : {
            type: Float,
        },
        5 : {
            type: Float,
        }
    },

    box_price: {
        4 : {
            type: Float
        },
        6 : {
            type: Float
        }
    },

    tag : [{type: String}],

    image_arr: Multi,

    rating : [{type: Number}]

})


module.exports = mongoose.model('Product', productSchema);