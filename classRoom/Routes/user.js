const express = require("express")
const app = express();

const router = express.Router();

// index route for my users
router.get("/",(req,res)=>{
    res.send("get for user");
})

// show route
router.get("/:id",(req,res)=>{
    res.send("Show route for users");
})

// Post- user
router.post("/",(req,res)=>{
    res.send("Post for users");
})

// Delete- user
router.delete("/:id",(req,res)=>{
    res.send("Delete for users")
})


module.exports = router;