export const onlyAdmin = (req, res, next) => {
  if (!req.user?.user_adm) {
    return res.status(403).json({ message: "Acesso permitido apenas para administradores" });
  }

  next();
};