const express = require("express");
const cors = require("cors");
const connectDB = require("./db/Config");
const User = require("./db/User");
const product = require("./db/Product");
const Product = require("./db/Product");
const jwt = require("jsonwebtoken");
const jwtKey = "e-com";
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "3h" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong,please try after sometime" });
    }
    resp.send({ result, auth: token });
  });
});
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ id: user._id }, jwtKey, { expiresIn: "3h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "something went wrong,please try after sometime",
          });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No user Found" });
    }
  } else {
    resp.send({ result: "No user found" });
  }
});
app.post("/add-product",  async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.status(201).json({ Message: "Product is added successfully", result });
});
app.get("/products", async (req, resp) => {
  let products = await product.find();
  if (products.length > 0) {
    resp.json(products);
  } else {
    resp.send({ result: "No Products" });
  }
});
app.delete("/product/:id", async (req, resp) => {
  const result = await Product.deleteOne({ id: req.params._id });
  resp.send(result);
});
app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ id: req.params._id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});
app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { id: req.params._id },
    { $set: req.body }
  );
  resp.send(result);
});
app.get("/search/:key",  async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});
function varifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  console.log(token);
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.send({ result: "plaese add token the header" });
  }
  next();
}

// function varifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   const tokenFromCookie = req.cookies.accessToken;

//   let token;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     token = authHeader.split(" ")[1];
//   } else if (tokenFromCookie) {
//     token = tokenFromCookie;
//   }

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   // Remove any extraneous quotes from the token
//   token = token.replace(/['"]+/g, "");

//   try {
//     const decoded = jwt.verify(token, jwtKey);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.log(err.message);
//     res.status(401).json({ message: "Token is not valid" });
//   }

app.listen(port, (req, resp) => {
  connectDB();
  console.log("server is running");
});
