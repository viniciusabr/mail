import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24h
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    return res.status(429).json({
      error: 'Limite diário de envios atingido. Tente novamente amanhã.'
    });
  }
});

