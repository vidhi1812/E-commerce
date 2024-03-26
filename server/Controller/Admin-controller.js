const Product = require("../Models/Product-model");
const User = require("../Models/User-Model");
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth :{
    user: 'du04192@gmail.com',
    pass: 'du04192020'
  }
})
const alluser = async (req, res) => {
  try {
    const user = await User.find({ isAdmin: false, role: "user" }).select({
      password: 0,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
const userid = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select({ password: 0 });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
const useridupdate = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
const useriddelete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
const allseller = async (req, res) => {
  try {
    const seller = await User.find({ isAdmin: false, role: "seller" }).select({
      password: 0,
    });
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json(err);
  }
};
const sellerCreate = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const role = "seller";
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    } else if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const verificationToken = uuid.v4();
    User.push({ name, email, password, phone, role , verified: false, verificationToken });
    transporter.sendMail({
      from: 'du04192@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Click the following link to verify your email: http://localhost:3000/verify?token=${verificationToken}`
    }, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send verification email' });
      }
      console.log('Verification email sent:', info.response);
      res.status(200).json({ message: 'Verification email sent' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
const verifyseller = async(req,res)=>{
  try{
    const {token} = req.query;
    const user = User.find({verificationToken: token});
    if(!user){
      return res.status(400).json({msg: 'Invalid token'});
    }
    user.verified = true;
    user.verificationToken = null;
    res.status(200).json({msg: 'Email verified successfully'});
  }
  catch(err){
    res.status(400).json(err);
  }
}
const sellerid = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id).select({ password: 0 });
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json(err);
  }
};
const selleridupdate = async (req, res) => {
  try {
    const seller = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json(err);
  }
};
const selleriddelete = async (req, res) => {
  try {
    const seller = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json(err);
  }
};
const allProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image_url } = req.body;
    if (!name || !price || !description || !category || !image_url) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image_url,
    });
    await newProduct.save();
    res.status(201).json({ msg: "Product created successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};
const productId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
const productIdUpdate = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
const productIdDelete = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  alluser,
  allseller,
  userid,
  useridupdate,
  useriddelete,
  sellerCreate,
  sellerid,
  selleridupdate,
  selleriddelete,
  allProduct,
  createProduct,
  productId,
  productIdUpdate,
  productIdDelete,
  verifyseller
};