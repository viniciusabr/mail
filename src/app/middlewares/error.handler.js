export const errorHandler = (err, _req, res, _next) => {
  console.log(err)

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Erro interno do Servido",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  })
}