import fs from 'fs';
import mjml2html from 'mjml';

function generateSurveyReminder(path, variables = {}) {
  let mjmlContent = fs.readFileSync(path, 'utf-8');

  Object.keys(variables).forEach((key) => {
    mjmlContent = mjmlContent.replace(new RegExp(`{{${key}}}`, 'g'), variables[key]);
  });

  const { html } = mjml2html(mjmlContent);
  return html;
}

export default generateSurveyReminder;
