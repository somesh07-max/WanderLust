const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocal = require("passport-local-mongoose").default;
// console.log(passportLocal)
const UserSchema = new Schema({
    email:{
        type:String,
        require:true,
    }

})

UserSchema.plugin(passportLocal);
module.exports = mongoose.model("User", UserSchema);