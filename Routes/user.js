const express = require("express");

const router  = express.Router();
const User = require("../models/user.js")
const flash= require("connect-flash");
const WrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport")
router.get("/signUp",(req,res)=>{
    res.render("users/signUp.ejs")
})

router.post("/signUp", WrapAsync(async(req,res)=>{
    try{
    let{username,email,password}=req.body;
   const newUser =   new User({username,email});
   const registeredUser = await  User.register(newUser,password);

    console.log(registeredUser);

    req.flash("success", "Welcome to WanderLust!!");


    res.redirect("/listings");
    }
    catch(err){
        req.flash("error",err.message);
         res.redirect("/signup");

    }
}))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})
router.post("/login",    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }) ,WrapAsync(async(req,res)=>{
 
        req.flash("success", "Welcome back!");
        res.redirect("/listings");
}))
module.exports = router;




