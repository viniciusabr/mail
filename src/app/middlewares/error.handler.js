export const errorHandler = (err, _req, res, _next) => {
  if (!err) {
    console.error('🔥 ErrorHandler recebeu err undefined');
    return res.status(500).json({
      message: 'Erro interno inesperado',
    });
  }

  console.error('🔥 ERROR:', err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Erro interno do servidor',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
