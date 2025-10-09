import Queue from 'bull'
import dotenv from 'dotenv'
dotenv.config()

const redisConfig = process.env.UPSTASH_REDIS_TLS_URL
  ? process.env.UPSTASH_REDIS_TLS_URL
  : {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }

const emailQueue = new Queue('emailQueue', {
  redisConfig,
  limiter: {
    max: 1,
    duration: 3000
  }
})

export default emailQueue