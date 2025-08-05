import Joi from 'joi';

const customerSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Nome deve ser um texto',
      'string.empty': 'Nome é obrigatório',
      'any.required': 'Nome é obrigatório'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'E-mail deve ser válido',
      'string.empty': 'E-mail é obrigatório',
      'any.required': 'E-mail é obrigatório'
    }),

  caso: Joi.string()
    .length(8)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.base': 'Campo "caso" deve ser um texto numérico',
      'string.empty': 'Campo "caso" é obrigatório',
      'string.length': 'Campo "caso" deve ter exatamente 8 dígitos',
      'string.pattern.base': 'Campo "caso" deve conter apenas números',
      'any.required': 'Campo "caso" é obrigatório'
    }),

  data: Joi.date()
    .required()
    .messages({
      'date.base': 'Data deve ser uma data válida',
      'any.required': 'Data é obrigatória'
    })
});

export const customersArraySchema = Joi.array()
  .items(customerSchema)
  .min(1)
  .messages({
    'array.base': 'A lista de clientes deve ser um array',
    'array.min': 'A lista de clientes não pode estar vazia'
  });
