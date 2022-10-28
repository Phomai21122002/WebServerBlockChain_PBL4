const businessController = require('../app/controllers/centerController')

const express = require('express');
const centerController = require('../app/controllers/centerController');
const router = express.Router();

router.get('/', centerController.index)

module.exports = router;