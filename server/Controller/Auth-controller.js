const User = require("../Models/User-Model");
const Product = require("../Models/Product-model");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    } else if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({ username, email, password, phone });
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();
    const refershToken = await user.generateRefeshAuthToken();
    res
    .cookie("token",token,{httpOnly:true,secure:true,maxAge:60*1000,sameSite:'strict'})
      .cookie("refershToken", refershToken, { httpOnly: true,secure:true,maxAge:60*3*1000,sameSite:'strict'})
      .status(200)
      .json({ message: "login suceesful"});
  } catch (err) {
    res.status(400).json(err);
  }
};
const logout =async(req,res)=>{
  try{
    res.clearCookie("token")
    res.clearCookie("refershToken")
    res.status(200).json({message:"logout successful"})
  }catch(err){
    res.status(400).json(err)
  }
}
const validtoken = async (req, res) => {
  try {
    const { username, email, carts } = req.user;
    res.status(200).json({ username, email, carts });
  } catch (err) {
    res.status(400).json(err);
  }
};
const product = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < (await Product.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results1 = await Product.find().limit(limit).skip(startIndex).exec();
    res.status(200).json(results1);
  } catch (err) {
    res.status(400).json(err);
  }
};
const addtocart = async (req, res) => {
  try {
    const user = req.user;
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ msg: "Product does not exist" });
    }
    user.carts.push(product);
    await user.save();
    res.status(200).json({ msg: "Product added to cart successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};
const fetchproduct = async (req, res) => {
  try {
    const user = req.user;
    const product = user.carts;
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
const deletecart = async (req, res) => {
  try {
    const user = req.user;
    const product = user.carts;
    const productid = req.params.id;
    const productindex = product.findIndex(
      (product) => product._id == productid
    );
    if (productindex !== -1) {
      product.splice(productindex, 1);
      await user.save();
      res.status(200).json({ msg: "Product removed from cart successfully" });
    } else {
      res.status(400).json({ msg: "Product does not exist in cart" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  register,
  login,
  validtoken,
  product,
  addtocart,
  fetchproduct,
  deletecart,
  logout
};
