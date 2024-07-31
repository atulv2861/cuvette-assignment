const Notes = require("../model/notesSchema");
const Group = require("../model/groupSchema");
const createNote = async (req, res) => {
  try {
    const groupId = await Group.findById(req.body.groupId);
    if (!groupId) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }
    await Notes.create(req.body);
    res.status(201).json({
      success: true,
      message: "Note created!!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getNotesByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid group id",
      });
    }

    const notes = await Notes.find({ groupId: groupId });
    res.status(201).json({
      success: true,
      message: "All notes!!!!",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { getNotesByGroupId, createNote };
