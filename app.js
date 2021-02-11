const express = require("express");
const http = require("http");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const mongodburl = process.env.MONGODB_PORT
  ? process.env.MONGODB_PORT
  : "mongodb://127.0.0.1:27017/cart";
const port = "8626";
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let routePath = "./package/node/route";

fs.readdirSync(routePath).forEach(function (file) {
  if (file.indexOf(".js")) {
    console.log("including the following files");
    console.log(routePath + "/" + file);
    let route = require(routePath + "/" + file);
    route.setRouter(app);
  }
});

const server = http.createServer(app);
server.listen("8626",()=>{
  console.log('server listening at port 8626')
});

mongoose.connect("mongodb://127.0.0.1:27017/cart", { useNewUrlParser: true });

mongoose.connection.on("error", function (err) {
  console.log(err);
});

mongoose.connection.on("open", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("database connection is open success ");
  }
});
