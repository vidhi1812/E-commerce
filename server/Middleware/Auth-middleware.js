const jwt = require("jsonwebtoken");
const User = require("../Models/User-Model");
const AuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  const refershtoken = req.cookies.refershToken;
  try {
    let user;
    let decoded;
    if (!token && !refershtoken) {
      res.status(401).json({ error: "Please authenticate" });
    } else if (token) {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
      user = await User.findOne({
        email: decoded.email,
      }).select({ password: 0 });
      if (!user) {
        throw new Error();
      }
    } else if (refershtoken) {
      decoded = jwt.verify(refershtoken, process.env.REFRESH_SECRET_KEY);
      user = await User.findOne({
        email: decoded.email,
      }).select({ password: 0 });
      if (!user) {
        throw new Error();
      }
      const ntoken = await user.generateAuthToken();
      const refershToken = await user.generateRefeshAuthToken();
      res
        .cookie("token", ntoken, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 1000,
        })
        .cookie("refershToken", refershToken, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 1000 * 3,
        })
        .status(200);
    }
    req.token = token;
    req.user = user;
    req.user_id = user._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};
module.exports = AuthMiddleware;