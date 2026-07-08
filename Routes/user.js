const express = require("express");

const router  = express.Router();

router.get("/signUp",(req,res)=>{
    res.render("users/signUp.ejs")
})

module.exports = router;




