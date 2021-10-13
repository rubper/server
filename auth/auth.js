const express = require('express');
const router = express.Router();
const OAuthClient = require('intuit-oauth');


const oauthClient = new OAuthClient({
    clientId: 'ABBvenvtcWmsvtZjsEWwJuRc3wL0dM8noYPhmlLqZRIG6RkG4A',
    clientSecret: 'nxyR1lgLVT9jp8jyb5Miuuc3dz6vqD21fMe0Vl9b',
    environment: 'sandbox',
    redirectUri: 'http://localhost:4200/auth/callback',
});

const authHandler = function (req, res) {
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: 'testState',
    });
    res.send(authUri);
}

const callbackHandler = function (req, res) {
    oauthClient.createToken(`http://localhost:4200${req.body.url}`)
        .then(function (authResponse) {
            oauthClient.setToken(authResponse.token)
            const buffer = Buffer.from(authResponse.token.access_token, 'utf-8');
            const b64token = buffer.toString('base64');
            res.send({token:b64token});
        })
        .catch(function (e) {
            console.error('=============================');
            console.error('The error message is: ' + e.originalMessage);
            console.error(e.intuit_tid);
            console.error('=============================');
        });
}

router.get('/', authHandler);
router.post('/callback', callbackHandler);

module.exports = router;
module.exports.oauthClient = oauthClient;
 