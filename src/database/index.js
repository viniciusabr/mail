import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import User from '../app/models/User.js';
import Customer from '../app/models/Customer.js';
import EmailLog from '../app/models/EmailLog.js';

dotenv.config();

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

// ✅ inicialização correta
User.init(sequelize);
Customer.init(sequelize);
EmailLog.init(sequelize);

export default sequelize;
