const express = require("express");
const app = express();

const users = require("./Routes/user");
const posts = require("./Routes/post.js");
const cookieParser = require("cookie-parser")


app.use(cookieParser("secretcode"));
app.use("/users",users) 
app.use("/posts",posts)  //it will match withh all the users routes 


app.get("/getSignedCookie",(req,res)=>{
    res.cookie("color","red",{signed:true});
    res.send("signed cookies send");
})
app.get("/verified",(req,res)=>{
    console.log(res.cookie);
    res.send("verified");
})
app.get("/greet",(req,res)=>{
    let {name}=req.cookies;
    res.send(`hi , ${name}`);
})

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
    res.send("hello ji")
})
app.get("/",(req,res)=>{
    console.dir(req.cookies)
    res.send("everything is perfect");
})
 


app.listen(3000,()=>{
    console.log("app is listening");
})