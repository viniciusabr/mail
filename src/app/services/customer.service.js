import generateSurveyReminder from "../utils/generateSurveyReminder.js";
import Customer from "../models/Customer.js"
import { sendSurveyReminderEmail } from '../utils/send.email.js'
import validator from 'validator'
import { addEmailToQueue } from "../../jobs/email.job.js";


export const getAllCustomers = async () => {
  const customers = await Customer.findAll()

  if (!customers || customers.length === 0) {
    const error = new Error('')
    error.statusCode = 404
    throw error
  }

  return customers
}



// VERSÃO COM INTEGRAÇÃO DE FILA - REDIS
const processCustomer = async ({ name, email, caso, data }, user_id) => {
  if (!validator.isEmail(email)) {
    return { status: 'failed', name, email, error: 'Email inválido' };
  }

  try {
    await addEmailToQueue({ name, email, caso, data, user_id })
    return { status: 'success', name, email };

  } catch (error) {
    return { status: 'failed', name, email, error: error.message };
  }
}

export const createCustomerAndSendEmail = async (customers, user_id) => {

  const tasks = customers.map((customer) => processCustomer(customer, user_id))

  const results = await Promise.all(tasks)

  return {
    success: results.filter(r => r.status === 'success'),
    failed: results.filter(r => r.status === 'failed')
  }
}
