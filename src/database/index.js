import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import Customer from '../app/models/Customer.js';
import User from '../app/models/User.js';
import EmailLog from '../app/models/EmailLog.js';

dotenv.config(); // 👈 MUITO IMPORTANTE

console.log('DB_HOST =>', process.env.DB_HOST);
console.log('DB_PORT =>', process.env.DB_PORT);
console.log('DB_NAME =>', process.env.DB_NAME);
console.log('DB_USER =>', process.env.DB_USER);
// ❌ NÃO logue a senha em produção

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);
