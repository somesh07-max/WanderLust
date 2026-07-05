
const express = require("express")
const router = express.Router();

// index route for my posts
router.get("/",(req,res)=>{
    res.send("get for posts");
})

// show route
router.get("/:id",(req,res)=>{
    res.send("Show route for posts");
})

// Post- user
router.post("/",(req,res)=>{
    res.send("Post for posts");
})

// Delete- user
router.delete("/:id",(req,res)=>{
    res.send("Delete for posts")
})

module.exports = router
