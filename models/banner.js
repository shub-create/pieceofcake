const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const schema = mongoose.Schema;

const Image  = new mongoose.Schema({
    path: String,
    type: String,
})

const bannerSchema = new schema({
    
    banner_img : Image,

    head_tag: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    link : {
        type: String,
        required: true
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Banner',bannerSchema);