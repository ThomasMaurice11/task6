// const fileSystem=require('fs')

// fileSystem.readFile('mydata.txt',function(err,content){
//     console.log(content.toString());//callback
// })

// console.log('hello');

// const validator=require('validator')

// console.log(validator.isEmail('amira@gmail.com'));
const express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var Product = require("./models/product");
var server = express();

//middleware
//post request ->encoding
//decode

server.use(express.urlencoded({ extended: true }));

server.use(express.json());
server.use(cors());

//connect to database

mongoose
  .connect(
    "mongodb+srv://meang3:ASDZXC123@cluster0.xexkr4q.mongodb.net/ecommerce"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connection to database");
  });

// function sayHello(req,res,next){
//   console.log('hello from node');
//   next()
// }

// server.use(sayHello)
//CRUD
//  /products  ->get(),
//apis ->functions
//1cl
//localhost:3002/products?pageNumber=2&pageSize=5;
server.get("/products", function (req, res) {
  var pageNumber = +req.query.pageNumber;
  var pageSize = +req.query.pageSize;
  var myQuery = Product.find();
  var fetchedProducts;
  if (pageNumber && pageSize) {
    myQuery.skip(pageSize * (pageNumber - 1)).limit(pageSize);
  }
  myQuery
    .then((productsData) => {
      fetchedProducts = productsData;
      return Product.count();
    })
    .then((productsCount) => {
      res.send({
        totalProducts: productsCount,
        products: fetchedProducts,
      });
    })
    .catch((err) => {
      res.send({
        error: "Error getting product",
      });
    });
});
//  /product/:id  ->get(),
//2
//url params ->req.params
server.get("/product/:id", function (req, res) {
  let prodId = +req.params.id;
  Product.findOne({ id: prodId })
    .then((singleProduct) => {
      res.send(singleProduct);
    })
    .catch((err) => {
      console.log(err);
    });
});

// server.post("/addProduct", function (req, res) {
//   let productData = req.body;
//   let newProduct = new Product({
//     id: +productData.id,
//     title: productData.title,
//     price: +productData.price,
//     image: productData.image,
//     isAvaliable: productData.isAvaliable,
//   });

//   newProduct
//     .save()
//     .then((msg) => {
//       res.send({
//         msg: "product added successfuly",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

server.put("/product/:id", function (req, res) {
  let prodId = +req.params.id;
  Product.updateOne(
    { id: prodId },
    {
      title: "apple tv",
    }
  )
    .then((msg) => {
      res.send({
        msg: "product updated successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
server.delete("/product/:id", function (req, res) {
  let prodId = +req.params.id;
  Product.deleteOne({ id: prodId })
    .then((msg) => {
      res.send({
        msg: "product deleted successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.listen(3002, function () {
  console.log("server connected");
});
