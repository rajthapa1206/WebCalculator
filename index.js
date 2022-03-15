/**
 * index.js
 * @author Raj
 * @since 2022-03-14
 */
"use strict";

const express = require("express");
const path = require("path");
const homeRoutes = require("./routes/home/home");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// setup the express HttpRequest data parser middlewares
// parse application/x-www-form-urlencoded (e.g. web form data)
app.use(express.urlencoded({ extended: false }));

//Setup home and other static pages
app.use("", homeRoutes);

//Defining routes for result page
app.post("/result", (req, res) => {
    console.log(`Presenting the result of the calculation.`);
    console.log(`Getting Results:`);
    console.log(`Calculating the requested operation:`);
    console.log(`First Number: ${req.body.first}`);
    console.log(`Second Number: ${req.body.second}`);
    console.log(`Operation: ${req.body.operation}`);
    const first = parseFloat(req.body.first);
    const second = parseFloat(req.body.second);
    const operation = `${req.body.operation}`;
    let result = null;
        if (operation == "add"){
            result = first + second;
        }
        else if (operation == "subtract"){
            result = first - second;
        }
        else if (operation == "multiply"){
            result = first * second;
        }
        else if (operation == "divide"){
            result = first/second;
        }
    const queryString = `result=${result}`;
    const redirectUrl = `/result?${queryString}`;
    res.redirect(303, redirectUrl);
 });
 
 app.get("/result", (req, res)=>{
   console.log(`Generating Result...`);
   res.render("result", {result: req.query.result})
   res.sendFile(path.join(__dirname, "views", "result.pug"));
 });



app.use((req, res, next) => {
    console.log(`Responding by redirecting to the 404 Error page`);
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const PORT_NUMBER = 3000;

app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER}`);
});
console.log(`Starting the App server for simple calculator webapp...`);