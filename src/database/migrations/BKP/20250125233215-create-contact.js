'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contact', { 
      
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,        
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
    
      email:{
        type: Sequelize.STRING,
        allowNull: false,
      },
        customer_id: {
        type: Sequelize.INTEGER,
        references: {model: "customers", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
       }
    
    });
     
  },

   down : queryInterface =>{
    
      return queryInterface.dropTable('contact');
     
  }
};
