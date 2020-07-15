const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const validator = require('validator');



const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }

        }
    },

    shopType: {
        type: String,
        required: true,
        trim: true,
    },
    shopImage: { type: String, required: true },
    location: {
        address: { type: String, required: true },
        staticMapImageUrl: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    }
}, {
    timestamps: true,

})

shopSchema.virtual('shopProducts', {
    ref: 'ShopProduct',
    localField: '_id',
    foreignField: 'shopId'
})

shopSchema.plugin(uniqueValidator);
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;