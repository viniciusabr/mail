import logger from "../../config/logger.js";




export const generateTemplate = async (prompt) => {
  const userPrompt = String(prompt ?? "").trim();
  if (!userPrompt) {
    logger.warn("⚠️ [TEMPLATE SERVICE] Prompt inválido");
    const e = new Error("Prompt é obrigatório");
    e.statusCode = 400;
    throw e;
  }

  logger.info(`📝 [TEMPLATE SERVICE] Prompt recebido: ${userPrompt}`);

  const systemPrompt =
    "Você gera e-mails de CSAT. Responda APENAS um JSON com campos: subject, preheader, format:'mjml', content (MJML válido, minimalista, PT-BR). Sem texto extra.";

  const outputSpec = {
    type: "object",
    required: ["subject", "format", "content"],
    properties: {
      subject: { type: "string" },
      preheader: { type: "string" },
      format: { type: "string", enum: ["mjml"] },
      content: { type: "string" } // MJML
    }
  };

  return {
    strategy: "client-llm",
    systemPrompt,
    outputSpec,
    userPrompt
  };
};
