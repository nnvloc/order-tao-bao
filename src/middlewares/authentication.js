import jwt from 'jsonwebtoken';
import _ from 'lodash';
import configs from 'src/configs';
import { AuthorizationError } from 'src/modules/authentication/errors';
import UserTokenService from 'src/modules/token/service';
import UserService from 'src/modules/user/service';
import moment from 'moment';

const { token, apiKey, nonAuthSecuredPaths } = configs;
const authenticate = (req, res, next) => {
  try {
    // get api token
    const api_token = req.body.api_token || req.query.api_token || req.headers['x-access-token'];
    // check api token
    if (_.includes(apiKey, api_token) || true) { // remove true to enable api_key token
      // path with user's authentication is no needed
      if (nonAuthSecuredPaths.includes(req.path)) return next();
      // if (_.find(nonAuthSecuredPaths, (p) => _.includes(req.path, p))) return next();

      // check user's authentication
      const auth_token = req.body.auth_token || req.query.auth_token || req.headers['x-auth-token'];
      if (auth_token) {
        jwt.verify(auth_token, token.secretKey, (err, decoded) => {
          // failed
          if (err) throw new AuthorizationError();

          // Check token is valid
          UserTokenService.getToken(auth_token)
            .then(token => {
              if (!token) {
                // throw new AuthorizationError();
                return next(new AuthorizationError());
              }
              // req.user = JSON.parse(decoded.data);
              const jwtData = JSON.parse(decoded.data);
              return UserService.getUserById(jwtData.id);
            })
            .then(u => {
              if(!u) {
                return next(new AuthorizationError());
              }
              req.user= u;
              next();
            })
            .catch(err => {
              return next(new AuthorizationError());
            });
        });
      } else {
        throw new AuthorizationError();
      }
    } else {
      // without api-key
      throw new AuthorizationError();
    }
  } catch (err) {
    next(err);
  }
};

export default authenticate;
