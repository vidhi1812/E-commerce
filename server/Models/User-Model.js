const mongoose = require("mongoose");
const bcrtpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cart = new mongoose.Schema({
  pid:String,
  name:String,
  price:String,
  image_url:String,
})
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phone :{
    type: String,
    required: true,
    min: 10,
    max: 10
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  carts : [cart],
  isAdmin:{
    type:Boolean,
    default:false
  },
  role :{
    type:String,
    default:"user"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        this.password = await bcrtpt.hash(this.password, 10);
      }
      next();
    } catch (error) {
      console.log("error",error);
    }
  });
  userSchema.methods.generateAuthToken = async function () {
    try {
      return jwt.sign(
        { _id: this._id, email: this.email, role:this.role, isAdmin:this.isAdmin},
        process.env.SECRET_KEY,
        {
          expiresIn: "4m",
        }
      );
    } catch (err) {
      const error = [400, err.message];
      next(error);
    }
  };
  userSchema.methods.generateRefeshAuthToken = async function () {
    try {
      return jwt.sign(
        { _id: this._id, email: this.email , role:this.role, isAdmin:this.isAdmin},
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: "10m",
        }
      );
    } catch (err) {
      const error = [400, err.message];
      next(error);
    }
  }
const User = mongoose.model("User", userSchema);
module.exports = User;