const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({

    _id: {
        type: String,
        required: true
    },
     
    first_name : {
        type: String,
        required: true
    },

    last_name : {
        type: String,
        required: true
    },

    mobile : {
        type: Number,
    },

    email: {
        type: String,
    },
    
    address : {
        type: String,
    },
    
    orders : [{ type: schema.Types.ObjectId , ref: 'Order'}]

})

module.exports = mongoose.model('User', userSchema);