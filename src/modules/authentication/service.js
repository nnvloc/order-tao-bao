import jwt from 'jsonwebtoken';
import config from 'src/configs';
import moment from 'moment';
import TokenService from 'src/modules/token/service';

class AuthService {
  generateToken(jwtData) {
    return new Promise((resolve, reject) => {
      let expiredAt = moment();
      expiredAt.add(365, 'd');
      jwtData.expiredAt = expiredAt;
      const jwtToken = jwt.sign({
        data: JSON.stringify(jwtData)
      }, 
      config.token.secretKey,
      {
        expiresIn: '365d'
      });
      
      const newToken = {
        userId: jwtData.id,
        expiredAt: expiredAt.toISOString(),
        token: jwtToken
      };
      
      TokenService.createToken(newToken)
        .then(token => {
          resolve(jwtToken);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export default new AuthService();
