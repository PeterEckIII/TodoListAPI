var express = require("express");
var app     = express();
var mongoose = require("mongoose");
var todoRoutes = require("./routes/todos");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.use("/api/todos", todoRoutes);

app.get("/", function(req, res) {
    res.sendFile("index.html");
})

app.listen(3000, function() {
    console.log("Starting server on port 3000");
});