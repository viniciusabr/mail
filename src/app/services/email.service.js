import validator from 'validator'
import { addEmailToQueue } from "../../jobs/email.job.js";

const processRecipient = async ({ name, email, casos, data }, user_id) => {
  if (!validator.isEmail(email)) {
    return { status: 'failed', name, email, error: 'Email inválido' };
  }

  try {
    // Garante que "casos" vira um array
    const casosArray = Array.isArray(casos)
      ? casos
      : typeof casos === "string"
        ? [casos]
        : [];

    // 🔥 FORMATA A LISTA NO PADRÃO: Nº1234, Nº4567, Nº8901
    const casosFormatados = casosArray
      .map((c) => `Nº${String(c).trim()}`)
      .join(", ");

    await addEmailToQueue({
      name,
      email,
      casos: casosFormatados, // <-- AGORA É UMA STRING FORMATADA FINAL
      data,
      user_id
    });

    return { status: 'success', name, email };

  } catch (error) {
    return { status: 'failed', name, email, error: error.message };
  }
}

export const sendCustomerEmails = async (recipients, user_id) => {
  const tasks = recipients.map((recipient) => processRecipient(recipient, user_id));

  const results = await Promise.all(tasks);

  return {
    success: results.filter(r => r.status === 'success'),
    failed: results.filter(r => r.status === 'failed')
  };
}
