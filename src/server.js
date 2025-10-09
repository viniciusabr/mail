import dotenv from 'dotenv'
dotenv.config()

import app from './app.js';

import './jobs/email.processor.js'
console.log('✅ Processor carregado');


const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})