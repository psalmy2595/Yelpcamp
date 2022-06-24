//import packages and require
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const PORT = process.env.PORT || 7000;

//tell express to use body parser
app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");

//create db and connect mongodb to app
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

//Schema set up..
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//compile campground into a model
var campground = mongoose.model("Campground", campgroundSchema);

// campground.create(
//     {
//         name: "camp Forestry", 
//         image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=200"
  
//     }, function (err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("new campground created ");
//             console.log(campground);
//         }
        
//     })

// var campgrounds =[
//     // {name: "camp Forestry", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=200"},
//     {name: "camp Nou", image: "https://images.pexels.com/photos/1840394/pexels-photo-1840394.jpeg?auto=compress&cs=tinysrgb&h=200"},
//     {name: "Camp New", image: "https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=200"},
//     {name: "Camp Newlife", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=200"}
    
// ]

//Root route
app.get("/", function(req, res){
    res.render("landing");
});
//First or Index Route
app.get("/campgrounds", function(req, res){
    //get all campgrounds from the db 
    campground.find({}, function (err, allCampgrounds){  
        if(err){
            console.log(err);
        }else{
        //shows us all the campgorunds
        res.render("campgrounds",{campgrounds:allCampgrounds});

        }
    });
   
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image; 
    var description = req.body.description; 
    // get data from form to add to 
    var newCampground = {name: name, image: image, description: description}
    // Create a new campground and save to the DB
    campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    //redirect to campgrounds page
    // res.redirect("/campgrounds"); 
    
});

app.get("/campgrounds/new", function(req, res){
res.render("new");

});

app.get("/campgrounds/:id", function(req, res){
    res.send("Welcome");
});

app.listen(PORT, function(){
    console.log("Yelpcamp By Psalmyjay, SERVER STARTED");
});

function newFunction() {
    app.use(express.urlencoded({ extended: true }));
}
 