const mongoose = require("mongoose");
const blackListSchema = mongoose.Schema(
  {
    token: String,
  },
  { versionKey: false }
);

const BlackList = mongoose.model("BlackListedUser", blackListSchema);

module.exports = BlackList;
