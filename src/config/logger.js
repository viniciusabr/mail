import winston from 'winston';

// Cria e exporta o logger configurado
const logger = winston.createLogger({
  level: 'info',  // Grava logs de nível 'info', 'warn' e 'error'

  format: winston.format.combine(
    winston.format.timestamp(),  // Adiciona data/hora
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),

  transports: [
    new winston.transports.Console(),  // Mostra log no terminal
    new winston.transports.File({
      filename: 'logs/error.log',  // Salva erros no arquivo
      level: 'error'  // Só salva logs do tipo error
    })
  ]
});

export default logger;
