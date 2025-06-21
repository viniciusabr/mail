import { Sequelize } from 'sequelize'; // Importação da class sequelize
import Customer from '../app/models/Customer'; //importação do modelo customer
import dbConfig from '../config/database'; // Importação das configurações do banco de dados


const currentEnvironmentConfig = dbConfig.development; // Pegando as informações do development diretamente

const sequelize = new Sequelize(currentEnvironmentConfig); // Instanciação da class sequalize passando como parâmetro do dados do banco de dados
Customer.init(sequelize) // chando o metodo init e passando como parametros a classe instacializada

// Opcional: Teste a conexão com o banco de dados
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.error('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.log('Não foi possível conectar ao banco de dados:', error);
    // Você pode querer sair da aplicação ou lidar com o erro de outra forma aqui
    process.exit(1); // Exemplo: Sair se não conseguir conectar
  }
}

// Chame a função para testar a conexão quando o arquivo for carregado
testDatabaseConnection();

// IMPORTANTE: Exporte a instância *inicializada* do Sequelize
module.exports = sequelize;
