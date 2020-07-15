const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDesc: {
        type: String,
        required: true,
        trim: true,
    },
    productKeyword: {
        type: Array,
        required: true,
        trim: true,
    },
    available: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    productImage: {
        type: String,
        required: false,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,

})
const ShopProduct = mongoose.model('ShopProduct', productSchema);

module.exports = ShopProduct;