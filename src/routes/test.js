const testController = require("../app/controllers/testController");

const express = require("express");
const router = express.Router();

router.get("/", testController.index);
module.exports = router;
