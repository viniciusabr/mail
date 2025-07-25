import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'             // Geração de token JWT


export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ where: { email } })

  if (existingUser) {
    const error = new Error("Email já cadastrado")
    error.statusCode = 400
    throw error
  }

  const password_hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password_hash
  })

  return user
}



export const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error('Usuário não encontrado');
    error.statusCode = 400;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
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

  return token;
};
