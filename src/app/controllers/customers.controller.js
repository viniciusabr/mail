import logger from "../../config/logger.js";
import {
  createCustomerAndSendEmail as createCustomerAndSendEmailService,
  getAllCustomers as getAllCustomersService
} from "../services/customer.service.js";
import { validateDuplicates } from "../utils/validate.duplicates.js";
import { customersArraySchema } from "../validations/customer.validation.js";


export const getAllCustomers = async (_req, res, next) => {

  try {
    const customers = await getAllCustomersService()
    res.status(200).json(customers)
  } catch (error) {
    next(error)
  }

}

export const createCustomerAndSendEmail = async (req, res, next) => {
  const { data } = req.body
  try {
    if (data.length > 40) {
      logger.warn(`⚠️ [CUSTOMER CONTROLLER] Tentativa de envio com ${data.length} e-mails — limite é 40`);
      return res.status(429).json({ error: 'Máximo de 40 e-mails por requisição.' });
    }

    validateDuplicates(data)
    const { error } = customersArraySchema.validate(data);

    if (error) {
      logger.error(`❌ [CUSTOMER CONTROLLER] Validação falhou: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id: user_id } = req.user

    const result = await createCustomerAndSendEmailService(data, user_id);
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`❌ [CUSTOMER CONTROLLER] Erro inesperado no envio de e-mails | ${err.message}`);
    next(err);
  }
};
