import { Sequelize } from 'sequelize';

import Customer from '../app/models/Customer.js';
import User from '../app/models/User.js';
import EmailLog from '../app/models/EmailLog.js';

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

// Inicializa models
Customer.init(sequelize);
User.initModel(sequelize);
EmailLog.init(sequelize);

// Teste de conexão (não derruba o app)
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao MySQL (Railway)');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error);
  }
}

testDatabaseConnection();

export default sequelize;
