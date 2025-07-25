import dotenv from 'dotenv'
import express from "express";
import "../src/database/index.js";
import cors from "cors";
import customerRoutes from "./app/routes/customer.routes.js";
import emailAuthRoutes from "./app/routes/email.auth.js"
import { errorHandler } from "./app/middlewares/error.handler.js";
import authRoutes from "./app/routes/auth.routes.js"

// class App{
//     constructor(){
//         this.server = express();
//         this.middlewares();
//         this.routes();
//     }

//     middlewares(){
//         this.server.use(express.json());

//     }
//     routes(){
//         this.server.use(routes);

//     }


// }

// export default new App().server;

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api', customerRoutes)

app.use('/api/auth', authRoutes)


// app.use('/api/auth', emailAuthRoutes)

app.use(errorHandler)

export default app
