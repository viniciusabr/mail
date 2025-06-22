require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT_DEV || 'mysql', // Mantenha apenas uma vez
    username: process.env.DB_USERNAME_DEV || 'root', // Com fallback
    password: process.env.DB_PASSWORD_DEV || null,
    database: process.env.DB_DATABASE_DEV || 'CSAT', // Exemplo de fallback para o nome do DB
    host: process.env.DB_HOST_DEV || '127.0.0.1',
    port: process.env.DB_PORT,
    
  },
  production: {
    // Use variáveis de ambiente específicas para PROD aqui!
    dialect: process.env.DB_DIALECT_PROD,
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
  }
};