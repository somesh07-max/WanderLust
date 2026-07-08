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
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs",ejsmate);  //it will works similar to includes in ejs



app.use(express.static(path.join(__dirname,"public")));
const methodOverride = require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


const listing = require("./Routes/listing.js");
const review = require("./Routes/review.js");
const userRouter = require("./Routes/user.js");


const User = require("./models/user.js");


const mongoose = require("mongoose");

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');

}
main().then((res)=>{

    console.log("connections successful");
}).catch(err => console.log(err));


app.get("/",(req,res)=>{
    res.send("hello");
})



const sessionOptions = {
    secret:"mysupersectret",
    resave:false , 
saveUninitialized:true,
cookie:{
    expires:Date.now()+7*24*60*60*10000,
    maxAge:7*24*60*60*10000,
    httpOnly:true,
}};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    console.log(res.locals.success);
    next();
});

app.get("/demouser",async(req,res)=>{
    let fakeUser = new User({
        email:"student@gmail.com",
        username:"abc234",
        
    })

  let registerdUsr = await  User.register(fakeUser,"helloworld");
  res.send(registerdUsr);

})
app.use("/Listings",listing)
app.use("/Listings/:id/reviews",review)
app.use("/",userRouter);



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// reviews


// if user search for the route which does not exist
app.use((req, res, next) => {
    console.log("404 Request:", req.method, req.originalUrl);
    next(new ExpressError(404, "Page not found"));
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

