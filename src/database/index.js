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

// ✅ inicialização dos models
User.init(sequelize);
Customer.init(sequelize);
EmailLog.init(sequelize);

// ⚠️ BLOCO TEMPORÁRIO — APENAS PARA CRIAR TABELAS
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco MySQL');

    // 👉 USE APENAS UMA VEZ
    await sequelize.sync({ alter: true });
    console.log('🧱 Tabelas criadas / ajustadas com sucesso');

  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error);
    process.exit(1);
  }
}

initDatabase();

export default sequelize;
