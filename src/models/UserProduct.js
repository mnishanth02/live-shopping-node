const mongoose = require('mongoose');

const userProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
   
    productImage: {
        type: String,
        required: false,
    },
   
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,

})
const UserProduct = mongoose.model('UserProduct', userProductSchema);

module.exports = UserProduct;