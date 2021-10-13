const express = require('express');
const router = express.Router();
const { oauthClient } = require('../auth/auth');

const apiGetHandler = function (req, res) {
  console.log(oauthClient)
    const url = 
        req.query.endpoint === 'query' && req.query.query ?
        `https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365179971740/${req.query.endpoint}?query=${req.query.query}` :
        `https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365179971740/${req.query.endpoint}`;
    oauthClient.makeApiCall({
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log('The API response is  : ' + response);
    })
    .catch(function (e) {
      console.log('The error is ' + JSON.stringify(e));
    });
    console.log(req.query.endpoint);
    res.send()
}
 
router.get('/', apiGetHandler)

module.exports = router;
 