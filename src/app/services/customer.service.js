import generateSurveyReminder from "../utils/generateSurveyReminder.js";
import Customer from "../models/Customer.js"
import { sendSurveyReminderEmail } from '../utils/send.email.js'
import validator from 'validator'


export const getAllCustomers = async () => {
  const customers = await Customer.findAll()

  if (!customers || customers.length === 0) {
    const error = new Error('')
    error.statusCode = 404
    throw error
  }

  return customers
}

// função atual
// export const createCustomerAndSendEmail = async ({ name, email, caso, data }) => {
//   if (!name?.trim() || !email?.trim() || !caso?.trim()) {
//     const error = new Error("Preencha todos os campos obrigatórios.");
//     error.statusCode = 400;
//     throw error;
//   }

//   const customer = await Customer.create({ name, email, caso, data });

//   const emailContent = generateSurveyReminder(customer.name, customer.caso);
//   await sendSurveyReminderEmail(customer.email, emailContent);

//   return customer;
// };




// export const getCustomerById = async (id) => {
//   const customer = await Customer.findByPk(id)
//   if (!customer) {
//     const error = new Error("Cliente não encontrado.")
//     error.statusCode = 404
//     throw error
//   }
//   return customer
// }



// export const createCustomerAndSendEmail = async ({ name, email, caso, data }) => {
//   if (!name?.trim() || !email?.trim() || !caso?.trim()) {
//     const error = new Error("Preencha todos os campos obrigatórios.");
//     error.statusCode = 400;
//     throw error;
//   }

//   const customer = await Customer.create({ name, email, caso, data });

//   const emailContent = generateSurveyReminder(customer.name, customer.caso);
//   await sendSurveyReminderEmail(customer.email, emailContent);

//   return customer;
// };



// export const createCustomerAndSendEmail = async (customers) => {
//   const result = {
//     success: [],
//     failed: []
//   }

//   for (const { name, email, caso, data } of customers) {
//     try {
//       if (!validator.isEmail(email)) {
//         console.error(`Email inválido: ${email}`);
//         result.failed.push({ name, email, error: 'Email inválido' });
//         continue;
//       }
//       const emailContent = generateSurveyReminder(name, caso)
//       await sendSurveyReminderEmail(email, emailContent)

//       await Customer.create({ name, email, caso, data })

//       result.success.push({ name, email })
//     } catch (error) {
//       console.error(`Erro ao criar ${name}:`, error.message);
//       result.failed.push({
//         name,
//         email,
//         error: error.message
//       })
//     }
//   }
//   return result
// }




// versão mais rápida

const processCustomer = async ({ name, email, caso, data }) => {
  if (!validator.isEmail(email)) {
    return { status: 'failed', name, email, error: 'Email inválido' };
  }

  try {
    const emailContent = generateSurveyReminder(name, caso);

    await Promise.all([
      sendSurveyReminderEmail(email, emailContent),
      Customer.create({ name, email, caso, data })
    ])


    return { status: 'success', name, email };
  } catch (error) {
    return { status: 'failed', name, email, error: error.message };
  }
}

export const createCustomerAndSendEmail = async (customers) => {
  const tasks = customers.map(processCustomer)

  const results = await Promise.all(tasks)

  return {
    success: results.filter(r => r.status === 'success'),
    failed: results.filter(r => r.status === 'failed')
  }
}
