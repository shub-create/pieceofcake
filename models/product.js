const mongoose = require('mongoose');

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
            type: Number,
        },
        2 : {
            type: Number,
        },
        3 : {
            type: Number,
        },
        4 : {
            type: Number,
        },
        5 : {
            type: Number,
        }
    },

    box_price: {
        4 : {
            type: Number
        },
        6 : {
            type: Number
        }
    },

    tag : [{type: String}],

    image_arr: Multi,

    rating : [{type: Number}]

},{
    timestamps : true
})


module.exports = mongoose.model('Product', productSchema);