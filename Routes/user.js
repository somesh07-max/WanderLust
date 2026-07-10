const express = require("express");

const router  = express.Router();
const User = require("../models/user.js")
const flash= require("connect-flash");
router.get("/signUp",(req,res)=>{
    res.render("users/signUp.ejs")
})

router.post("/signUp", async(req,res)=>{
    let{username,email,password}=req.body;
   const newUser =   new User({username,email});
   const registeredUser = await  User.register(newUser,password);

    console.log(registeredUser);

    req.flash("success", "Welcome to WanderLust!!");


    res.redirect("/listings");
})

module.exports = router;




