import dotenv from 'dotenv'
dotenv.config()

export default {
  development: {
    dialect: process.env.DB_DIALECT_DEV || 'mysql', // Mantenha apenas uma vez
    username: process.env.DB_USERNAME_DEV || 'root', // Com fallback
    password: process.env.DB_PASSWORD_DEV || null,
    database: process.env.DB_DATABASE_DEV || 'CSAT', // Exemplo de fallback para o nome do DB
    host: process.env.DB_HOST_DEV || '127.0.0.1',
    port: process.env.DB_PORT,

  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
    database: process.env.DB_DATABASE_PROD,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    },
  }
};