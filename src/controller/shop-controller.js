const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Shop = require("../models/shopModel");
const ShopProduct = require("../models/shopProductsModel");



exports.register = async (req, res, next) => {
    try {
        const url = req.protocol + "://" + req.get("host");
        const existingShop = await Shop.findOne({ email: req.body.email, owner: req.user._id })

        if (existingShop) {
            return res.status(400).json({ code: 'SHOP_EXIST', msg: 'Shop already exist for this email' })
        }
        const newShop = new Shop({
            ...req.body,
            shopImage: url + "/src/images/" + req.file.filename,
            location: JSON.parse(req.body.location),
            owner: req.user._id
        });

        await newShop.save();
        res.status(201).send({ newShop });
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while registering Shop', error });
        console.log(error);
    }
}


exports.shops = async (req, res, next) => {
    try {

        await req.user.populate({
            'path': 'shops',
        }).execPopulate()
        res.set('Content-Type', 'image/png')
        res.status(200).send(req.user.shops);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while registering Shop', error });
        console.log(error);
    }
}

exports.getShopById = async (req, res, next) => {
    const _id = req.params.shopId;
    try {
        const shop = await Shop.findOne({ _id, owner: req.user._id })

        if (!shop) {
            return res.status(404).send({ code: 'ERROR', message: 'Shop Not Found', error: 'Shop Not Found' });
        }
        res.status(200).send(shop);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while registering Shop', error });
        console.log(error);
    }
}

exports.editShop = async (req, res, next) => {

    const _id = req.params.shopId;

    const updatedShop = Shop({
        _id,
        shopName: req.body.shopName,
        email: req.body.email,
        location: req.body.location,
        shopType: req.body.shopType,
        shopImgUrl: req.body.shopImgUrl,
        owner: req.body.owner,
    })
    try {
        const shop = await Shop.updateOne({ _id, owner: req.user._id }, updatedShop);
        if (!shop) {
            return res.status(404).send({ code: 'ERROR', message: 'Shop Not Found', error: 'Shop Not Found' });
        }
        res.status(200).send(shop);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while Updating shop details', error });
        console.log(error);
    }

}


exports.addProduct = async (req, res, next) => {
    try {
        const url = req.protocol + "://" + req.get("host");
        const newProduct = new ShopProduct({
            ...req.body,
            productImage: url + "/src/images/" + req.file.filename,
            shopId: req.params.shopId,
            owner: req.user.id
        })
        await newProduct.save()

        res.status(200).send({ newProduct });
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while Adding Product', error });
        console.log(error);
    }
}

exports.allProducts = async (req, res, next) => {
    try {
        const existingShop = await Shop.findOne({ _id: req.params.shopId })

        if (!existingShop) {
            return res.status(400).json({ code: 'SHOP_NOT_EXIST', msg: 'Shop does not exist' })

        }

        await existingShop.populate({
            'path': 'shopProducts',
        }).execPopulate()
        res.status(200).send(existingShop.shopProducts);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while fetching Shop Products Product', error });
        console.log(error);
    }
}


exports.editShopProduct = async (req, res, next) => {

    const _shopId = req.params.shopId;
    const _productId = req.params.productId;

    const updatedShop = ShopProduct({
        _id,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productKeyword: req.body.productKeyword,
        shopType: req.body.shopType,
        shopImgUrl: req.body.shopImgUrl,
        owner: req.body.owner,
    })
    try {
        const shop = await Shop.updateOne({ _id, owner: req.user._id }, updatedShop);
        if (!shop) {
            return res.status(404).send({ code: 'ERROR', message: 'Shop Not Found', error: 'Shop Not Found' });
        }
        res.status(200).send(shop);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while Updating shop details', error });
        console.log(error);
    }

}


exports.getProductById = async (req, res, next) => {
    const _shopId = req.params.shopId;
    const _productId = req.params.productId;
    try {
        const product = await ShopProduct.findOne({ _id: _productId, owner: req.user._id, shop: _shopId })
        if (!product) {
            return res.status(404).send({ code: 'ERROR', message: 'product Not Found', error: 'product Not Found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while retriving product', error });
        console.log(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    const _shopId = req.params.shopId;
    const _productId = req.params.productId;
    try {
        const product = await ShopProduct.findOneAndDelete({ _id: _productId, owner: req.user._id, shop: _shopId })
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while retriving product', error });
        console.log(error);
    }
}

