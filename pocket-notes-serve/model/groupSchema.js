const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: [true, "Group already exist!"],
    },
    color: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
