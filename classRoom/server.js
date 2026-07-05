const express = require("express");
const app = express();

const users = require("./Routes/user");
const posts = require("./Routes/post.js");
const cookieParser = require("cookie-parser")


app.use(cookieParse());
app.use("/users",users) 
app.use("/posts",posts)  //it will match withh all the users routes 


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