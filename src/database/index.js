import { Sequelize } from 'sequelize';
import Customer from '../app/models/Customer.js';
import User from '../app/models/User.js';
import dbConfig from '../config/database.js';
import EmailLog from '../app/models/EmailLog.js';
import dotenv from 'dotenv'

dotenv.config()

const environment = process.env.NODE_ENV || 'development'
const currentConfig = dbConfig[environment];

const sequelize = currentConfig.url
  ? new Sequelize(currentConfig.url, currentConfig)
  : new Sequelize(currentConfig)

Customer.init(sequelize);
User.initModel(sequelize);
EmailLog.init(sequelize)

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com sucesso.');

  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1);
  }
}

testDatabaseConnection();

export default sequelize;
