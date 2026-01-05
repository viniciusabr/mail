import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import Customer from '../app/models/Customer.js';
import User from '../app/models/User.js';
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

// ✅ INICIALIZA TODOS OS MODELS
Customer.init(sequelize);
User.initModel(sequelize); // 👈 ISSO ESTAVA FALTANDO
EmailLog.init(sequelize);

// (opcional, mas recomendado)
await sequelize.authenticate();
console.log('✅ Banco conectado');

export default sequelize;
