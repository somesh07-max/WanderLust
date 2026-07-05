const express = require("express");
const app = express();
const path = require("path");
const joi = require("joi");
const ejsmate = require('@simonsmith/ejs-mate')
const WrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {ListingSchema} = require("./schema.js");
const {ReviewSchema}=require("./schema.js")
const Review = require("./models/review.js")
const Listing = require("./models/Listing.js")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs",ejsmate);  //it will works similar to includes in ejs



app.use(express.static(path.join(__dirname,"public")));
const methodOverride = require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


const listing = require("./Routes/listing.js");
const review = require("./Routes/review.js")



const mongoose = require("mongoose");

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');

}
main().then((res)=>{

    console.log("connections successful");
}).catch(err => console.log(err));



app.use("/Listings",listing)
app.use("/Listings/:id/reviews",review)



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// reviews


// if user search for the route which does not exist
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use((err, req, res, next) => {
    console.log("ERROR OBJECT:", err);

    let { status = 500, message = "Something went wrong" } = err;

    // res.status(status).send(message);
    res.status(status).render("error.ejs",{err});
});



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("Server is Listening");
})
app.get("/",(req,res)=>{
    res.send("hello");
})

