const express = require('express');
const router = express.Router();
const axios = require('axios');

const indexHandler = function (req, res) {
    res.send('index loaded')
}
 
router.get('/', indexHandler)

module.exports = router;
 
