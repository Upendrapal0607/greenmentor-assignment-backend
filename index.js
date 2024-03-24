const cors=require("cors")
const express=require("express");
require("express-async-errors")
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");

const app= express();
app.use(express.json())
app.use(cors())
app.get("/",async(req,res)=>{
res.status(200).send({message:"welcome to my backend server"})
})
app.use("/api/user",userRoute)
app.use("/api/task",postRoute)

app.use((req, res, next) => {
    res.status(404).send({ msg: "Route is not found" });
});
app.use((err,req, res, next) => {
    res.status(err.status||500).send({err, msg: "erro acuurse" });
});

 app.listen(8080,async()=>{
   try {
    await connection
    console.log("server running on port 8080");
    console.log("connected to the database");

   } catch (error) {
    console.log(error)
   }
})