
// import dotenv from 'dotenv'
// dotenv.config()

// import Queue from 'bull'


// const emailQueue = process.env.UPSTASH_REDIS_TLS_URL
//   ? new Queue('emailQueue', process.env.UPSTASH_REDIS_TLS_URL, {
//     limiter: {
//       max: 1,
//       duration: 3000
//     }
//   })
//   :
//   new Queue('emailQueue', {
//     redis: {
//       host: process.env.REDIS_HOST,
//       port: Number(process.env.REDIS_PORT || 6379)
//     }
//   },
//     {
//       limiter: {
//         max: 1,
//         duration: 3000
//       }
//     })


// emailQueue.on('ready', () => {
//   console.log('✅ Fila conectada ao Redis com sucesso!');
// });

// emailQueue.on('error', (err) => {
//   console.error('❌ Erro ao conectar ao Redis:', err);
// });


// export default emailQueue












import Queue from 'bull';

const emailQueue = new Queue('emailQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

emailQueue.on('ready', () => {
  console.log('✅ Redis conectado via rede privada (Railway)');
});

emailQueue.on('error', (err) => {
  console.error('❌ Erro no Redis:', err);
});

export default emailQueue;




