const express = require("express");
require('./db/mongoose');
const cors = require("cors");
const path = require("path");

const userRoutes = require("./router/userRouter");
const ownerRoutes = require("./router/shopRouter");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/src/images", express.static(path.join("src/images")));
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );

  res.set({
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  });

  next();
});


app.use("/api/user", userRoutes);
app.use("/api/shop", ownerRoutes);

app.all('*', (req, res, next) => {


  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

module.exports = app;

