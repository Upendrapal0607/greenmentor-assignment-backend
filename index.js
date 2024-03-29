const cors=require("cors")
const express=require("express");
require("express-async-errors")
const faker = require("@faker-js/faker");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");
const { productRoute } = require("./routes/product.route");
const PORT = process.env.PORT ||8080
const app= express();
app.use(express.json())
app.use(cors())

app.get("/",async(req,res)=>{
res.status(200).send({message:"welcome to my backend server"})
})
// All route end point
app.use("/user",userRoute)
app.use("/task",postRoute)
app.use("/product",productRoute)

app.use((req, res, next) => {
    res.status(404).send({ msg: "Route is not found" });
});
app.use((err,req, res, next) => {
    res.status(err.status||500).send({err, msg: "erro acuurse" });
});

 app.listen(PORT,async()=>{
   try {
    await connection
    console.log("server running on port 8080");
    console.log("connected to the database");

   } catch (error) {
    console.log(error)
   }
})