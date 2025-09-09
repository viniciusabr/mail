import logger from "../../config/logger.js";
import {
  generateTemplate as generateTemplateService,
  // saveTemplate as saveTemplateService,           
  // listTemplates as listTemplatesService,
  // getTemplateById as getTemplateByIdService
} from "../services/template.service.js";

export const generateTemplate = async (req, res, next) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      logger.warn("⚠️ [TEMPLATE CONTROLLER] Prompt ausente no body");
      return res.status(400).json({ error: "Prompt é obrigatório" });
    }

    const result = await generateTemplateService(prompt);
    return res.status(200).json(result);

  } catch (err) {
    logger.error(`❌ [TEMPLATE CONTROLLER] Erro inesperado ao gerar template | ${err.message}`);
    next(err);
  }
};
