var OktaJwtVerifier = require('@okta/jwt-verifier');

    oktaJwtVerifier = new OktaJwtVerifier({
        issuer: 'https://dev-527021.okta.com/oauth2/default',
        clientId: '0oafzij4dl6bUC13R356',
        assertClaims: {
           // aud: 'api://default',
           userName : clientId
        },
    });
    oktaJwtVerifier.verifyAccessToken("accesstoken")
    .then(jwt => {
      // the token is valid
      console.log(jwt.claims);
    })
    .catch(err => {
      console.log(JSON.stingify(err))
    });
    function authenticationRequired(req, res, next) {
        const authHeader = req.headers.authorization || '';
        const match = authHeader.match(/Bearer (.+)/);

        if (!match) {
            return res.status(401).end();
        }

        const accessToken = match[1];

        return oktaJwtVerifier.verifyAccessToken(accessToken)
            .then((jwt) => {
                req.jwt = jwt;
                next();
            })
            .catch((err) => {
                res.status(401).send(err.message);
            });
    }