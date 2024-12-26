const express = require('express');
const signup = require('../controller/signup');
const router = express.Router();

router.post('/', signup);

module.exports = router;
