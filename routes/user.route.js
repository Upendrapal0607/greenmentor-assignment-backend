const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const BlackList = require("../models/blacklist.model");
require("dotenv").config();

const userRoute = express.Router();
userRoute.get("/", async (req, res) => {
  try {
    const userList = await UserModel.find();
    res.status(200).send(userList);
  } catch (error) {
    res.status(200).send({ mess: error });
  }
});

userRoute.post("/register", async (req, res) => {
  const resUser = req.body;
  console.log({resUser});
  try {
    const AlraidyExitst = await UserModel.findOne({ email: resUser.email });
    if (AlraidyExitst) {
      res
        .status(202)
        .json({
          message: `user whose mail ${resUser.email} is alraiday exist`,
          name: AlraidyExitst.name,
        });
    } else {
      bcrypt.hash(resUser.password, 3, async (err, hash) => {
        if (err)
          res
            .status(404)
            .send({ message: "there is an error try to again", err });
        const registerUser = new UserModel({ ...resUser, password: hash });
        await registerUser.save();
        res
          .status(202)
          .send({ message: "new user resistered", name: resUser.username });
      });
    }
  } catch (error) {
    res.status(error.status || 404).send({ message: error });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const expirationTime =
            Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
          const token = jwt.sign(
            { userID: user._id, user: user.username },
            process.env.TOKEN_SECRET,
            { expiresIn: "7d" }
          );
        
          res
            .status(200)
            .send({
              message: "login successful",
              token,
              user,
            });
        } else {
          res.status(200).send({ message: "wrong password or email" });
        }
      });
    } else {
      res.status(200).send({ message: "please provid email and password" });
    }
  } catch (error) {
    res.status(200).send({ message: error });
  }
});

userRoute.get("/logout",async(req,res)=>{
    try {
        const token=req.headers.authorization
   const blacklist= new BlackList({token})
   await blacklist.save()
   res.status(200).send({message:"loguot successful"})

    } catch (error) {
        res.status(404).send({message:error})

    }
})
module.exports = {
  userRoute,
};
