const configs = {
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,
  NODE_ENV: process.env.NODE_ENV,
  API_KEY: process.env.API_KEY,
  token: {
    secretKey: process.env.TOKEN_SECRET_KEY,
    expiredTime: process.env.TOKEN_EXPIRED_TIME,
  },
  nonAuthSecuredPaths: [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout',
    '/api/auth/forgot-password',
    '/api/auth/refresh-token',
  ],
}

export default configs;
