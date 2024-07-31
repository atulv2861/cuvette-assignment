const express = require('express');
const router= express.Router();
const reqValidation = require('../utils/reqValidation');
const scheamValidation = require('../middleware/reqValidationMiddleware')
const { getNotesByGroupId,createNote} = require('../controller/noteController');

// create notes
router.post("/createNote",scheamValidation.request_validation(reqValidation.createNote),createNote);
// fetch notes
router.get("/getNotes/:groupId",getNotesByGroupId);





module.exports = router