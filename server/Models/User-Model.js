const mongoose = require("mongoose");
const bcrtpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cart = new mongoose.Schema({
  pid:String,
  email:String,
  username:String
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
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  carts : [cart],
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
      console.log(error);
    }
  });
  userSchema.methods.generateAuthToken = async function () {
    try {
      return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
    } catch (err) {
      const error = [400, err.message];
      next(error);
    }
  };
const User = mongoose.model("User", userSchema);
module.exports = User;