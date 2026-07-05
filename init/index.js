const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/Listing.js")

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');

}
main().then((res)=>{

    console.log("connections successful");
}).catch(err => console.log(err));


const initDB = async function(){
 await Listing.deleteMany({});

 await Listing.insertMany(initData.data);

}


initDB();