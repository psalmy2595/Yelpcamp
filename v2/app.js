//import packages and require
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const PORT = process.env.PORT || 7000;

//tell express to use body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");

var campgrounds =[
    {name: "Camp Oyo", image: "http://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=200"},
    {name: "camp Forestry", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=200"},
    {name: "camp Nou", image: "https://images.pexels.com/photos/1840394/pexels-photo-1840394.jpeg?auto=compress&cs=tinysrgb&h=200"},
    {name: "Camp New", image: "https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=200"},
    {name: "Camp Newlife", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=200"}
    
]

//Root route
app.get("/", function(req, res){
    res.render("landing");
});
//First Route
app.get("/campgrounds", function(req, res){
    //shows us all the campgorunds
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image; 
    // get data from form to add to campgrounds array 
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
//redirect to campgrounds page
    res.redirect("/campgrounds"); 
    
});

app.get("/campgrounds/new", function(req, res){
res.render("new");

});

app.listen(PORT, function(){
    console.log("Yelpcamp By Psalmyjay, SERVER STARTED");
});
 