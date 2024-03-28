require("dotenv").config("./.env");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dbconnect = require("./Config/conn");
const errorMiddleware = require("./Middleware/error");
const AuthRoute = require("./Routes/Auth-route");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AdminRoute = require('./Routes/Admin-route');
const sellerRoute = require('./Routes/Seller-route')
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", AuthRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/seller", sellerRoute);
app.use(errorMiddleware);
dbconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });