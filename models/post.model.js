const mongoose= require("mongoose");

const postSchema=mongoose.Schema({
    title:String,
   description:String,
   completed:Boolean,
},{versionKey:false})
const postModel= mongoose.model("postData",postSchema)

module.exports={
    postModel
}
