// require('dotenv').config();
// import app from './app.js';


// app.listen(3000);

import dotenv from 'dotenv'
import app from './app.js';

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})