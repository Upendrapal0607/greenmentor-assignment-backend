const mongoose= require("mongoose");

const userSchema=mongoose.Schema({
    username:String,
    email: String,
    gender:String,
    password:String,
    dob:String,
    address : String,
    phone:String,
},{versionKey:false})
const UserModel= mongoose.model("ResisterUser",userSchema)

module.exports={
    UserModel
}
