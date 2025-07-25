// require('dotenv').config();
// import Customer from "../models/Customer.js";
// import sequelize from '../../database/index.js'
// import { text } from "express";
// const { createTransporter, USER_EMAIL } = require('../../config/mail.js');

// import lembretePesquisa from '../../config/Mensagem.js'


// class CustomersController {

//   async index(req, res) {
//     await sequelize.sync();
//     let customers = await Customer.findAll();
//     return res.json(customers);
//   }

//   async show(req, res) {
//     const id = parseInt(req.params.id, 10);
//     const customer = await Customer.findByPk(id);
//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }
//     return res.json(customer);
//   }

//   async create(req, res) {

//     const { name, email, caso, data } = req.body;

//     const customer = await Customer.create({
//       name,
//       email,
//       caso,
//       data: new Date()  // força uma data válida no formato que o MySQL aceita
//     });

//     if (customer.name == "" || customer.email == "" || customer.caso == "") {
//       console.log('Não é possível enviar o e-mail! Preencha todos os campos!')
//     } else {



//       const mensagem = lembretePesquisa(customer.name, customer.caso)
//       enviarEmail(customer.email, mensagem)

//     }


//     return res.status(201).json(customer);
//   }

//   async update(req, res) {
//     const id = parseInt(req.params.id, 10);
//     const { name, email } = req.body;
//     const customer = await Customer.findByPk(id);
//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }
//     await customer.update({ name, email });
//     return res.json(customer);
//   }

//   async destroy(req, res) {
//     const id = parseInt(req.params.id, 10);
//     const customer = await Customer.findByPk(id);
//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }
//     await customer.destroy();
//     return res.status(204).json();
//   }

// }

// async function enviarEmail(destinatario, corpoHTML) {

//   try {
//     const transporter = await createTransporter();

//     const mailOptions = {
//       from: `Pesquisa de satisfação microvix <${USER_EMAIL}>`, // Altere para o nome da sua aplicação
//       to: destinatario,
//     subject: 'Lembrete!! Pesquisa de Satifação Microvix',
//     html: corpoHTML,
//   };

//   console.log('Enviando e-mail...');
//   const info = await transporter.sendMail(mailOptions);
//   console.log('E-mail enviado:', info.response);
//   return info;

// } catch (error) {
//   console.error('Erro ao enviar e-mail (sender):', error);
//   throw error;
// }


// }

// export default new CustomersController();


// import { getAllCustomers as getAllCustomersService } from "../services/customer.service.js";

// export const getAllCustomers = async (_req, res, next) => {

//   try {
//     const customers = await getAllCustomersService()
//     res.status(200).json(customers)
//   } catch (error) {
//     next(error)
//   }

// }

// export const getCustomerById = async (req, res, next) => {
//   try {
//     const customerId = parseInt(req.params.id, 10)
//     const customer = await getCustomerByIdService(customerId)
//     res.status(200).json(customer)
//   } catch (error) {
//     next(error)
//   }

// }



//   async create(req, res) {

//     const { name, email, caso, data } = req.body;

//     const customer = await Customer.create({
//       name,
//       email,
//       caso,
//       data: new Date()  // força uma data válida no formato que o MySQL aceita
//     });

//     if (customer.name == "" || customer.email == "" || customer.caso == "") {
//       console.log('Não é possível enviar o e-mail! Preencha todos os campos!')
//     } else {



//       const mensagem = lembretePesquisa(customer.name, customer.caso)
//       enviarEmail(customer.email, mensagem)

//     }

import {
  createCustomerAndSendEmail as createCustomerAndSendEmailService,
  getAllCustomers as getAllCustomersService
} from "../services/customer.service.js";

// export const createCustomerAndSendEmail = async (req, res, next) => {
//   try {
//     const { name, email, caso, data } = req.body
//     const createCustomer = await createCustomerAndSendEmailService({ name, email, caso, data })
//     return res.status(200).json({
//       message: 'Cliente registrado e e-mail enviado com sucesso.',
//       data: createCustomer
//     })
//   } catch (error) {
//     next(error)
//   }

// }

export const getAllCustomers = async (_req, res, next) => {

  try {
    const customers = await getAllCustomersService()
    res.status(200).json(customers)
  } catch (error) {
    next(error)
  }

}

// nova função que vai disparar email para varios clientes de uma vez

// {
//   nome: 'Silas',
//   numeroCaso: '04123456',
//   email: 'vinicius.abreu@linx.com.br'
// }


// export const createCustomerAndSendEmail = async (req, res, next) => {
//   try {
//     const { name, email, caso, data } = req.body
//     const createCustomer = await createCustomerAndSendEmailService({ name, email, caso, data })
//     return res.status(200).json({
//       message: 'Cliente registrado e e-mail enviado com sucesso.',
//       data: createCustomer
//     })
//   } catch (error) {
//     next(error)
//   }

// }

export const createCustomerAndSendEmail = async (req, res, next) => {
  try {
    const { data } = req.body
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'Lista de envio inválida ou vazia' })
    }
    const result = await createCustomerAndSendEmailService(data)
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}