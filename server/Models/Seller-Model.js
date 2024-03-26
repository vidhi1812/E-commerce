const mongoose = require('mongoose')
const sellerProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image_url:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now,
    }
})
const sellerProducts = mongoose.model("SellerProducts", sellerProductsSchema)
module.exports = sellerProducts