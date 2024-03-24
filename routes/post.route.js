const express = require("express");
const { postModel } = require("../models/post.model");
const { auth } = require("../middleware/auth.middleware");

const postRoute = express.Router();

postRoute.get("/", async (req, res) => {
  try {
    const taskList = await postModel.find();
    res.status(201).json({ taskList });
  } catch (error) {
    res.status(404).send({ message: error });
  }
});
postRoute.get("/:taskId", async (req, res) => {
  try {
    const postList = await postModel.find({_id: req.params.taskId});
    res.status(201).json({ postList });
  } catch (error) {
    res.status(404).send({ message: "there is some error try again"});
  }
});

postRoute.post("/addtask",auth, async (req, res) => {
  const addedpost = req.body;
  try {
    const addedPost = new postModel(addedpost);
    await addedPost.save();
    res.status(200).send({ message: "New task added successfully" });
  } catch (error) {
    res.status(200).send(error);
  }
});

postRoute.patch("/update/:postId",auth,async (req, res) => {
  try {
    const { postId } = req.params;
    const Post = await postModel.findOne({ _id: postId });
    if (!Post) {
      return res.status(404).send({ message: "Post not found" });
    }
    await postModel.findByIdAndUpdate({ _id: postId }, req.body);
    res.status(200).send({ message: `post ${postId} updated successfully` });
  } catch (error) {
    res.status(404).send({ message: "errror" });
  }
});
postRoute.delete("/delete/:postId",auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const Post = await postModel.findOne({ _id: postId });
    if (!Post) {
      return res.status(404).send({ message: "Post not found" });
    }
    await postModel.findByIdAndDelete({ _id: postId });
    res.status(200).send({ message: `post ${postId} deleted successfully` });
  } catch (error) {
    res.status(404).send({ message: "errror" });
  }
});

module.exports = {
  postRoute,
};
