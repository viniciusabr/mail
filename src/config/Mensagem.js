import dotenv from 'dotenv'
dotenv.config()


function generateSurveyReminder(nome, caso) {

    return `<!DOCTYPE html>
<html lang="pt-bt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/styles.css">
</head>

<body>
    <p>Prezado(a) <strong>${nome},</strong></p>
    <p>Espero que esteja bem!</p>
    <p>Notei que ainda n&atilde;o recebemos sua avalia&ccedil;&atilde;o sobre o suporte que realizei na sua loja.
        <p><img id="primeira" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJ0OGtwYWh5NzQxY28za2R1MXJxYXBkdjMzMGs1Zzh5eWVqbW4yMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wrvdHFbwBrUFenu/giphy.gif" alt="" width="100" height="100" /></p>
        <p>Opini&atilde;o &eacute; fundamental para o meu desenvolvimento profissional e para garantir que estou
        atendendo &agrave;s suas expectativas.<br />A avalia&ccedil;&atilde;o &eacute; enviada por e-mail com o
        t&iacute;tulo <strong>"Pesquisa de Satisfa&ccedil;&atilde;o Linx Chamado N&ordm;${caso}"</strong>.
        </p>
    <p>Sua resposta &eacute; muito importante para n&oacute;s. Agradecemos antecipadamente pelo seu tempo e feedback.
    </p>
    <p><img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDAyZzhsZTdiOHVzbWZxbjRzOHZyMGJjMnFiZTduNmFpZWppa2MyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R6gvnAxj2ISzJdbA63/giphy.gif" alt="" width="100" height="100" /></p>
    <p><br />Atenciosamente,<br>
        <p>><img src="https://grupolinx-my.sharepoint.com/personal/vinicius_abreu_linx_com_br/_layouts/15/embed.aspx?UniqueId=1594b693-2f80-41f3-99eb-d45b9cde71e5" width="300" height="360" frameborder="0" scrolling="no" allowfullscreen title="assinatura"></img</p>

</body>

</html>`

}




export default generateSurveyReminder;