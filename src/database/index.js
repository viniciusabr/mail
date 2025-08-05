import { Sequelize } from 'sequelize'; // Importação da classe Sequelize
import Customer from '../app/models/Customer.js'; // Importação do model Customer
import User from '../app/models/User.js'; // Importação do model User
import dbConfig from '../config/database.js'; // Configurações do banco de dados
import EmailLog from '../app/models/EmailLog.js';

// Pegando as informações do ambiente atual (development, production etc.)
const currentEnvironmentConfig = dbConfig.development;

// Instancia o Sequelize com as configurações do banco
const sequelize = new Sequelize(currentEnvironmentConfig);

// Inicializa os models passando a instância do Sequelize
Customer.init(sequelize);
User.initModel(sequelize); // ⚠️ Corrigido: o método correto do seu model User é initModel()
EmailLog.init(sequelize)

// Função opcional para testar conexão com o banco
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1); // Encerra a aplicação caso não consiga conectar
  }
}

// Executa o teste de conexão ao carregar
testDatabaseConnection();

// Exporta a instância do Sequelize para uso em outros arquivos
export default sequelize;
