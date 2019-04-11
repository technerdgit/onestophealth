
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
          
          
       