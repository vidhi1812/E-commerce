const express = require('express');
const router = express.Router();
const Seller = require('../Models/Seller-Model');
const Product = require('../Models/Product-model');
const auth = require('../Middleware/Auth-middleware');
const sellerauth = require('../Middleware/Seller-middleware');
// router.route('/allproduct').get(auth,sellerauth, async (req, res) => {
//   try {
//     const products = await Product.find({ seller: req.user._id });
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
module.exports = router;
