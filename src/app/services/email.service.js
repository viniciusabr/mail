import validator from 'validator'
import { addEmailToQueue } from "../../jobs/email.job.js";


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

export const sendCustomerEmails = async (customers, user_id) => {

  const tasks = customers.map((customer) => processCustomer(customer, user_id))

  const results = await Promise.all(tasks)

  return {
    success: results.filter(r => r.status === 'success'),
    failed: results.filter(r => r.status === 'failed')
  }
}
