const express = require('express');
const login = require('../controller/loginUser');
const router = express.Router();

router.post('/', login);

module.exports = router;

