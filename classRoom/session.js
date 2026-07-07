const express = require("express");
const app = express();

const users = require("./Routes/user");
const posts = require("./Routes/post.js");
const path = require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const session = require("express-session");
const flash = require("connect-flash")
const sessionOptions = {
    secret:"mysupersectret",
    resave:false , 
saveUninitialized:false};

app.use(session(sessionOptions));
app.use(flash())


app.get("/register",(req,res)=>{
    let {name="anonymous"}= req.query;
    
    req.session.name = name;
    console.log(req.session);
    if(name==="anonymous"){
        res.flash("error","user not found");
    }
    else{
        req.flash("success","user registered successfully")
    }
    
    res.redirect("/hello")
})
app.get("/hello",(req,res)=>{
    res.locals.success = res.flash("success");
    res.locals.error = res.flash("error");


    res.render("page.ejs",{name:req.session.name});
})





// app.get("/reqCount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//  req.session.count =1;
//     }
   
    // res.send(`Same user has accessed it ${req.session.count} times`); 
// })

app.get("/test",(req,res)=>{
    res.send("test successful");
})

app.listen(3000,()=>{
    console.log("app is listening");
})