import fs from 'fs';
import mjml2html from 'mjml';
import nodemailer from 'nodemailer';

// Função para carregar e converter MJML
function generateSurveyReminder(path, variables = {}) {
  let mjmlContent = fs.readFileSync(path, 'utf-8');

  // Substitui variáveis {{chave}}
  Object.keys(variables).forEach((key) => {
    mjmlContent = mjmlContent.replace(new RegExp(`{{${key}}}`, 'g'), variables[key]);
  });

  const { html } = mjml2html(mjmlContent);
  return html;
}

export default generateSurveyReminder;