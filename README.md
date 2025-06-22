Documentação para rodar o mail CSAT

1- Baixe e instale o node.js em seu computador pela URL: 

https://nodejs.org/dist/v22.11.0/node-v22.11.0-x64.msi

2 - Abra o powerShell do Windows como Administrador e execute o comando: 

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

3 - Instale o gerenciador de pacotes yarn:

 npm install --global yarn

4 - Instale no seu computador o XAMPP:

 https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe

5 - No navegador acesse:

 localhost/phpmyadmin/

6 - Crie o banco de dados CSAT

7 - Instale o GITHUB, acessando a URL: 

https://git-scm.com/downloads

8 - Configure o git localmente:

git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"

9 - Abra o cmd Clone o repositorio do git hub para sua máquina:

 git clone https://github.com/viniciusabr/mail.git

10 - Abra o repositório baixado em sua máquina com o vscode.

11 - Abra o terminal do vscode e digite o comando seguir para baixar e atualizar os pacotes utilizado no projeto:

 yarn 

12 - No terminal do vscode execute o comando a seguir para criar as tabelas no banco de dados:  yarn sequelize db:migrate

13 - Execute o comando a seguir para inicializar o server: yarn run dev
