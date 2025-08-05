import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 tentativas por IP
  message: 'Muitas tentativas de login. Tente novamente após 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false
});
