const express = require('express');
const router= express.Router();
const reqValidation = require('../utils/reqValidation');
const scheamValidation = require('../middleware/reqValidationMiddleware')
const { createGroup,allGroup} = require('../controller/groupController');

// create group
router.post("/createGroup",scheamValidation.request_validation(reqValidation.createGroup),createGroup);
//fetch group
router.get("/getAllGroup",allGroup);





module.exports = router