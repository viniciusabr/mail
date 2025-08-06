// import Handlebars from 'handlebars';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url'; // Importe fileURLToPath do módulo 'url'

// // Para simular __dirname em ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Caminho absoluto para o arquivo do template
// const templatePath = path.join(__dirname, 'email-template.html');

// // Leia o conteúdo do template uma vez quando o módulo é carregado
// const source = fs.readFileSync(templatePath, 'utf8');
// const template = Handlebars.compile(source);

// function generateSurveyReminder(nome, caso) {
//     return template({ nome, caso });
// }

// export default generateSurveyReminder;


import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simular __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto para o template
const templatePath = path.join(__dirname, 'email-template.html');

function generateSurveyReminder(nome, caso) {
    // Lê e compila o template toda vez que a função é chamada
    const source = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(source);
    return template({ nome, caso });
}

export default generateSurveyReminder;
