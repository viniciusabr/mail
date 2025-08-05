import logger from "../../config/logger.js";

export const validateDuplicates = (data) => {
  const emailCounts = {};
  const casoCounts = {};

  for (const item of data) {
    emailCounts[item.email] = (emailCounts[item.email] || 0) + 1;
    casoCounts[item.caso] = (casoCounts[item.caso] || 0) + 1;
  }

  const duplicatedEmails = Object.keys(emailCounts).filter(email => emailCounts[email] > 1);
  const duplicatedCasos = Object.keys(casoCounts).filter(caso => casoCounts[caso] > 1);

  if (duplicatedEmails.length > 0 || duplicatedCasos.length > 0) {
    let message = 'Duplicatas detectadas:\n';
    if (duplicatedEmails.length > 0) {
      message += `Emails: ${duplicatedEmails.join(', ')}\n`;
    }
    if (duplicatedCasos.length > 0) {
      message += `Casos: ${duplicatedCasos.join(', ')}`;
    }

    const finalMessage = message.trim();
    logger.error(`❌ [VALIDATE DUPLICATES] ${finalMessage}`);
    throw new Error(finalMessage);
  }
};
