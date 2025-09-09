import logger from "../../config/logger.js";




export const generateTemplate = async (prompt) => {
  const userPrompt = prompt;

  logger.info(`📝 [TEMPLATE SERVICE] Prompt recebido: ${userPrompt}`);

  return { receivedPrompt: userPrompt };

}