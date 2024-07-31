const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Note", notesSchema);
module.exports = Notes;
