/**
 * home.js
 * @author Raj
 */
"use strict";

const express = require("express");
const path = require("path");
const homeRouter = express.Router();

//Defining home page routes

homeRouter.get("/", (req, res, next) =>{
    console.log(`Displaying home page`);
    res.sendFile(path.join(__dirname, "../../views/", "index.html"))
});

homeRouter.get("/home", (req, res, next) =>{
    console.log(`Displaying home page`);
    res.sendFile(path.join(__dirname, "../../views/", "index.html"))
});

module.exports = homeRouter;