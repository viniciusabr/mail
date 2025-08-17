// import User from "../models/User.js"
// import bcrypt from "bcryptjs"
// import jwt from 'jsonwebtoken'             // Geração de token JWT


// export const register = async ({ name, email, password }) => {
//   const existingUser = await User.findOne({ where: { email } })

//   if (existingUser) {
//     const error = new Error("Email já cadastrado")
//     error.statusCode = 400
//     throw error
//   }

//   const password_hash = await bcrypt.hash(password, 10)

//   const user = await User.create({
//     name,
//     email,
//     password_hash
//   })

//   return user
// }



// export const login = async ({ email, password }) => {
//   const user = await User.findOne({ where: { email } });

//   if (!user) {
//     const error = new Error('Usuário não encontrado');
//     error.statusCode = 400;
//     throw error;
//   }

//   const passwordMatch = await bcrypt.compare(password, user.password_hash);

//   if (!passwordMatch) {
//     const error = new Error('Credenciais inválidas');
//     error.statusCode = 401;
//     throw error;
//   }

//   const token = jwt.sign(
//     {
//       id: user.id,
//       email: user.email
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: '1d'
//     }
//   );


//   return token;
// };


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'; // Geração de token JWT
import logger from "./../../config/logger.js"

export const register = async ({ name, email, password }) => {
  logger.info(`📥 [REGISTER SERVICE] Tentativa de registro: ${email}`);

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    logger.warn(`⚠️ [REGISTER SERVICE] ${email} já está cadastrado`);
    const error = new Error("Email já cadastrado");
    error.statusCode = 400;
    throw error;
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password_hash
  });

  logger.info(`✅ [REGISTER SERVICE] Usuário criado: ${email} (ID: ${user.id})`);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );

  logger.info(`✅ [REGISTER SERVICE] Token gerado para ${email}`);

  return { user, token };
};

export const login = async ({ email, password }) => {
  logger.info(`📥 [LOGIN SERVICE] Tentativa de login: ${email}`);

  logger.info(`📥 [LOGIN SERVICE] Tentativa de login: ${email}`);

  const user = await User.findOne({ 
    where: { email, status: 'ativo' }
  });

  if (!user) {
    logger.warn(`⚠️ [LOGIN SERVICE] Usuário não encontrado ou inativo: ${email}`);
    logger.warn(`⚠️ [LOGIN SERVICE] Usuário não encontrado: ${email}`);
    const error = new Error('Usuário não encontrado ou inativo');
    error.statusCode = 400;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    logger.warn(`❌ [LOGIN SERVICE] Senha inválida para ${email}`);
    const error = new Error('Credenciais inválidas');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );

  logger.info(`✅ [LOGIN SERVICE] Token gerado para ${email}`);

  return token;
};
