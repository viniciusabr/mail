import Queue from 'bull'
import dotenv from 'dotenv'
dotenv.config()

const emailQueue = new Queue('emailQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  },
  limiter: {
    max: 1,
    duration: 3000
  }
})

export default emailQueue