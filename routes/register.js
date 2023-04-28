const express = require('express');
const createUser = require('../controllers/registerController');
const router = express.Router();

router.post('/', createUser);

module.exports = router;