import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Nome deve ser um texto',
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter no mínimo 3 caracteres',
      'string.max': 'Nome deve ter no máximo 20 caracteres',
      'any.required': 'Nome é obrigatório'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'E-mail deve ser um texto',
      'string.email': 'E-mail deve ser válido',
      'string.empty': 'E-mail é obrigatório',
      'any.required': 'E-mail é obrigatório'
    }),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
    .required()
    .messages({
      'string.base': 'Senha deve ser um texto',
      'string.min': 'Senha deve ter no mínimo 8 caracteres',
      'string.pattern.base': 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
      'string.empty': 'Senha é obrigatória',
      'any.required': 'Senha é obrigatória'
    })
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'E-mail deve ser válido',
      'string.empty': 'E-mail é obrigatório',
      'any.required': 'E-mail é obrigatório'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Senha deve ter no mínimo 6 caracteres',
      'string.empty': 'Senha é obrigatória',
      'any.required': 'Senha é obrigatória'
    })
});